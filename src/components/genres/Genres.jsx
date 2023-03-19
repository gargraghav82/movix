import React from 'react'
import { useSelector } from 'react-redux';
import './style.scss';

const Genres = ({data}) => {

    const {genres} = useSelector((state) => state.home);

  return (
    <div className='genres'>
        {data?.map((item) => {
            if(!genres[item]) return ;
            return (
                <div className="genre" key={item}>
                    {genres[item]}
                </div>
            )
        })}
    </div>
  )
}

export default Genres