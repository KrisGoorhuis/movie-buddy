import React from 'react';
import './moviepanel.css'
import { connect } from 'react-redux'

import noImage from 'assets/missing.jpg'



// This component takes the movie prop from normal React parent/child method
let MoviePanel = (props) => {


   // Center text is an image size as specified by their API
   // https://developers.themoviedb.org/3/getting-started/images
   function getImageURL(path) {
      if (path === null) {
         return noImage
      }
      let url = props.baseImageUrl + 'w342' + path
      return url
   }

   function setSelectedMovie(movie) {
      props.dispatch({
         type: 'SET_SELECTED_MOVIE', 
         payload: props.movie
      }) 
   }
   
   // function formatReleaseDate(date) {
   //    if (date === undefined) {
   //       return "nodate!"
   //    }
   //    return date.slice(0, 4)
   // }

   return (
      <div className="moviepanel_container">
         <img 
            className="movie_poster"
            src={getImageURL(props.movie.poster_path)}
            alt="movie poster" 
         />
         <div className="movie_controls">
            {/* <h3>{props.movie.title}</h3> */}

            <button 
               onClick={ () => {setSelectedMovie(props.movie)}}
            >
               Expand
            </button>
            <button onClick={() => {props.dispatch({type: 'ADD_MOVIE', payload: props.movie})}}>Add to selection</button>
         </div>
      </div>
   )
}

let mapStateToProps = (state) => {
   return {
      baseImageUrl: state.baseImageUrl
   }
}

export default connect(mapStateToProps)(MoviePanel)

// Each movie item contains:

// adult: false
// backdrop_path: "/6ihyJWRLEngSnlW8HKeDOH3AfSQ.jpg"
// genre_ids: (3) [28, 12, 878]
// id: 429617
// media_type: "movie"
// original_language: "en"
// original_title: "Spider-Man: Far from Home"
// overview: "Peter Parker and his friends go on a summer trip to Europe. However, they will hardly be able to rest - Peter will have to agree to help Nick Fury uncover the mystery of creatures that cause natural disasters and destruction throughout the continent."
// popularity: 301.21
// poster_path: "/lcq8dVxeeOqHvvgcte707K0KVx5.jpg"
// release_date: "2019-06-28"
// title: "Spider-Man: Far from Home"
// video: false
// vote_average: 7.7
// vote_count: 3830