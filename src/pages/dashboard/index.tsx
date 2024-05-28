import React, { useMemo } from 'react'
import { MdRouter, MdWifi } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import LeafletMap from '@/components/LeafletMap';
import dynamic from 'next/dynamic';

export default function Dashboard() {
  const LeafletMap = useMemo(() => dynamic(
    () => import('@/components/LeafletMap'),
    { 
        loading: () => <p>A map is loading</p>,
        ssr: false
    }
), [])
  return (
    <div>
      <div className='flex items-center justify-center gap-9'>
        <div className="lg:w-[490px] w-full border-b-[#b6252a] border-b-[15px] h-[160px] rounded-lg border p-[30px] bg-white shadow">
          <div className="flex  items-center h-full justify-between gap-3">
            <div className='flex items-center justify-center gap-3'>
              <MdRouter className='text-5xl text-[#b6252a]'/>
              <h1 className="font-bold text-2xl">Router</h1>
            </div>
            <h1 className="font-bold text-5xl">5</h1>
          </div>
        </div>
        <div className="lg:w-[490px] w-full border-b-[#b6252a] border-b-[15px] h-[160px] rounded-lg border p-[30px] bg-white shadow">
          <div className="flex  items-center h-full justify-between gap-3">
            <div className='flex items-center justify-center gap-3'>
              <MdWifi className='text-5xl text-[#b6252a]'/>
              <h1 className="font-bold text-2xl">Akses Poin Terhubung</h1>
            </div>
            <h1 className="font-bold text-5xl">5</h1>
          </div>
        </div>
        <div className="lg:w-[490px] w-full border-b-[#b6252a] border-b-[15px] h-[160px] rounded-lg border p-[30px] bg-white shadow">
          <div className="flex  items-center h-full justify-between gap-3">
          <div className='flex items-center justify-center gap-3'>
              <FaUserFriends  className='text-5xl text-[#b6252a]'/>
              <h1 className="font-bold text-2xl">User Terhubung</h1>
            </div>
            <h1 className="font-bold text-5xl">5</h1>
          </div>
        </div>
      </div>
      <section className='mt-10'>
        <h1 className='font-bold text-5xl mb-2 p-2'>Lokasi Server:</h1>
          <div className=' overflow-hidden shadow-lg mb-40 border'>
              <LeafletMap />
          </div>
      </section>
    </div>
  )
}
