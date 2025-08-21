 
import Button from "@/core/components/Button";
import Input from "@/core/components/Input";
import { useNavigate } from "react-router";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form"
import type { ISetupFormTypes } from "@/types";



export default function Setup() {
  const navigate = useNavigate();
  const {handleSubmit, register} = useForm<ISetupFormTypes>()


  const onSubmit:SubmitHandler<ISetupFormTypes> = (data) => {
    navigate("/login", {state:{...data}})
  }

  return (
    <div class="flex flex-1 justify-center items-center flex-col">
      <form class="flex flex-col w-full max-w-sm min-w-[200px] gap-y-3" onSubmit={handleSubmit(onSubmit)}>
        <Input
          defaultValue=""
          placeholder="Past base url"
          id="url"
          register={register('baseUrl', {required: "Base url is required"})}
        />
        <Button text="Next" size="md" type="submit"/>
      </form>
    </div>
  )
}