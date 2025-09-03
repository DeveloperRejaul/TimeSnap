import Button from '@/core/components/Button'
import TaskBg from '@/core/icons/TaskBg'

interface IEmptyProps {
   status: "todo"|"completed"
}


export default function Empty(props:IEmptyProps) {
  const {status} = props
  return (
    <div class='flex flex-1 justify-center items-center flex-col space-y-3'>
      <TaskBg/>
      {status === "completed" && <p class='text-muted text-sm'>You don't have any completed task</p>}
      {status === "todo" && (
        <>
          <p class='text-muted text-sm'>You are not assigned to any task</p>
          <Button text='Create a new task' variant='outline' size='sm'/>
        </>
      )}
    </div>
  )
}
