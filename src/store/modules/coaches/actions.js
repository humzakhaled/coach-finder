export default {
    async registerCoach(context,payload){
        const userId = context.rootGetters.userId;
        const token = context.rootGetters.token;

        const coachData = {
            'imageUrl':'https://placehold.co/150',
            ...payload
        }

        console.log(token);
        
        const response = await fetch(`https://coach-finder-78532-default-rtdb.asia-southeast1.firebasedatabase.app/coaches/${userId}.json?auth=${token}`,{
            method: 'PUT',
            body: JSON.stringify(coachData)
        });

        const responseData = await response.json();

        if(!response.ok){
            const error = new Error(responseData.error || 'Failed to register as a coach.');
            throw error;
        }

        context.commit('registerCoach',{
            ...coachData,
            id:userId
        });
    },

    async loadCoaches(context){

        const response = await fetch(`https://coach-finder-78532-default-rtdb.asia-southeast1.firebasedatabase.app/coaches.json`);

        const responseData = await response.json();

       if(!response.ok){
            const error = new Error(response.message || 'Failed to fecth coaches.');
            throw error;
        }

        const coaches = [];

        for(const key in responseData){
            const coach = {
                id:key,
                firstName: responseData[key].firstName,
                lastName: responseData[key].lastName,
                areas: responseData[key].areas,
                hourlyRate: responseData[key].hourlyRate,
                description: responseData[key].description,
                imageUrl: responseData[key].imageUrl,
            };
            coaches.push(coach);
        }

        context.commit('setCoaches',coaches);
    }

}