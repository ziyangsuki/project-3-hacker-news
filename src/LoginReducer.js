const init = {
    token: "",
}

export default function LoginReducer(state = init, action){
    if(action.type === 'SETTOKEN'){
        return {
            token:action.val
        }
    }
    return state;
}