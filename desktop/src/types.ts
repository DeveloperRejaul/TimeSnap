/* eslint-disable @typescript-eslint/no-explicit-any */


export interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  register?:any
  error?:string
  classname?:string
}

export interface IconProps {
    size?:number;
    color?:string;
    class?:string
    onClick?: () => void;
}

export interface IButtonProps {
    text?:string;
    children?: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'sm' | 'md' | 'lg';
}

export interface ISetupFormTypes {
  baseUrl:string,
  isBaseUrlShow:boolean,
  isLoading:boolean
}
export interface ISignupFormTypes {
  email:string
  password:string
  remember:boolean
}

export type StoreKeyTypes = "BASE_URL" | "USER_TOKEN" | "USER_ID";

export type Error = {
  status: number;
  message:string
}
export type Success<T = any> = {
 data: T
}


export interface ILoginPayload {
  email: string;
  password: string;
  remember: boolean;
}
export interface ILoginResponse {
  id:string;
  token:string;
}
export type KeyName =
  // Letters
  | "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j"
  | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t"
  | "u" | "v" | "w" | "x" | "y" | "z"

  // Numbers (top row)
  | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"

  // Modifiers
  | "shift" | "shiftleft" | "shiftright"
  | "ctrl" | "control" | "controlleft" | "controlright"
  | "alt" | "altgr"
  | "meta" | "metaleft" | "metaright"
  | "capslock" | "numlock" | "scrolllock" | "pause" | "printscreen"

  // Navigation
  | "enter" | "return"
  | "space" 
  | "tab" 
  | "backspace" 
  | "escape" | "esc"
  | "home" | "end" | "pageup" | "pagedown"
  | "insert" | "delete"
  | "uparrow" | "downarrow" | "leftarrow" | "rightarrow"

  // Function keys
  | "f1" | "f2" | "f3" | "f4" | "f5" | "f6" | "f7" | "f8" | "f9" | "f10" | "f11" | "f12"

  // Punctuation / Symbols
  | "backquote" | "minus" | "equal"
  | "leftbracket" | "rightbracket"
  | "semicolon" | "quote"
  | "backslash" | "intlbackslash"
  | "comma" | "dot" | "slash"

  // Numpad keys
  | "kp0" | "kp1" | "kp2" | "kp3" | "kp4" | "kp5" | "kp6" | "kp7" | "kp8" | "kp9"
  | "kpreturn" | "kpminus" | "kpplus" | "kpmultiply" | "kpdivide" | "kpdelete";
