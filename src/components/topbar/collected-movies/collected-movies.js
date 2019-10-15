import React from 'react'
import './collected-movies.css'
import { connect } from 'react-redux'
import getSuggestableMovies from 'api/api_main.js'


let CollectedMovies = (props) => {

   function removeMovieSelection(movie) {
      props.dispatch({type: 'REMOVE_MOVIE', payload: movie})
   }

   function ellipsizeTitle(title) {
      const len = 25

      if (title.length >= len) {
         return title.slice(0, len) + "..."
      }
      
      else return title;
   }

   async function getSuggestions() {
      let suggestionObject = null
      props.dispatch({type: 'CLEAR_SUGGESTION_GENRES'})

      if (props.collectedMovies.length === 0) {
         alert("No movies collected!")
         return
      }

      suggestionObject = await getSuggestableMovies(props.collectedMovies, props.searchBy, props.resultQuantity)
      

      if (suggestionObject === null) {
         alert("Selected movies are too few or too dissimilar to find suggestions!")
      }
      else {
         // suggestionObject.suggestions.forEach( (movie) => {
         //    console.log(movie.title)
         // })
         suggestionObject.genres.forEach((genreId) => {
            props.dispatch({type: 'ADD_SUGGESTION_GENRE', payload: genreId})
         })

         props.dispatch({type: "SET_LISTED_MOVIES", payload: suggestionObject.suggestions})
         props.dispatch({type: 'SET_DISPLAYING_SUGGESTIONS', payload: "true"})
      } 
   }

   function setResultQuantity(event) {
      console.log(`Event: ${event}`)
      props.dispatch({type: 'SET_RESULT_QUANTITY', payload: event.target.value})
      console.log(`setting to ${event.target.value}`)
   }

   function setSearchBy(event) {
      props.dispatch({type: 'SET_SEARCH_BY', payload: event.target.value})
   }


   return (
      <React.Fragment>
         <div id="mobile_get_suggestions" onClick={getSuggestions}>Get suggestions!</div>

         {
            <div id="collected_movies_container">  

               <div id="collected_movies_controls">
                  {/* Input "value" properties here must match movie object keys */}
                  <form id="collected_movies_form">
                     <label>Find by: </label>

                     <div>
                        <label>
                           User rating
                           <input 
                              type="radio" 
                              id="radio_rating" 
                              value="user_rating" 
                              defaultChecked
                              name="findby"
                              onClick={setSearchBy}
                           />
                        </label>
                        &nbsp;&nbsp;
                        <label>
                           Popularity
                           <input 
                              type="radio" 
                              id="radio_pop" 
                              value="popularity" 
                              label="Popularity"
                              name="findby"
                              onClick={setSearchBy}
                           />
                        </label>
                     </div>

                     <label>
                        Number of results:
                        <input 
                           id="results_count" 
                           type="text" 
                           placeholder="5"
                           onChange={setResultQuantity}
                        />
                     </label>

                  </form>
                  <div>
                     <button 
                        // Imported function - sets suggestions to listedMovies state
                        onClick={() => { getSuggestions() }}
                     >Find Suggestions</button>
                  </div>
               </div>

               <div id="collected_movies_list">
                  {/* <div id="mobile_list_head">
                     <div>Title:</div>
                     <div>Get suggestions!</div>
                  </div> */}
                  {
                     props.collectedMovies[0] !== undefined ?
                     props.collectedMovies.map( (movie, index) => {
                        return (
                           <div className="collected_movie_listing" key={index}>
                              <div className="listing_title">{ movie.title ? ellipsizeTitle(movie.title) : "-title data missing-" }</div>
                              <div className="remove_button" onClick={ () => { removeMovieSelection(movie) } }>Remove</div>
                           </div>
                        )
                     })
                     :
                     <div id="add_movies_below">Add some movies below</div>
                  }
               </div>
            </div>
         }
         
      </React.Fragment>
   )
}

let mapStateToProps = (state) => {
   return {
      collectedMovies: state.collectedMovies,
      resultQuantity: state.resultQuantity,
      searchBy: state.searchBy,
   }
}

export default connect(mapStateToProps)(CollectedMovies)