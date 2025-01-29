import React from "react";

const Header = () => {
  return (
    <div className=" w-full">
      <div className="grid xl:grid-cols-1 grid-cols-1">
        <div className="p-5">
          <div className="py-3 px-3 rounded-xl border w-full bg-[#002689]">
            <div className="flex justify-between items-center">
              <div className="flex justify-items-center items-center gap-40">
                <p className=" font-semibold text-white">Dashboard</p>
                <div>
                  <input
                    className="rounded-3xl py-3 px-3 outline-none text-xs w-[350px] pr-10 hidden lg:block md:block"
                    placeholder="Search..............."
                  />
                </div>
              </div>
              <div className="flex justify-items-center items-center gap-2 ">
                <img
                  className="inline-block w-8 h-8 rounded-full ring-2 ring-white"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
