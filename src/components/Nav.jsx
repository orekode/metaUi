import { Edit, Heart, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { EditPorts } from "./admin";
import { getNavs } from "../apiCalls/pageContents/nav";
import { usePageDna } from "../store/pageContents";
import { useNav } from "../store/pageContents/nav";
import { Link } from "react-router-dom";
import { useDonationBtn } from "../store/pageContents/donation";


const Nav = ({ isEditable = false }) => {


    // fetch from database and store in localstorage
    // each fetch check if all keys for all page contests exists in zustand store
    // if exists remove page loader
    // if it does not keep page loader on
    const { page_dna, set_dna } = usePageDna();
    const { nav_links, get_nav_links } = useNav();
    const { donation_btn, get_donation_btn } = useDonationBtn();

    const [ position, setPosition ] = useState(0);

    const handleScroll = () => {
        const position = window.scrollY;
        setPosition(position);
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => { window.removeEventListener('scroll', handleScroll) };
    }, []);

    useEffect(() => {
        get_nav_links().then(() => {
            if(!page_dna.includes("navigation")) set_dna("navigation")
        });

        get_donation_btn().then(() => {
            if(!page_dna.includes("donation_btn")) set_dna("donation_btn")
        });
    }, []);


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
    <nav className={`fixed top-0 left-0 z-30 w-full ${position > 50 ? 'bg-white text-black scale-90 rounded-md' : 'bg-transparent text-white'}`}>
        <div className="flex items-center justify-between spacing shadow">
            <div className="left flex items-center gap-12">
                <div className="logo h-[80px] w-[80px]">
                    <img src="/images/logo_rm.png" alt="" className="h-full w-full object-contain" />
                </div>
                <div className="nav-links flex items-center gap-6 max-[1050px]:hidden">
                    {nav_links.map( item => 
                        <EditPorts.Wrapper key={item.link_label}  elementToShow={ <EditPorts.Double labels={['link_label', 'link']} item={item} callback={get_nav_links} /> } isEditable={isEditable}>
                            <Link to={isEditable && !item.link.includes('http') ? '/admin' + item.link : item.link}>
                                <div className="nav-item cursor-pointer text-lg">
                                    <span>{item.link_label}</span>
                                </div>
                            </Link>
                        </EditPorts.Wrapper>
                    )}
                </div>
            </div>

            <div className="right flex items-center  max-[430px]:text-sm">
                <EditPorts.Wrapper  elementToShow={ <EditPorts.Single labels={['link_label']} item={donation_btn} callback={get_donation_btn} /> } isEditable={isEditable}>
                    <Link to={isEditable ? '/admin' + '/donation' : '/donation'}>
                        <button className={`donate-btn h-[50px] active:scale-90 bg-purple-600 hover:bg-red-500 bg-opacity-90 text-white p-3 ${ isEditable ? 'rounded-md' : 'rounded-tl-md rounded-bl-md'} flex items-center gap-1.5 group`}>
                            <Heart fill="white" size={15}/>
                            <span>{donation_btn.link_label}</span>
                        </button>
                    </Link>
                </EditPorts.Wrapper>
                {!isEditable &&
                    <button onClick={() => set_show_menu(!show_menu)} className="menu-btn rounded-tr-md rounded-br-md bg-black hover:bg-neutral-900 text-white p-3 h-[50px] w-[50px] flex items-center justify-center">
                        <Menu />
                    </button>
                }
            </div>
        </div>


        <AnimatePresence>
            {(show_menu && !isEditable) && 
                <motion.div initial={hidden_menu_style} animate={visible_menu_style}  className="fixed left-0 w-screen h-screen bg-black text-white flex flex-col items-center justify-center text-center">
                    <div onClick={() => set_show_menu(!show_menu)} className="nav-item cursor-pointer text-3xl my-3 py-1.5">
                        <X />
                    </div>

                    {nav_links.map( item => 
                        <Link key={item.link_label} to={item.link}>
                            <div className="nav-item cursor-pointer text-3xl my-3 py-1.5">{item.link_label}</div>
                        </Link>
                    )}
                </motion.div>
            }
        </AnimatePresence>



        
    </nav>
  );
};

export default Nav;