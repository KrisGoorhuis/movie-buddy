import React from 'react'
import './collected-movies.css'
import { connect } from 'react-redux'
import getSuggestableMovies from 'api/api_main.js'


let CollectedMovies = (props) => {

   function removeMovieSelection(movie) {
      props.dispatch({type: 'REMOVE_MOVIE', payload: movie})
   }

   async function getSuggestions() {
      let suggestions = await getSuggestableMovies(props.collectedMovies)
      console.log("here's what we got back :D")
      console.log(suggestions)
      suggestions.forEach( (movie) => {
         console.log(movie.title)
      })
      if (suggestions === null) {
         alert("Selected movies are too few or too dissimilar to find suggestions!")
      }
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