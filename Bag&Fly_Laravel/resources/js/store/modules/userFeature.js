const state = {
    user: []
};

const mutations = {
    authentificateUser(state, userData) {
        state.user=[];
        state.user.push({
            type: 'client',
            data: userData
        });
        return true;
    },
    
    
    authentificateHotel(state, hotelData) {
        state.user=[];
        state.user.push({
            type: 'hotel',
            data: hotelData
        });
        return true;
    },
    logOut(state) {
        state.user = [];
        return true;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
};
