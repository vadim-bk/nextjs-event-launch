"use client";

import { assets } from "@/utils/assets";
import { Framework, frameworks } from "@/utils/framework";
import { cn } from "@/utils/tailwind";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { Poppins } from "next/font/google";
import { FrameworkRotation } from "@/components/FrameworkRotation";
import { Cursor } from "@/components/Cursor";
import dynamic from "next/dynamic";

const CountdownTimer = dynamic(
  () => import("@/components/CountdownTimer").then((mod) => mod.CountdownTimer),
  { ssr: false }
);

const poppins = Poppins({
  subsets: ["latin"],
  weight: "700",
});

export default function Home() {
  const [currentFramework, setCurrentFramework] = useState<Framework>(
    frameworks[0]
  );

  const [showBackground, setShowBackground] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let currentIndex = 0;

    const rotateFrameworks = () => {
      setCurrentFramework(frameworks[currentIndex]);
      currentIndex = (currentIndex + 1) % frameworks.length;
    };

    const intervalId = setInterval(rotateFrameworks, 2000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setShowBackground(true);
  }, []);

  return (
    <main>
      <div
        className={cn(
          "fixed inset-0 transition-color delay-100 duration-700 opacity-25",
          {
            "bg-purple-300": currentFramework === "qwik",
            "bg-sky-300": currentFramework === "safari",
            "bg-yellow-300": currentFramework === "chrome",
            "bg-teal-300": currentFramework === "tailwind",
            "bg-blue-300": currentFramework === "react",
            "bg-green-300": currentFramework === "vue",
            "bg-orange-400": currentFramework === "svelte",
            "bg-red-300": currentFramework === "mobile",
            "bg-neutral-300": currentFramework === "desktop",
          }
        )}
      />

      <Image
        className="fixed inset-0 w-screen h-screen object-cover"
        alt="gradient background"
        width={1200}
        height={1200}
        src={assets.gradient}
      />

      <div
        className="fixed inset-0 opacity-30"
        style={{
          backgroundImage: `url(${assets.square})`,
          backgroundSize: "30px",
        }}
      />

      <div
        className={cn(
          "bg-black fixed inset-0 transition-opacity duration=[1500ms]",
          showBackground ? "opacity-0" : "opacity-100"
        )}
      />

      <div className="max-w-7xl mt-20 mx-auto">
        <div className="flex flex-col items-center relative z-10">
          <h1
            className={`text-5xl max-w-3xl text-center leading-snug mb-12 ${poppins.className}`}
          >
            <Image
              className="inline-block mr-8 mt-2"
              src={assets.figma}
              alt="Figma logo"
              width={50}
              height={50}
            />
            to <FrameworkRotation currentFramework={currentFramework} /> will{" "}
            <span
              className={cn("transition-colors duration-200", {
                "text-purple-300": currentFramework === "qwik",
                "text-sky-300": currentFramework === "safari",
                "text-yellow-300": currentFramework === "chrome",
                "text-teal-300": currentFramework === "tailwind",
                "text-blue-300": currentFramework === "react",
                "text-green-300": currentFramework === "vue",
                "text-orange-400": currentFramework === "svelte",
                "text-red-300": currentFramework === "mobile",
                "text-neutral-300": currentFramework === "desktop",
              })}
            >
              never
            </span>{" "}
            be the same again
          </h1>

          <p className="mb-8">
            <span className="text-gray-300">
              Join us for an AI launch event by{" "}
            </span>
            <Image
              alt="Builder.io logo"
              className="inline-block ml-1 -mt-1"
              width={100}
              height={20}
              src={assets.builder}
            />
            {" + "}
            <Image
              alt="Figma logo"
              className="inline-block mx-1"
              width={55}
              height={20}
              src={assets.figmatwo}
            />
          </p>

          <div className="mb-8">
            <button
              ref={buttonRef}
              className={cn(
                "text-black px-6 py-3 rounded-md text-sm font-semibold transition-colors duration-200",
                {
                  "bg-purple-300": currentFramework === "qwik",
                  "bg-sky-300": currentFramework === "safari",
                  "bg-yellow-300": currentFramework === "chrome",
                  "bg-teal-300": currentFramework === "tailwind",
                  "bg-blue-300": currentFramework === "react",
                  "bg-green-300": currentFramework === "vue",
                  "bg-orange-400": currentFramework === "svelte",
                  "bg-red-300": currentFramework === "mobile",
                  "bg-neutral-300": currentFramework === "desktop",
                }
              )}
            >
              Claim ticket
            </button>
          </div>

          <CountdownTimer currentFramework={currentFramework} />
        </div>
      </div>

      <Cursor buttonRef={buttonRef} />
    </main>
  );
}
