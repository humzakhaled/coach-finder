export default{
    userId(state){
        return state.userId;
    },

    token(state){
        return state.token;
    },

    tokenExpiration(state){
        return state.tokenExpiration;
    },

    isAuthenticated(state) {
        return state.token !== null && state.token !== undefined;
    },

    autoLogout(state){
        return state.autoLogout;
    }
}
