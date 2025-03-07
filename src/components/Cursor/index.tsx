import { assets } from "@/utils/assets";
import Image from "next/image";
import { useState, useEffect, RefObject } from "react";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type Props = {
  buttonRef: RefObject<HTMLButtonElement | null>;
};

export const Cursor = ({ buttonRef }: Props) => {
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const animateCursor = async () => {
      if (!buttonRef.current) return;

      await delay(1000);

      const buttonRect = buttonRef.current.getBoundingClientRect();

      setCursorPosition({
        x: buttonRect.x + buttonRect.width / 2,
        y: buttonRect.y + buttonRect.height / 2,
      });

      await delay(1000);

      setCursorPosition((prev) => ({ ...prev, y: prev.y + 150 }));

      buttonRef.current.style.transition = "transform 700ms ease-in-out";
      buttonRef.current.style.transform = "translateY(150px)";

      await delay(1000);

      setCursorPosition({ x: window.innerWidth - 100, y: -100 });
    };

    animateCursor();
  }, []);

  return (
    <Image
      className="absolute transition-all duration-700 ease-in-out z-50"
      style={{
        top: `${cursorPosition.y}px`,
        left: `${cursorPosition.x}px`,
      }}
      src={assets.cursor}
      alt="cursor"
      width={80}
      height={50}
    />
  );
};
