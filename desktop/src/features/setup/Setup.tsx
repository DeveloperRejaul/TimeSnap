 
import Button from "@/core/components/Button";
import Input from "@/core/components/Input";
import { useNavigate } from "react-router";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form"
import type { ISetupFormTypes } from "@/types";
import { useApp } from "@/core/hooks/useApp";



export default function Setup() {
  const navigate = useNavigate();
  const {handleSubmit, register, formState:{errors}} = useForm<ISetupFormTypes>()
  const {setStore}= useApp()


  const onSubmit:SubmitHandler<ISetupFormTypes> = async (data) => {
    try {
      await setStore("BASE_URL", data.baseUrl)
      navigate("/login")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div class="flex flex-1 justify-center items-center flex-col">
      <form class="flex flex-col w-full max-w-sm min-w-[200px] gap-y-3" onSubmit={handleSubmit(onSubmit)}>
        <Input
          defaultValue=""
          placeholder="Past base url"
          id="url"
          register={register('baseUrl', {
            required: "Base url is required",
            pattern: {
              value: /^(https?:\/\/)([a-zA-Z0-9.-]+)(:[0-9]+)?(\/.*)?$/,
              message: "Enter a valid URL (must start with http:// or https://)",
            },
          })}
          error={errors.baseUrl?.message}
        />
        <Button text="Next" size="md" type="submit"/>
      </form>
    </div>
  )
}