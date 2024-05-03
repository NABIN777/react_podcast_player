/** @format */

export const initialState = {
  playlists: [],
  playing: null,
  bannerOpen: false,
  search: null,
  language: null,
  podcasts: [],
  allPodcasts:[]
};
const musicReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PLAYLIST":
      return {
        ...state,
        playlists: action.payload,
      };
    case "SET_CURR_PLAYING":
      return {
        ...state,
        playing: action.payload,
      };
    case "SET_BANNER_OPEN":
      return {
        ...state,
        bannerOpen: action.payload,
      };
    // case "INC_TIMES_PLAYED":

    //     musicDB[action.payload].timesPlayed += 1;
    //     return state;
    case "SET_SEARCH_QUERY":
      return {
        ...state,
        search: action.payload,
      };
    case "SET_MUSIC_LIST":
      return {
        ...state,
        language: action.payload,
      };
    case "SAVE_PODCASTS":
      return {
        ...state,
        podcasts: action.payload,
      };
    
    case "SAVE_FAVOURITES_PODCASTS":
      return {
        ...state,
        favouritesPodcasts: action.payload,
      };
    case "SET_ACTIVE_PODCAST_FOR_EDIT":
      return {
        ...state,
        activePodcast: action.payload,
      };
    default:
      return state;
  }
};

export default musicReducer;
