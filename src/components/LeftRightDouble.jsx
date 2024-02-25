

import { useEffect } from 'react';
import { usePageDna } from '../store/pageContents';
import { useHome } from '../store/pageContents/home';
import { EditPorts } from './admin';
import { Phone } from 'lucide-react';

const LeftRightDouble = ({ position, isEditable=false, btnIcon=<Phone fill="white" size={15}/> }) => {

    const { page_dna, set_dna } = usePageDna();
    const { home, get_home } = useHome();
  
    useEffect(() => {
      get_home(position).then(() => {
        if(!page_dna.includes(position)) set_dna(position);
      });
    }, []);

    return (
        <div className="left-right spacing grid-500 gap-12 items-center spacing-y">
            <div className="left overflow-hidden rounded-md">
                <img src={home[position].url} className="object-cover h-full w-full" />
            </div>
            <div className="right">
                <EditPorts.Wrapper elementToShow={<EditPorts.CardDouble item={home[position]} callback={() => get_home(position)} />} isEditable={isEditable}>
                    <h2 className='font-black text-4xl'>{home[position].title}</h2>
                </EditPorts.Wrapper>
                <p className='leading-loose font-light my-4'>
                    {home[position].content}
                </p>

                <h2 className='font-black text-4xl'>{home[position].link_label}</h2>
                <p className='leading-loose font-light my-4'>
                    {home[position].link}
                </p>

                
            </div>
        </div>
    )
}

export default LeftRightDouble