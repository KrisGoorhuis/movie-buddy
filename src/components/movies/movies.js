import React, { useState } from 'react'
import './movies.css'

import MoviePanel from 'components/moviepanel/moviepanel.js'
import DetailsPanel from 'components/detailspanel/detailspanel.js'


let Movies = (props) => {
   let [selectedMovie, setSelectedMovie] = useState(null)


   return (
      <div id="movies_container">
         {
            props.movies === null ? 
            <div>Loading movies...</div> 
            :
            props.movies.map( (thisMovie, index) => {
               return (
                  <div key={index}>
                     <MoviePanel 
                        movie={thisMovie} 
                        baseImageUrl={props.baseImageUrl}
                        setSelectedMovie={setSelectedMovie}
                     />
                  </div>
               )
            })
         }
         <div 
            id="moviedetails_container"
            style={ selectedMovie === null ? {display: 'none'} : {display: 'flex'}}   
         >
            {
               selectedMovie &&
               <DetailsPanel 
                  movie={selectedMovie} 
                  baseImageUrl={props.baseImageUrl} 
               />
            }
         
         </div>
      </div>
   )
}

export default Movies