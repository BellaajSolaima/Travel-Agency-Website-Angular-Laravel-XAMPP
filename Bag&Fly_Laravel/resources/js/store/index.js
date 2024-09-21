import { createStore } from 'vuex'
import Userstore from './modules/userFeature'
import createPersistedState from 'vuex-persistedstate';

export default createStore({
modules: {
    Userstore
},
plugins: [createPersistedState()],
})