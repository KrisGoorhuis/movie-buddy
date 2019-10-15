import React, { useEffect } from 'react'
import './detailspanel.css'
import { connect } from 'react-redux'


// This component is a child of movies.js
let DetailsPanel = (props) => {
    
    function getImageURL(path) {
        let url = props.baseImageUrl + 'w780' + path
        return url
    }

    function formatDate(date) {
        if (date === undefined) {
            return "--"
        }
        return date.slice(0, 4);
    }

    function addMovie() {
        props.dispatch({type: 'ADD_MOVIE', payload: props.selectedMovie})
    }

    function deselectMovie() {
        props.dispatch({type: 'SET_SELECTED_MOVIE', payload: null})
    }
    
    useEffect( () => {

        function escapeClose(event) {
            // 27 === escape key
            if(event.keyCode === 27) {
                props.dispatch({type: "SET_SELECTED_MOVIE", payload: null})
            }
        }

        document.addEventListener("keydown", escapeClose, false);

        return function cleanup() {
            document.removeEventListener("keydown", escapeClose, false);
        }
    }) 
    

    if (props) {
        return (
            <div 
                id="details_outer" 

                // Prevents click events on this div from "bubbling up" or being beholden to our sem-trans background in movies.js
                onClick={(event) => { event.stopPropagation() }                                              
            }>
                
                <img 
                    id="movie_backdrop" 
                    src={getImageURL(props.selectedMovie.backdrop_path)} 
                    alt="movie backdrop"
                />
               
                <div id="details_panel_container">
                    <div id="details_container_top">


                    </div>

                    <div id="details_container">
                        <h5 className="details_property" id="details_title">{props.selectedMovie.title}</h5>
                        <div id="details_subcontainer">
                            <h5 className="details_property" id="details_date">{formatDate(props.selectedMovie.release_date)}</h5>
                            <h5 className="details_property" id="details_user_rating">User rating: {props.selectedMovie.vote_average}</h5>
                            <h5 className="details_property" id="details_popularity">Popularity: {props.selectedMovie.popularity}</h5>
                            <p className="details_property" id="details_overview">{props.selectedMovie.overview}</p>
                        </div>
                    </div>       
                    <div id="details_controls">
                        <div 
                            onClick={() => deselectMovie() }>Close</div>
                        <br></br>
                        <div onClick={() => addMovie() }>Add to list</div>
                    </div>
               </div>
            </div>
        )
        
    }
    else return
}

let mapStateToProps = (state) => {
    return {
        selectedMovie: state.selectedMovie,
        baseImageUrl: state.baseImageUrl
    }
}

export default connect(mapStateToProps)(DetailsPanel)


// Each movie item contains:

// adult: false
// backdrop_path: "/6ihyJWRLEngSnlW8HKeDOH3AfSQ.jpg"
// genre_ids: (3) [28, 12, 878]
// id: 429617
// media_type: "movie"
// original_language: "en"
// original_title: "Spider-Man: Far from Home"
// overview: "Peter Parker and his friends go on a summer trip to Europe. However, they will hardly be able to rest - Peter will have to agree to help Nick Fury uncover the mystery of creatures that cause natural disasters and destruction throughout the continent."
// popularity: 301.21
// poster_path: "/lcq8dVxeeOqHvvgcte707K0KVx5.jpg"
// release_date: "2019-06-28"
// title: "Spider-Man: Far from Home"
// video: false
// vote_average: 7.7
// vote_count: 3830