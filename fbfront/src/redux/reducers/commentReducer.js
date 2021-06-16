import { FETCH_COMMENTS, CREATE_COMMENT, UPDATE_COMMENT, DELETE_COMMENT, FETCH_PAGED_COMMENTS } from '../types';

const initialState = {
    items: [],
    item: {},
    pagedItems: [],
    page: 0,
    // error:'',
    // loading:false
};

const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COMMENTS:
            return {
                ...state,
                items: action.payload.data,
                // error:'',
                // loading:true
            };

        case FETCH_PAGED_COMMENTS:
            return {
                ...state,
                pagedItems: action.payload.data.content,
                error: '',
                loading: true
            };

        case CREATE_COMMENT:
            return {
                ...state,
                // error:'',
                // loading:true,
                item: action.payload
            };

        case UPDATE_COMMENT:
            return {
                ...state,
                items: state.items.map((comment) => {
                    if (comment.id === action.payload.id) {
                        return {
                            ...comment,
                            ...action.payload,
                        };
                    } else {
                        return comment;
                    }
                })
            }

        case DELETE_COMMENT:
            return {
                ...state,
                items: state.items.filter((item) => item.id !== action.payload.id)
            };

        default:
            return state;
    }
}


export default commentReducer;