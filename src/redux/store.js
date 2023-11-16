import {createStore} from 'redux';

const initialState={
    book:[],
    currentPage:1,
    totalPages:1,
};
const rootReducer=(state=initialState,action)=>{
    // ページネーションに関するアクションを処理する
    switch(action.type){
        case 'SET_BOOKS':
            return{...state,books:action.payload.books,totalPage:action.payload.totalPages}
        case 'SET_CURRENT_PAGE':
            return{...state,currentPage:action.payload};
        default :
        return state;
    }
};
const store=createStore(rootReducer);
export default store;