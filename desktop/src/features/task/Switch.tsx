import clsx from "clsx"
import type { Dispatch, SetStateAction } from "react"

interface ISwitchProps {
    status: "todo" | "completed"
    setStatues: Dispatch<SetStateAction<"todo" | "completed">>
}


export default function Switch(props:ISwitchProps) {
  const {status, setStatues} = props
  return (
    <div class="space-x-2 border border-border w-fit rounded-md p-1">
      <span 
        onClick={()=>{
          if(status !== "todo") {
            setStatues('todo')
          }
        }}
        class={clsx("p-1 rounded-md text-muted font-normal cursor-pointer", status === "todo" && "bg-primary text-white font-semibold")}>
        To-Do
      </span>
      <span 
        onClick={()=>{
          if(status !== "completed") {
            setStatues('completed')
          }
        }}
        class={clsx("p-1 rounded-md text-muted font-normal cursor-pointer", status === "completed" && "bg-primary text-white font-semibold")}>
        Completed
      </span>
    </div>
  )
}
