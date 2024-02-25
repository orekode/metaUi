import { useEffect } from "react";
import { usePageDna } from "../../store/pageContents";
import { useHome } from "../../store/pageContents/home";
import { EditPorts } from "../../components/admin";
import { MessageCircle } from "lucide-react";



const Title = ({ isEditable }) => {
    const { page_dna, set_dna } = usePageDna();
    const { home, get_home } = useHome();

    const position = "contact_us_title";
  
    useEffect(() => {
      get_home(position).then(() => {
        if(!page_dna.includes(position)) set_dna(position);
      });
    }, []);

    return (
        <EditPorts.Wrapper elementToShow={<EditPorts.Single item={home[position]} labels={['title']} callback={() => get_home(position)} />} isEditable={isEditable}>
            <div className="font-bold text-3xl">{home[position].title}</div>
        </EditPorts.Wrapper>
    )
}

const Location = ({ isEditable }) => {
    const { page_dna, set_dna } = usePageDna();
    const { home, get_home } = useHome();

    const position = "contact_us_location";
  
    useEffect(() => {
      get_home(position).then(() => {
        if(!page_dna.includes(position)) set_dna(position);
      });
    }, []);

    return (
        <EditPorts.Wrapper elementToShow={<EditPorts.Double item={home[position]} labels={['title', 'content']} callback={() => get_home(position)} />} isEditable={isEditable}>
            <div className="font-bold text-xl mt-6">{home[position].title}</div>
            <p className="mb-6">{home[position].content}</p>
        </EditPorts.Wrapper>
    )
}


const Contacts = ({ isEditable }) => {
    const { page_dna, set_dna } = usePageDna();
    const { home, get_home } = useHome();

    const position = "contact_us_contact";
  
    useEffect(() => {
      get_home(position).then(() => {
        if(!page_dna.includes(position)) set_dna(position);
      });
    }, []);

    return (
        <EditPorts.Wrapper elementToShow={<EditPorts.CardDoubleNoPic item={home[position]} labels={['title', 'content']} callback={() => get_home(position)} />} isEditable={isEditable}>
            <div className="font-bold text-xl mt-6">{home[position].title}</div>
            <p className="mb-6">{home[position].content}</p>
            <div className="font-bold text-xl mt-6">{home[position].link_label}</div>
            <p className="mb-6">{home[position].link}</p>
        </EditPorts.Wrapper>
    )
}



const Contact = ({ isEditable }) => {
    const { page_dna, set_dna } = usePageDna();
    const { home, get_home } = useHome();

    const position = "contact_us_form";
  
    useEffect(() => {
      get_home(position).then(() => {
        if(!page_dna.includes(position)) set_dna(position);
      });
    }, []);

    return (
        <div>
            <div className="bg-black p-10"></div>
            <div className="relative ">
                
                <div className="grid-450 fit relative z-10 bg-white bg-opacity-80 min-h-screen spacing spacing-y">
                    <div className="left text-center flex items-center justify-center">
                        <div className="">
                            <Title      isEditable={isEditable} />
                            <Location   isEditable={isEditable} />
                            <Contacts   isEditable={isEditable} />
                        </div>
                    </div>
                    <div className="right p-12 flex items-center justify-center">
                        <div className="bg-white w-[600px] p-6 border shadow rounded-md">
                            <div className="text-center text-xl font-bold mb-3">{home[position].title}</div>
                            <div className="input flex flex-col gap-1 mt-3">
                                <label htmlFor="email">{home[position].content}</label>
                                <input type="email" name="email" id="email" className="border shadow p-3 rounded-md" />
                            </div>
                            <div className="input flex flex-col gap-1 mt-3">
                                <label htmlFor="email">{home[position].link_label}</label>
                                <textarea type="email" name="email" id="email" className="border shadow p-3 rounded-md resize-none h-[200px]" />
                            </div>
                            <EditPorts.Wrapper elementToShow={<EditPorts.CardDoubleNoPic item={home[position]} callback={() => get_home(position)} />} isEditable={isEditable}>
                                <button className={`donate-btn h-[50px] active:scale-90 bg-purple-600 hover:bg-red-500 bg-opacity-90 text-white p-3 ${ isEditable ? 'rounded-md' : 'rounded-tl-md rounded-bl-md'} flex items-center gap-1.5 group w-full justify-center mt-4`}>
                                    <MessageCircle fill="white" size={15}/>
                                    <span>{home[position].link}</span>
                                </button>
                            </EditPorts.Wrapper>
                        </div>
                    </div>
                </div>

                <div className="absolute top-0 left-0 h-full w-full z-0">
                    <img src="/images/map_outline.jpg" alt="" className="object-cover h-full w-full" />
                    <div className="absolute top-0 left-0 h-full w-full z-10"></div>
                </div>
            </div>
        </div>
    )
}

export default Contact