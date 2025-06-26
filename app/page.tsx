import React from 'react'
import Image from 'next/image'
const page = () => {
  return (
     <div className="bg-gray-50 flex items-center justify-center  my-4 p-10">
      <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 lg:p-12 max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-12 transform transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl">
        <div className="flex-1 text-center lg:text-left space-y-4">
          <h1 className="text-gray-900 text-3xl sm:text-4xl lg:text-5xl font-passion-one">
            CODEZILLA
          </h1>
          <p className="text-orange-600 text-lg sm:text-xl font-semibold">
            Reintroducing Codezilla
          </p>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed max-w-prose mx-auto lg:mx-0">
            Codezilla is a Mozilla Campus Community in SRMIST, Ramapuram, designed to provide the Youth, in and around the campus,
            an open-source platform where they can develop their technical knowledge and skill set for a better career.
            We organize technical events and hands-on sessions to scale up their expertise.
            It provides a good environment to engage students in different activities and develop their projects.
          </p>
        </div>

        <div className="flex-shrink-0 w-full lg:w-1/2 flex justify-center">
           <Image
            src="/photo.jpg"
            alt="grp"
            height={200}
            width={200}
            className="rounded-2xl shadow-lg border-4 border-orange-500 object-cover w-full h-auto max-w-md lg:max-w-none"
           />
        </div>
      </div>
    </div>
  )
}

export default page