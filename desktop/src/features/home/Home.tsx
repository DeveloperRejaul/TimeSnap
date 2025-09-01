import { useApp } from "@/core/hooks/useApp"
import { dataURLtoFile } from "@/core/utils/img"
import { useEffect, useState } from "react"
import { useUploadScreenshotMutation } from "./api"
import SideBar from "@/core/components/SideBar"
import Task from "../task/Task"
import Setting from "../settings/Setting"
import Play from "@/core/icons/play"
import Pause from "@/core/icons/pause"
import clsx from "clsx"


let intervalId: NodeJS.Timeout | null = null

export default function Home() {
  const{getScreenshot}= useApp()
  const [uploadScreenshot] = useUploadScreenshotMutation();
  const[activeScreen,setActiveScreen]= useState<number>(0)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)


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


  const handleTimer = () => { 
    setIsPlaying(!isPlaying)
  }

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
          <form class="flex flex-1 flex-col space-y-4"> 
            <h1> What are you working on?</h1>
            <select class="w-full">
              <option selected>Choose a country</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
            <select class="w-full">
              <option selected>Choose a country</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>

            {/* timer */}
            <div class="flex justify-center items-center border rounded-md border-primary space-x-5">
              <h1 class="text-5xl font-bold py-10">00:00<span class="text-xl text-muted font-normal">00</span></h1>
              <div class={clsx("h-14 w-14 rounded-2xl flex justify-center items-center cursor-pointer", isPlaying ? "bg-danger": "bg-primary")} onClick={handleTimer}>
                {isPlaying ? <Pause class="h-6 w-6 fill-white"/> : <Play class="h-6 w-6 fill-white"/>}
              </div>
            </div>

            {/* history */}

          </form>
        </div>
      </div>
    </div>
    
  )
}


