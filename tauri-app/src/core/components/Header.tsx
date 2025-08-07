import CrossIcon from "../icons/Cross";
import { getCurrentWindow } from '@tauri-apps/api/window';
import Minus from "../icons/Minus";
import Minimize from "../icons/Minimize";
import Maximize from "../icons/Maximize";
import { useState } from "react";

export default function Header() {
  const appWindow = getCurrentWindow();
  const [isMaximize, setIsMaximize]= useState(false)


  return (
    <div
      class="w-full h-10 flex"
      data-tauri-drag-region
    >
      <div class="flex gap-x-1 p-2">
        <div class="h-3 w-3 rounded-full  bg-red-400 duration-200 transition-colors flex justify-center items-center group" onClick={()=> appWindow.close()}>
          <CrossIcon class="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 fill-text-muted"/>
        </div>
        <div class="h-3 w-3 rounded-full bg-amber-400 duration-200 transition-colors flex justify-center items-center group" onClick={()=> appWindow.minimize()}> 
          <Minus class="h-3 w-3 p-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200" color="oklch(0.5 0.02 270)"/>
        </div>
        <div class="h-3 w-3 rounded-full bg-green-500 duration-200 transition-colors flex justify-center items-center group" 
          onClick={()=>{
            if(isMaximize) {
              appWindow.toggleMaximize()
              setIsMaximize(false)
              return
            }
            appWindow.toggleMaximize()
            setIsMaximize(true)
          }}> 
          {isMaximize ? <Maximize class="h-3 w-3 opacity-0 rotate-45 group-hover:opacity-100 transition-opacity duration-200 fill-text-muted"/> :<Minimize class="h-w w-3 opacity-0 rotate-45 group-hover:opacity-100 transition-opacity duration-200 fill-text-muted"/>}
        </div>
      </div>
    </div>
  )
}
