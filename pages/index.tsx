import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import SideBar from '../components/sidebar'

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Spotify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='bg-black h-screen overflow-hidden'>
        <SideBar />
        {/* center */}
      </main>
      <div>
    {/* Player */}
      </div>
      
    </div>
  )
}

export default Home
