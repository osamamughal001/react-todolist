const initialState = {
list: []
}

const todolistReducer = (state = initialState, action) => {
switch (action.type)
{
    case 'ADD_TODO':
    return {...state, list: state.list.concat({value: action.payload.input, isCompleted: false, id: action.payload.id})};
    case 'CLEAR_COMPLETED':
    return {...state, list: state.list.filter(value => value.isCompleted !== true)};
    case 'COMPLETED-TASK':
    return {...state, list: state.list.map((value) => {
        if(value.id !== action.payload){
        return ({value: value.value , isCompleted: value.isCompleted, id: value.id});
        }
        else {
        return ({value: value.value , isCompleted: !value.isCompleted, id: value.id});
        }
    })}
    case "SELECT_ALL":
    return {...state, list: state.list.map(value => {
        if(state.list.length !== action.payload.length){
            return ({value: value.value , isCompleted: true, id: value.id});
        }
        else
        {
            return ({value: value.value , isCompleted: false, id: value.id});
        }
    })}
    case "DELETE_TODO":
    return {...state, list: state.list.filter((value) => value.id !== action.payload)}
    default:
    return state;
}
}
export default todolistReducer;