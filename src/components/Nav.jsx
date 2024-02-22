import { Heart, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";


const Nav = () => {

    const nav_links = [
        {
            name: "Home",
            link: '/',
        },

        {
            name: "Who we are",
            link: '/'
        },

        {
            name: "Programs",
            link: '/',
        },

        {
            name: "Contact Us",
            link: '/',
        },

        {
            name: "Gallery",
            link: '/'
        },
    ];

    const hidden_menu_style = {
        top: "-200vh",
        opacity: 0,
    };

    const visible_menu_style = {
        top: 0,
        opacity: 0.85
    };

    const [show_menu, set_show_menu] = useState(false);


  return (
    <nav className="fixed top-0 left-0 z-30 w-full text-white">
        <div className="flex items-center justify-between spacing shadow">
            <div className="left flex items-center gap-12">
                <div className="logo h-[80px] w-[80px]">
                    <img src="/images/logo_rm.png" alt="" className="h-full w-full object-contain" />
                </div>
                <div className="nav-links flex items-center gap-6 max-[1050px]:hidden">
                    {nav_links.map( item => 
                        <div className="nav-item cursor-pointer text-lg">{item.name}</div>
                    )}
                </div>
            </div>

            <div className="right flex items-center active:scale-90 max-[430px]:text-sm">
                <button className="donate-btn h-[50px] bg-purple-600 hover:bg-red-500 bg-opacity-90 text-white p-3 rounded-tl-md rounded-bl-md flex items-center gap-1.5 group">
                    <Heart fill="white" size={15}/>
                    <span>Make a Donation</span>
                </button>
                <button onClick={() => set_show_menu(!show_menu)} className="menu-btn rounded-tr-md rounded-br-md bg-black hover:bg-neutral-900 text-white p-3 h-[50px] w-[50px] flex items-center justify-center">
                    <Menu />
                </button>
            </div>
        </div>

        <AnimatePresence>
            {show_menu && 
                <motion.div initial={hidden_menu_style} animate={visible_menu_style}  className="fixed left-0 w-screen h-screen bg-black text-white flex flex-col items-center justify-center text-center">
                    <div onClick={() => set_show_menu(!show_menu)} className="nav-item cursor-pointer text-3xl my-3 py-1.5">
                        <X />
                    </div>

                    {nav_links.map( item => 
                        <div className="nav-item cursor-pointer text-3xl my-3 py-1.5">{item.name}</div>
                    )}
                </motion.div>
            }
        </AnimatePresence>
    </nav>
  );
};

export default Nav;