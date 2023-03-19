import React from 'react'
import Carousel from '../../../components/carousel/Carousel';
import { useParams } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';

const SimilarMovies = () => {
    const {mediaType , id} = useParams();
    const {data , loading} = useFetch(`/${mediaType}/${id}/similar`);
  return (
    <div className="carouselSection">
        <ContentWrapper>
            <span className="carouselTitle">Similar {mediaType == 'tv' ? 'TV Shows' : 'Movies'}</span>
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading} type={''}/>
    </div>)
}

export default SimilarMovies