import { useState } from "react";
import Empty from "./Empty";
import Switch from "./Switch";

export default function Task() {
  const [status, setStatues] = useState<"todo"|"completed">('todo')
  return (
    <div className="flex flex-1 flex-col">
      <h1 class="mb-1">My task</h1>
      {/* switch */}
      <Switch {...{status, setStatues}}/>
      <Empty {...{status}}/>
    </div>
  )
}
