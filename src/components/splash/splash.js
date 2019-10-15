import React, { useEffect } from 'react';
import './splash.css';
import { connect } from 'react-redux';

let Splash = (props) => {
   let splashMessage = `Showing results prioritizing ${props.searchBy}, from common genre(s): `
   splashMessage = splashMessage.replace("_", " ")

   useEffect(() => {
      console.log("Updating splash")
      if (props.displayingSuggestions) {
         props.suggestionGenres.forEach((suggestionGenreId) => {
            props.genreList.forEach((genreListItem) => {
               if (suggestionGenreId === genreListItem.id) {
                  console.log("match")
                  console.log(genreListItem.name)
                  splashMessage += genreListItem.name
                  splashMessage += " "
               }
            })
         })
      }
      console.log(splashMessage)
      props.dispatch({type: 'SET_SPLASH_MESSAGE', payload: splashMessage})
      
   }, [props.displayingSuggestions]) 
   
   

   return (
      <div id={"splash_container"}>
         {
            props.displayingSuggestions ? 
            <div id="suggestion_information">
               {
                  props.splashMessage
               }
            </div>
            :
            <div id="splash_instructions_container">
               <ul id="splash_instructions">
                  <li> 1) Add some favorites </li>
                  <li> 2) Hit Get Suggestions </li>
                  <li> 3) Enjoy your next flick! </li>
               </ul>
            </div>
         }
      </div>
   )
}

let mapStateToProps = (state) => {
   return {
      displayingSuggestions: state.displayingSuggestions,
      genreList: state.genreList,
      searchBy: state.searchBy,
      suggestionGenres: state.suggestionGenres,
      splashMessage: state.splashMessage
   }
}

export default connect(mapStateToProps)(Splash)