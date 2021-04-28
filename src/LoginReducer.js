const init = {
    webtoken: "",
    account:"Guest"
}

export default function LoginReducer(state = init, action){
    if(action.type === 'SETTOKEN'){
        return {
            webtoken:action.val.webtoken,
            account:action.val.account
        }
    }else if(action.type === 'CLEARTOKEN'){
        return {
            webtoken:"",
            account:"Guest"
        }
    }
    return state;
}