import Button from "@/core/components/Button";
import Input from "@/core/components/Input";
import { useNavigate } from "react-router";


export default function Setup() {
  const navigate = useNavigate();
  return (
    <div class="flex flex-1 justify-center items-center flex-col">
      <div class="flex flex-col w-full max-w-sm min-w-[200px] gap-y-3">
        <Input placeholder="Past base url"/>
        <div class="flex justify-end">
          <Button text="Next" size="md" onClick={()=> navigate("/login")}/>
        </div>
      </div>
    </div>
  )
}