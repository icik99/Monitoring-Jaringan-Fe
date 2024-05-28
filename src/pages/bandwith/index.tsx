import Image from 'next/image'
import React from 'react'
import Bandwith1 from '../../../public/bandwith1.png'
import Bandwith2 from '../../../public/bandwith2.png'
import Ping1 from '../../../public/ping1.png'
import Ping2 from '../../../public/ping2.png'
import Jitter1 from '../../../public/jitter1.png'
import Jitter2 from '../../../public/jitter2.png'


export default function Bandwith() {
  return (
    <div>
      <div className='space-y-11'>
        <section className='space-y-10'>
          <h1 className='mb-10 text-5xl font-bold'>Hasil Bandwith</h1>
          <Image src={Bandwith1} alt='Gambar Bandwith 1' />
          <Image src={Bandwith2} alt='Gambar Bandwith 2' />
        </section>
        <section className='space-y-10'>
          <h1 className='mb-10 text-5xl font-bold'>Hasil Ping</h1>
          <Image src={Ping1} alt='Gambar Ping 1' />
          <Image src={Ping2} alt='Gambar Ping 2' />
        </section>
        <section className='space-y-10'>
          <h1 className='mb-10 text-5xl font-bold'>Hasil Jitter</h1>
          <Image src={Jitter1} alt='Gambar Jitter 1' />
          <Image src={Jitter2} alt='Gambar Jitter 2' />
        </section>

      </div>
    </div>
  )
}
