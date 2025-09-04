import Button from "@/core/components/Button";
import Input from "@/core/components/Input";
import { useApp } from "@/core/hooks/useApp";
import type { ISignupFormTypes } from "@/types";
import { openUrl } from '@tauri-apps/plugin-opener';
import { useNavigate } from "react-router";
import { useLoginMutation } from "./api";
import { toast } from "react-toastify";
import Checkbox from "@/core/components/checkbox";
import { useForm } from "react-hook-form";
  

export default function Login() {
  const navigate = useNavigate();
  const {handleSubmit, register, setValue,formState:{errors}} = useForm<ISignupFormTypes>()
  const {getStore, setStore} = useApp()
  const [login, {isLoading}] = useLoginMutation()
  


  const handleSignup = async () => {
    try {
      const baseUrl = await getStore('BASE_URL')
      await openUrl(`${baseUrl}/auth/signup`)
    } catch(error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.")
    }
  }
  
  const handleForgotPass = async () => {
    try {
      const baseUrl = await getStore('BASE_URL')
      await openUrl(`${baseUrl}/auth/forgotpass`)
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.")
    }
  }

  const handleLogin = async (formData:ISignupFormTypes) => {
    try {
      const {data, error} = await login(formData);
      if(error) {
        console.log(error);
        toast.error("Something went wrong. Please try again.")
      }
      if(data) {
        setStore("USER_TOKEN", data.token);
        setStore("USER_ID", data.id);
        navigate('/home')
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.")
    }
  }


  return (
    <div class="flex flex-1 justify-center items-center relative">
      <form class="flex flex-col w-full max-w-sm min-w-[200px] gap-y-3" onSubmit={handleSubmit(handleLogin)}>
        <Input 
          register={register('email', {
            required:"Email is required",
            pattern:{
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email address"
            }
          })} 
          placeholder="Enter your email" 
          id="email" 
          error={errors.email?.message}
        />
        <Input 
          register={register('password', {
            required:"Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long"
            }
          })} 
          placeholder="Enter your password"  
          id="password"
          error={errors.password?.message}
        />
        <div className="flex items-center justify-between text-sm text-gray-700">
          {/* Remember Me */}
          <label className="flex items-center space-x-2">
            <Checkbox 
              onCheck={(value)=>{
                setValue('remember', value)
              }}/>
            <span class="text-muted text-xs">Remember me</span>
          </label>

          {/* Forgot Password */}
          <div
            onClick={handleForgotPass}
            className="text-primary text-xs cursor-pointer hover:underline">
            Forgot Password?
          </div>
        </div>
        <Button text="Sign in" type="submit" isLoading={isLoading}/>
        <div className="text-center text-xs">
          <p className="text-text-muted">Don't have an account?</p>
          <div
            onClick={handleSignup}
            className="text-primary text-sm font-semibold cursor-pointer hover:underline"
          >
          Sign Up
          </div>
        </div>
      </form>
    </div>
  )
}