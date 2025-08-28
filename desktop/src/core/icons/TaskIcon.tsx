import type { IconProps } from '@/types'

export default function TaskIcon(props:IconProps) {
  return (
    <svg
      fill="#000000"
      width="100%"
      height="100%"
      viewBox="-3 -3 106.00 106.00"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#000000"
      strokeWidth={0.001}
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth={0} />
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g id="SVGRepo_iconCarrier">
        <rect x={19} y={18.92} width={60} height={16} rx={4} ry={4} />
        <rect x={19} y={40.92} width={27} height={16} rx={4} ry={4} />
        <rect x={19} y={62.92} width={27} height={16} rx={4} ry={4} />
        <rect x={52} y={40.92} width={27} height={16} rx={4} ry={4} />
        <rect x={52} y={62.92} width={27} height={16} rx={4} ry={4} />
      </g>
    </svg>
  )
}
