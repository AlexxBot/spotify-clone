import { ClientRequest } from 'http'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import SideBar from '../components/sidebar'
import Center from '../components/center'

const Home: NextPage = () => {
  return (
    <div className='bg-black h-screen overflow-hidden'>
      {/* <Head>
        <title>Spotify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      <main className="flex">
        <SideBar />
        <Center />
      </main>
      <div>
    {/* Player */}
      </div>
      
    </div>
  )
}

export default Home
