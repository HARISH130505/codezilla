import React from 'react'
import Image from 'next/image'
import next from 'next'
const page = () => {
  return (
    <div className='py-5'>
      <div className='flex justify around items-center'>
      <div>
        <h1 className="text-orange-500 text-2xl">CODEZILLA|| MOZILLA COMMUNITY|| OPEN SOURCE|| SRM IST RMP</h1>
      </div>
      <Image
        src="/photo.jpg"
        alt="img"
        height={500}
        width={500}
      />
      </div>
    </div>
  )
}

export default page