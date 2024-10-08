import { AVATARS, VOICES, CONTEXTS } from "@/app/lib/constants";
import {
  Configuration,
  Json,
  NewSessionData,
  StreamingAvatarApi,
} from "@heygen/streaming-avatar";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Input,
  Select,
  SelectItem,
  Spinner,
  Tooltip,
} from "@nextui-org/react";
import { Microphone, MicrophoneStage } from "@phosphor-icons/react";
import { useChat } from "ai/react";
import clsx from "clsx";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
import { useEffect, useRef, useState } from "react";
import InteractiveAvatarTextInput from "./InteractiveAvatarTextInput";
import { Analytics } from "@vercel/analytics/react"
import axios from 'axios';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default function InteractiveAvatar() {
  const [isLoadingSession, setIsLoadingSession] = useState(false);
  const [isLoadingRepeat, setIsLoadingRepeat] = useState(false);
  const [isNewSession, setIsNewSession] = useState(false);
  const [isLoadingChat, setIsLoadingChat] = useState(false);
  const [stream, setStream] = useState<MediaStream>();
  const [debug, setDebug] = useState<string>();
  const [score, setScore] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('');
  const [transcript, setTranscript] = useState<string[]>([]);
  const [avatarId, setAvatarId] = useState<string>(CONTEXTS[0].avatar_id);
  const [voiceId, setVoiceId] = useState<string>(CONTEXTS[0].voice_id);
  const [contextId, setContextId] = useState<string>("");
  const [data, setData] = useState<NewSessionData>();
  const [context, setContext] = useState<Json>(CONTEXTS[0]);
  const [text, setText] = useState<string>("");
  const [initialized, setInitialized] = useState(false); // Track initialization
  const [recording, setRecording] = useState(false); // Track recording state
  const mediaStream = useRef<HTMLVideoElement>(null);
  const avatar = useRef<StreamingAvatarApi | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const [isInputSet, setIsInputSet] = useState(false);
  const { input, setMessages, setInput, handleSubmit } = useChat({
    onFinish: async (message) => {
      console.log("ChatGPT Input:", input);
      console.log("ChatGPT Response:", message);

      if (!initialized || !avatar.current) {
        setDebug("Avatar API not initialized");
        return;
      }

      addTranscript(`You: ${input}`);
      addTranscript(`Customer: ${message.content}`);

      //send the ChatGPT response to the Interactive Avatar
      await avatar.current
        .speak({
          taskRequest: { text: message.content, sessionId: data?.sessionId },
        })
        .catch((e) => {
          setDebug(e.message);
        });
      setIsLoadingChat(false);
    },
  });

  const addTranscript = (newTranscript: string) => {
    setTranscript(prevTranscripts => [...prevTranscripts, newTranscript]);
  };

  async function fetchAccessToken() {
    try {
      const response = await fetch("/api/get-access-token", {
        method: "POST",
      });
      const token = await response.text();
      console.log("Access Token:", token); // Log the token to verify
      return token;
    } catch (error) {
      console.error("Error fetching access token:", error);
      return "";
    }
  }

  async function startSession() {
    setIsLoadingSession(true);
    await updateToken();
    if (!avatar.current) {
      setDebug("Avatar API is not initialized");
      return;
    }
    try {
      const res = await avatar.current.createStartAvatar(
        {
          newSessionRequest: {
            quality: "low",
            avatarName: avatarId,
            voice: { voiceId: voiceId },
          },
        },
        setDebug
      );
      setData(res);
      setStream(avatar.current.mediaStream);
      setTranscript([]);
      setMessages([
        {
          id: "1",
          role: "system",
          content: context?.meta_prompt,
        },
      ]);
      setInput(context?.first_prompt);
      setIsInputSet(true);
      setIsNewSession(false);
    } catch (error) {
      console.error("Error starting avatar session:", error);
      setDebug(
        `There was an error starting the session. ${voiceId ? "This custom voice ID may not be supported." : ""}`
      );
    }
    setIsLoadingSession(false);
  }

  async function updateToken() {
    const newToken = await fetchAccessToken();
    console.log("Updating Access Token:", newToken); // Log token for debugging
    avatar.current = new StreamingAvatarApi(
      new Configuration({ accessToken: newToken })
    );

    const startTalkCallback = (e: any) => {
      console.log("Avatar started talking", e);
    };

    const stopTalkCallback = (e: any) => {
      console.log("Avatar stopped talking", e);
    };

    console.log("Adding event handlers:", avatar.current);
    avatar.current.addEventHandler("avatar_start_talking", startTalkCallback);
    avatar.current.addEventHandler("avatar_stop_talking", stopTalkCallback);

    setInitialized(true);
  }

  async function handleInterrupt() {
    if (!initialized || !avatar.current) {
      setDebug("Avatar API not initialized");
      return;
    }
    await avatar.current
      .interrupt({ interruptRequest: { sessionId: data?.sessionId } })
      .catch((e) => {
        setDebug(e.message);
      });
  }

  async function postScore(score: number) {
    try {
      window.parent.postMessage({ score: score }, "*");
      window.parent.postMessage({ action: "finishCourse" }, "*");
      // alert('Score posted successfully');
    } catch (error) {
      console.error('Error posting score:', error);
    }
  }

  async function endSession() {
    if (!initialized || !avatar.current) {
      setDebug("Avatar API not initialized");
      return;
    }
    await avatar.current.stopAvatar(
      { stopSessionRequest: { sessionId: data?.sessionId } },
      setDebug
    );
    setStream(undefined);
  }

  async function getScore(transcript: string[]) {

    const transcriptScores = z.object({
      score: z.string(),
      feedback: z.array(z.string()),
    });

    try {

          const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
              { role: 'system', content: 'You are a helpful assistant. I want you to provide a single score out of 100 on how well the server perfomed to address the client, I want you to also give tips on what they should have done better. Use JSON output with the keys "score" and "feedback"' },
                {
                    role: "user",
                    content: transcript.join(';'),
                },
            ],
          });
        
        console.log(completion.choices[0].message);
        const chatGPTResponse = (completion.choices[0].message.content as string).replace('json', '').replace('```', '').replace('```', '');
        console.log(chatGPTResponse);
        try {
            const jsonResponse = JSON.parse(chatGPTResponse);
            console.log('Parsed JSON:', jsonResponse);
            setScore(jsonResponse.score);
            setFeedback(jsonResponse.feedback);
            return jsonResponse.score;
        } catch (error: any) {
            console.error('Failed to parse JSON:', error.message);
        }
    } catch (error: any) {
      console.error('Error calling ChatGPT API:', error.response ? error.response.data : error.message);
    }

}

  async function finishCourse() {
    setIsLoadingSession(true);
    endSession();
    const score = getScore(transcript);
    postScore(await score);
    setIsLoadingSession(false);
  }

  async function handleSpeak() {
    setIsLoadingRepeat(true);
    if (!initialized || !avatar.current) {
      setDebug("Avatar API not initialized");
      return;
    }
    await avatar.current
      .speak({ taskRequest: { text: text, sessionId: data?.sessionId } })
      .catch((e) => {
        setDebug(e.message);
      });
    setIsLoadingRepeat(false);
  }

  useEffect(() => {
    async function init() {
      const newToken = await fetchAccessToken();
      console.log("Initializing with Access Token:", newToken); // Log token for debugging
      avatar.current = new StreamingAvatarApi(
        new Configuration({ accessToken: newToken, jitterBuffer: 200 })
      );
      setInitialized(true); // Set initialized to true
    }
    init();

    return () => {
      endSession();
    };
  }, []);

  useEffect(() => {
    if (stream && mediaStream.current) {
      mediaStream.current.srcObject = stream;
      mediaStream.current.onloadedmetadata = () => {
        mediaStream.current!.play();
        setDebug("Playing");
      };
    }
  }, [mediaStream, stream]);

  function startRecording() {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorder.current = new MediaRecorder(stream);
        mediaRecorder.current.ondataavailable = (event) => {
          audioChunks.current.push(event.data);
        };
        mediaRecorder.current.onstop = () => {
          const audioBlob = new Blob(audioChunks.current, {
            type: "audio/wav",
          });
          audioChunks.current = [];
          transcribeAudio(audioBlob);
        };
        mediaRecorder.current.start(1000);
        setRecording(true);
        console.log("Recording started");
      })
      .catch((error) => {
        console.error("Error accessing microphone:", error);
      });
  }

  function stopRecording() {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      setRecording(false);
    }
    console.log("Recording stopped");
  }

  async function transcribeAudio(audioBlob: Blob) {
    try {
      // Convert Blob to File
      const audioFile = new File([audioBlob], "recording.wav", {
        type: "audio/wav",
      });
      const response = await openai.audio.transcriptions.create({
        model: "whisper-1",
        file: audioFile,
      });
      const transcription = response.text;
      console.log("Transcription: ", transcription);
      setInput(transcription)
      setIsInputSet(true);
    } catch (error) {
      console.error("Error transcribing audio:", error);
    }
  }


  // on isInputSet 
  useEffect(() => {
    if (isInputSet) {
      console.log('Input set:', input);
      setIsInputSet(false);
      handleSubmit();
      setIsLoadingChat(true);
    }
  }, [isInputSet]);

  // return ( <div>Under maintenance</div> ) 
  return ( 
    <div className="w-full flex flex-col gap-4">
      <Card>
        <CardBody className="h-[80vh] flex flex-col justify-center items-center">
          {stream ? (
            <div className="h-[80vh] w-[85vw] md:w-3/4 justify-center items-center flex rounded-lg overflow-hidden">
              <video
                ref={mediaStream}
                autoPlay
                playsInline
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              >
                <track kind="captions" />
              </video>
              <div className="flex flex-col gap-2 absolute bottom-3 right-3">
                {/* <Button
                  size="md"
                  onClick={handleInterrupt}
                  className="bg-gradient-to-tr from-blue-500 to-blue-500 text-white rounded-lg"
                  variant="shadow"
                >
                  Interrupt task
                </Button> */}
                <Button
                  size="md"
                  onClick={endSession}
                  className="bg-gradient-to-tr from-red-500 to-red-500  text-white rounded-lg"
                  variant="shadow"
                >
                  Switch Situation
                </Button>
                <Button
                  size="md"
                  onClick={finishCourse}
                  className="bg-gradient-to-tr from-red-500 to-red-500  text-white rounded-lg"
                  variant="shadow"
                >
                  Submit
                </Button>
              </div>
            </div>
          ) : isNewSession ? (
            <div className="h-full justify-center items-center flex flex-col gap-8 w-[50vw] self-center">
              <Button
                size="md"
                onClick={startSession}
                className="bg-gradient-to-tr from-blue-500 to-blue-500  w-[50vw] text-white rounded-lg"
                variant="shadow"
              >
                Start Situation
              </Button>
            </div>
          ) : !isLoadingSession ? (
            <div className="h-full justify-center items-center flex flex-col gap-8 w-[85vw] md:w-3/4 self-center">
              <div className="flex flex-col gap-2 w-[85vw] md:w-3/4">
                <p className="text-sm font-medium leading-none">
                  Select a Customer Situation
                </p>
                <Select
                  placeholder="Customer Situation"
                  size="md"
                  onChange={(e) => {
                    setContextId(e.target.value);
                    setContext(CONTEXTS[parseInt(e.target.value, 10)]);
                    // console.log(CONTEXTS[parseInt(e.target.value, 10) - 1]);
                    setVoiceId(CONTEXTS[parseInt(e.target.value, 10)].voice_id);
                    setAvatarId(CONTEXTS[parseInt(e.target.value, 10)].avatar_id);
                  }}
                >
                  {CONTEXTS.map((context, index) => (
                    <SelectItem key={index} textValue={context.meta_prompt}>
                      {context.description}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <Button
                size="md"
                onClick={startSession}
                className="bg-gradient-to-tr from-blue-500 to-blue-500  w-[85vw] md:w-3/4 text-white rounded-lg"
                variant="shadow"
              >
                Start Situation
              </Button>
              {/* <Button
                  size="md"
                  onClick={finishCourse}
                  className="bg-gradient-to-tr from-red-500 to-red-500  text-white rounded-lg"
                  variant="shadow"
                >
                  Submit
                </Button> */}
            </div>
          ) : (
            <Spinner size="lg" color="default" />
          )}
        </CardBody>
        <Divider />
        <CardFooter className="flex flex-col gap-3">
          {/* <InteractiveAvatarTextInput
            label="Repeat"
            placeholder="Type something for the avatar to repeat"
            input={text}
            onSubmit={handleSpeak}
            setInput={setText}
            disabled={!stream}
            loading={isLoadingRepeat}
          /> */}
          <InteractiveAvatarTextInput
            label="Chat"
            placeholder="Enter response here, or press the microphone button to record"
            input={input}
            onSubmit={() => {
              setIsLoadingChat(true);
              if (!input) {
                setDebug("Please enter text or record audio");
                return;
              }
              handleSubmit();
            }}
            setInput={setInput}
            loading={isLoadingChat}
            endContent={
              <Tooltip
                content={!recording ? "Start recording" : "Stop recording"}
              >
                {!isLoadingChat ? (<Button
                  onClick={!recording ? startRecording : stopRecording}
                  isDisabled={!stream}
                  isIconOnly
                  className={clsx(
                    "mr-4 text-white",
                    !recording
                      ? "bg-gradient-to-tr from-blue-500 to-blue-500  text-white rounded-lg"
                      : ""
                  )}
                  size="sm"
                  variant="shadow"
                >
                  {!recording ? (
                    <Microphone size={20} />
                  ) : (
                    <>
                      <div className="absolute h-full w-[100vw] bg-gradient-to-tr from-red-500 to-red-500 animate-pulse -z-10"></div>
                      <MicrophoneStage size={20} />
                    </>
                  )}
                </Button>
                ) : (
                  <Spinner
                    className="text-grey-300 hover:text-grey-200"
                    size="sm"
                    color="default"
                  />
                )}
              </Tooltip>
            }
            disabled={!stream}
          />
        </CardFooter>
      </Card>
      {/* <p className="font-mono text-right">
        <span className="font-bold">Console:</span>
        <br />
        {debug}
      </p> */}
      <div className="font-mono text-left">
        <span className="font-bold">Feedback:</span>
        <br />
          <p>Score: {score}</p>
          <p>Feedback: {feedback}</p>
      </div>
      <div className="font-mono text-left">
        <span className="font-bold">Transcript:</span>
        <br />
          {transcript.map((t, index) => (
            <p key={index}>{t}</p>
          ))}
      </div>
    </div>
  );
}
