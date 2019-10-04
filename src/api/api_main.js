const apiKey = '96c93cbe1f7f5d946e3d9ec59e21b9ed'

async function getSuggestableMovies(userChoices) {
   let suggestions = []

   let mostPopularGenresIDs =  findMostPopularGenres(userChoices)
   await getMoviesInGenres(mostPopularGenresIDs)
      .then( async (moviesInGenres) => {
         suggestions = moviesInGenres;

         // Remove suggestions that exist in the user's selection box.
         // We're iterating backward through suggestions so .splice doesn't mess with indexes
         for (var i = suggestions.length-1; i >= 0; i--) {
            for (var j = 0; j < userChoices.length; j++) {
               if (suggestions[i].id === userChoices[j].id) {
                  console.log(`Removing ${suggestions[i].title} (${i}) from suggestions list`)
                  suggestions.splice(i, 1);
               }
            }
         }
      })

   console.log("Returning suggestions: ")
   console.log(suggestions)
   suggestions.forEach((movie) => {
      console.log(movie.title)
   })
   return suggestions
}


function findMostPopularGenres(movies) {
   let allGenreIds = []
   let popularGenreObjects = []
   let highestGenreOccurrence = 0;
   let mostPopularGenres = []

   // Add all the genre ids to an array, including duplicates
   movies.forEach(movie => { 
      movie.genre_ids.forEach( (id) => { allGenreIds.push(id) })
   })

   // Find the number of occurrences of each genre id
   allGenreIds.forEach( (thisGenreId) => {
      let genreFound = false

      // If a genre has an object, increment its count. 
      popularGenreObjects.forEach( (obj) => {
         if (obj.id === thisGenreId) {
            obj.count ++
            genreFound = true
         }
      })
   
      // Otherwise create that object.
      if (!genreFound) {
         popularGenreObjects.push({"id": thisGenreId, "count": 1})
      }
   })
   console.log("popular genres objects")
   console.log(popularGenreObjects)

   // Place most popular genres in an array. Can be one, can be several if there is a tie.
   popularGenreObjects.forEach( (obj) => {
      if (obj.count > highestGenreOccurrence) {
         highestGenreOccurrence = obj.count
      }
   })
   popularGenreObjects.forEach( (obj) => {
      if (obj.count === highestGenreOccurrence) {
         mostPopularGenres.push(obj.id)
      }
   })

   if (highestGenreOccurrence === 1) {
      return null
   }

   return mostPopularGenres
}

// Returns a single array of all movies in all genres
async function getMoviesInGenres(genreIds) {
   let movies = []

   function buildAddress(id) {
      return `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1&with_genres=${id}`
   }

   await Promise.all(genreIds.map( async (id) => {
      await fetch(buildAddress(id))
         .then( response => response.json())
         .then( data =>  {
            
            data.results.forEach( (movie) => { movies.push(movie)})
            return movies
         })
   }))
   console.log("moviesInGenres2")
   console.log(movies)
   return movies
}


export default getSuggestableMovies




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