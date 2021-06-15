import {FETCH_POSTS,FETCH_PAGED_POSTS,CREATE_POST, UPDATE_POST, DELETE_POST, FETCH_PAGED_POSTS_KEYWORD, SEARCH_REQUEST, FETCH_TOTAL_POSTS} from '../types';

const initialState={
    items:[],
    item:{},
    error:'',
    loading:false,
    pagedItems:[],
    page: 0,
    pagedItemsKeyword:[],
    searchRequest:'',
    searchState: false,
    postsTotal:0
};

const postReducer=(state=initialState,action)=>{
    // console.log("Reducer posts");
    switch(action.type){
        case FETCH_POSTS:
            return {...state,
                items: action.payload.data,
                error:'',
                loading:true
            };

            case FETCH_PAGED_POSTS:
                return {...state,
                    pagedItems: action.payload.data,
                    error:'',
                    loading:true
                };

                case FETCH_TOTAL_POSTS:
                return {...state,
                    postsTotal: action.payload.data,
                };     

                case FETCH_PAGED_POSTS_KEYWORD:
                    return {...state,
                        pagedItemsKeyword: action.payload.data.content,
                        error:'',
                        loading:true
                    };
                
        
        case CREATE_POST:
            return {...state,
                error:'',
                loading:true,
                item:action.payload
            };

            case UPDATE_POST:
                return {...state,
                    pagedItemsKeyword: state.pagedItemsKeyword.map((post) => {
                  if (post.id === action.payload.id) {
                    return {
                      ...post,
                      ...action.payload,
                    };
                  } else {
                    return post;
                  }
                })}

                case DELETE_POST:
                    return {...state,
                        pagedItemsKeyword: state.pagedItemsKeyword.filter((item) => 
                        item.id !== action.payload.id),
                        postsTotal:state.postsTotal-1
                    };
                    
                        case SEARCH_REQUEST:
                            return {...state,
                                searchRequest: action.payload};
        default:
            return state;
    }
}


export default postReducer;