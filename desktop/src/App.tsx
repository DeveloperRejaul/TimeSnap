import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { listen, UnlistenFn } from '@tauri-apps/api/event';
import "./App.css";

let listener: UnlistenFn
function App() {
  const [greetMsg, setGreetMsg] = useState("");

  useEffect(()=>{
    const init = async () => {
     listener = await listen<string>("MY_EVENT", (data)=>{
        setGreetMsg(data.payload)
      })
    }
    init()
   return ()=>{
    listener?.()
   }
  },[])


  async function monitor() {
    try {
      // const res =  await invoke<string>("greet", {name})
      const res =  await invoke<string>("monitor_activity")
    } catch (error) {
      console.log(error);
    }
  }

  async function screenshot() {
    try {
      await invoke("screenshot")
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <main className="container">
      <button type="button" onClick={monitor}>Start Monitoring</button>
      <button type="button" onClick={screenshot}>Take screenshot</button>
      <p>{greetMsg}</p>
    </main>
  );
}

export default App;
