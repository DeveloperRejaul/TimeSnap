import type { IInputProps } from "@/types";

export default function Input(props:IInputProps) {
  const {
    placeholder,
    id,
    register,
    error,
    ...extra
  } =props;

  return (
    <div class="w-full max-w-sm min-w-[200px]">
      <div class="relative">
        <input
          id={id}
          {...register}
          placeholder=" "
          className="peer w-full bg-transparent placeholder:text-transparent text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-3 transition duration-300 ease focus:outline-none focus:border-primary hover:border-primary shadow-sm focus:shadow"
          {...extra}
        />
        <label
          htmlFor={id}
          className="absolute cursor-text px-1 left-2.5 top-3.5 text-slate-400 text-sm transition-all transform origin-left
            peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-slate-400 peer-focus:scale-90 peer-focus:bg-background
            peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:left-2.5 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-slate-400 peer-[&:not(:placeholder-shown)]:scale-90 peer-[&:not(:placeholder-shown)]:bg-background
          "
        >
          {placeholder}
        </label>
      </div>
      <p class="text-text-danger text-xs">{error}</p>
    </div>
  )
}
