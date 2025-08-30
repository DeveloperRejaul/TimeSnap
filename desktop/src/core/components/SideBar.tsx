import Menu from './Menu';
import Setting from '../icons/Setting';
import clsx from 'clsx';
import TaskIcon from '../icons/TaskIcon';

export default function SideBar() {
  const isActive =  true;

  return (
    <div class='h-[100vh] w-24 bg-gray-800 flex flex-col items-center space-y-10'>
      <div  data-tauri-drag-region class='w-full flex items-center h-16'>
        <Menu/>
      </div>
      {/* Avatar */}
      <img 
        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
        alt="User Avatar" className="w-14 h-14 rounded-full" 
      />
      <div class='flex flex-col items-center justify-center'>
        <div  className={clsx( isActive && "bg-muted" ,`w-14 h-14 rounded-md`)}>
          <TaskIcon class={clsx(isActive ? `fill-white` : 'fill-muted' , 'p-2')}/>
        </div>
        <p class={clsx(isActive && 'text-white' , 'text-muted')}>Tasks</p>
      </div>
      <div class='flex flex-col items-center justify-center'>
        <div className={clsx( isActive && "bg-muted" ,`w-14 h-14 rounded-md`)}>
          <Setting class={clsx(isActive ? `fill-white` : 'fill-muted' , 'p-2')}/>
        </div>
        <p class={clsx(isActive && 'text-white' , 'text-muted')}>Settings</p>
      </div>
    </div>
  )
}
