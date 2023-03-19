import React, { useState } from 'react'
import TabSwitch from '../../../components/tabSwitch/TabSwitch'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/carousel/Carousel'

const Trending = () => {

    const [endPoint , setEndPoint] = useState('day');

    const {data , loading} = useFetch(`/trending/all/${endPoint}`);

    const onTabChange = (tab) => {
        setEndPoint(tab === 'Day' ? 'day' : "week");
    }

  return (
    <div className="carouselSection">
        <ContentWrapper>
            <span className="carouselTitle">Trending</span>
            <TabSwitch data={["Day" , "Week"]} onTabChange={onTabChange}></TabSwitch>
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading} type={''}/>
    </div>
  )
}

export default Trending