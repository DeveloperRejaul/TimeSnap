import clsx from "clsx"
import { useState } from "react"

interface ICheckboxProps {
    onCheck:(value:boolean)=> void 
}


export default function Checkbox(props: ICheckboxProps) {
  const {onCheck} = props
  const [isChecked, setIsChecked] =  useState(false)
  return (
    <div
      class={clsx("h-4 w-4 border border-primary rounded-sm flex justify-center items-center", isChecked && "bg-primary")} 
      onClick={()=>setIsChecked(pre=> {
        const res =  !pre
        onCheck(res);
        return res
      })}
    > 
      {isChecked && <span class="text-background">✓</span>}
    </div>
  )
}
