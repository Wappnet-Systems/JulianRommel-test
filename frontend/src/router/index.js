import { createRouter, createWebHistory } from "vue-router";
import Freigaben from "../views/FreigabenView.vue";
import News from "../views/NewsView.vue";
import Upload from "../views/UploadView.vue";
import Documents from "../views/DocumentsView.vue";
import Impressum from "../views/ImpressumView.vue";
import Datenschutz from "../views/DatenschutzView.vue";
import Login from "../views/LoginView.vue";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "Freigaben",
    component: Freigaben,
    meta: { requiresAuth: true },
  },
  {
    path: "/news",
    name: "News",
    component: News,
    meta: { requiresAuth: true },
  },
  {
    path: "/upload",
    name: "Upload",
    component: Upload,
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: "/Dokumente",
    name: "Dokumente",
    component: Documents,
    meta: {
      requiresAuth: false,
      requiresAdmin: false,
    },
  },
  {
    path: "/impressum",
    name: "Impressum",
    component: Impressum,
  },
  {
    path: "/datenschutz",
    name: "Datenschutz",
    component: Datenschutz,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
//Check if user is already logged in
  store
    .dispatch("fetchRefreshToken")
    .then(() => {
      if (store.getters.getRefreshTokenState) {
        store
          .dispatch("refreshAccessToken") 
          .then(() => {
            store.dispatch("getProfile");
            next();
          });
      } else {
        if (to.matched.some(record => record.meta.requiresAuth)) {
            if (store.getters.getRefreshTokenState == false) {
              next({ name: 'Login' })
            } else {
              next() 
            }
          } else {
            next()
          }
      }
    })
    .catch(() => {
        next({ name: 'Login' })
   });
});

// Old take

// store.dispatch('fetchRefreshToken')
// .then(() => {
//     store.dispatch('verifyRefreshToken')

//     if(store.getters.getRefreshTokenValidity){
//         console.log('Token is valid')
//     }else{
//         console.log('Token is invalid')
//     }
// })
// .catch(() => {
//     next({
//         path: '/login',
//         query: {required: to.fullPath}
//     })
// })

// Check if user is already logged in
// store.dispatch('fetchRefreshToken') // Get refresh token from local storage
// .then(() => {
//     if(store.getters.getRefreshTokenState){ // Check if there is a refresh token in local storage
//         console.log('Token found in local storage')

//         // Check if refresh token is valid
//         store.dispatch('verifyRefreshToken')
//         console.log(store.getters.getRefreshTokenValidity)
//         if (store.getters.getRefreshTokenValidity){ // If Refresh Token is valid, get Access token and user profile
//             store.dispatch('refreshAccessToken')
//             .then(() => {
//                 store.dispatch('getProfile')
//                 // this.$router.push(this.$route.query.redirect) // Redirect to previous page
//                 next()
//             })
//         }else{
//             next({
//                 path: '/login',
//                 query: {required: to.fullPath}
//             })
//         }

//     }else{
//         console.log('No Token was found in local storage')
//         // If there is no refresh token, check if login is required
//         if(to.matches.some(record => record.meta.requiresAuth)){
//             next({
//                 path: '/login',
//                 query: {required: to.fullPath}
//             })
//         }else{
//             next()
//         }
//     }
// })
// .catch(() => {
//     next({
//         path: '/login',
//         query: {required: to.fullPath}
//     })
// })

export default router;
