import React from 'react'; 
import './topbar.css'; 
import CollectedMovies from './collected-movies/collected-movies.js'
import { connect } from 'react-redux'


let Topbar = () => {
   // localStorage.setItem("Test", "answer");
   // let thing = localStorage.getItem("Test");
   // console.log(thing);


   return (
      <div id="navbar_container">
         <div id="navbar_content">
            Movie Buddy Maybe!
            <div id="search_container">
               <button id="advanced_button"></button>
               <input id="search_input" type="text" placeholder="Title" />
               <button id="search_button" type="submit"></button>
            </div>
            <CollectedMovies />
            <div id="advanced_search">
               <input name="actor"></input>
               <input name="title"></input>
               <input name="year"></input>
               <input name="genre"></input>
            </div>
         </div>
      </div>
   )
}

let mapStateToProps = () => {
   return {

   }
}

export default connect(mapStateToProps)(Topbar)