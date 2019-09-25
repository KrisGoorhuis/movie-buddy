import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import './main.css'

import Navbar from 'components/navbar/navbar.js'
import Splash from 'components/splash/splash.js'
import Movies from 'components/movies/movies.js'


let Main = () => {
   let [baseImageUrl, setBaseImageUrl] = useState(null)
   let [movies, setMovies] = useState(null)


   const apiKey = '96c93cbe1f7f5d946e3d9ec59e21b9ed'
   const baseApiUrl = 'https://api.themoviedb.org/3'

   
   async function getConfiguration() {
      await fetch(`https://api.themoviedb.org/3/configuration?api_key=${apiKey}`)
         .then( response => response.json())
         .then( data => {
            setBaseImageUrl(data.images.base_url)
            console.log(`TMDb configuration:`)
            console.log(data)
         })
   }


   // Fetches currently trending
   async function getSplashMovies() {
      const address = 
         `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`
      let _movies = await fetch(address)
         .then( response => response.json())
         .then( data => data.results)
      setMovies(_movies)
   }
   

   useEffect(() => {
      getConfiguration()
      getSplashMovies()
   }, [])


   return (
      <div id="main_container">
         <Navbar />
         <Splash />
         <Movies movies={movies} baseImageUrl={baseImageUrl} />
      </div>
   )
}

let mapStateToProps = () => {
   return {
      nothing: "nothing"

   }
}

export default connect(mapStateToProps)(Main)