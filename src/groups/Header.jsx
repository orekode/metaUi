

import { EditPorts } from "../components/admin";
import { Calendar } from "lucide-react";
import { useHomeHeader } from "../store/pageContents/headers";
import { usePageDna } from "../store/pageContents";
import { useEffect } from "react";

const Header = ({ isEditable=false }) => {
  const { home_header, get_home_header } = useHomeHeader();

  const { page_dna, set_dna } = usePageDna();

  useEffect(() => {
    get_home_header().then(() => {
      if(!page_dna.includes("home_header")) set_dna("home_header");
    });
  }, []);

  return (
    <div>
        <header className="h-screen background-fixed spacing text-white flex flex-col justify-center" style={{'--url': `url(${home_header.url})`}}>
          <div className="max-w-[650px]">

            <EditPorts.Wrapper elementToShow={<EditPorts.Card item={home_header} callback={get_home_header} />} isEditable={isEditable}>
              <h1 className="text-5xl max-[450px]:text-4xl  font-black">
                {home_header.title}
              </h1>
            </EditPorts.Wrapper>
          
            
            <p className="my-3">
              {home_header.content}
            </p>

            <div className="w-max">
                <button className="donate-btn h-[50px] bg-purple-600 hover:bg-red-500 bg-opacity-90 text-white p-3 rounded-md flex items-center gap-1.5 group">
                    <Calendar fill="white" size={15}/>
                    <span>{home_header.link_label}</span>
                </button>
            </div>

          </div>
        </header>
    </div>
  )
}

export default Header