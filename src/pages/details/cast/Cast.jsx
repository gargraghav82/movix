import React from 'react'
import './style.scss';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import { useSelector } from 'react-redux';
import Img from '../../../components/lazyLoadImage/Img';
import avatar from "../../../assets/avatar.png";


const Cast = ({data , loading}) => {

   const {url} = useSelector((state) => state.home);

   const skeleton = () => {
        return (<div className="skItem">
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
    </div>);
   }

  return (
    <div className='castSection'>
        <ContentWrapper>
            <div className="sectionHeading">Top Cast</div>
            {!loading ? (
                <div className="listItems">
                    {data?.map((ele) => {
                        const imgUrl = ele.profile_path ? url.profile + ele.profile_path : avatar;
                        return(
                            <div key={ele.id} className="listItem">
                                <div className="profileImg">
                                    <Img src={imgUrl}/>
                                </div>
                                <div className="name">{ele.name}</div>
                                <div className='character'>{ele.character}</div>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <div className="castSkeleton">
                    {skeleton()}
                    {skeleton()}
                    {skeleton()}
                    {skeleton()}
                    {skeleton()}
                    {skeleton()}
                </div>
            )}
        </ContentWrapper>
    </div>
  )
}

export default Cast