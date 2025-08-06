import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { listen, UnlistenFn } from '@tauri-apps/api/event';


let unlisten: Promise<UnlistenFn>
let date = new Date()
const MIN = 60 * 1000
function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [images, setImages] = useState<string[]>([])

  useEffect(()=>{
   monitor()
  },[])


  async function monitor() {
    try {
      await invoke<string>("monitor_activity")
    } catch (error) {
      console.log(error);
    }
  }

  async function getScreenshot() {
    try {
     const images = await invoke<string[]>("get_screenshot")
     setImages(pre=> [...pre,...images])
    } catch (error) {
      console.log(error);
    }
  }

  const listenActivity =() => {
     unlisten = listen<string>("MY_EVENT", (data)=>{
        setGreetMsg(data.payload)
        date = new Date()
      })
  }

  const getActiveMonitor = (min = MIN ):"Inactive" | "Active" => {
    const now = new Date();
    const dif =now.getTime() - date.getTime()
    if(dif >= min){
      return 'Inactive'
    }
    return "Active"
  }


  return (
    <main>
      <button type="button" className="bg-red-500" onClick={listenActivity}>Start Monitoring</button>
      <button type="button" onClick={()=>unlisten?.then(fn => fn?.())}>Off Monitoring</button>
      <button type="button" onClick={getScreenshot}>Take screenshot</button>
      <p>{greetMsg}</p>
      <div>
        {images.map((src, idx) => (
          <div key={idx}>
            <img src={src} alt={`Screenshot ${idx + 1}`} />
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
