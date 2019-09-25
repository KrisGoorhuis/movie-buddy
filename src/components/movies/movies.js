import React from 'react'
import './movies.css'

import Moviepanel from 'components/moviepanel/moviepanel.js'


let Movies = (props) => {
   console.log("Movies props:")
   console.log(props)

   return (
      <div id="movies_container">
         {
            props.movies === null ? 
            <div>Loading movies...</div> 
            :
            props.movies.map( (thisMovie, index) => {
               return (
                  <div key={index}>
                     <Moviepanel 
                        movie={thisMovie} 
                        baseImageUrl={props.baseImageUrl}
                     />
                  </div>
               )
            })
         }
      </div>
   )
}


export default Movies