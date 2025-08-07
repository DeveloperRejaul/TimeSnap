import Button from "@/core/components/Button";
import Input from "@/core/components/Input";
import { openUrl } from '@tauri-apps/plugin-opener';
import { useLocation } from "react-router";


export default function Login() {
  const {state}= useLocation()

  const handlesignup = async () => {
    try {
      await openUrl(`${state?.baseUrl}/auth/signup`  )
    } catch (error) {
      console.log(error);
    }
  }
  const handleForgotPass = async () => {
    try {
      await openUrl(`${state?.baseUrl}/auth/forgotpass`  )
    } catch (error) {
      console.log(error);
    }
  }
  const handleLogin = async () => {
    try {
      //
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div class="flex flex-1 justify-center items-center">
      <div class="flex flex-col w-full max-w-sm min-w-[200px] gap-y-3">
        <Input placeholder="Enter your email" id="email" />
        <Input placeholder="Enter your password"  id="password"/>
        <div className="flex items-center justify-between text-sm text-gray-700">
          {/* Remember Me */}
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-primary rounded"
              defaultChecked
            />
            <span class="text-text-muted text-xs">Remember me</span>
          </label>

          {/* Forgot Password */}
          <div
            onClick={handleForgotPass}
            className="text-primary text-xs cursor-pointer hover:underline">
            Forgot Password?
          </div>
        </div>
        <Button text="Sign in" onClick={handleLogin} />
        <div className="text-center text-xs">
          <p className="text-text-muted">Don't have an account?</p>
          <div
            onClick={handlesignup}
            className="text-primary text-sm font-semibold cursor-pointer hover:underline"
          >
          Sign Up
          </div>
        </div>
      </div>
    </div>
  )
}