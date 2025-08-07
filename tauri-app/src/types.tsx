export interface IInputProps  extends Partial<HTMLInputElement>{}

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