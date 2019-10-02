import React from 'react'
import './movies.css'
import { connect } from 'react-redux'

import MoviePanel from 'components/moviepanel/moviepanel.js'
import DetailsPanel from 'components/detailspanel/detailspanel.js'


let Movies = (props) => {
   return (
      <div id="movies_container">
         {
            props.listedMovies === undefined ? 
            <div>Loading movies...</div> 
            :
            props.listedMovies.map( (thisMovie, index) => {
               return (
                  <div key={index}>
                     <MoviePanel movie={thisMovie} />
                  </div>
               )
            })
         }
         {
            props.selectedMovie &&
            <div 
               id="moviedetails_container"
               onClick={ () => props.dispatch({type: 'SET_SELECTED_MOVIE', payload: null})}
            >
               <DetailsPanel />
            </div>
         }
      </div>
   )
}

let mapStateToProps = (state) => {
   return {
      listedMovies: state.listedMovies,
      selectedMovie: state.selectedMovie
   }
}

export default connect(mapStateToProps)(Movies)