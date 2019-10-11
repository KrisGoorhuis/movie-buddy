import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import './main.css'

import Topbar from 'components/topbar/topbar.js'
import Splash from 'components/splash/splash.js'
import Movies from 'components/movies/movies.js'


let Main = (props) => {

   // For the record: I know this shouldn't be in a public git repo. 
   // You gotta know when being lazy is harmless. :D
   const apiKey = '96c93cbe1f7f5d946e3d9ec59e21b9ed'

   // Image urls in movie objects are only the tail end. Gotta get the base.
   async function getConfiguration() {
      await fetch(`https://api.themoviedb.org/3/configuration?api_key=${apiKey}`)
         .then( response => response.json())
         .then( data => {
            props.dispatch({type: 'SET_BASE_IMAGE_URL', payload: data.images.base_url})
         })
   }

   async function getGenreList() {
      await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`)
      .then( response => response.json())
      .then( data => {
         props.dispatch({type: 'SET_GENRE_LIST', payload: data.genres})
         console.log(data.genres)
      })
   }


   // Fetches currently trending
   async function getSplashMovies() {
      const address = 
         `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`
      let _movies = await fetch(address)
         .then( response => response.json())
         .then( data => data.results)
      props.dispatch({type: 'SET_LISTED_MOVIES', payload: _movies})
   }
   
   useEffect(() => {
      getConfiguration()
      getGenreList()
      getSplashMovies()
   }, [])


   return (
      <div id="main_container">
         <Topbar />
         <Splash />
         <Movies />
      </div>
   )
}


let mapStateToProps = (state) => {
   return {
   }
}


export default connect(mapStateToProps)(Main)