import React from 'react';

export default function AboutPage() {
  return (
    <div className="min-h-screen text-black font-sans bg-gray-50">
      <div className="container mx-auto px-4 py-12 lg:px-16">
        <div className="text-center mb-10">
          <h2 className="text-4xl sm:text-5xl font-bold p-2 font-passion">
            About Our Club
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
            <h3 className="text-3xl sm:text-4xl font-bold text-orange-500">
              Join Our Building Together Club!
            </h3>
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
              Do you love creating, designing, and building? Whether you're into woodworking, DIY projects,
              coding, or crafting, our club is the perfect place for makers and innovators like you!
            </p>
          </div>

          <div className="lg:w-1/2 w-full grid grid-cols-1 md:grid-cols-2 gap-8">
            <h2 className="col-span-1 md:col-span-2 text-center text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-300 rounded-lg p-2 font-['Poppins']">
              Why Join Us?
            </h2>
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
                className="bg-orange-200 p-6 rounded-3xl shadow-lg border border-orange-300
                            hover:shadow-2xl hover:scale-[1.03] transition-all duration-300"
              >
                <h4 className="font-bold mb-3 text-xl sm:text-2xl text-[#ff7517]">
                  {card.title}
                </h4>
                <p className="text-sm sm:text-base text-gray-800">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};