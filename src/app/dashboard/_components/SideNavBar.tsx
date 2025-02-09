import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChartLine, LibraryBig, MessageSquare, Shield,Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

function SideNavBar() {
    const menuList = [
        {
          id: 1,
          name: "My Forms",
          icon: LibraryBig,
          path: "/dashboard",
        },
        {
          id: 2,
          name: "Response",
          icon: MessageSquare,
          path: "/dashboard/response",
        },
        {
          id: 3,
          name: "Analitycs",
          icon: ChartLine,
          path: "/dashboard/analitycs",
        },
        {
          id: 4,
          name: "Upgrade",
          icon: Shield,
          path: "/dashboard/upgrade",
        },
      ];

  const path= usePathname();
  useEffect(()=>{
    console.log(path)
  },[path])
  return (
    <div className="flex h-screen flex-col justify-between border-e bg-white">
      <div className="px-4 py-6">
        <ul className="mt-6 space-y-1">
          {menuList.map((item) => (
            <li key={item.id}>
              <Link
                key={item.id}
                href={item.path}
                className={`flex items-center space-x-3 p-2 rounded-lg hover:bg-lime-500 ${path === item.path ? 'bg-lime-500' : 'hover:bg-gray-100'}`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-gray-700">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
        <div className="fixed bottom-20 p-6 w-64">
            <Button className="bg-lime-950 w-full">
                <Plus/>{` Create Form`}
            </Button>
            <div className="my-7">
                <Progress value={33}/>
                <h2 className="text-gray-700"><strong>2 </strong> Out of <strong> 3 </strong>File Created</h2>
            </div>
        </div>
    </div>
  );
}

export default SideNavBar;
