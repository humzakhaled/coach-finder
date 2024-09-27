let timer;


export default {
    
    async login(context, payload) {
        await context.dispatch('auth', {
            ...payload,
            mode: 'login',
        });
    },

    async signup(context, payload) {
        await context.dispatch('auth', {
            ...payload,
            mode: 'signup',
        });
    },

    async auth(context, payload) {
        const webApiKey = 'AIzaSyCeUk_2nxAByDLTeIoUAmu2E6DAI3QzGoA';
        const mode = payload.mode;

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';

        if (mode === 'signup') {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
        }

        try {
            const response = await fetch(url + webApiKey, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: payload.email,
                    password: payload.password,
                    returnSecureToken: true,
                }),
            });

            const responseData = await response.json();

            if (!response.ok) {
                const error = new Error(responseData.error.message || 'Failed to authenticate.');
                throw error;
            }
            
            // const expiresIn = 5000;  // dummy
            const expiresIn = +responseData.expiresIn * 1000;  // expiresIn is in seconds
            const expirationDate = new Date().getTime() + expiresIn;

            localStorage.setItem('userId', responseData.localId);
            localStorage.setItem('token', responseData.idToken);
            localStorage.setItem('tokenExpiration', expirationDate);

            context.commit('setUser', {
                userId: responseData.localId,
                token: responseData.idToken,
            });

            timer = setTimeout(()=>{
                context.dispatch('autoLogout');
            },expiresIn);

        } catch (error) {
            console.error('Authentication error:', error);
            throw error;
        }
    },

    // Auto-login logic
    tryLogIn(context) {
        const localUserId = localStorage.getItem('userId');
        const localToken = localStorage.getItem('token');
        const tokenExpiration = localStorage.getItem('tokenExpiration');

        const expiresIn = +tokenExpiration - new Date().getTime();

        if (expiresIn <= 0) {
            return;
        }

        if (localToken && localUserId) {
            context.commit('setUser', {
                userId: localUserId,
                token: localToken,
            });
        }

        //update timer with new expiry time
        timer = setTimeout(()=>{
            context.dispatch('autoLogout');
        },expiresIn);
    },


    // Logout action
    logout(context) {
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiration');

        clearTimeout(timer);
        context.commit('setUser', {
            userId: null,
            token: null,
        });
    },

    //auto logout user in case token expired
    //move user away from protected pages
    autoLogout(context){
        context.dispatch('logout');
        context.commit('setAutoLogout');
    }
};
