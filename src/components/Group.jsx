import { useEffect } from "react";
import { Card } from "."
import { usePageDna } from "../store/pageContents";
import { useGroup } from "../store/pageContents/groups";
import { EditPorts } from "./admin";
import '@appnest/masonry-layout'



export const Sm = ({ position = '', isEditable=false }) => {

    const { page_dna, set_dna } = usePageDna();
    const { group, get_group } = useGroup();
  
    useEffect(() => {
      get_group(position).then(() => {
        if(!page_dna.includes(position)) set_dna(position);
      });
    }, []);

  return (
    <div className="my-3">
        <div className="flex items-center justify-between">
          <div className=""></div>
          <div className="">
            <EditPorts.Wrapper 
              elementToShow={<EditPorts.CardTwo 
              item={{position}} 
              callback={() => get_group(position)} />} 
              isEditable={isEditable}
              trigger={<button className="bg-green-500 text-white px-3 text-center py-2 rounded-xl shadow hover:bg-green-600 active:scale-90">Add New</button>}
            >
              
            </EditPorts.Wrapper>
          </div>
        </div>
        <div className="grid-250 gap-3">
            {group.map(item => 
              <Card.Xs key={item.id} item={item} isEditable={isEditable} callback={() => get_group(position)}/>
            )}
        </div>
    </div>
  )
}


export const Lg = ({ position = '', isEditable=false }) => {

  const { page_dna, set_dna } = usePageDna();
  const { group, get_group } = useGroup();

  useEffect(() => {
    get_group(position).then(() => {
      if(!page_dna.includes(position)) set_dna(position);
    });
  }, []);

return (
  <div className="my-3">
      <div className="flex items-center justify-between">
        <div className=""></div>
        <div className="">
          <EditPorts.Wrapper 
            elementToShow={<EditPorts.Card
            item={{position}} 
            callback={() => get_group(position)} />} 
            isEditable={isEditable}
            trigger={<button className="bg-green-500 text-white px-3 text-center py-2 rounded-xl shadow hover:bg-green-600 active:scale-90">Add New</button>}
          >
            
          </EditPorts.Wrapper>
        </div>
      </div>
      <div className="grid-450 gap-3 mt-6">
          {group.map(item => 
            <Card.Lg key={item.id} item={item} isEditable={isEditable} callback={() => get_group(position)}/>
          )}
      </div>
  </div>
)
}

export const Mason = ({ position = '', isEditable=false }) => {

  const { page_dna, set_dna } = usePageDna();
  const { group, get_group } = useGroup();

  useEffect(() => {
    get_group(position).then(() => {
      if(!page_dna.includes(position)) set_dna(position);
    });
  }, []);

return (
  <div className="my-3">
      <div className="flex items-center justify-between">
        <div className=""></div>
        <div className="">
          <EditPorts.Wrapper 
            elementToShow={<EditPorts.Image
            item={{position}} 
            callback={() => get_group(position)} />} 
            isEditable={isEditable}
            trigger={<button className="bg-green-500 text-white px-3 text-center py-2 rounded-xl shadow hover:bg-green-600 active:scale-90">Add New</button>}
          >
            
          </EditPorts.Wrapper>
        </div>
      </div>
      <div className="mt-6">
        <masonry-layout maxcolwidth="500">
          {group.map(item => 
            <Card.Image key={item.id} item={item} isEditable={isEditable} callback={() => get_group(position)}/>
          )}
        </masonry-layout>
      </div>
  </div>
)
}