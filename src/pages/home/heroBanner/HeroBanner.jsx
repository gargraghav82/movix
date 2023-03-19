import React, { useEffect, useState  } from 'react'
import './style.scss'
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import { useSelector } from 'react-redux';
import Img from '../../../components/lazyLoadImage/Img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';

const HeroBanner = () => {

    const [background , setBackground] = useState('');
    const [query , setQuery] = useState('');
    const navigate = useNavigate();
    const {url} = useSelector((state) => state.home);

    const {data , loading} = useFetch('/movie/upcoming');

    useEffect(() => {
        const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
        setBackground(bg);
    } , [data])

    const searchQueryHandler = async(e) => {
        if(e.key === 'Enter' && query.length > 0){
            navigate(`/search/${query}`);
        }else if(e._reactName === 'onClick' && query.length > 0){
            navigate(`/search/${query}`);
        }console.log(e.target);
    }

  return (
    <div className="heroBanner">
        <div className="backdrop-img">
            <Img src={background.toString()}/>
        </div>
        <div className="opacity-layer"></div>
        <ContentWrapper>
            <div className="heroBannerContent">
                <span className="title" style={{cursor:'pointer'}}>wELCOME...</span>
                <span className="subTitle" style={{cursor:'pointer'}}>
                    <pre>
                    MillionS oF MovieS | TV ShowS tO DiscoveR.
                                Explore Now.
                    </pre>
                </span>
                <div className="searchInput">
                    <input
                    type="text"
                    placeholder='Enter Detail of Movie Or TV Show...'
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyUp={searchQueryHandler}
                    />
                    <button onClick={searchQueryHandler}>Search</button>
                </div>
            </div>
        </ContentWrapper>
    </div>
  )
}

export default HeroBanner