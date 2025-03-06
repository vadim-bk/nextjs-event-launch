import { assets } from "@/utils/assets";
import { Framework, frameworks } from "@/utils/framework";
import { cn } from "@/utils/tailwind";
import Image from "next/image";

type Props = {
  currentFramework: Framework;
};

const getFrameworkStyles = (
  framework: Framework,
  currentFramework: Framework,
  index: number
) => {
  if (currentFramework === framework) return "opacity-100 transform-none";

  return index > frameworks.indexOf(currentFramework)
    ? "opacity-0 -translate-y-2"
    : "opacity-0 translate-y-2";
};

export const FrameworkRotation = ({ currentFramework }: Props) => {
  return (
    <div className="w-[80px] h-[80px] mx-2 -mt-2 align-middle inline-flex relative">
      {frameworks.map((framework, index) => (
        <Image
          key={framework}
          className={cn(
            "w-full h-full object-contain object-center absolute top-0 left-0 transition-all duration-300",
            getFrameworkStyles(framework, currentFramework, index)
          )}
          src={assets[framework]}
          alt={framework}
          width={80}
          height={80}
        />
      ))}
    </div>
  );
};
