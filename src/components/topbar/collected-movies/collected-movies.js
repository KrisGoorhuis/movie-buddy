import React from 'react'
import './collected-movies.css'
import { connect } from 'react-redux'
import { getSuggestibleMovies } from 'api/api_main.js'


let CollectedMovies = (props) => {

   function removeMovieSelection(movie) {
      props.dispatch({type: 'REMOVE_MOVIE', payload: movie})
   }

   async function getSuggestions() {
      console.log("Getting suggestions")

      let suggestions = await getSuggestibleMovies(props.collectedMovies);
   }

   return (
      <React.Fragment>
         {
            <div id="selected_movies_container">
               {
                  
                  props.collectedMovies !== undefined &&
                  props.collectedMovies.map( (movie, index) => {
                     return (
                        <div id="collected_movies_list">
                           <div>{ movie.title ? movie.title : "-title data missing-" }</div>
                           <div onClick={ () => { removeMovieSelection(movie) } }>Remove</div>
                        </div>
                     )
                  })
               }
               <div>
                  <button 
                     // Imported function - sets suggestions to listedMovies state
                     onClick={() => { getSuggestions() }}
                  >Find Suggestions</button>
               </div>
            </div>
         }
      </React.Fragment>
   )
}

let mapStateToProps = (state) => {
   return {
      collectedMovies: state.collectedMovies,
      forceUpdate: state.forceUpdate
   }
}

export default connect(mapStateToProps)(CollectedMovies)