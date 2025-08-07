import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import type { UnlistenFn } from '@tauri-apps/api/event';
import { listen } from '@tauri-apps/api/event';
import Login from "./features/auth/Login";
import Setup from "./features/setup/Setup";
import Header from "./core/components/Header";
import { Outlet } from "react-router";


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
    <main class="bg-background h-[100vh] w-[100vw] flex flex-1 flex-col overflow-hidden rounded-md shadow-2xl">
      <Header/>
      <Outlet/>
    </main>
  );
}

export default App;
