import { TwitterIcon } from "../../icons/TwitterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";

export function Sidebar() {
  
    return <div className="h-screen bg-white absolute top-0 left-0 pl-2 w-72

    ">  <div className="flex font-roboto text-3xl pt-4  pl-2 items-center gap-4">
        <img className="w-10 h-10" src="https://cdn.iconscout.com/icon/free/png-256/free-brain-networking-icon-download-in-svg-png-gif-file-formats--connection-control-neural-network-artificial-intelligence-pack-science-technology-icons-6115682.png" alt="" />
        <div>

            Brainly
        </div>
        </div> 
        <div className="pt-6">
            <div><SidebarItem text="Twitter" icon={<TwitterIcon size=""/>}/></div>
            <div><SidebarItem text="Youtube" icon={<YoutubeIcon size=""/>}/></div> 
        </div>
    </div>
}