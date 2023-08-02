import React from "react";
import ImagePlaceholder from "./ImagePlaceholder"; // Import the ImagePlaceholder component
import TextPlaceholder from "./TextPlaceholder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const CardPlaceholder = ({ title, hours, featured }) => {
  return (
    <div className="h-fit  w-full bg-white">
  <div className="bg-gray-300  w-full bg-opacity-20 relative overflow-hidden">
    <ImagePlaceholder
        className={`relative bg-[#FEF6EC] text-[#222222] w-full flex items-end p-4 h-[10.3rem] rounded-t-xl`}
      />
    <div className="h-full w-full absolute top-0 left-0 bg-black opacity-40 flex z-0 items-center justify-center pointer-events-none">
      <div
      className={`w-10 h-10 rounded-full  flex items-center  pointer-events-auto justify-center m-0 transition-all duration-500 z-999 transform hover:scale-110 absolute top-4 right-4`}
      style={{background: "#524e4e"}}
      >
      <FontAwesomeIcon icon={faHeart} style={{color: "#FFFFFF",}} />
    </div>
  </div>
</div>
{featured ?
  <div className="flex flex-col gap-5 bg-opacity-0 z-4 py-5 px-4 h-[150px] justify-around">
    <TextPlaceholder className="w-5/12"/>
        <TextPlaceholder className="w-2/12"/>
  </div>  
:
  <div className="flex flex-col gap-5 bg-opacity-0 z-4 py-5 px-4 ">
    <div className="flex justify-between">
    <TextPlaceholder className="w-5/12"/>
    <TextPlaceholder className="w-1/12"/>
    </div>
    <TextPlaceholder className="w-4/12"/>
    <TextPlaceholder className="w-3/12"/>
    <TextPlaceholder className="w-2/12"/>
  </div>
}

</div>
  );
};

export default CardPlaceholder;


