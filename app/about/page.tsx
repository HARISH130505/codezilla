import React from 'react';

const Page = () => {
  return (
    <div className="min-h-screen text-white px-8 lg:px-16 py-12 flex flex-col gap-12">
      <div className="flex justify-between items-center">
  <div className="w-1/2 flex justify-center">
          <h2 
            className="text-[36px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-orange-500"
            style={{ fontFamily: "'Archivo Black', sans-serif" }}>
            About Our Club
          </h2>
        </div>  
  <div className="w-1/2 flex justify-center">
          <h2 
            className="text-[36px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-300"
            style={{ fontFamily: "'Poppins', sans-serif" }}>
            Why Join Us?
          </h2>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        
        <div className="lg:w-1/2 space-y-6">
          <h3 className="text-[28px] font-bold text-orange-300">
            Join Our Building Together Club!
          </h3>
          <p className="text-[20px] text-black leading-relaxed">
            Do you love creating, designing, and building? Whether you're into woodworking, DIY projects,
            coding, or crafting, our club is the perfect place for makers and innovators like you!
          </p>
        </div>

        <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "Collaborative Projects",
              desc: "Work on exciting projects with others who share your passion for building. From small DIY tasks to large-scale creations, there's always something to get your hands on!"
            },
            {
              title: "Skill Sharing",
              desc: "Learn new techniques and share your knowledge with fellow builders. Whether you're a beginner or an expert, everyone has something valuable to contribute."
            },
            {
              title: "Tools & Resources",
              desc: "Gain access to tools, materials, and resources that can help bring your ideas to life."
            },
            {
              title: "Community Support",
              desc: "Be part of a community that supports and inspires each other. Together, we turn ideas into reality!"
            }
          ].map((card, idx) => (
            <div 
              key={idx} 
              className="bg-orange-200 p-5 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.03] transition-all duration-300"
            >
              <h4 className="font-bold mb-3 text-[19px] text-[#ff7517]">
                {card.title}
              </h4>
              <p className="text-[15px] text-black">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;