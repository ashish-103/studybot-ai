import React, { useState } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Link, useNavigate } from 'react-router-dom';

export const MobileView = ({ user, openModal, handleLogout }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden flex gap-3">
      <Menu>
        <MenuButton>My account</MenuButton>
        <MenuItems
          anchor="bottom"
          className="bg-white flex pt-[30px] flex-col gap-2"
        >
          <MenuItem>
            <Link
              to="#"
              className="menu-link px-2 hover:text-primary-orange"
            >
              Home
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              to="#"
              className="menu-link px-2 hover:text-primary-orange"
            >
              Features
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              to="#"
              className="menu-link px-2 hover:text-primary-orange"
            >
              Pricing
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              to="#"
              className="menu-link px-2 hover:text-primary-orange"
            >
              Testimonials
            </Link>
          </MenuItem>
          {/* <MenuItem>
                   <Link
                     to="#"
                     className="menu-link px-2 hover:text-primary-orange"
                   >
                     Blogs
                   </Link>
                 </MenuItem> */}
          <MenuItem>
            <Link
              to="#"
              className="menu-link px-2 hover:text-primary-orange"
            >
              Contact Us
            </Link>
          </MenuItem>
        </MenuItems>
      </Menu>

      <div className="relative">
        {user ? (
          <>
            <span
              className="menu-link text-sm cursor-pointer font-semibold hover:text-primary-orange"
              onClick={() => setOpen(!open)}
            >
              {user.name ? user.name : "user"}
            </span>
            {open && (
              <div className="absolute -right-[5px] mt-[17px] border bg-white text-black">
                <div
                  className="px-3 py-1 cursor-pointer hover:bg-primary-blue hover:text-primary-orange"
                  onClick={() => {
                    navigate("/dashboard/tests");
                  }}
                >
                  Dashboard
                </div>
                <div
                  className="px-3 py-1 cursor-pointer hover:bg-primary-blue hover:text-primary-orange"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            )}
            <Menu>
              <MenuButton></MenuButton>
              <MenuItems
                anchor="bottom"
                className="bg-white flex flex-col gap-2 pt-[30px] pb-[5px] px-[5px]"
              >
                <MenuItem>
                  <div
                    className="px-2 cursor-pointer"
                    onClick={() => {
                      navigate("/dashboard/tests");
                    }}
                  >
                    Dashboard
                  </div>
                </MenuItem>
                <MenuItem>
                  <div
                    className="px-2 cursor-pointer"
                    onClick={() => {
                      localStorage.clear();
                      window.location.reload();
                    }}
                  >
                    Logout
                  </div>
                </MenuItem>
              </MenuItems>
            </Menu>
          </>
        ) : (
          <Link
            to="/"
            className="menu-link text-sm"
            onClick={() => {
              // toggleModal();
              // closeMenu();
              openModal('signup')
            }}
          >
            Login / SignUp
          </Link>
        )}
      </div>
    </div>
  )
}
