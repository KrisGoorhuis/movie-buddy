import React from 'react'
import './detailspanel.css'


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
    

    if (props) {
        return (
            <div id="details_outer">
                <img id="movie_backdrop" src={getImageURL(props.movie.backdrop_path)} />
               
                <div id="details_panel_container">
                    <div id="details_container">
                        <h3 id="title">{props.movie.title}</h3>
                        <h6 id="date">{formatDate(props.movie.release_date)}</h6>
                        <p id="popularity">Popularity: {props.movie.popularity}</p>
                        <p id="overview">{props.movie.overview}</p>
                    </div>       
                    <div id="details_controls">
                        <div>Close</div>
                        <br></br>
                        <div>Add to list</div>
                    </div>
               </div>
            </div>
        )
        
    }
    else return
}

export default DetailsPanel


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