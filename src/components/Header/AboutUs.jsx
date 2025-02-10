import React from "react";

const AboutUs = () => {
  return (
    <div className="p-6 bg-[#1A1A2E]">
      <div className="container lg:max-w-[1280px] mx-auto p-3">
      <section className="text-center mb-8">
        <img src="https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=600" alt="About Us Banner" className="w-full h-60 object-cover rounded-md" />
        <h1 className="text-4xl font-bold mt-4 text-yellow-400">About Us</h1>
        <p className="text-white p-0 mt-2 mb-8 text-lg/7 indent-0">
        MovieWorld is the ultimate destination for movie and TV show lovers, bringing you the latest and greatest entertainment from around the world. Whether you’re searching for blockbuster hits, critically acclaimed series, or hidden gems, MovieWorld ensures a smooth and enjoyable viewing experience with high-quality content and real-time accurate data. The mission is to create an immersive and user-friendly entertainment hub where movie and TV enthusiasts can easily discover new content, navigate effortlessly through an intuitive interface, and enjoy a visually appealing, responsive design on any device. Powered by reliable APIs, MovieWorld delivers a seamless streaming experience while keeping users informed about trending content, ratings, and recommendations. With MovieWorld, exploring the world of cinema has never been easier! 
        </p>
      </section>

       <div className="flex flex-col md:flex-row justify-evenly">
            <section className="text-white py-12 ">
              <h2 className="text-3xl font-bold mb-4 text-center md:text-left hover:text-yellow-400">Our Design Approach</h2>
              <ul className="md:list-disc pl-6 space-y-2 text-lg/7 text-center md:text-left">
                <li>Dark-themed UI for a cinematic experience.</li>
                <li>Minimalist layout for clear navigation.</li>
                <li>Responsive design for all devices.</li>
                <li>Hover effects & animations for an engaging UX.</li>
                <li>Consistent typography & color palette.</li>
              </ul>
            </section>
            <div className=" md:w-[50%]">
              <img src="https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
            </div>
      </div>

      <div className="flex flex-col md:flex-row justify-evenly mt-40 mb-40">
        <div className="hidden md:flex">
          <img src="https://images.pexels.com/photos/6879095/pexels-photo-6879095.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
        </div>
        <section className="text-white py-12 px-6 ">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center hover:text-yellow-400">Technologies Being Used</h2>
            <ul className="md:list-disc pl-6 space-y-2 text-lg/7 text-center md:text-left">
              <li>TVMaze API for TV shows</li>
              <li>Custom API for Movies </li>
              <li>React for frontend development</li>
              <li>Tailwind CSS for styling</li>
            </ul>
          </div>
        </section>
        <div className="flex md:hidden">
          <img src="https://images.pexels.com/photos/6879095/pexels-photo-6879095.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
        </div>
      </div>
    </div>
    </div>
  );
};

export default AboutUs;
