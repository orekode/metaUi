import { useEffect, useState } from "react"
import { Outlet, useLocation } from "react-router-dom"



const Root = () => {

  const location = useLocation();

  const [loading, set_loading] = useState(true);

  useEffect(() => {
    set_loading(true);
    const loading_interval = setInterval(() => set_loading(false), 4000);
    return () => clearInterval(loading_interval)
  }, [location]);

  return (
    <div>
      <Outlet />

      {loading && 
        <div className="fixed top-0 left-0 h-screen w-screen flex flex-col items-center justify-center bg-white z-50">
          <div className="h-[200px] w-[200px] overflow-hidden">
            <img src="/logo.png" alt="" className="object-contain h-full w-full" />
          </div>
          <div className="h-[100px] relative -top-5">
            <img src="/images/loading2.gif" alt="" className="object-contain h-full" />
          </div>
        </div>
      }
    </div>
  )
}

export default Root