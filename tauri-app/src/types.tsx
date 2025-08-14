

export interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  register?:any
  error?:string
}

export interface IconProps {
    size?:number;
    color?:string;
    class?:string
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
  baseUrl:string
}
export interface ISignupFormTypes {
  email:string
  password:string
  remember:boolean
}
