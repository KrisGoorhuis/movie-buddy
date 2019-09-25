import React from 'react';
import './moviepanel.css'

// Center text is an image size as specified by their API
   // https://developers.themoviedb.org/3/getting-started/images
   
let Moviepanel = (props) => {


   function getImageURL(path) {
      let url = props.baseImageUrl + 'w342' + path
      return url
   }
   function formatReleaseDate(date) {
      if (date == undefined) {
         return "nodate!"
      }
      return date.slice(0, 4)
   }

   return (
      <div class="moviepanel_container">
         <img 
            className="movie_poster"
            src={getImageURL(props.movie.poster_path)} 
         />
         <div className="movie_details">
            <h3>{props.movie.title}</h3>

            <p>{props.movie.overview}</p>
            <p>{formatReleaseDate(props.movie.release_date)}</p>
         </div>
      </div>
   )
}

export default Moviepanel

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