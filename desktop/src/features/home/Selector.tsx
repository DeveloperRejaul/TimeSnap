import DropDown from "@/core/icons/DropDown"
import { useState } from "react"


interface ISelectorProps {
    placeholder:string
    data:string[]
}


export default function Selector(props:ISelectorProps) {
  const {
    placeholder = "",
    data = []
  } = props
  const [isShow, setIsShow] = useState(false)
  const [selectedTask, setSelectedTask] = useState(placeholder)

  const handleClickItem = (ele:string) => {
    setSelectedTask(ele)
    setIsShow(false)   
  }
  return (
    <div class="relative">
      <div 
        onClick={()=> setIsShow(pre=> !pre)}
        class="cursor-pointer border border-border/30 rounded-md px-2 py-1 flex justify-between items-center"
      >
        <span>{selectedTask}</span>
        <DropDown class="h-5 w-5 fill-muted"/>
      </div>
      {isShow && <div 
        class="absolute bg-background z-50 shadow-2xl px-4 py-2 rounded-md max-h-[200px] overflow-y-scroll"
      >
        {data.map((ele)=>(
          <div
            onClick={()=>handleClickItem(ele)}
            class="cursor-pointer bg-background"
          >
            {ele}
          </div>
        ))}
      </div>}
    </div>
  )
}
