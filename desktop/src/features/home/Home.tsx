import { useApp } from "@/core/hooks/useApp"
import { dataURLtoFile } from "@/core/utils/img"
import { useEffect } from "react"
import { useUploadScreenshotMutation } from "./api"


let intervalId: NodeJS.Timeout | null = null

export default function Home() {
  const{getScreenshot}= useApp()
  const [uploadScreenshot] = useUploadScreenshotMutation();


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
    <div>Home</div>
  )
}


