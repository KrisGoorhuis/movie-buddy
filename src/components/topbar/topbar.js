import React from 'react'; 
import './topbar.css'; 
import CollectedMovies from './collected-movies/collected-movies.js'
import { connect } from 'react-redux'

import tmdbLogo from 'assets/tmdb-logo.svg'

const apiKey = '96c93cbe1f7f5d946e3d9ec59e21b9ed'


let Topbar = (props) => {
   // localStorage.setItem("Test", "answer");
   // let thing = localStorage.getItem("Test");
   // console.log(thing);

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

   function handleChange(event) {
      event.preventDefault()
      props.dispatch({type: 'SET_SEARCH_QUERY', payload: event.target.value})
      console.log("handle search query thing")
   }


   return (
      <div id="navbar_container">
         <div>
            Movie Buddy Maybe!
         </div>
         <div id="navbar_content">
            <form id="search_container" onSubmit={ search }>
               <button id="advanced_button"></button>
               <input id="search_input" type="text" placeholder="Search" onChange={handleChange}  />
               <button id="search_button" type="submit"></button>
            </form>
            <CollectedMovies />
            {/* <div id="advanced_search">
               <input name="actor"></input>
               <input name="title"></input>
               <input name="year"></input>
               <input name="genre"></input>
            </div> */}
         </div>
         <div>
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
      searchQuery: state.searchQuery
   }
}

export default connect(mapStateToProps)(Topbar)