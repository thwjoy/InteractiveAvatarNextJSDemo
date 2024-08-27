"use client";

import InteractiveAvatar from "@/components/InteractiveAvatar";
import AboutTalentive from "@/components/AboutTalentive";
import { Tab, Tabs } from "@nextui-org/react";

export default function App() {
  const tabs = [
    {
      id: "about",
      label: "About Talentive",
      content: <AboutTalentive />,
    },
    {
      id: "demo",
      label: "Customer Interaction Demo",
      content: <InteractiveAvatar />,
    },
  ];

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="w-[95vw] md:w-1/2 flex flex-col items-start justify-start gap-5 mx-auto pt-4 pb-20">
        <div className="w-full">
          <Tabs color="primary" radius="full" items={tabs} >
            {(items) => (
              <Tab key={items.id} title={items.label}>
                 {items.content}
              </Tab>
            )}
          </Tabs>
          {/* <InteractiveAvatar /> */}
        </div>
      </div>
    </div>
  );
}
