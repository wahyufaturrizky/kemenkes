'use client'

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { sidebarNavigation } from "@/utils/navigation";
import { MdAlignHorizontalRight, MdAlignHorizontalLeft } from "react-icons/md";

const Sidebar: React.FC = () => {
  const { push } = useRouter()
  const pathname = usePathname()
  const [isSidebarActive, setSidebarActive] = useState(false)

  return (
    <div>
      <div className={`flex text-white whitespace-pre ${isSidebarActive ?
        "flex-col gap-4 p-4 text-sm h-fit"
        :
        "justify-center items-center h-12 w-12 py-2 px-4"
        } mt-7 rounded-xl`}
        style={{ background: '#006A65' }}
      >
        {isSidebarActive ? (
          <>
            <div className="flex items-center gap-2 text-2xl">
              <div className="px-2">
                Daftar Dashbord
              </div>
              <MdAlignHorizontalLeft color="#FFFFFF" className="text-xl cursor-pointer" onClick={() => setSidebarActive(!isSidebarActive)} />
            </div>
            {sidebarNavigation.slice(0, 5).map((r) => (
              <div key={r.title} className={`flex flex-col gap-4 py-4 px-2 rounded-lg cursor-pointer hover:bg-primary-3
                ${pathname.includes(r.path) ? "bg-primary-3" : ""}`}
                onClick={() => push(r.path)}>
                <div>{r.title}</div>
              </div>
            ))}
            <hr />
            {sidebarNavigation.slice(5, 7).map((r) => (
              <div key={r.title} className={`flex flex-col gap-4 py-4 px-2 rounded-lg cursor-pointer hover:bg-primary-3
              ${pathname.includes(r.path) ? "bg-primary-3" : ""}`}
                onClick={() => push(r.path)}>
                <div>{r.title}</div>
              </div>
            ))}
          </>
        )
          :
          <MdAlignHorizontalRight color="#FFFFFF" className="text-xl" onClick={() => setSidebarActive(!isSidebarActive)} />
        }
      </div>
    </div>
  )
}

export default Sidebar