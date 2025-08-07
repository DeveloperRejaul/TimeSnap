import type { IInputProps } from "@/types";

export default function Input(props:IInputProps) {
  const {
    placeholder,
    id,
    register,
    ...extra
  } =props;

  return (
    <div class="w-full max-w-sm min-w-[200px]">
      <div class="relative">
        <input
          id={id}
          {...register}
          class="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-3 transition duration-300 ease focus:outline-none focus:border-primary hover:border-primary shadow-sm focus:shadow"
          {...extra}
        />
        <label 
          for={id}
          class="absolute cursor-text  px-1 left-2.5 top-3.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-slate-400 peer-focus:scale-90 peer-focus:bg-background ">
          {placeholder}
        </label>
      </div>
    </div>
  )
}
