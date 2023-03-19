import React from 'react'
import Carousel from '../../../components/carousel/Carousel';
import { useParams } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';

const SimilarMovies = () => {
    const {mediaType , id} = useParams();
    const {data , loading} = useFetch(`/${mediaType}/${id}/recommendations`);
  return (
    <div className="carouselSection">
        <ContentWrapper>
            <span className="carouselTitle">Recommendations</span>
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading} type={''}/>
    </div>)
}

export default SimilarMovies