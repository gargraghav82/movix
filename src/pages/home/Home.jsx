import React, { useEffect } from 'react'
import './style.scss'

import HeroBanner from './heroBanner/HeroBanner'
import Trending from './trending/Trending'
import Popular from './popular/Popular'
import TopRated from './topRated/TopRated'

const Home = () => {

  useEffect(() => {
    window.scrollTo(0 , 0);
  } , [])

  return (
    <div className='HomePage'>
        <HeroBanner />
        <Trending/>
        <Popular/>
        <TopRated/>
      </div>
  )
}

export default Home