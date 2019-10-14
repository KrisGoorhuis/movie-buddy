import { createStore } from 'redux';


const initialState = {
   selectedMovie: null,
   collectedMovies: [],
   listedMovies: [],
   baseImageUrl: '',
   genreList: [],
   searchQuery: '',
   resultQuantity: 5,
   searchBy: 'user_rating',
   displayingSuggestions: false,
   suggestionGenres: [],
   splashMessage: "",
   showCollectedMovies: true,
}

// localStorage.setItem("Test", "answer");
   // let thing = localStorage.getItem("Test");
   // console.log(thing);

const reducer = (state = initialState, action) => {

   switch(action.type) {
      case('ADD_MOVIE'):
         let alreadyListed = false

         state.collectedMovies.forEach( (movie) => {
            if (movie.id === action.payload.id) {
               alert("Movie already listed")
               alreadyListed = true
            }
         })

         localStorage.setItem("collectedMovies", localStorage.getItem("collectedMovies"))

         if (alreadyListed) {
            return {
               ...state
            }
         }
         
         return {
            ...state,
            collectedMovies: [action.payload, ...state.collectedMovies] // places new additions on top
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

      case('REMOVE_ALL_MOVIES'):
         // localStorage.clear()

         return {
            ...state,
            collectedMovies: []
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

      case('SET_RESULT_QUANTITY'):
         return {
            ...state,
            resultQuantity: action.payload
         }
      case('SET_DISPLAYING_SUGGESTIONS'):
         return {
            ...state,
            displayingSuggestions: action.payload
         }
      case('SET_SEARCH_BY'):
         return {
            ...state,
            searchBy: action.payload
         }
      case('ADD_SUGGESTION_GENRE'):
         return {
            ...state,
            suggestionGenres: [...state.suggestionGenres, action.payload]
         }
      case('CLEAR_SUGGESTION_GENRES'):
         return {
            ...state,
            suggestionGenres: []
         }
      case('SET_SPLASH_MESSAGE'): 
         return {
            ...state,
            splashMessage: action.payload
         }
      case('TOGGLE_SHOW_COLLECTED_MOVIES'):
      console.log("setting to" + !state.showCollectedMovies)
         return {
            ...state,
            showCollectedMovies: !state.showCollectedMovies
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