import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import { usePageDna } from '../../store/pageContents';
import { useHome } from '../../store/pageContents/home';
import { EditPorts } from '../../components/admin';
import { Link } from 'react-router-dom';
import { getDonations } from '../../apiCalls/donations';



const BtnOne = ({ isEditable }) => {

    const { page_dna, set_dna } = usePageDna();
    const { home, get_home } = useHome();

    const position = "donation_page_btn_one"
    
    useEffect(() => {
      get_home(position).then(() => {
        if(!page_dna.includes(position)) set_dna(position);
      });
    }, []);

    return (
        <EditPorts.Wrapper elementToShow={<EditPorts.Single labels={['link_label']} item={home[position]} callback={() => get_home(position)} />} isEditable={isEditable}>
            <Link to='/donate'>
                <button className="bg-red-500    hover:bg-black active:scale-90 text-white p-3 rounded-xl shadow w-[200px]">{home[position].link_label}</button>
            </Link>
        </EditPorts.Wrapper>
    );
}

const BtnTwo = ({ isEditable }) => {

    const { page_dna, set_dna } = usePageDna();
    const { home, get_home } = useHome();

    const position = "donation_page_btn_two"
    
    useEffect(() => {
      get_home(position).then(() => {
        if(!page_dna.includes(position)) set_dna(position);
      });
    }, []);

    return (
        <EditPorts.Wrapper elementToShow={<EditPorts.Single labels={['link_label']} item={home[position]} callback={() => get_home(position)} />} isEditable={isEditable}>
            <Link to='/anonymous'>
                <button className="bg-purple-500  hover:bg-black active:scale-90 text-white p-3 rounded-xl shadow w-[200px]">{home[position].link_label}</button>
            </Link>
        </EditPorts.Wrapper>
    );
}

const Header = ({ isEditable = false }) => {
    const { page_dna, set_dna } = usePageDna();
    const { home, get_home } = useHome();

    const position = "donation_page_header"
    
    useEffect(() => {
      get_home(position).then(() => {
        if(!page_dna.includes(position)) set_dna(position);
      });
    }, []);

    return (
        <div className="min-h-[75vh] relative flex items-center justify-center mt-12">
            <div className="relative z-10">
                <div className="from-transparent to-white bg-gradient-to-tr p-12 max-[600px]:p-6 text-center max-w-[700px] mx-auto">
                    <EditPorts.Wrapper elementToShow={<EditPorts.CardTwoNoPics item={home[position]} callback={() => get_home(position)} />} isEditable={isEditable}>
                        <h1 className="font-bold text-5xl max-[600px]:text-3xl capitalize leading-tight">{home[position].title}</h1>
                    </EditPorts.Wrapper>
                    <p className='py-3'>{home[position].content}</p>
                    <div className="flex items-center justify-center gap-3 max-[500px]:flex-col">
                        <BtnOne isEditable={isEditable} />
                        <BtnTwo isEditable={isEditable} />
                    </div>
                </div>
            </div>
            <div className="absolute top-0 left-0 h-full w-full">
                <img src="/images/donate.png" alt=""  className="object-cover max-[900px]:object-contain h-full max-[600px]:w-1/2 max-[600px]:h-full max-[600px]:scale-75 left-0 top-0 absolute" />
                <img src="/images/donate2.png" alt="" className="object-cover max-[900px]:object-contain h-full max-[600px]:w-1/2 max-[600px]:h-full max-[600px]:scale-75 right-0 top-0 absolute" />
            </div>
        </div>
    );
}

const Donation = ({ isEditable = false }) => {

    const scroll_box = useRef(null);
    const [count, setCount] = useState(0);
    const [page, set_page] = useState(1);

    const [donations, set_donations] = useState([]);
    
    function scroller() {
        const container = scroll_box.current;
        if(!container) return container;

        setCount(count + 1);

        if(count < donations.length) {
            container.scrollBy(window.innerWidth, 0);
        }
        else {
            container.scrollTo(0, 0);
            setCount(0);
        }
    }

    function scrollMe(direction="right") {
        const container = scroll_box.current;
        if(!container) return container;

        if(direction=="left") {
            container.scrollBy(-window.innerWidth, 0);
        }
        else {
            container.scrollBy(window.innerWidth, 0);
        }
    }

    useEffect(() => {
        const interval = setInterval(scroller, 10000);
        return () => clearInterval(interval);
    }, [count]);

    useEffect(()=> {
        getDonations({ page }).then( response => {
            set_donations(response);
        })
    }, [])

  return (
    <div>
        <div className="bg-black p-10"></div>
        <Header isEditable={isEditable} />


        <section className="relative flex items-center justify-center mt-12">

            <div onClick={() => scrollMe('left')} className="absolute bg-green-500 text-white z-30 left-2 h-[40px] w-[40px] rounded-full flex items-center justify-center ">
                <span className="relative z-10">
                    <ChevronLeft />
                </span>
                <div className="absolute h-[40px] w-[40px] rounded-full flex items-center justify-center bg-black scale-90 z-0"></div> 
            </div>

            <div onClick={() => scrollMe('right')} className="absolute bg-green-500 text-white z-30 right-2 h-[40px] w-[40px] rounded-full flex items-center justify-center ">
                <span className="relative z-10">
                    <ChevronRight />
                </span>
                <div className="absolute h-[40px] w-[40px] rounded-full flex items-center justify-center bg-black scale-90 z-0"></div>
            </div>

            <div ref={scroll_box} className="w-full text-white overflow-hidden z-20 relative scroll-smooth">
                <div className="flex items-center w-max min-h-[75vh]">

                        
                    {donations.map( (item, index) =>
                        <div key={index} className="w-screen py-12">
                            <div className="enclose w-full slide-box flex items-center justify-center relative z-20 gap-6 px-12 max-[900px]:flex-col max-[900px]:text-center">
                                <div className="h-[500px] w-[500px] max-[1200px]:w-[300px] max-[1200px]:h-[300px] relative rounded-full overflow-hidden z-20 bg-white">
                                    <img src={item.image ?? "/images/thankyou.webp"} alt="" className="object-contain h-full w-full" />
                                </div>
                    
                                <div className="content max-w-[600px] relative z-20 ">
                                    <h1 className='text-6xl max-[1200px]:text-4xl font-bold'>Thank You <span className='text-green-500'>{item.first_name} {item.last_name}</span>
                                    </h1>

                                    <b className="bold text-5xl text-green-500 mt-9 block">₦<span>{item.amount}</span></b>
                                </div>
                            </div>
                        </div>
                    )}
        
                        
                </div>
            </div>

            <div className="absolute top-0 left-0 h-full w-full z-10">
                <img src="/images/fireworks.jpg" alt="" className="object-cover h-full w-full" />
                <div className="absolute top-0 left-0 h-full w-full bg-black bg-opacity-70"></div>
            </div>

        </section>
    </div>
  )
}

export default Donation