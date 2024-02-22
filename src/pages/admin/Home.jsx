import { Calendar } from "lucide-react";
import { Nav } from "../../components/admin";
import { EditPorts } from "../../components/admin";

const Home = () => {
  return (
    <div>
      <Nav />
      <header className="h-screen background-fixed spacing text-white flex flex-col justify-center" style={{'--url': 'url("/images/header.jpeg")'}}>

        <div className="max-w-[650px]">

          <EditPorts.Wrapper elementToShow={<EditPorts.Single />}>
            <h1 className="text-5xl max-[450px]:text-4xl  font-black">
              Educating and Empowering the Nigerian Youth
            </h1>
          </EditPorts.Wrapper>
         
          
          <EditPorts.Wrapper elementToShow={<EditPorts.SingleTextArea />}>
            <p className="my-3">
              To care for our kids and young ones, indeed the future of the Nigerian youth through education and empowerment programs and outreach
            </p>
          </EditPorts.Wrapper>

          <div className="w-max">
            <EditPorts.Wrapper elementToShow={<EditPorts.Double />}>
              <button className="donate-btn h-[50px] bg-purple-600 hover:bg-red-500 bg-opacity-90 text-white p-3 rounded-md flex items-center gap-1.5 group">
                  <Calendar fill="white" size={15}/>
                  <span>Ongoing Programmes</span>
              </button>
            </EditPorts.Wrapper>
          </div>
        </div>
      </header>
    </div>
  )
};

export default Home;