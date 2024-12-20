import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Hero Section */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Renieuw</h1>
          <div className="flex justify-center space-x-4">
            <Link to="/Login" className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg text-white font-semibold">
            Login
            </Link>
            <Link to="/Register" className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-blue-600 font-semibold">
               Register
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Welcome Banner */}
        <section className="bg-cover bg-center h-96" style={{ backgroundImage: 'url(https://via.placeholder.com/1500x600)' }}>
          <div className="bg-black bg-opacity-50 h-full flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-4">Empowering Communities, One Donation at a Time</h2>
              <p className="text-lg text-gray-200">Join us in making a difference by redistributing resources to those in need.</p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-gray-100">
            <div className="container mx-auto text-center px-6">
            <h2 className="text-3xl font-bold mb-8">How It Works</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div className="p-6 bg-white rounded-lg shadow">
                <img
                    src="https://via.placeholder.com/100"
                    alt="Browse Items"
                    className="mx-auto mb-4"
                />
                <h3 className="text-lg font-bold mb-2">Browse Items</h3>
                <p>Discover a wide range of surplus goods available for repurposing.</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow">
                <img
                    src="https://via.placeholder.com/100"
                    alt="Submit a Request"
                    className="mx-auto mb-4"
                />
                <h3 className="text-lg font-bold mb-2">Submit a Request</h3>
                <p>Provide your organization details and intended use for the item.</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow">
                <img
                    src="https://via.placeholder.com/100"
                    alt="Receive Allocation"
                    className="mx-auto mb-4"
                />
                <h3 className="text-lg font-bold mb-2">Receive Allocation</h3>
                <p>Get approved, collect your items, and make a difference.</p>
                </div>
            </div>
            </div>
        </section>

        {/* Featured Items Section */}
        <section className="py-16">
            <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-8">Featured Items</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((item) => (
                <div
                    key={item}
                    className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition"
                >
                    <img
                    src={`https://via.placeholder.com/300?text=Item+${item}`}
                    alt={`Item ${item}`}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-lg font-bold mb-2">Featured Item {item}</h3>
                    <p className="text-gray-600">High-quality surplus ready for repurposing.</p>
                </div>
                ))}
            </div>
            </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-gray-100">
            <div className="container mx-auto text-center px-6">
            <h2 className="text-3xl font-bold mb-8">What Our Users Say</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {["A", "B", "C"].map((testimonial) => (
                <div
                    key={testimonial}
                    className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition"
                >
                    <p className="text-gray-600 italic mb-4">
                    "This platform has been a game-changer for our organization."
                    </p>
                    <h4 className="font-bold">User {testimonial}</h4>
                </div>
                ))}
            </div>
            </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-gray-100">
            <div className="grid sm:grid-cols-2 items-center gap-16 p-8 mx-auto max-w-4xl bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md text-[#333] font-[sans-serif]">
                <div>
                <h1 className="text-3xl font-extrabold">Let's Talk</h1>
                <p className="text-sm text-gray-400 mt-3">
                    Have some big idea or brand to develop and need help? Then reach out we'd love to hear about your project and provide help.
                </p>
                <div className="mt-12">
                    <h2 className="text-lg font-extrabold">Email</h2>
                    <ul className="mt-3">
                    <li className="flex items-center">
                        <div className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20px"
                            height="20px"
                            fill="#007bff"
                            viewBox="0 0 479.058 479.058"
                        >
                            <path
                            d="M434.146 59.882H44.912C20.146 59.882 0 80.028 0 104.794v269.47c0 24.766 20.146 44.912 44.912 44.912h389.234c24.766 0 44.912-20.146 44.912-44.912v-269.47c0-24.766-20.146-44.912-44.912-44.912zm0 29.941c2.034 0 3.969.422 5.738 1.159L239.529 264.631 39.173 90.982a14.902 14.902 0 0 1 5.738-1.159zm0 299.411H44.912c-8.26 0-14.971-6.71-14.971-14.971V122.615l199.778 173.141c2.822 2.441 6.316 3.655 9.81 3.655s6.988-1.213 9.81-3.655l199.778-173.141v251.649c-.001 8.26-6.711 14.97-14.971 14.97z"
                            data-original="#000000"
                            />
                        </svg>
                        </div>
                        <a
                        target="blank"
                        href="mailto:your-email@example.com"
                        className="text-[#007bff] text-sm ml-3"
                        >
                        <small className="block">Mail</small>
                        <strong>your-email@example.com</strong>
                        </a>
                    </li>
                    </ul>
                </div>
                <div className="mt-12">
                    <h2 className="text-lg font-extrabold">Socials</h2>
                    <ul className="flex mt-3 space-x-4">
                    <li className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                        <a href="javascript:void(0)">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20px"
                            height="20px"
                            fill="#007bff"
                            viewBox="0 0 24 24"
                        >
                            <path d="M6.812 13.937H9.33v9.312c0 .414.335.75.75.75l4.007.001a.75.75 0 0 0 .75-.75v-9.312h2.387a.75.75 0 0 0 .744-.657l.498-4a.75.75 0 0 0-.744-.843h-2.885c.113-2.471-.435-3.202 1.172-3.202 1.088-.13 2.804.421 2.804-.75V.909a.75.75 0 0 0-.648-.743A26.926 26.926 0 0 0 15.071 0c-7.01 0-5.567 7.772-5.74 8.437H6.812a.75.75 0 0 0-.75.75v4c0 .414.336.75.75.75zm.75-3.999h2.518a.75.75 0 0 0 .75-.75V6.037c0-2.883 1.545-4.536 4.24-4.536.878 0 1.686.043 2.242.087v2.149c-.402.205-3.976-.884-3.976 2.697v2.755c0 .414.336.75.75.75h2.786l-.312 2.5h-2.474a.75.75 0 0 0-.75.75V22.5h-2.505v-9.312a.75.75 0 0 0-.75-.75H7.562z" />
                        </svg>
                        </a>
                    </li>
                    {/* Add more social icons here */}
                    </ul>
                </div>
                </div>
                <form className="ml-auto space-y-4">
                <input
                    type="text"
                    placeholder="Name"
                    className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]"
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]"
                />
                <input
                    type="text"
                    placeholder="Subject"
                    className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]"
                />
                <textarea
                    placeholder="Message"
                    rows="6"
                    className="w-full rounded-md px-4 border text-sm pt-2.5 outline-[#007bff]"
                ></textarea>
                <button
                    type="button"
                    className="text-white bg-[#007bff] hover:bg-blue-600 font-semibold rounded-md text-sm px-4 py-2.5 w-full"
                >
                    Send
                </button>
                </form>
            </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 py-4">
        <div className="container mx-auto px-6 text-center text-white">
          <p>&copy; 2024 Renieuw. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
