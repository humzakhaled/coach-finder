export default {
    requests(state){
        return state.requests;
        // return state.requests.filter(request => request.coachId === userId);
    },

    hasRequests(_,getters){
        return getters.requests && getters.requests.length > 0;
    }
}