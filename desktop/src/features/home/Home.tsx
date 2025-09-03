import { useApp } from "@/core/hooks/useApp"
import { dataURLtoFile } from "@/core/utils/img"
import { useEffect, useState } from "react"
import { useUploadScreenshotMutation } from "./api"
import SideBar from "@/core/components/SideBar"
import Task from "../task/Task"
import Setting from "../settings/Setting"
import { CircularProgressbar } from 'react-circular-progressbar';
import Timer from "./Timer"
import Selector from "./Selector"

let intervalId: NodeJS.Timeout | null = null

export default function Home() {
  const{getScreenshot}= useApp()
  const [uploadScreenshot] = useUploadScreenshotMutation();
  const[activeScreen,setActiveScreen]= useState<number>(0)


  useEffect(()=>{
    if(intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
    if(!intervalId) {
      intervalId = setInterval(async() => {
        try {
          const screenshots = await getScreenshot()
          if(screenshots) {
            const files = screenshots.map((s)=> dataURLtoFile(s))
            await Promise.allSettled(files.map((f)=> {
              const formData = new FormData()
              formData.append("file", f)
              return uploadScreenshot(formData)
            }))
          }
        } catch (error) {
          console.log(error);
        }
      }, 10000); 
    }
  },[])




  return (
    <div class="flex">
      <SideBar {...{activeScreen, setActiveScreen}}/>
      <div class="flex-1 flex w-full flex-col">
        {/* top header */}
        <div data-tauri-drag-region class="h-6 flex"/>
        {/* main content */}
        <div class="flex flex-2 p-4 space-x-4 justify-between">
          {/* task and settings  */}
          {activeScreen === 0 ? <Task/> : <Setting />}

          {/* Home main content */}
          <form class="flex flex-1 flex-col space-y-5"> 
            <h1> What are you working on?</h1>
            <Selector 
              placeholder="Select department"
              data={[
                "Development",
                "UI/UX",
                "HR",
                "Administration",
              ]}
            />
            <Selector 
              placeholder="Select task"
              data={[
                "Task 01",
                "Task 02",
                "Task 03",
                "Task 04",
              ]}
            />
            {/* timer */}
            <Timer/>
            {/* history */}
            <div class="shadow-[0_0_6px_rgba(0,0,0,0.15)] rounded-md">
              <div class="p-6 border-b border-b-border/40 flex justify-between items-center">
                <div>
                  <h1 class="font-semibold text-muted">Today</h1>
                  <h2 class="font-bold">00<span class="text-muted font-normal text-xs">h</span> 00<span class="text-muted font-normal text-xs">m</span></h2>
                </div>
                <div class="h-14 w-14">
                  <CircularProgressbar value={50} maxValue={100} text={`${0}%`} />
                </div>
              </div>
              <div class="p-6 border-b border-b-border/40 flex justify-between items-center">
                <div>
                  <h1 class="font-semibold text-muted">Today</h1>
                  <h2 class="font-bold">00<span class="text-muted font-normal text-xs">h</span> 00<span class="text-muted font-normal text-xs">m</span></h2>
                </div>
                <div class="h-14 w-14">
                  <CircularProgressbar value={50} maxValue={100} text={`${50}%`} />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    
  )
}


