export const AVATARS = [
  {
    avatar_id: "Eric_public_pro2_20230608",
    name: "Edward in Blue Shirt",
  },
  {
    avatar_id: "Tyler-incasualsuit-20220721",
    name: "Tyler in Casual Suit",
  },
  {
    avatar_id: "Anna_public_3_20240108",
    name: "Anna in Brown T-shirt",
  },
  {
    avatar_id: "Susan_public_2_20240328",
    name: "Susan in Black Shirt",
  },
  {
    avatar_id: "josh_lite3_20230714",
    name: "Joshua Heygen CEO",
  },
];

export const VOICES = [
  {
    voice_id: "077ab11b14f04ce0b49b5f6e5cc20979",
    language: "English",
    gender: "Male",
    name: "Paul - Natural",
    preview_audio:
      "https://static.heygen.ai/voice_preview/k6dKrFe85PisZ3FMLeppUM.mp3",
    support_pause: true,
    emotion_support: false,
  },
  {
    voice_id: "131a436c47064f708210df6628ef8f32",
    language: "English",
    gender: "Female",
    name: "Amber - Friendly",
    preview_audio:
      "https://static.heygen.ai/voice_preview/5HHGT48B6g6aSg2buYcBvw.wav",
    support_pause: true,
    emotion_support: false,
  },
  {
    voice_id: "0ebe70d83b2349529e56492c002c9572",
    language: "English",
    gender: "Male",
    name: "Antoni - Friendly",
    preview_audio:
      "https://static.heygen.ai/voice_preview/TwupgZ2az5RiTnmAifPmmS.mp3",
    support_pause: true,
    emotion_support: false,
  },
  {
    voice_id: "1bd001e7e50f421d891986aad5158bc8",
    language: "English",
    gender: "Female",
    name: "Sara - Cheerful",
    preview_audio:
      "https://static.heygen.ai/voice_preview/func8CFnfVLKF2VzGDCDCR.wav",
    support_pause: true,
    emotion_support: false,
  },
  {
    voice_id: "001cc6d54eae4ca2b5fb16ca8e8eb9bb",
    language: "Spanish",
    gender: "Male",
    name: "Elias - Natural",
    preview_audio:
      "https://static.heygen.ai/voice_preview/JmCb3rgMZnCjCAA9aacnGj.wav",
    support_pause: false,
    emotion_support: false,
  },
  {
    voice_id: "00988b7d451d0722635ff7b2b9540a7b",
    language: "Portuguese",
    gender: "Female",
    name: "Brenda - Professional",
    preview_audio:
      "https://static.heygen.ai/voice_preview/fec6396adb73461c9997b2c0d7759b7b.wav",
    support_pause: true,
    emotion_support: false,
  },
  {
    voice_id: "00c8fd447ad7480ab1785825978a2215",
    language: "Chinese",
    gender: "Female",
    name: "Xiaoxuan - Serious",
    preview_audio:
      "https://static.heygen.ai/voice_preview/909633f8d34e408a9aaa4e1b60586865.wav",
    support_pause: true,
    emotion_support: false,
  },
  {
    voice_id: "00ed77fac8b84ffcb2ab52739b9dccd3",
    language: "Latvian",
    gender: "Male",
    name: "Nils - Affinity",
    preview_audio:
      "https://static.heygen.ai/voice_preview/KwTwAz3R4aBFN69fEYQFdX.wav",
    support_pause: true,
    emotion_support: false,
  },
  {
    voice_id: "02bec3b4cb514722a84e4e18d596fddf",
    language: "Arabic",
    gender: "Female",
    name: "Fatima - Professional",
    preview_audio:
      "https://static.heygen.ai/voice_preview/930a245487fe42158c810ac76b8ddbab.wav",
    support_pause: true,
    emotion_support: false,
  },
  {
    voice_id: "04e95f5bcb8b4620a2c4ef45b8a4481a",
    language: "Ukrainian",
    gender: "Female",
    name: "Polina - Professional",
    preview_audio:
      "https://static.heygen.ai/voice_preview/ntekV94yFpvv4RgBVPqW7c.wav",
    support_pause: true,
    emotion_support: false,
  },
  {
    voice_id: "071d6bea6a7f455b82b6364dab9104a2",
    language: "German",
    gender: "Male",
    name: "Jan - Natural",
    preview_audio:
      "https://static.heygen.ai/voice_preview/fa3728bed81a4d11b8ccef10506af5f4.wav",
    support_pause: true,
    emotion_support: false,
  },
];

export const CONTEXTS = [
  {
    context_id: "0",
    description: "Demo instructions",
    meta_prompt: "I want you to give me the following instructions: \
    'Hello, I'm your personal interaction training assistant. \
    I'm here to help you practice your communication skills and build your confidence when dealing with customers. \
    You can either to talk to me using the chat box below, or use the microphone button to record your voice. \
    We can keep talking, but I recommend you click 'Switch Situation' where you can select a situation to practice.' ",
    voice_id: "1bd001e7e50f421d891986aad5158bc8",
    avatar_id: "Lily_public_pro1_20230614",
  },
  {
    context_id: "1",
    description: "Gentleman complaining about slow service",
    meta_prompt: "I want you to pretend that you are a gentleman who is upset about the slow service at the restaurant. You've been waiting for over 30 minutes for your meal. What are you going to say to the waiter? Be short and grumpy with your responses.",
    voice_id: "ccb30e87c6b34ca8941f88352c71612d",
    language: "English",
    gender: "Male",
    voice_name: "Noah - Serious",
    preview_audio: "https://static.heygen.ai/voice_preview/UDzn8mZ5eKbXrQQojCVMud.wav",
    support_pause: true,
    emotion_support: true,
    avatar_id: "Tyler-incasualsuit-20220721",
    avatar_name: "Tyler in Casual Suit",
  },
  {
    context_id: "2",
    description: "Young woman with dietary restrictions",
    meta_prompt: "I want you to pretend that you are a young woman with severe dietary restrictions. You've been served a dish that contains ingredients you're allergic to. You are feeling sick, are very angry need the waitor to call an ambulance. Be short with your responses.",
    voice_id: "1bd001e7e50f421d891986aad5158bc8",
    language: "English",
    gender: "Female",
    voice_name: "Sara - Serious",
    preview_audio:
      "https://static.heygen.ai/voice_preview/func8CFnfVLKF2VzGDCDCR.wav",
    support_pause: true,
    emotion_support: true,
    avatar_id: "Lily_public_pro1_20230614",
    avatar_name: "Leah in Black Suit",
  },
  {
    context_id: "3",
    description: "Businessperson in a rush",
    meta_prompt: "I want you to pretend that you are a businessperson in a hurry for a meeting. You've just been informed that your meal will take an additional 20 minutes to prepare. Tell the waitor you're annoyed and want to leave. Do not be polite.",
    voice_id: "0ebe70d83b2349529e56492c002c9572",
    language: "English",
    gender: "Male",
    voice_name: "Antoni - Professional",
    preview_audio:
      "https://static.heygen.ai/voice_preview/TwupgZ2az5RiTnmAifPmmS.mp3",
    support_pause: true,
    emotion_support: false,
    avatar_id: "Eric_public_pro2_20230608",
    avatar_name: "Edward in Blue Shirt",
  },
  {
    context_id: "4",
    description: "Romantic couple celebrating an anniversary",
    meta_prompt: "I want you to pretend that you are part of a romantic couple celebrating your anniversary. The waiter has brought the wrong wine to your table. Be short with your responses.",
    voice_id: "1bd001e7e50f421d891986aad5158bc8",
    language: "English",
    gender: "Female",
    voice_name: "Sara - Cheerful",
    preview_audio:
      "https://static.heygen.ai/voice_preview/func8CFnfVLKF2VzGDCDCR.wav",
    support_pause: true,
    emotion_support: true,
    avatar_id: "Susan_public_2_20240328",
    name: "Susan in Black Shirt",
  },
  {
    context_id: "5",
    description: "Chatty tourist unfamiliar with the menu",
    meta_prompt: "I want you to pretend that you are a tourist who is unfamiliar with the local cuisine. You are unsure what to order and need the waiter's help. You are very fusy. Ask for recommendations and suggestions. You talk a lot.",
    voice_id: "cbb56828d798491e9f601a5415415e25",
    language: "Spanish",
    gender: "Female",
    voice_name: "Larissa - Friendly",
    preview_audio: "https://static.heygen.ai/voice_preview/Jg5MDxyd6pjrPhvPLepFdh.wav",
    support_pause: true,
    emotion_support: true,
    avatar_id: "Anna_public_3_20240108",
    name: "Anna in Brown T-shirt",
  },
  {
    context_id: "6",
    description: "Customer with a missing reservation",
    meta_prompt: "I want you to pretend that you are a customer who made a reservation a week ago, but upon arrival, the restaurant has no record of it. You need to make up a name and a time. How do you handle this situation with the hostess to ensure you get a table? Keep your answers short and to the point.",
    voice_id: "1bd001e7e50f421d891986aad5158bc8",
    language: "English",
    gender: "Female",
    voice_name: "Sara - Serious",
    preview_audio:
      "https://static.heygen.ai/voice_preview/func8CFnfVLKF2VzGDCDCR.wav",
    support_pause: true,
    emotion_support: true,
    avatar_id: "Susan_public_2_20240328",
    name: "Susan in Black Shirt",
  },
  {
    context_id: "7",
    description: "Customer receiving poor service",
    meta_prompt: "I want you to pretend that you are a customer receiving consistently poor service throughout your meal. The waiter has been inattentive, and your order was incorrect. When the waitor returns, you lash out in frustration. Be short with your answers",
    voice_id: "071d6bea6a7f455b82b6364dab9104a2",
    language: "German",
    gender: "Male",
    voice_name: "Jan - Natural",
    preview_audio:
      "https://static.heygen.ai/voice_preview/fa3728bed81a4d11b8ccef10506af5f4.wav",
    support_pause: true,
    emotion_support: true,
    avatar_id: "Eric_public_pro2_20230608",
    name: "Edward in Blue Shirt",

  }
];
