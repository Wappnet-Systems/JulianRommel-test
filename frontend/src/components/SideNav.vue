<template>
<div class="flex justify-center">
    <div class="pt-20 flex flex-col text-2xl mx-auto space-y-6 text-offgray">
        <SidenavLink v-for="link in links" :key="link.nav" :name="link.nav" :to="link.to" :icon="link.icon"  />
        <SidenavLink v-if="!this.$store.getters.loggedIn" :name="'Login'" :to="'/login'" :icon="'login'"  />
        <SidenavLink v-if="this.$store.getters.loggedIn" @click="logOut()" :name="'Log out'" :to="'/login'" :icon="'logout'"  />
        <div class="absolute bottom-4 left-0 text-lg w-full flex justify-center">
            <span id="copyright">&#169; Michael Kramer</span>
        </div>
        
    </div>
</div>
</template>

<script>
import SidenavLink from '@/components/SidenavLink.vue'

export default({
    name: 'SideNav',
    components:{
        SidenavLink
    },
    data(){
        return{
            links: [
                {nav: 'Freigaben', to: '/', icon: 'share'},
                {nav: 'News', to: '/news', icon: 'notifications'},
                {nav: 'Upload', to: '/upload', icon: 'add'},
                {nav: 'Dokumente', to: '/dokumente', icon: 'description'},
                {nav: 'Impressum', to: '/impressum', icon: 'policy'},
                {nav: 'Datenschutz', to: '/datenschutz', icon: 'security'}
            ]
        }
    },
    methods: {
    logOut() {
      localStorage.removeItem("refreshToken");
      window.location.reload();
    }
  },
})
</script>


<style>
/* #copyright{
    transform: translateX(-50%);
} */
</style>