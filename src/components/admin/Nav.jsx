import { Edit, Heart, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { EditPorts } from ".";


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
                        <EditPorts.Wrapper  elementToShow={ <EditPorts.Double /> }>
                            <div className="nav-item cursor-pointer text-lg">
                                <span>{item.name}</span>
                            </div>
                        </EditPorts.Wrapper>
                    )}
                </div>
            </div>

            <div className="right flex items-center  max-[430px]:text-sm">
                <EditPorts.Wrapper  elementToShow={ <EditPorts.Single /> }>
                    <button className="donate-btn h-[50px] active:scale-90 bg-purple-600 hover:bg-red-500 bg-opacity-90 text-white p-3 rounded-md flex items-center gap-1.5 group">
                        <Heart fill="white" size={15}/>
                        <span>Make a Donation</span>
                    </button>
                </EditPorts.Wrapper>
            </div>
        </div>

        
    </nav>
  );
};

export default Nav;