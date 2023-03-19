import { useEffect, useState } from 'react'
import { fecthAPIdata } from './utils/api'
import { BrowserRouter , Routes , Route, Router } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import PageNotFound from './pages/404/PageNotFound';
import Details from './pages/details/Details';
import Explore from './pages/explore/Explore';
import Home from './pages/home/Home';
import SearchResult from './pages/searchResult/SearchResult'
import { useSelector , useDispatch } from 'react-redux';
import { getApiConfiguration , getGenres , getGenres1} from './store/homeSlice';

function App() {

  const dispatch = useDispatch();
  const {url} = useSelector((state) => state.home)

  useEffect(() => {
    fecthApiConfig();
    genresCall();
  } , [])
  
  const fecthApiConfig = () => {
    fecthAPIdata('/configuration')
      .then((res) => {
        const url = {
          backdrop : res.images.secure_base_url + "original" , 
          profile : res.images.secure_base_url + "original" , 
          poster : res.images.secure_base_url + "original" , 
        }
        dispatch(getApiConfiguration(url));
      })
  }

  const genresCall = async () => {
    let promises = [];
    let endPoints = ["movie" , "tv"];
    let allGenres = {};

    endPoints.forEach((url) => {
      promises.push(fecthAPIdata(`/genre/${url}/list`));
    })

    const data = await Promise.all(promises);
    data.map(({genres}) => {
      return genres.map((item) => (allGenres[item.id] = item.name));
    })
    
    dispatch(getGenres(allGenres));
  }

  return (
    <div className="App">
      {url?.total_pages}
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/:mediaType/:id' element={<Details/>}/>
          <Route path='/search/:query' element={<SearchResult/>} />
          <Route path='/explore/:mediaType' element={<Explore/>}/>
          <Route path='*' element={<PageNotFound/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App
