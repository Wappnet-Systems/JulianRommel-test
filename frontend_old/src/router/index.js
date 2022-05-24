import { createRouter, createWebHistory } from 'vue-router'
import Freigaben from '../views/Freigaben.vue'
import Login from '../views/Login.vue'
import Upload from '../views/Upload.vue'
import store from '../store'
import News from '../views/News.vue'
import Documents from '../views/Documents.vue'
import Impressum from '../views/Impressum.vue'
import Datenschutz from '../views/Datenschutz.vue'

const routes = [
  {
    path: '/',
    name: 'Freigaben',
    component: Freigaben,
    meta: {requiresAuth: true}
},
{
    path: '/news',
    name: 'News',
    component: News,
    meta: {requiresAuth: true}
},
{
    path: '/upload',
    name: 'Upload',
    component: Upload,
    meta: {
        requiresAuth: true,
        requiresAdmin: true,
    }
},
{
    path: '/Dokumente',
    name: 'Dokumente',
    component: Documents,
    meta:{
        requiresAuth: false,
        requiresAdmin: false,
    }
},
{
    path: '/impressum',
    name: 'Impressum',
    component: Impressum
},
{
    path: '/datenschutz',
    name: 'Datenschutz',
    component: Datenschutz
},
{
    path: '/login',
    name: 'Login',
    component: Login
},
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {

    // Check if user is already logged in
    store.dispatch('fetchRefreshToken') // Get refresh token from local storage
    .then(() => {
        if(store.getters.getRefreshTokenState){ // Check if there is a refresh token in local storage
            store.dispatch('refreshAccessToken') // ^ If yes, get the access token and the users profile data
            .then(() => {
                store.dispatch('getProfile')
                // this.$router.push(this.$route.query.redirect) // Redirect to previous page
                next()
            })
        }else{
            // If there is no refresh token, check if login is required
            if(to.matches.some(record => record.meta.requiresAuth)){
                next({
                    path: '/login',
                    query: {required: to.fullPath}
                })
            }else{
                next()
            }
        }
    })
    .catch(() => {
        next({
            path: '/login',
            query: {required: to.fullPath}
        })
    })
})

export default router
