export default {
    async contactCoach(context,payload){
        const newRequest = {
            email: payload.email,
            message: payload.message,
        }
        
        const response = await fetch(`https://coach-finder-78532-default-rtdb.asia-southeast1.firebasedatabase.app/requests/${payload.coachId}.json`,{
            method: 'POST',
            body: JSON.stringify(newRequest)
        });

        const responseData = await response.json();

        if(!response.ok){
            const error = new Error(responseData.messae || 'Failed to submit request.');
            throw error;
         }

        newRequest.id= responseData.name,
        newRequest.coachId= payload.coachId,
         

        context.commit('addRequest',newRequest);
    },


    async fetchRequests(context){
        const userId = context.rootGetters.userId;
        const token = context.rootGetters.token;  

        const response = await fetch(`https://coach-finder-78532-default-rtdb.asia-southeast1.firebasedatabase.app/requests/${userId}.json?auth=${token}`);

         const responseData = await response.json();

        if(!response.ok){
            const error = new Error(responseData.error || 'Failed to fetch requests.');
            throw error;
         }

        const requests = [];

        for(const key in responseData){
            const request = {
                id:key,
                coachId: userId,
                email: responseData[key].email,
                message: responseData[key].message,
            };
            requests.push(request);
        }

        context.commit('setRequests',requests);
    }

}