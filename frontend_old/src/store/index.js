import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
    state() {
        return{
            accessToken: null,
            refreshToken: null,
            loggedIn: false,
            client: null,
            isAdmin: false,
        }
    },
    mutations: {
        updateStorage(state, {access, refresh}){
            state.accessToken = access
            state.refreshToken = refresh
        },
        updateAccessToken(state, token){
            state.accessToken = token
        },
        updateRefreshToken(state, token){
            state.refreshToken = token
        },
        updateProfile(state, {client, isAdmin}){
            state.client = client
            state.isAdmin = isAdmin
        },
        updateLoggedIn(state, loggedIn){
            state.loggedIn = loggedIn
        }
    },
    actions: {
        userLogin(context, credentials){
            return new Promise((resolve, reject) => {
                axios.post("http://localhost:8000/api/token/", credentials)
                .then(response => {
                    context.commit('updateStorage', {access: response.data.access, refresh: response.data.refresh})
                    context.commit('updateLoggedIn', true)
                    localStorage.setItem('refreshToken', response.data.refresh);
                    resolve()
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        verifyAccessToken(context){
            return new Promise((resolve, reject) => {
                return axios.post("http://localhost:8000/api/token/verify/", {"token": context.state.accessToken}, {
                    headers:{
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    context.commit('updateLoggedIn', true)
                    resolve(response)
                })
                .catch(error => {
                    context.commit('updateLoggedIn', false)
                    reject(error)
                })
            })
        },
        refreshAccessToken(context){
            return new Promise((resolve, reject) => {
                axios.post("http://localhost:8000/api/token/refresh/", {"refresh": context.state.refreshToken}, {
                    headers:{
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    context.commit('updateAccessToken', response.data.access)
                    context.commit('updateLoggedIn', true)
                    resolve()
                })
                .catch(error => {
                    context.commit('updateLoggedIn', false)
                    reject(error)
                })
            })
        },
        fetchRefreshToken(context){
            context.commit('updateRefreshToken', localStorage.getItem('refreshToken'))
        },
        // rename to fetchProfile
        getProfile(context){
            return new Promise((resolve, reject) => {
                axios.get("http://localhost:8000/api/profile/", {
                    headers:{
                        'Authorization': 'Bearer '+ context.state.accessToken
                    }
                })
                .then(response => {
                    context.commit('updateProfile', {client: response.data.client, isAdmin: response.data.isAdmin})
                    resolve()
                })
                .catch(error => {
                    reject(error)
                })

            })
        }
    },
    getters: {
        loggedIn(state){
            return state.accessToken != null
        },
        getRefreshTokenState(state){
            return state.refreshToken != null
        },
        isAdmin(state){
            return state.isAdmin != null
        },
    },
    modules: {
    },
})
