import React from 'react'


let MovieDetails = (props) => {
    function getImageURL(path) {
        let url = props.baseImageUrl + 'w780' + path
        return url
    }
    

    if (props) {
        return (
            <div>
                <img id="movie_backdrop" src={getImageURL(props.movie.backdrop_path)} />
                {props.movie.original_title}
                
            </div>
        )
        
    }
    else return
}

export default MovieDetails


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