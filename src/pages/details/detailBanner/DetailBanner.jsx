import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector} from "react-redux";
import dayjs from "dayjs";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/rating/CircleRating";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import PosterFallback from "../../../assets/no-poster.png";
import { PlayIcon } from "../Playbtn";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import { unstable_HistoryRouter } from "react-router-dom";


const DetailBanner = ({video , credit}) => {

    const {mediaType , id} = useParams();
    const {data , loading} = useFetch(`/${mediaType}/${id}`);
    const {url} = useSelector((state) => state.home);
    const [show , setShow] = useState(false);
    const [videoId , setVideoId] = useState(null);

    const _genres = data?.genres?.map((g) => g.id);
    const director = credit?.filter((d) => d.job === 'Director');
    const writer = credit?.filter((w) => (w.job === 'Writer') || (w.job === 'Screenplay') || (w.job === 'Story'));


    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor((totalMinutes / 60));
        const minutes = (totalMinutes % 60);
        return `${hours}h ${minutes > 0 ? `${minutes}m` : ""}`;
    };

  return (
    <div className='detailsBanner'>
        {!loading ?(
            <>
                {!!data && (
                    <React.Fragment>
                        <div className="backdrop-img">
                            <Img 
                                src={url.backdrop + data?.backdrop_path}
                            />
                        </div>
                        <div className="opacity-layer"></div>
                        <ContentWrapper>
                            <div className="content">
                                <div className="left">
                                    {data?.poster_path ? (
                                        <Img 
                                            className='posterImg'
                                            src={url.poster + data?.poster_path}
                                        />
                                    ) : (
                                        <Img 
                                            className={'posterImg'}
                                            src={PosterFallback}
                                        />
                                    )}
                                </div>
                                <div className="right">
                                    <div className="title">
                                    {`${data.name || data.title} (${dayjs(data?.release_date).format("YYYY")})`}
                                    </div>
                                    <div className="subtitle">
                                        {data?.tagline}
                                    </div>
                                    <Genres data={_genres}/>
                                    <div className="row">
                                        <CircleRating rating={data?.vote_average.toFixed(1)}/>
                                        <div className="playbtn" onClick={() => {setShow(true); setVideoId(video);} }>
                                            <PlayIcon/>
                                            <span className="text">Watch Trailer</span>
                                        </div>
                                    </div>

                                    <div className="overview">
                                        <div className="heading">Overview</div>
                                        <div className="description">
                                            {data?.overview}
                                        </div>
                                    </div>

                                    <div className="info">
                                        {data.status && (
                                            <div className="infoItem">
                                                <span className="text bold">Status:{" "}</span>
                                                <span className="text">{data.status}</span>
                                            </div>
                                        )}

                                        {(data?.release_date || data?.first_air_date) && (
                                            <div className="infoItem">
                                                <span className="text bold">{(data?.release_date) ? "Release Date" : "First Air Date"}:{" "}</span>
                                                <span className="text">{(data?.release_date) ? dayjs(data?.release_date).format("MMM D, YYYY") : dayjs(data?.first_air_date
).format("MMM D, YYYY")}</span>
                                            </div>
                                        )}

                                        {(data?.last_air_date) && (
                                            <div className="infoItem">
                                                <span className="text bold">Last Air Date : {""}</span>
                                                <span className="text">{dayjs(data?.last_air_date
).format("MMM D, YYYY")}</span>
                                            </div>
                                        )}

                                        {data.runtime && (
                                            <div className="infoItem">
                                                <span className="text bold">RunTime:{" "}</span>
                                                <span className="text">{toHoursAndMinutes(data.runtime)}</span>
                                            </div>
                                        )}
                                    </div>
                                    {
                                        director && director.length > 0 && <div className="info">
                                        <div className="infoItem">
                                                    <span className="text bold">Director:{" "}</span>
                                                    <span className="text">
                                                    {director.map((ele , i) => (
                                                        <span key={i}>
                                                            {(director.length - 1 != i) ? `${ele.name} , ` : `${ele.name}`}
                                                        </span>
                                                    ))}
                                                    </span>
                                            </div>
                                    </div>

                                    }
                                    {writer && writer.length > 0 && <div className="info">
                                        <div className="infoItem">
                                            <span className="text bold">Writer:{" "}</span>
                                            <span className="text">
                                            {writer.map((ele , i) => (
                                                        <span key={i}>
                                                            {(writer.length - 1 != i) ? `${ele.name} , ` : `${ele.name}`}
                                                        </span>
                                                    ))}
                                            </span>     
                                        </div>
                                    </div>}

                                </div>
                            </div>

                            {video !== '-1' && <VideoPopup
                                show={show}
                                setShow={setShow}
                                videoId={videoId}
                                setVideoId={setVideoId}
                            />}
                        </ContentWrapper>

                    </React.Fragment>
                )}
            </>
        ) : (
            <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
        )}
    </div>
  )
}

export default DetailBanner