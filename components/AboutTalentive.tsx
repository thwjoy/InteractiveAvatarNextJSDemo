import { langs } from "@uiw/codemirror-extensions-langs";
import ReactCodeMirror from "@uiw/react-codemirror";

export default function AboutTalentive() {
  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold text-center mb-8">Talentive</h1>

            <div className="flex items-center mb-6">
                <p className="text-gray-700">
                Think current staff training is stuck in the dark age? Us, too. That&apos;s why we&apos;re on a mission to revolutionize the way employees learn and develop their skills.
                <br/>
                In an ideal world, you would have a tutor constantly by your side, guiding you through the learning process of your day to day job. Bur in reality, that&apos;s not currently possible. However, not for much longer.
                <br/>
                We&apos;re increasing the effectiveness of deskless worker training using engaging and interactive AI. Our vision is a world where training days are a thing of the past and eLearning isn&apos;t a fixed set of slides and multiple choice questions. It&apos;s a world where training is performed constantly on the job and one where it&apos;s possible to simulate your work environment before you even set foot on the premises. 
                </p>
            </div>

            <div className="flex items-center mb-6">
                <img className="w-24 h-24 rounded-full mr-6" src="/konst_img.jpg" alt="Konstantin"/>
                <div>
                    <h2 className="text-xl font-semibold mb-2">Konstantin Klingler</h2>
                    <p className="text-gray-700">Konstantin is a Schwarzman Scholar and was named to Forbes’ 30 Under 30 list. He has experience in venture capital and startups, having worked with Global Founders Capital, HodlCo, Fizz (YC S21), and Spenmo (YC S22). He has successfully scaled multiple apps, including a math learning app, which was distributed by the Austrian Ministry of Education.</p>
                </div>
            </div>

            <div className="flex items-center">
                <img className="w-24 h-24 rounded-full mr-6" src="/tom_img.jpg" alt="Tom"/>
                <div>
                    <h2 className="text-xl font-semibold mb-2">Tom Joy</h2>
                    <p className="text-gray-700">Tom finished his PhD in AI in 2022 from the University of Oxford; He&apos;s worked at Meta, FiveAI and co-founded GirlsWhoML - a non-profit who&apos;s mission is improve gender diveristy in AI.</p>
                </div>
            </div>
    </div>
  );
}
