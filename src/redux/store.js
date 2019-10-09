import { createStore } from 'redux';


const initialState = {
   selectedMovie: null,
   collectedMovies: [],
   listedMovies: [],
   baseImageUrl: '',
   genreList: [],
   searchQuery: '',
}

const reducer = (state = initialState, action) => {

   switch(action.type) {
      case('ADD_MOVIE'):
         // Just returning out of the foreach doesn't seem to exit this case?
         // So we'll go roundabout.
         let alreadyListed = false

         state.collectedMovies.forEach( (movie) => {
            if (movie.id === action.payload.id) {
               alert("Movie already listed")
               alreadyListed = true
            }
         })

         if (alreadyListed) {
            return {
               ...state
            }
         }
         
         return {
            ...state,
            collectedMovies: [...state.collectedMovies, action.payload]
         }

      case('REMOVE_MOVIE'):
         let payloadIndex = state.collectedMovies.indexOf(action.payload)

         return {
            ...state,
            collectedMovies: [
               ...state.collectedMovies.slice(0, payloadIndex),
               ...state.collectedMovies.slice(payloadIndex + 1)
            ]
         }

      case('SET_LISTED_MOVIES'):
         return {
            ...state,
            listedMovies: action.payload
         }

      case('SET_SELECTED_MOVIE'):
         return {
            ...state,
            selectedMovie: action.payload
         }

      case('SET_BASE_IMAGE_URL'):
         return {
            ...state,
            baseImageUrl: action.payload
         }
      
      case('SET_GENRE_LIST'):
         return {
            ...state,
            genreList: action.payload
         }

      case('SET_SEARCH_QUERY'):
         return {
            ...state,
            searchQuery: action.payload
         }

      default:
         return state
   }
}


const store = createStore(
   reducer, 
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store;