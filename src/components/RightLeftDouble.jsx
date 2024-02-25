

import { useEffect } from 'react';
import { usePageDna } from '../store/pageContents';
import { useHome } from '../store/pageContents/home';
import { EditPorts } from './admin';
import { Phone } from 'lucide-react';

const RightLeftDouble = ({ position, isEditable=false, btnIcon=<Phone fill="white" size={15}/>, type="image" }) => {

    const { page_dna, set_dna } = usePageDna();
    const { home, get_home } = useHome();
  
    useEffect(() => {
      get_home(position).then(() => {
        if(!page_dna.includes(position)) set_dna(position);
      });
    }, []);

    return (
        <div className="left-right spacing grid-500 gap-12 items-center spacing-y">
            <div className="right">
                <EditPorts.Wrapper elementToShow={<EditPorts.CardDouble item={home[position]} callback={() => get_home(position)} type={type} />} isEditable={isEditable}>
                    <h2 className='font-black text-4xl'>{home[position].title}</h2>
                </EditPorts.Wrapper>
                <p className='leading-loose font-light my-4'>
                    {home[position].content}
                </p>

                <h2 className='font-black text-3xl'>{home[position].link_label}</h2>
                <p className='leading-loose font-light my-4'>
                    {home[position].link}
                </p>
            </div>
            <div className="left overflow-hidden rounded-md max-[1240px]:row-start-1">
                {type=="image" ? 
                    <img src={home[position].url} className="object-cover h-full w-full" /> :
                    <video src={home[position].url} controls={false} autoPlay className='mx-auto' muted />
                }
            </div>
        </div>
    );
};

export default RightLeftDouble;