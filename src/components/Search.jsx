import { memo } from "react";
import search from "./../assets/images/search.png";

function Search({ onchange, value }) {
  // console.log('search rendered!')
  return (
    <div className="flex items-center bg-[#E1F2F8] rounded-lg px-2 py-1 fixed top-[18px] left-[57px] md:top-[1.125rem] lg:left-[18.25rem] z-10 ">
      <img
        src={search}
        className="w-5 h-5 text-gray-500 mr-2"
        alt="search"
      />
      <input
        type="text"
        placeholder="Search here....."
        className="hidden sm:block outline-none text-sm bg-[#E1F2F8] w-full text-gray-700 "
        value={value}
        onChange={(e) => { onchange(e.target.value.toLowerCase()) }}
      />
    </div>
  );
};

export default memo(Search);