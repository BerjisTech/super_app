import Image from 'next/image'
import TopNav from '@components/nav/TopNav'

export default function Home() {
  return (
    <div className="relative">
      <TopNav />
      <div className='h-[500vh]'></div>
    </div>
  )
}
