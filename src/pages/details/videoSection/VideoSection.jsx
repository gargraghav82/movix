import React, { useState } from 'react'
import './style.scss'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import { PlayIcon } from '../Playbtn'
import Img from '../../../components/lazyLoadImage/Img'
import VideoPopup from '../../../components/videoPopup/VideoPopup'
import NA from '../../../assets/NA.jpg'
import NIA from '../../../assets/NIA.jpg'

const VideoSection = ({data , loading}) => {

    const [show , setShow] = useState(false);
    const [videoId , setVideoId] = useState(null);
    console.log(data);
    const skeletonItem = () => {
        return (<div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>);
    };

    function imageExists(image_url){

        var http = new XMLHttpRequest();
    
        http.open('HEAD', image_url, false);
        http.send();
    
        return http.status != 404;
    
    }

  return (
    <div className="videosSection">
        <ContentWrapper>
        <div className="sectionHeading">Official Videos</div>
        {!loading ? (
            <div className="videos">
                {data?.results?.length > 0 ? (data?.results?.map((video) => (
                    <div key={video.id} className="videoItem" onClick={() => {setVideoId(video.key) ; setShow(true);}}>
                        <div className="videoThumbnail">
                            <Img
                                src={imageExists(`http://img.youtube.com/vi/${video.key}/mqdefault.jpg`) ? 
                                            `https://img.youtube.com/vi/${video.key}/mqdefault.jpg` 
                                            : NIA}
                            />
                            <PlayIcon/>
                        </div>
                        <div className="videoTitle">{video.name}</div>
                    </div>
))) : (
                    <Img className="fault" src={NA}/>
                )}
            </div>
        ) : (
            <div className="videoSkeleton">
                {skeletonItem()}
                {skeletonItem()}
                {skeletonItem()}
                {skeletonItem()}
            </div>
        )}
        </ContentWrapper>
        <VideoPopup
            show={show}
            setShow={setShow}
            videoId={videoId}
            setVideoId={videoId}
        />
    </div>
  )
}

export default VideoSection