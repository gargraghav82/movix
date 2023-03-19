import { useRef } from "react";
import { BsFillArrowLeftCircleFill , BsFillArrowRightCircleFill } from 'react-icons/bs';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import './style.scss';

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import Rating from "../rating/rating";
import Genres from "../genres/Genres";
import NR from '../../assets/no-results.png'


const Carousel = ({data , loading , type}) => {
    

    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();
    const carouselContainer = useRef();

    const skItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        )
    }

    const navigation = (dir) => {
        const container = carouselContainer.current;

        const scroll = ((dir === 'left') ? container.scrollLeft - (container.offsetWidth + 20) : container.scrollLeft + (container.offsetWidth + 20) );

        container.scrollTo({
            left:scroll , 
            behavior:"smooth"
        })
    }

  return (
    
    <div className="carousel">
        <ContentWrapper>
        <BsFillArrowLeftCircleFill className="carouselLeftNav arrow " style={{visibility:`${(data?.length) == 0 ? 'hidden' : 'visible'}`}} onClick={() => navigation('left')}/>
        <BsFillArrowRightCircleFill className="carouselRightNav arrow" style={{visibility:`${(data?.length) == 0 ? 'hidden' : 'visible'}`}} onClick={() => navigation('right')}/>
        {
            !loading ? (
                <div className="carouselItems" ref={carouselContainer}>
                    {
                        (data?.length > 0) ? data?.map((item) => {
                            const posterUrl = item.poster_path ? url.poster + item.poster_path : PosterFallback;
                            return <div 
                                    className="carouselItem"
                                    key={item.id}
                                    onClick={() => navigate(`/${(item.media_type) ? item.media_type : type}/${item.id}`)}
                                >

                                    <div className="posterBlock">
                                        <Img src={posterUrl}/>
                                        <Rating
                                            rating={item.vote_average.toFixed(1)}
                                        />
                                        <Genres data={item.genre_ids.slice(0 , 2)}/>
                                    </div>
                                    <div className="textBlock">
                                        <span className="title">
                                            {item.title || item.name}
                                        </span>
                                        <span className="date">
                                            {
                                                dayjs(item.release_date).format("MMM D, YYYY")
                                            }
                                        </span>
                                    </div>
                                </div>
                        }) : (
                            <div><img src={NR} style={{height:'200px'}}/></div>
                        )
                    }
                </div>
            ) : (
                 <div className="loadingSkeleton">
                    
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                    
                 </div>
            )
        }
        </ContentWrapper>
    </div>
  );
};

export default Carousel