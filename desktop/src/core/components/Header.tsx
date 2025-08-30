import Setting from "../icons/Setting";
import { useLocation, useNavigate } from "react-router";
import Menu from "./Menu";

export default function Header() {
  const navigate = useNavigate()
  const {pathname} =useLocation();

  const available = ['/', "/settings"]

  return (
    <div
      class="w-full h-9 flex items-center justify-betwee"
      data-tauri-drag-region
    >
      {available.includes(pathname) && <Menu/>}
      <div class="pr-3 cursor-pointer">
        {pathname == "/" &&<Setting class="h-4 w-4 fill-muted " onClick={()=> navigate("/settings")}/>}
      </div>
    </div>
  )

}
