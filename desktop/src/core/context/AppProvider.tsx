import { createContext, useEffect } from "react";
import { listen, type UnlistenFn } from '@tauri-apps/api/event';
import { invoke } from "@tauri-apps/api/core";
import type { Store } from '@tauri-apps/plugin-store';
import { load } from '@tauri-apps/plugin-store';
import type { StoreKeyTypes } from "@/types";
export interface AppContextType {
    monitor: () => Promise<void>;
    getScreenshot: () => Promise<string[] | undefined>;
    listenActivity: (cv: (payload: string) => void) => void;
    getIsActiveMonitor: (min?: number) => "Inactive" | "Active";
    unListenActivity: () => Promise<void>
    setStore: (key: StoreKeyTypes, value: string) => Promise<void | undefined>
    getStore: (key: StoreKeyTypes) => Promise<string | undefined>
    remove: (key: StoreKeyTypes) => Promise<void | undefined>
    clear: () => Promise<void | undefined>,
}


export const AppContext = createContext<AppContextType>({} as AppContextType);

let unlisten: Promise<UnlistenFn>
let date = new Date()
const MIN = 60 * 1000;
export let storage:Store|null = null;

export default function AppProvider({ children }:Readonly<{children: React.ReactNode}>) {
  useEffect(()=>{
    (async()=>{
      try {
        storage = await load('store.json', {autoSave: true, defaults:{}});
      } catch (error) {
        console.log(error);
      }
    })()
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
      return await invoke<string[]>("get_screenshot")
    } catch (error) {
      console.log(error);
    }
  }

  const listenActivity =(cv: (payload: string) => void) => {
    unlisten = listen<string>("MY_EVENT", (data)=>{
      date = new Date()
      cv(data.payload)
    })
  }
  const unListenActivity =() => unlisten.then(fn => fn())

  const getIsActiveMonitor = (min = MIN ):"Inactive" | "Active" => {
    const now = new Date();
    const dif = now.getTime() - date.getTime()
    if(dif >= min){
      return 'Inactive'
    }
    return "Active"
  }

  // storage functions
  const setStore = async (key: StoreKeyTypes, value: string) => {
    try {
      storage?.set(key, value)
    } catch (error) {
      console.log(error);
    }
  }

  const getStore = async (key: StoreKeyTypes)=> {
    try {
      return await storage?.get<string>(key)
    } catch (error) {
      console.log(error);
    }
  }

  const remove = async (key: StoreKeyTypes) => {
    try {
      await storage?.delete(key)
    } catch (error) {
      console.log(error);
    }
  }

  const clear = async () => {
    try {
      await storage?.clear()
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <AppContext.Provider 
      value={{
        monitor,
        getScreenshot,
        listenActivity,
        getIsActiveMonitor,
        unListenActivity,
        setStore,
        getStore,
        remove,
        clear
      }}>
      {children}
    </AppContext.Provider>
  );
}
