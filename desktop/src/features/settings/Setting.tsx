import Button from "@/core/components/Button"
import Input from "@/core/components/Input"
import { useApp } from "@/core/hooks/useApp"
import ArrowLeft from "@/core/icons/ArrowLeft"
import type { ISetupFormTypes } from "@/types"
import clsx from "clsx"
import { useEffect } from "react"
import {useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"

export default function Setting() {
  const navigate = useNavigate()
  const {setStore,getStore}= useApp()
  const {handleSubmit, register,watch, setValue,formState:{errors,isLoading, isSaving}} = useForm<ISetupFormTypes>({
    defaultValues:{
      baseUrl: "",
      isBaseUrlShow:false,
      isLoading:true,
      isSaving:false
    }
  })

  useEffect(() => {
    (async()=>{
      try {
        const baseUrl = await getStore("BASE_URL")
        if(baseUrl) setValue("baseUrl", baseUrl)
        setValue("isLoading", false)
      } catch (error) {
        console.log(error);
        setValue("isLoading", false)
      }
    })()
  }, [])
  

  const isBaseUrlShow = watch("isBaseUrlShow")

  const onSubmit = async(data: ISetupFormTypes) => {
    try {
      setValue("isSaving", true)
      await setStore("BASE_URL", data.baseUrl)
      setValue("isSaving", false)
      toast.success("Settings updated successfully")
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.")
    }
  }

  if(isLoading) return <div>Loading...</div>

  return (
    <form class="p-3 space-y-2 flex flex-col justify-between flex-1" onSubmit={handleSubmit(onSubmit)}>
      <div class="flex flex-col w-full gap-y-3" >
        <h1 class="text-lg font-bold text-muted">Settings</h1>
        <div class="space-y-2">
          <h2 class="text-sm font-semibold text-muted">General</h2>
          <div class={clsx("bg-neutral-50/70 rounded-md p-3 py-5", {"space-y-3":isBaseUrlShow })}>
            <div>
              <div class="flex justify-between">
                <p class="text-sm font-semibold text-muted">Base URL</p>
                <ArrowLeft 
                  class={clsx(`h-7 w-7 cursor-pointer transform transition-all duration-500`, {"rotate-[-90deg]":isBaseUrlShow ,"rotate-0" : !isBaseUrlShow})}
                  onClick={()=> setValue("isBaseUrlShow", !isBaseUrlShow)}
                />
              </div>
              <div class={`transition-all duration-500 ease-in-out ${isBaseUrlShow ? "max-h-40 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"}`}>
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="space-x-3 self-end">
        <Button text="Back" onClick={()=>navigate(-1)}/>
        <Button text="Save Changes" onClick={handleSubmit(onSubmit)} isLoading={isSaving}/>
      </div>
    </form>
  )
}
