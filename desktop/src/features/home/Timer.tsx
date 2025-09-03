import Pause from "@/core/icons/pause";
import Play from "@/core/icons/play";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

export default function Timer() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [time, setTime] = useState<number>(0); // time in seconds
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleTimer = () => {
    setIsPlaying((prev) => !prev);
  };

  // Start / stop timer effect
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  // Convert seconds -> hh:mm:ss
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return [`${hrs.toString().padStart(2, "0")}`,`${mins.toString().padStart(2, "0")}`,`${secs.toString().padStart(2, "0")}`];
  };

  return (
    <div class="flex justify-center items-center border rounded-md border-primary/50 space-x-5 shadow-md ">
      <h1 class="text-5xl font-bold py-10">{formatTime(time)[0]}:{formatTime(time)[1]}<span class="text-xl text-muted font-normal">{formatTime(time)[2]}</span></h1>
      <div class={clsx("h-14 w-14 rounded-2xl flex justify-center items-center cursor-pointer", isPlaying ? "bg-danger": "bg-primary")} onClick={handleTimer}>
        {isPlaying ? <Pause class="h-6 w-6 fill-white"/> : <Play class="h-6 w-6 fill-white"/>}
      </div>
    </div>

  )
}
