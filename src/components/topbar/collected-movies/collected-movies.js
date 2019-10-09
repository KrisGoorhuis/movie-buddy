import React from 'react'
import './collected-movies.css'
import { connect } from 'react-redux'
import getSuggestableMovies from 'api/api_main.js'


let CollectedMovies = (props) => {

   function removeMovieSelection(movie) {
      props.dispatch({type: 'REMOVE_MOVIE', payload: movie})
   }

   async function getSuggestions() {
      let suggestions = null
      let searchBy = ''
      
      if (document.getElementById("radio_rating").checked) {
         searchBy = document.getElementById("radio_rating").value
      }
      if (document.getElementById("radio_pop").checked) {
         searchBy = document.getElementById("radio_pop").value
      }

      if (props.collectedMovies.length === 0) {
         alert("No movies collected!")
         return
      }

      suggestions = await getSuggestableMovies(props.collectedMovies, searchBy)
      

      if (suggestions === null) {
         alert("Selected movies are too few or too dissimilar to find suggestions!")
      }
      else {
         console.log("here's what we got back :D")
         console.log(suggestions)
         suggestions.forEach( (movie) => {
            console.log(movie.title)
         })
         props.dispatch({type: "SET_LISTED_MOVIES", payload: suggestions})
      } 
   }

   return (
      <React.Fragment>
         {
            <div id="collected_movies_container">  

               <div id="collected_movies_controls">
                  {/* Input "value" properties here must match movie object keys */}
                  <form>
                     <label>Find by: </label>
                     <input 
                        type="radio" 
                        id="radio_rating" 
                        value="user_rating" 
                        defaultChecked
                        name="findby"
                     />
                     <label>User rating</label>
                     <input 
                        type="radio" 
                        id="radio_pop" 
                        value="popularity" 
                        label="Popularity"
                        name="findby"
                     />
                     <label>Popularity</label>
                  </form>
                  <div>
                     <button 
                        // Imported function - sets suggestions to listedMovies state
                        onClick={() => { getSuggestions() }}
                     >Find Suggestions</button>
                  </div>
               </div>

               <div id="collected_movies_list">
                  {
                     
                     props.collectedMovies !== undefined &&
                     props.collectedMovies.map( (movie, index) => {
                        return (
                           <div className="collected_movie_listing">
                              <div className="listing_title">{ movie.title ? movie.title : "-title data missing-" }</div>
                              <div onClick={ () => { removeMovieSelection(movie) } }>Remove</div>
                           </div>
                        )
                     })
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
      forceUpdate: state.forceUpdate
   }
}

export default connect(mapStateToProps)(CollectedMovies)