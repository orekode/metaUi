import { Card, LeftRight, Nav, RightLeft } from "../../components";
import { Header } from "../../groups";
import { Globe } from "lucide-react";

const Home = ({ isEditable = false }) => {

  return (
    <div>
      <Header isEditable={isEditable}/>
      <LeftRight position={'home_left_right_one'} isEditable={isEditable} />

      <div className="grid-300 gap-6 spacing">
        {/* <Card.Md position={'home_card_one'}   isEditable={isEditable}/>
        <Card.Md position={'home_card_two'}   isEditable={isEditable}/>
        <Card.Md position={'home_card_three'} isEditable={isEditable}/> */}
      </div>

      <div className=" relative">
        <div className="relative z-10 spacing spacing-y bg-black bg-opacity-80 text-white text-center">
          <div className="text-4xl font-light text-center mb-6">How We Help</div>
          <div className="grid-250 fit gap-4">
            <Card.Sm position={'home_card_four'}  isEditable={isEditable}/>
            <Card.Sm position={'home_card_five'}  isEditable={isEditable}/>
            <Card.Sm position={'home_card_six'}   isEditable={isEditable}/>
            <Card.Sm position={'home_card_seven'} isEditable={isEditable}/>
          </div>
        </div>
        <div className="absolute top-0 left-0 h-full w-full z-0">
          <img src="/images/brick.jpg" alt="" className="h-full w-full object-cover" />
        </div>
      </div>

      <RightLeft position={'home_left_right_two'} isEditable={isEditable} type="video" />

    </div>
  );

};

export default Home;