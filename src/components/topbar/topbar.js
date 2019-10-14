import React, { useEffect } from 'react'; 
import './topbar.css'; 
import CollectedMovies from './collected-movies/collected-movies.js'
import { connect } from 'react-redux'

import tmdbLogo from 'assets/tmdb-logo.svg'

const apiKey = '96c93cbe1f7f5d946e3d9ec59e21b9ed'
// const apiKey = process.env.apiKey


let Topbar = (props) => {

   useEffect( () => {
      // Functionally the same as media width break for page load,
      // but this lets us more easily work the toggle.
      // if (window.screen.width <= 700) {
      //    props.dispatch({type: 'TOGGLE_SHOW_COLLECTED_MOVIES'})
      // }
   }, [])

   async function search(event) {
      event.preventDefault()

      let results = await fetch(buildSearchUrl(props.searchQuery))
         .then(response => response.json())
         .then(data => data.results)

      props.dispatch({type: 'SET_LISTED_MOVIES', payload: results})
   }

   function buildSearchUrl(terms) {
      let query = terms.replace(" ", "+")
      console.log("query")
      console.log(query)

      return `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
   }

   function handleSearchChange(event) {
      event.preventDefault()
      props.dispatch({type: 'SET_SEARCH_QUERY', payload: event.target.value})
      console.log("handle search query thing")
   }

   function removeAllMovies() {
      props.dispatch({type: 'REMOVE_ALL_MOVIES'})
   }

   function toggleCollectedMovies() {
      props.dispatch({type: 'TOGGLE_SHOW_COLLECTED_MOVIES'})
   } 

   return (
      <div id="topbar_container">
         <div id="topbar_title">
            Movie Buddy Maybe!
         </div>
         <div id="topbar_center">
            <div id="find_some_movies">Find your next flick.</div>
            <div id="top_controls">
               <form id="search_container" onSubmit={ search }>
                  <input id="search_input" type="text" placeholder="Search" onChange={handleSearchChange}  />
                  <button id="search_button" type="submit">Go</button>
               </form>
               <div 
                  id="remove_all" 
                  onClick={() => { removeAllMovies() }}
               >
                  Remove All ({ props.collectedMovies.length })
               </div>
               <div id="show_collected_movies" onClick={toggleCollectedMovies}>
                  { props.showCollectedMovies ? "-" : "+" }
               </div>
            </div>
            { props.showCollectedMovies ? <CollectedMovies /> : <React.Fragment /> }
         </div>
         <div id="logo_container">
            <img 
               id="tmdb_logo"
               src={tmdbLogo}
               alt="" 
            />
         </div>
      </div>
   )
}

let mapStateToProps = (state) => {
   return {
      searchQuery: state.searchQuery,
      showCollectedMovies: state.showCollectedMovies,
      collectedMovies: state.collectedMovies
   }
}

export default connect(mapStateToProps)(Topbar)