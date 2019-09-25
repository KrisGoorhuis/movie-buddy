import React from 'react'; 
import './navbar.css'; 


let Navbar = () => {
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

export default Navbar;