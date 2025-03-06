import { cn } from "@/utils/tailwind";
import { useMemo } from "react";

const getClass = (num: number, currentNumber: number) => {
  if (currentNumber === num) return "opacity-100 transform-none";
  if (currentNumber > num) return "opacity-0 -translate-y-2";
  return "opacity-0 translate-y-2";
};

type Props = {
  currentNumber: number;
};

export const NumberRotation = ({ currentNumber }: Props) => {
  const numbers = useMemo(() => Array.from({ length: 60 }, (_, i) => i), []);

  return (
    <div className="relative h-10 w-10">
      {numbers.map((number) => (
        <div
          key={number}
          className={cn(
            "w-full h-full absolute transition-all duration-200",
            getClass(number, currentNumber)
          )}
        >
          {number}
        </div>
      ))}
    </div>
  );
};
