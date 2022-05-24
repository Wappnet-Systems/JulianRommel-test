<template>
    <div>
        <form v-on:submit.prevent class="flex flex-col items-center m-32 space-y-5">
            <!-- <h2 class="text-2xl">Anmelden</h2> -->
            <div>
                <!-- <label for="client">Mandantennummer</label> -->
                <input id="client" type="text" v-model="client" class="px-4 py-2 block border-gray-300 border focus:outline-none focus:ring-2 text-lg" placeholder="Mandantennummer">
            </div>
            <div>
                <!-- <label for="password">Passwort</label> -->
                <input id="password" type="password" v-model="password" class="px-4 py-2 block border-gray-300 border focus:outline-none focus:ring-2 text-lg" placeholder="Passwort">
            </div>
            <div>
                <button type="submit" @click="login" class="py-2 border rounded bg-green-500 text-white px-6 text-lg focus:ring">
                    Login
                </button>
            </div>
            <!-- <h3 class="mb-5 text-lg">Melden Sie sich mit Ihrer Mandatennummer und Ihrem Passwort an</h3> -->
        </form>
    </div>
</template>

<script>
export default({
    name: 'LoginView',
    data(){
        return{
            client: '',
            password: '',
        }
    },
    methods:{
        login(){
            this.$store.dispatch('userLogin', {
            client: this.client,
            password: this.password
            }).then(() => {
                this.$store.dispatch('getProfile')
                this.$router.push('/')
                this.$router.push(this.$route.query.redirect) // Redirect to previous page NOT WORKING
            })
        }
    },
    created(){
        // Tried doing automatic login, but /login is probably not the best place for a fully automatic login system
        // this.$store.dispatch('fetchRefreshToken') // Get refresh token from local storage
        // .then(() => {
        //     if(this.$store.getters.getRefreshTokenState){ // Check if there is a refresh token in local storage
        //         this.$store.dispatch('refreshAccessToken') // ^ If yes, get the access token and the users profile data
        //         .then(() => {
        //             this.$store.dispatch('getProfile')
        //             this.$router.push(this.$route.query.redirect) // Redirect to previous page
        //         })
        //     }
        // })
    }
    

})
</script>
