import React, { useState } from 'react'
import TabSwitch from '../../../components/tabSwitch/TabSwitch'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/carousel/Carousel'

const TopRated = () => {

    const [endPoint , setEndPoint] = useState('movie');

    const {data , loading} = useFetch(`/${endPoint}/top_rated`);

    const onTabChange = (tab) => {
        setEndPoint(tab === 'Movies' ? 'movie' : "tv");
    }

  return (
    <div className="carouselSection">
        <ContentWrapper>
            <span className="carouselTitle">Top Rated</span>
            <TabSwitch data={["Movies" , "TV Shows"]} onTabChange={onTabChange}></TabSwitch>
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading} type={endPoint}/>
    </div>
  )
}

export default TopRated