import { calculateTimeToEvent } from "@/utils/calculateTimeToEvent";
import { Framework } from "@/utils/framework";
import { useEffect, useMemo, useState } from "react";
import { TimeUnit } from "./TimeUnit";

type Props = {
  currentFramework: Framework;
};

export const CountdownTimer = ({ currentFramework }: Props) => {
  const [countdown, setCountdown] = useState(calculateTimeToEvent());

  const timeUnits = useMemo(
    () =>
      Object.entries(countdown).map(([label, value]) => ({
        label: label.toUpperCase(),
        value,
      })),
    [countdown]
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown(calculateTimeToEvent());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex gap-[10px] text-center">
      {timeUnits.map((timeUnit) => (
        <TimeUnit
          key={timeUnit.label}
          currentFramework={currentFramework}
          label={timeUnit.label}
          value={timeUnit.value}
        />
      ))}
    </div>
  );
};
