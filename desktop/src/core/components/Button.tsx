import type { IButtonProps } from '@/types';
import clsx from 'clsx';

export default function Button(props: IButtonProps) {
  const {
    children,
    onClick,
    isLoading= false,
    className = '',
    type = 'button',
    variant = 'primary',
    size = 'md',
    text,
  } = props;

  const base = 'inline-flex items-center justify-center font-medium rounded-md transition-colors duration-200';

  const sizes = {
    sm: 'text-sm px-3 py-1',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3',
  }[size];

  const variants = {
    primary: 'bg-primary text-primary-foreground hover:brightness-110',
    secondary: 'bg-secondary text--secondary-foreground] hover:brightness-110',
    accent: 'bg-accent text-accent-foreground] hover:brightness-110',
    danger: 'bg-text-danger text-white hover:brightness-110',
  }[variant];

  const disabledClasses = isLoading? 'opacity-50 cursor-not-allowed pointer-events-none': 'cursor-pointer';

  return (
    <button
      type={type}
      onClick={isLoading ? undefined : onClick}
      disabled={isLoading}
      class={clsx(base, sizes, variants, disabledClasses, className)}
    >
      {isLoading ? (
        <span
          className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin p-2"
          aria-hidden="true" 
        />
      ) :children ?? text }
    </button>
  );
}
