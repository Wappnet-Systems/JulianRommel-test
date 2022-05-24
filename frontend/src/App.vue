<template>
<div class="container flex h-screen border-r mx-auto overflow-y-scroll">
    <div class="w-80 flex-shrink-0"></div>
    <aside class="h-full w-80 bg-kblue flex-shrink-0 fixed">
        <img src="@/assets/img/logo_blue.png" alt="MK Steuerberatung Logo" class="w-full">
        <SideNav/>
    </aside>
    <section class="w-full">
        <NavBar/>
        <main class="px-16 pt-14">
            <router-view></router-view>
        </main>
    </section>
    
</div>
</template>

<script>
    import NavBar from './components/NavBar.vue'
    import SideNav from './components/SideNav.vue'

    export default{
        components:{
            NavBar,
            SideNav
        },
        methods:{
        

        },
        beforeMount(){
        
        }
    }
</script>

<style>
</style>
