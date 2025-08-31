import { useApp } from "@/core/hooks/useApp"
import { dataURLtoFile } from "@/core/utils/img"
import { useEffect, useState } from "react"
import { useUploadScreenshotMutation } from "./api"
import SideBar from "@/core/components/SideBar"
import Task from "../task/Task"
import Setting from "../settings/Setting"


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
        <div  data-tauri-drag-region class="h-6 flex"/>
        {/* main content */}
        <div class="flex flex-2 p-4 space-x-4 justify-between">
          {/* task and settings  */}
          {activeScreen === 0 ? <Task/> : <Setting />}

          {/* Home main content */}
          <div class="flex flex-1"> 
          home
          </div>
        </div>
      </div>
    </div>
    
  )
}


