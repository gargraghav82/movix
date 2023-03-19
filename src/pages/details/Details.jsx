import React, { useState } from 'react'
import './style.scss'
import useFetch from '../../hooks/useFetch'
import { useParams } from 'react-router-dom'
import DetailBanner from './detailBanner/DetailBanner'
import Cast from './cast/Cast'
import VideoSection from './videoSection/VideoSection'
import SimilarMovies from './similarMovies/SimilarMovies'
import Recommendations from './recommendations/Recommendations'

const Details = () => {

  const {mediaType , id} = useParams();
  const {data , loading} = useFetch(`/${mediaType}/${id}/videos`);
  
  const {data : credits, loading : creditLoading} = useFetch(`/${mediaType}/${id}/credits`);
  let video = "-1";
  if(data?.results?.length > 0){
    video = data.results[0].key;
  }

  return (
    <div>
      <DetailBanner video={video} credit={credits?.crew}/>
      <Cast data={credits?.cast} loading={creditLoading}/>
      <VideoSection data={data} loading={loading}/>
      <SimilarMovies/>
      <Recommendations/>
    </div>
  )
}

export default Details