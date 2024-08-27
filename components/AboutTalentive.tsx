import { langs } from "@uiw/codemirror-extensions-langs";
import ReactCodeMirror from "@uiw/react-codemirror";

export default function AboutTalentive() {
  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold text-center mb-8">Talentive</h1>

            <div className="flex items-center mb-6">
                <p className="text-gray-700">
                Talentive is revolutionizing employee training with AI-powered, interactive learning.
                <br/>
                <br/>
                We&apos;re enhancing deskless worker training with AI, aiming for a future where training is continuous, on-the-job, and simulates your work environment before you start.
                </p>
            </div>

            <div className="flex items-center mb-6">
                <img className="w-24 h-24 rounded-full mr-6" src="/konst_img.jpg" alt="Konstantin"/>
                <div>
                    <h2 className="text-xl font-semibold mb-2">Konstantin Klingler</h2>
                    <p className="text-gray-700">Konstantin, a Schwarzman Scholar and Forbes 30 Under 30 honoree, has VC and startup experience with Global Founders Capital, HodlCo, Fizz (YC S21), and Spenmo (YC S22). He’s scaled multiple apps, including one edtech distributed by the Austrian Ministry of Education.</p>
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
