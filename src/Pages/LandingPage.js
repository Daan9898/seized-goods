import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, setError } from "../store/authSlice";
import ContactUsForm from "../Components/ContactUsForm";

const LandingPage = () => {
  const user = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        dispatch(setError(error));
      });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Sticky Navbar */}
      <header className="bg-white shadow fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo Section */}
          <div>
            <Link to="/" className="h-10 w-10 self-center mr-2">
              <span className="text-2xl no-underline text-gray-800 hover:text-green-600 font-sans font-bold">
                Renieuw
              </span>
              <br />
              <span className="text-xs text-gray-500">
                Beautiful New Tagline
              </span>
            </Link>
          </div>

          {/* Navigation Links Section */}
          <nav className="hidden md:flex space-x-8">
            <a
              href="#welcome"
              className="text-md text-gray-800 hover:text-green-500 transition-all duration-300"
            >
              Welcome
            </a>
            <a
              href="#how-it-works"
              className="text-md text-gray-800 hover:text-green-500 transition-all duration-300"
            >
              How It Works
            </a>
            <a
              href="#features"
              className="text-md text-gray-800 hover:text-green-500 transition-all duration-300"
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="text-md text-gray-800 hover:text-green-500 transition-all duration-300"
            >
              Testimonials
            </a>
            <a
              href="#contact"
              className="text-md text-gray-800 hover:text-green-500 transition-all duration-300"
            >
              Contact Us
            </a>
          </nav>

          {/* Login / Sign Up Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/browse-items"
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-semibold"
                >
                  App
                </Link>
                <Link
                  onClick={handleLogout}
                  className="bg-slate-700 text-gray-400 px-4 py-2 rounded-md m-4"
                >
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/Login"
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-semibold"
                >
                  Login
                </Link>
                <Link
                  to="/Register"
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-green-500 rounded-lg text-sm font-semibold"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Welcome Banner */}
        <section id="welcome" className="py-32 bg-white">
          <div className="px-12 mx-auto max-w-7xl">
            <div className="w-full mt-20 mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
              <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-normal text-gray-900 md:text-6xl md:tracking-tight">
                <span>Start</span>{" "}
                <span className="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-green-400 to-purple-500 lg:inline">
                  making a difference
                </span>{" "}
                <span>with your donations</span>
              </h1>
              <p className="px-0 mb-8 text-lg text-gray-600 md:text-xl lg:px-24">
                Empower social organizations by reallocating goods to where
                they're needed most. Together, we can create meaningful change.
              </p>
              <div className="mb-4 space-x-0 md:space-x-2 md:mb-8">
                <a
                  href="/login"
                  className="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg text-white bg-green-400 rounded-2xl sm:w-auto sm:mb-0"
                >
                  Get Started
                  <svg
                    className="w-4 h-4 ml-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="/learn-more"
                  className="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg bg-gray-100 rounded-2xl sm:w-auto sm:mb-0"
                >
                  Learn More
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="relative">
          <div className="container mx-auto">
            <div className="flex flex-wrap items-center">
              {/* Left Side Card */}
              <div className="w-10/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto -mt-78">
                <div className="relative flex flex-col min-w-0 break-words  w-full mb-6 shadow-lg rounded-lg bg-green-400">
                  <img
                    alt="Giving new life to goods"
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"
                    className="w-full align-middle rounded-t-lg"
                  />
                  <blockquote className="relative p-8 mb-4">
                    <svg
                      preserveAspectRatio="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 583 95"
                      className="absolute left-0 w-full block h-95-px -top-94-px"
                    ></svg>
                    <h4 className="text-xl font-bold text-white">
                      Give Resources a New Life
                    </h4>
                    <p className="text-md font-light mt-2 text-white">
                      We believe in creating a better society by redistributing
                      seized goods to organizations that need them. Join us in
                      making a difference today.
                    </p>
                  </blockquote>
                </div>
              </div>

              {/* Right Side Info Cards */}
              <div className="w-full md:w-6/12 px-4">
                <div className="flex flex-wrap">
                  <div className="w-full md:w-6/12 px-4">
                    <div className="relative flex flex-col mt-4">
                      <div className="px-4 py-5 flex-auto">
                        <img
                          src="/assets/images/searchItemIcon.png"
                          className="w-20"
                          alt=""
                        />
                        <h6 className="text-xl mb-1 font-semibold">
                          Browse Goods
                        </h6>
                        <p className="mb-4 text-blueGray-500">
                          Discover surplus goods under €100 that can be
                          repurposed for social causes.
                        </p>
                      </div>
                    </div>
                    <div className="relative flex flex-col min-w-0">
                      <div className="px-4 py-5 flex-auto">
                        <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                          <i className="fas fa-clipboard-list"></i>
                        </div>
                        <h6 className="text-xl mb-1 font-semibold">
                          Submit Your Request
                        </h6>
                        <p className="mb-4 text-blueGray-500">
                          Share your organization's purpose and how you will use
                          the goods to create a positive social impact.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-6/12 px-4">
                    <div className="relative flex flex-col min-w-0 mt-4">
                      <div className="px-4 py-5 flex-auto">
                        <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                          <i className="fas fa-check-circle"></i>
                        </div>
                        <h6 className="text-xl mb-1 font-semibold">
                          Approval & Collection
                        </h6>
                        <p className="mb-4 text-blueGray-500">
                          Once approved, you can collect the items and give them
                          a new purpose, making a lasting impact.
                        </p>
                      </div>
                    </div>
                    <div className="relative flex flex-col min-w-0">
                      <div className="px-4 py-5 flex-auto">
                        <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                          <i className="fas fa-hand-holding-heart"></i>
                        </div>
                        <h6 className="text-xl mb-1 font-semibold">
                          Make an Impact
                        </h6>
                        <p className="mb-4 text-blueGray-500">
                          Join the growing network of organizations creating a
                          better future by giving goods a second life.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16">
          <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
              <div>
                <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-green-900 uppercase rounded-full bg-green-200">
                  Seized Goods
                </p>
              </div>
              <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                <span className="relative inline-block">
                  <svg
                    viewBox="0 0 52 24"
                    fill="currentColor"
                    className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
                  >
                    <defs>
                      <pattern
                        id="pattern-featured-items"
                        x="0"
                        y="0"
                        width=".135"
                        height=".30"
                      >
                        <circle cx="1" cy="1" r=".7" />
                      </pattern>
                    </defs>
                    <rect
                      fill="url(#pattern-featured-items)"
                      width="52"
                      height="24"
                    />
                  </svg>
                  <span className="relative">Transforming</span>
                </span>{" "}
                everyday items into valuable resources
              </h2>
              <p className="text-base text-gray-700 md:text-lg">
                Discover a collection of seized goods available for repurposing
                to support organizations working towards a better society.
              </p>
            </div>
            <div className="grid max-w-screen-lg mx-auto space-y-6 lg:grid-cols-2 lg:space-y-0 lg:divide-x">
              <div className="space-y-6 sm:px-16">
                <div className="flex flex-col max-w-md sm:flex-row">
                  <div className="mb-4 mr-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-50">
                      <svg
                        className="w-8 h-8 text-green-500 sm:w-10 sm:h-10"
                        stroke="currentColor"
                        viewBox="0 0 52 52"
                      >
                        <polygon
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                          points="29 13 14 29 25 29 23 39 38 23 27 23"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h6 className="mb-3 text-xl font-bold leading-5">
                      Household Essentials
                    </h6>
                    <p className="text-sm text-gray-900">
                      High-quality everyday items like furniture, electronics,
                      and kitchenware waiting to find a new purpose.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col max-w-md sm:flex-row">
                  <div className="mb-4 mr-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-50">
                      <svg
                        className="w-8 h-8 text-green-500 sm:w-10 sm:h-10"
                        stroke="currentColor"
                        viewBox="0 0 52 52"
                      >
                        <polygon
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                          points="29 13 14 29 25 29 23 39 38 23 27 23"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h6 className="mb-3 text-xl font-bold leading-5">
                      Office Supplies
                    </h6>
                    <p className="text-sm text-gray-900">
                      Desks, chairs, monitors, and more—all available to support
                      your team’s mission without breaking your budget.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col max-w-md sm:flex-row">
                  <div className="mb-4 mr-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-50">
                      <svg
                        className="w-8 h-8 text-green-500 sm:w-10 sm:h-10"
                        stroke="currentColor"
                        viewBox="0 0 52 52"
                      >
                        <polygon
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                          points="29 13 14 29 25 29 23 39 38 23 27 23"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h6 className="mb-3 text-xl font-bold leading-5">
                      Clothing & Accessories
                    </h6>
                    <p className="text-sm text-gray-900">
                      Seized fashion items in excellent condition—available to
                      help those in need.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-6 sm:px-16">
                <div className="flex flex-col max-w-md sm:flex-row">
                  <div className="mb-4 mr-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-50">
                      <svg
                        className="w-8 h-8 text-green-500 sm:w-10 sm:h-10"
                        stroke="currentColor"
                        viewBox="0 0 52 52"
                      >
                        <polygon
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                          points="29 13 14 29 25 29 23 39 38 23 27 23"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h6 className="mb-3 text-xl font-bold leading-5">
                      Tools & Equipment
                    </h6>
                    <p className="text-sm text-gray-900">
                      Equip your organization with tools to support renovations,
                      events, or workshops.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col max-w-md sm:flex-row">
                  <div className="mb-4 mr-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-50">
                      <svg
                        className="w-8 h-8 text-green-500 sm:w-10 sm:h-10"
                        stroke="currentColor"
                        viewBox="0 0 52 52"
                      >
                        <polygon
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                          points="29 13 14 29 25 29 23 39 38 23 27 23"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h6 className="mb-3 text-xl font-bold leading-5">
                      Recreational Goods
                    </h6>
                    <p className="text-sm text-gray-900">
                      Sports equipment, games, and more for community centers
                      and youth programs.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col max-w-md sm:flex-row">
                  <div className="mb-4 mr-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-50">
                      <svg
                        className="w-8 h-8 text-green-500 sm:w-10 sm:h-10"
                        stroke="currentColor"
                        viewBox="0 0 52 52"
                      >
                        <polygon
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                          points="29 13 14 29 25 29 23 39 38 23 27 23"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h6 className="mb-3 text-xl font-bold leading-5">
                      Household Decor
                    </h6>
                    <p className="text-sm text-gray-900">
                      Unique decor pieces ready to find a home with an
                      organization that needs them.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tstimonial Section */}
        <section id="testimonials">
          <div className="min-w-screen min-h-screen flex items-center justify-center">
            <div className="w-full bg-white px-5 text-gray-800">
              <div className="w-full max-w-6xl mx-auto">
                <div className="text-center max-w-xl mx-auto">
                  <h1 className="text-6xl md:text-7xl font-bold mb-5 text-gray-600">
                    What people <br />
                    are saying.
                  </h1>
                  <h3 className="text-xl mb-5 font-light">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </h3>
                  <div className="text-center mb-10">
                    <span className="inline-block w-1 h-1 rounded-full bg-green-500 ml-1"></span>
                    <span className="inline-block w-3 h-1 rounded-full bg-green-500 ml-1"></span>
                    <span className="inline-block w-40 h-1 rounded-full bg-green-500"></span>
                    <span className="inline-block w-3 h-1 rounded-full bg-green-500 ml-1"></span>
                    <span className="inline-block w-1 h-1 rounded-full bg-green-500 ml-1"></span>
                  </div>
                </div>
                <div className="-mx-3 md:flex items-start">
                  <div className="px-3 md:w-1/3">
                    <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                      <div className="w-full flex mb-4 items-center">
                        <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                          <img src="https://i.pravatar.cc/100?img=1" alt="" />
                        </div>
                        <div className="flex-grow pl-3">
                          <h6 className="font-bold text-sm uppercase text-gray-600">
                            Kenzie Edgar.
                          </h6>
                        </div>
                      </div>
                      <div className="w-full">
                        <p className="text-sm leading-tight">
                          <span className="text-lg leading-none italic font-bold text-gray-400 mr-1">
                            "
                          </span>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Quos sunt ratione dolor exercitationem minima
                          quas itaque saepe quasi architecto vel! Accusantium,
                          vero sint recusandae cum tempora nemo commodi soluta
                          deleniti.
                          <span className="text-lg leading-none italic font-bold text-gray-400 ml-1">
                            "
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                      <div className="w-full flex mb-4 items-center">
                        <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                          <img src="https://i.pravatar.cc/100?img=2" alt="" />
                        </div>
                        <div className="flex-grow pl-3">
                          <h6 className="font-bold text-sm uppercase text-gray-600">
                            Stevie Tifft.
                          </h6>
                        </div>
                      </div>
                      <div className="w-full">
                        <p className="text-sm leading-tight">
                          <span className="text-lg leading-none italic font-bold text-gray-400 mr-1">
                            "
                          </span>
                          Lorem ipsum, dolor sit amet, consectetur adipisicing
                          elit. Dolore quod necessitatibus, labore sapiente,
                          est, dignissimos ullam error ipsam sint quam tempora
                          vel.
                          <span className="text-lg leading-none italic font-bold text-gray-400 ml-1">
                            "
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="px-3 md:w-1/3">
                    <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                      <div className="w-full flex mb-4 items-center">
                        <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                          <img src="https://i.pravatar.cc/100?img=3" alt="" />
                        </div>
                        <div className="flex-grow pl-3">
                          <h6 className="font-bold text-sm uppercase text-gray-600">
                            Tommie Ewart.
                          </h6>
                        </div>
                      </div>
                      <div className="w-full">
                        <p className="text-sm leading-tight">
                          <span className="text-lg leading-none italic font-bold text-gray-400 mr-1">
                            "
                          </span>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Vitae, obcaecati ullam excepturi dicta error
                          deleniti sequi.
                          <span className="text-lg leading-none italic font-bold text-gray-400 ml-1">
                            "
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                      <div className="w-full flex mb-4 items-center">
                        <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                          <img src="https://i.pravatar.cc/100?img=4" alt="" />
                        </div>
                        <div className="flex-grow pl-3">
                          <h6 className="font-bold text-sm uppercase text-gray-600">
                            Charlie Howse.
                          </h6>
                        </div>
                      </div>
                      <div className="w-full">
                        <p className="text-sm leading-tight">
                          <span className="text-lg leading-none italic font-bold text-gray-400 mr-1">
                            "
                          </span>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Architecto inventore voluptatum nostrum atque,
                          corrupti, vitae esse id accusamus dignissimos neque
                          reprehenderit natus, hic sequi itaque dicta nisi
                          voluptatem! Culpa, iusto.
                          <span className="text-lg leading-none italic font-bold text-gray-400 ml-1">
                            "
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="px-3 md:w-1/3">
                    <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                      <div className="w-full flex mb-4 items-center">
                        <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                          <img src="https://i.pravatar.cc/100?img=5" alt="" />
                        </div>
                        <div className="flex-grow pl-3">
                          <h6 className="font-bold text-sm uppercase text-gray-600">
                            Nevada Herbertson.
                          </h6>
                        </div>
                      </div>
                      <div className="w-full">
                        <p className="text-sm leading-tight">
                          <span className="text-lg leading-none italic font-bold text-gray-400 mr-1">
                            "
                          </span>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Nobis, voluptatem porro obcaecati dicta,
                          quibusdam sunt ipsum, laboriosam nostrum facere
                          exercitationem pariatur deserunt tempora molestiae
                          assumenda nesciunt alias eius? Illo, autem!
                          <span className="text-lg leading-none italic font-bold text-gray-400 ml-1">
                            "
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                      <div className="w-full flex mb-4 items-center">
                        <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                          <img src="https://i.pravatar.cc/100?img=6" alt="" />
                        </div>
                        <div className="flex-grow pl-3">
                          <h6 className="font-bold text-sm uppercase text-gray-600">
                            Kris Stanton.
                          </h6>
                        </div>
                      </div>
                      <div className="w-full">
                        <p className="text-sm leading-tight">
                          <span className="text-lg leading-none italic font-bold text-gray-400 mr-1">
                            "
                          </span>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Voluptatem iusto, explicabo, cupiditate quas
                          totam!
                          <span className="text-lg leading-none italic font-bold text-gray-400 ml-1">
                            "
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <ContactUsForm />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 py-4">
        <div className="container mx-auto px-6 text-center text-white">
          <p>&copy; 2025 Renieuw. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
