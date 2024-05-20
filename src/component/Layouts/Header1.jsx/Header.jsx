import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../actions/userAction";
import "./Header.css"
import { toast } from "react-toastify";
// import { useSelector } from "react-redux";
import { useSelector } from "react-redux";
// function Header2() {
//   const navigate = useNavigate();
//   const { isAuthenticated, user } = useSelector((state) => state.userData);

//   const [searchBarActive, setSearchBarActive] = useState(false);

//   // const [country, setCountry] = useState("in"); // this is for flag
//   const [sideMenu, setSideMenu] = useState(false);
//   const [searchValue, setSearchValue] = useState("");

//   // this is for handle sideBar
//   const handleSideBarMenu = () => {
//     setSideMenu(!sideMenu);
//   };



//   // this is for Search Button toggle
//   const handleSearchButtonClick = () => {
//     setSearchBarActive(!searchBarActive);
//   };

//   // this is for input value of Search bar.
//   const handleSearchInputChange = (event) => {
//     setSearchValue(event.target.value);
//   };

//   // this is for handle searching ...
//   const handleSearchFormSubmit = (event) => {
//     event.preventDefault();
//     if (searchValue.trim()) {
//       navigate(`/products/${searchValue}`);
//     } else {
//       navigate("/products");
//     }
//   };

//   // this is for sideBar Toggle Button
//   const handleCrossButtonClick = () => {
//     setSearchValue("");
//     setSearchBarActive(!searchBarActive);
//   };

//   return (
//     <>
//       <div classNameName="header">
//         <div classNameName="red">
//           Free delivery on orders above 499
//         </div>

//         <div classNameName="kriptees-main">
//           Kriptees
//           {/* <img
//                 src={require("../../../Image/logo.png")}
//                 alt="logo"
//                 classNameName="headerBottom__logo_main"
//               /> */}
//         </div>

//         <div classNameName="headerBottom">

//           <div classNameName="headerBottom__logo">
//             <div classNameName="header_mobile_menu">
//               <span>
//                 <ReorderIcon
//                   onClick={() => setSideMenu(!sideMenu)}
//                   sx={{
//                     fontSize: 29,
//                     color: "black",
//                     "&:hover": {
//                       color: "#e7070f",
//                       cursor: "pointer",
//                     },
//                   }}
//                 />
//                 {sideMenu && (
//                   <Sidebar
//                     handleSideBarMenu={handleSideBarMenu}
//                     isAuthenticated={isAuthenticated}
//                     user={user}
//                   />
//                 )}
//               </span>

//               <div classNameName="kriptees-mobile">
//                 Kriptees
//                 {/* <img
//                 src={require("../../../Image/logo.png")}
//                 alt="logo"
//                 classNameName="headerBottom__logo_main"
//               /> */}
//               </div>
//               {/* <span>
//                 <SearchBar
//                   searchBarActive={searchBarActive}
//                   searchValue={searchValue}
//                   handleCrossButtonClick={handleCrossButtonClick}
//                   handleSearchButtonClick={handleSearchButtonClick}
//                   handleSearchInputChange={handleSearchInputChange}
//                   handleSearchFormSubmit={handleSearchFormSubmit}
//                 />
//               </span> */}
//             </div>
//           </div>

//           {/* navmenu */}

//           {!searchBarActive && (
//             <div classNameName="headerBottom_navMenu">
//               <ul>
//                 <li>
//                   <Link to="/">Home</Link>
//                 </li>

//                 <li>
//                   <Link to="/products">Product</Link>
//                 </li>
//                 <li>
//                   <Link to="/contact">Contact</Link>
//                 </li>
//                 <li>
//                   <Link to="/about_us">About</Link>
//                 </li>
//               </ul>
//             </div>
//           )}

//           {/* icons */}

//           <div classNameName="headerBotttom_icons">
//             <div classNameName="search_Bar">
//               <SearchBar
//                 searchBarActive={searchBarActive}
//                 searchValue={searchValue}
//                 handleCrossButtonClick={handleCrossButtonClick}
//                 handleSearchButtonClick={handleSearchButtonClick}
//                 handleSearchInputChange={handleSearchInputChange}
//                 handleSearchFormSubmit={handleSearchFormSubmit}
//               />
//             </div>
//             <div>
//               <Link
//                 to="/cart"
//                 style={{ color: "none", textDecoration: "none" }}
//               >
//                 <IoBagOutline />

//               </Link>
//             </div>
//             <div>
//               <ProfileModal user={user} isAuthenticated={isAuthenticated} />
//             </div>

//             <div classNameName="headerLogin">
//               {isAuthenticated ? (
//                 <Link
//                   to="/account"
//                 // style={{ color: "inherit", textDecoration: "none" }}
//                 >
//                   <button>My Account</button>
//                 </Link>
//               ) : (
//                 <div>
//                   < Link to="/login">
//                     <button>
//                       Login
//                     </button>
//                   </Link>

//                   <Link
//                     to="/signup"
//                   // style={{ color: "inherit", textDecoration: "none" }}
//                   >
//                     <button>Sign Up</button>
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </div>


//         </div>
//       </div >
//     </>
//   );
// }


function Header() {

  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.userData);
  const [searchBarActive, setSearchBarActive] = useState(false);
  const [sideMenu, setSideMenu] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [info, setInfo] = useState(false)
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const cartItemCount = cartItems.length;

  const handleOpen = (event) => {
    event.stopPropagation();
    setIsOpen((prevState) => !prevState);
  };




  const onClose = () => {
    setInfo(false);
  };

  function dashboardHandler() {
    setInfo(false);
    navigate("/admin/dashboard");
  }

  function accountHandler() {
    setInfo(false);
    navigate("/account");
  }

  function ordersHandler() {
    setInfo(false);
    navigate("/orders");
  }

  function logoutUserHandler() {
    setInfo(false);
    dispatch(logout());
    toast.success("Logout Successfully");
  }

  function cartHandler() {
    setInfo(false);
    navigate("/cart");
  }

  function loginHandler() {
    setInfo(false);
    navigate("/login");
  }

  const handleSearchButtonClick = () => {
    setSearchBarActive(!searchBarActive);
  };

  // this is for input value of Search bar.
  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  // this is for handle searching ...
  const handleSearchFormSubmit = (event) => {
    event.preventDefault();
    if (searchValue.trim()) {
      navigate(`/products/${searchValue}`);
    } else {
      navigate("/products");
    }
  };

  // this is for sideBar Toggle Button
  const handleCrossButtonClick = () => {
    setSearchValue("");
    setSearchBarActive(!searchBarActive);
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 z-40 fixed w-full top-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

        <Link to={'/'}>
          <span className="kriptees-main">Kriptees</span>
        </Link>

        <div className="flex items-center md:order-2 space-x-3  rtl:space-x-reverse">

          <form className=" lg:max-w-md mx-auto">
            <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
              <button type="submit" className="lg:absolute inset-y-0 start-0 flex items-center ps-3 ">
                <svg className="lg:w-4 lg:h-4 w-5 h-5 text-gray-700 lg:text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </button>
              <input type="search" id="default-search" className=" hidden lg:block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
            </div>
          </form>

          <div onClick={() => { navigate("/cart") }} class="flex hover:cursor-pointer justify-center items-center">
            <div class="relative">
              <div class=" -top-4 absolute left-3">

                <p class="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">{cartItemCount}</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="file:  h-6 w-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
            </div>
          </div>

          <div className=" hidden lg:flex">
            {isAuthenticated ? (
              <button onClick={() => {
                setInfo(!info)
              }} type="button" className="flex text-smrounded-full justify-center items-center md:me-0 " id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                <span className="sr-only">Open user menu</span>
                <img className="w-8 h-8 rounded-full" src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=" alt="user photo" />
                <div className=" max-w-sm">{user.name}</div>
              </button>
            ) : (
              <div className=" flex">
                < Link to="/login">
                  <div className=" m-3">
                    Login
                  </div>
                </Link>

                <Link
                  to="/signup"
                >
                  <div className=" m-3">
                    Sign Up
                  </div>
                </Link>

              </div>

            )}
          </div>





          {info && (
            <div className="z-50 fixed top-12 right-3  my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">


              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">{user.name}
                  {user && user.role === "admin" && (<div className=" my-1 text-red-500"> Admin</div>)}
                </span>
                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{user.email}</span>
              </div>

              <ul className="py-2" aria-labelledby="user-menu-button">

                {user && user.role === "admin" && (
                  <li>
                    <div onClick={dashboardHandler} className="block px-4 py-2 text-sm text-gray-700 bg-green-400 hover:bg-green-500 dark:hover:bg-gray-600 hover:cursor-pointer dark:text-gray-200 dark:hover:text-white">Dashboard</div>
                  </li>
                )}

                <li>
                  <div onClick={accountHandler} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 hover:cursor-pointer dark:text-gray-200 dark:hover:text-white">Profile</div>
                </li>
                <li>
                  <div onClick={ordersHandler} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 hover:cursor-pointer dark:hover:text-white">Orders</div>
                </li>
                <li>
                  <div onClick={cartHandler} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 hover:cursor-pointer dark:hover:text-white">Cart</div>
                </li>
                <li>
                  <div onClick={logoutUserHandler} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 hover:cursor-pointer dark:hover:text-white">Sign out</div>
                </li>

              </ul>

            </div>
          )}

          <button onClick={() => {
            setSideMenu(!sideMenu);

          }} data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>

        </div>
        <div className="items-center hidden justify-between  w-full md:flex md:w-auto md:order-1" id="navbar-user">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link to={"/"} className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</Link>
            </li>
            <li>
              <Link to={"/products"} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Products</Link>
            </li>
            <li>
              <Link to={"/TermsandConditions"} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Terms </Link>
            </li>
            <li>
              <Link to={"/ContactUs"} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</Link>
            </li>
          </ul>
        </div>

        {sideMenu && (

          <div className="items-center justify-between lg:hidden  w-full md:flex md:w-auto md:order-1" id="navbar-user">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">

              <li className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" >
                {isAuthenticated ? (
                  <button onClick={() => {
                    setInfo(!info)
                  }}

                    type="button" className="flex justify-center items-center text-sm  rounded-full md:me-0" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                    <span className="sr-only">Open user menu</span>
                    <img className="w-8 h-8 rounded-full" src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=" alt="user photo" />
                    <div className=" max-w-sm">{user.name}</div>

                  </button>
                ) : (
                  <div className=" flex">
                    < Link to="/login">
                      <div className=" m-3">
                        Login
                      </div>
                    </Link>

                    <Link
                      to="/signup"
                    >
                      <div className=" m-3">
                        Sign Up
                      </div>
                    </Link>

                  </div>

                )}

              </li>
              <li>
                <Link to={"/"} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Home</Link>

              </li>
              <li>
                <Link to={"/products"} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Products</Link>
              </li>
              <li>
                <Link to={"/TermsandConditions"} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Terms and Conditions</Link>
              </li>
              <li>
                <Link to={"/ContactUs"} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</Link>
              </li>

            </ul>
          </div>
        )}

      </div>
    </nav>
  )
}



export default Header;
