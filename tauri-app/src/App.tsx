import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { listen, UnlistenFn } from '@tauri-apps/api/event';
import "./App.css";

let unlisten: Promise<UnlistenFn>
function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [images, setImages] = useState<string[]>([])

  useEffect(()=>{
     unlisten = listen<string>("MY_EVENT", (data)=>{
        setGreetMsg(data.payload)
      })
  
   return ()=>{
    unlisten.then((f) => f());
   }
  },[])


  async function monitor() {
    try {
      const res =  await invoke<string>("monitor_activity")
    } catch (error) {
      console.log(error);
    }
  }

  async function getScreenshot() {
    try {
     const images = await invoke<string[]>("get_screenshot")
     setImages(images)
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <main className="container">
      <button type="button" onClick={monitor}>Start Monitoring</button>
      <button type="button" onClick={()=> unlisten.then((f) => f())}>Off Monitoring</button>
      <button type="button" onClick={getScreenshot}>Take screenshot</button>
      <p>{greetMsg}</p>
      <div className="screenshot-grid">
        {images.map((src, idx) => (
          <div key={idx} className="screenshot-card">
            <img src={src} alt={`Screenshot ${idx + 1}`} />
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
