import React, { useEffect, useState } from 'react'
import './style.scss';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fecthAPIdata } from '../../utils/api';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';
import MovieCard from '../../components/movieCard/MovieCard'
import Spinner from '../../components/spinner/Spinner'
import noResults from '../../assets/no-results.png'
import { useParams } from 'react-router-dom';
import Img from '../../components/lazyLoadImage/Img';


const SearchResult = () => {

  const [data , setData] = useState(null);
  const [loading , setLoading] = useState(null);
  const {query} = useParams();
  const [pageNum , setPageNum] = useState(1);

  const fetchIntialData = () => {
    setLoading(true);
    fecthAPIdata(`/search/multi?query=${query}&page=${pageNum}`)
      .then((res) => {
        setData(res);
        setLoading(false);
        setPageNum((prev) => prev + 1);
      })
  }

  const fetchNextData = () => {
    fecthAPIdata(`/search/multi?query=${query}&page=${pageNum}`)
      .then((res) => {
        if(data?.results){
          setData({...data , results : [...data?.results , ...res?.results]});
        }else{
          setData(res);
        }
        setPageNum((prev) => prev + 1);
      })
  }

  useEffect(() => {
    fetchIntialData();
    setPageNum(1);
  } , [query])

  return (
    <div className='searchResultsPage'>
      {loading && <Spinner initial={true}/>}
      <ContentWrapper>
      {!loading && data?.results.length > 0 ? (
        <>
          <div className='pageTitle'>{`Search  ${data?.results?.length > 1 ? 'results' : 'result'} of  '${query}'`}</div>
          <InfiniteScroll
            className='content'
            dataLength={data?.results?.length || []}
            next={fetchNextData}
            hasMore={pageNum <= data?.total_pages}
            loader={<Spinner/>}
          >
            {data?.results?.map((item , index) => {
              if(item.media_type === 'person') return ;
              return (
                <MovieCard key={index} data={item} fromSearch={true}/>
              )
            })}
          </InfiniteScroll>
        </>
      ) : (
        (!loading && data?.results.length == 0 && <span className="resultNotFound"><Img src={noResults}/><span>No Result found for '{query}'</span></span>)
      )}
      </ContentWrapper>
    </div>
  )
}

export default SearchResult