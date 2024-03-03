import { Link } from "react-router-dom"
import { usePageDna } from "../store/pageContents";
import { useHome } from "../store/pageContents/home";
import { useEffect, useState } from "react";
import { Globe, PlayCircle } from "lucide-react";
import { EditPorts } from "./admin";
import { getResourceType } from "../utls/files";


export const Md = ({ position='home_card_one', btnIcon=<Globe />, isEditable=false }) => {

    const { page_dna, set_dna } = usePageDna();
    const { home, get_home } = useHome();
  
    useEffect(() => {
      get_home(position).then(() => {
        if(!page_dna.includes(position)) set_dna(position);
      });
    }, []);

    return (
        <div className="bg-gray-100 p-3 shadow-xl rounded-md">
            <div className="image h-[300px] overflow-hidden rounded-md">
                <img src={home[position].url} alt="" className="object-cover h-full w-full" />
            </div>
            <div className="details my-3">
                <EditPorts.Wrapper elementToShow={<EditPorts.Card item={home[position]} callback={() => get_home(position)} />} isEditable={isEditable}>
                    <div className="font-bold text-xl">{home[position].title}</div>
                </EditPorts.Wrapper>

                <p className="text-sm leading-relaxed my-3">{home[position].content}</p>

                <Link to={home[position].link} className="w-full">
                    <button className="donate-btn h-[50px] w-full bg-purple-600 hover:bg-red-500 bg-opacity-90 text-white p-3 rounded-md flex home[position]s-center justify-center homes-center gap-1.5 group">
                        {btnIcon}
                        <span>{home[position].link_label}</span>
                    </button>
                </Link>
            </div>
        </div>
    )
}

export const Sm = ({ position='home_card_one', btnIcon=<Globe />, isEditable=false }) => {

    const { page_dna, set_dna } = usePageDna();
    const { home, get_home } = useHome();
  
    useEffect(() => {
      get_home(position).then(() => {
        if(!page_dna.includes(position)) set_dna(position);
      });
    }, []);

    return (
        <div className=" p-3 shadow-xl rounded-md">
            <div className="image w-[150px] h-[150px] mx-auto overflow-hidden rounded-md">
                <img src={home[position].url} alt="" className="object-cover h-full w-full" />
            </div>
            <div className="details my-3">
                <EditPorts.Wrapper elementToShow={<EditPorts.Card item={home[position]} callback={() => get_home(position)} />} isEditable={isEditable}>
                    <div className="font-bold text-lg">{home[position].title}</div>
                </EditPorts.Wrapper>

                <p className="text-sm leading-relaxed my-3">{home[position].content}</p>

            </div>
        </div>
    )
}

export const Xs = ({ item= {url: '', title: '', content: ''}, isEditable=false, position='', callback=()=>{}}) => {


    return (
        <div className=" p-3 rounded-md text-center">
            <div className="image w-[250px] h-[250px] mx-auto overflow-hidden rounded-md">
                <img src={item.url} alt="" className="object-contain h-full w-full" />
            </div>
            <div className="details my-3">
                <EditPorts.Wrapper elementToShow={<EditPorts.CardTwo showDel item={item} callback={callback} />} isEditable={isEditable}>
                    <div className="font-bold text-lg">{item.title}</div>
                </EditPorts.Wrapper>

                <p className="text-sm leading-relaxed my-1">{item.content}</p>

            </div>
        </div>
    )
}


export const Lg = ({ item= {url: '', title: '', content: '', link_label: '', link: ''}, isEditable=false, position='', callback=()=>{}}) => {


    return (
        <EditPorts.Wrapper elementToShow={<EditPorts.Card showDel item={item} callback={callback} />} isEditable={isEditable}>
            <div className="h-[85vh] rounded-md overflow-hidden relative">
                <div className="image h-full w-full overflow-hidden rounded-md">
                    <img src={item.url} alt="" className="object-cover h-full w-full" />
                </div>
                <div className=" absolute p-6 bottom-0 left-0 w-full details backdrop-blur-md z-20 text-white">
                        <div className="font-bold text-2xl">{item.title}</div>

                    <p className="text-sm leading-relaxed my-1">{item.content}</p>

                    <Link to={item.link}>
                        <button className="border-2 mt-3 shadow border-white bg-black bg-opacity-50 py-3 px-6 rounded-xl">{item.link_label}</button>
                    </Link>
                </div>

                <div className="bg-black bg-opacity-30 top-0 left-0 h-full w-full absolute"></div>
            </div>
        </EditPorts.Wrapper>
    )
}

export const Image = ({ item= {url: '', title: '', content: '', link_label: '', link: ''}, isEditable=false, position='', callback=()=>{}}) => {


    return (
        <EditPorts.Wrapper elementToShow={<EditPorts.Image showDel item={item} callback={callback} />} isEditable={isEditable}>
            <div className="rounded-md overflow-hidden relative">
                <div className="image h-full w-full overflow-hidden rounded-md">
                    <img src={item.url} alt="" className="object-cover h-full w-full" />
                </div>
                <div className=" absolute p-4 bottom-0 left-0 w-full details backdrop-blur-md z-20 text-white">
                    <div className="font-bold text-lg">{item.title}</div>

                    <p className="text-sm leading-relaxed my-1">{item.content}</p>

                    <Link to={item.link}>
                        <button className="border-2 mt-2 shadow border-white bg-black bg-opacity-50 py-2 px-4 rounded-xl text-xs">{item.link_label}</button>
                    </Link>
                </div>

                <div className="bg-black bg-opacity-30 top-0 left-0 h-full w-full absolute"></div>
            </div>
        </EditPorts.Wrapper>
    )
}

export const Image2 = ({ item= {url: '', title: '', content: '', link_label: '', link: ''}, isEditable=false, position='', callback=()=>{}}) => {

    const [show, set_show] = useState(false);

    return (
        <EditPorts.Wrapper elementToShow={<EditPorts.ImageType showDel item={item} callback={callback} />} isEditable={isEditable}>
            <div className="rounded-md overflow-hidden relative">
                <div className="image h-full w-full overflow-hidden rounded-md">
                    {(item.link == 'image' || !item.link) &&
                        <img src={item.url} alt="" className="object-cover h-full w-full" />
                    }
                    {(item.link == 'video') &&
                        <video src={item.url} alt="" className="object-cover h-full w-full" />
                    }
                </div>
                <div className=" absolute p-4 bottom-0 left-0 w-full details backdrop-blur-md z-20 text-white">
                    <div className="font-bold text-lg">{item.title}</div>

                    <p className="text-sm leading-relaxed my-1">{item.content}</p>

                    
                    <button onClick={() => set_show(!show)} className="border-2 mt-2 shadow border-white bg-black bg-opacity-50 py-2 px-4 rounded-xl text-xs">Click To View</button>
                    
                </div>

                <div className="bg-black bg-opacity-30 top-0 left-0 h-full w-full absolute flex items-center justify-center text-white">
                    {item.link == "video" &&
                        <PlayCircle size={60} />
                    }
                </div>
                
                {show &&
                    <div className="fixed top-0 left-0 h-screen w-screen z-[60] flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md">
                        <div className="h-[80vh] w-[80vw] relative z-10">
                            {(item.link == 'image' || !item.link) &&
                                <img src={item.url} alt="" className="object-contain h-full w-full shadow-xl border border-[#444] rounded-xl" />
                            }
                            {(item.link == 'video') &&
                                <video src={item.url} alt="" className="object-contain h-full w-full shadow-xl border border-[#444] rounded-xl" controls autoPlay/>
                            }
                        </div>

                        <div onClick={() => set_show(!show)} className="absolute top-0 left-0 h-full w-full z-0"></div>
                    </div>
                }
            </div>
        </EditPorts.Wrapper>
    )
}