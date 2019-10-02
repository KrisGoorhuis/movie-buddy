const apiKey = '96c93cbe1f7f5d946e3d9ec59e21b9ed'


function findMostPopularGenre(movies) {
   let allGenreIds = []
   let popularGenreObjects = []
   let mostPopularGenre = []

   // Add all the genre ids to an array, including duplicates
   movies.forEach(movie => { 
      movie.genre_ids.forEach( (id) => { allGenreIds.push(id) })
   })

   // Find the number of occurrences of each genre id
   allGenreIds.forEach( (thisGenreId) => {
      let genreFound = false

      console.log("popular genres")
      console.log(popularGenreObjects)

      popularGenreObjects.forEach( (obj) => {
         console.log(obj.id + " " + thisGenreId)
         if (obj.id === thisGenreId) {
            obj.count ++
            genreFound = true
         }
      })

      if (!genreFound) {
         popularGenreObjects.push({"id": thisGenreId, "count": 1})
      }
   })

   console.log(popularGenreObjects)
}

function getMoviesInGenre(genreId) {
   
}

async function getSuggestibleMovies(movies) {
   let suggestions = []
   let mostPopularGenreId = await findMostPopularGenre(movies)
   let moviesInGenre = await getMoviesInGenre(mostPopularGenreId)

   return suggestions
}


module.exports = {
   getSuggestibleMovies: getSuggestibleMovies
}




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