<template>
<div class="container flex h-screen border-r mx-auto overflow-y-scroll">
    <div class="w-80 flex-shrink-0"></div>
    <aside class="h-full w-80 bg-kblue flex-shrink-0 fixed">
        <img src="@/assets/img/logo_blue.png" alt="MK Steuerberatung Logo" class="w-full">
        <Sidenav/>
    </aside>
    <section class="w-full">
        <Navbar/>
        <main class="px-16 pt-14">
            <router-view/>
        </main>
    </section>
    
</div>
</template>

<script>
    import Navbar from './components/Navbar.vue'
    import Sidenav from './components/Sidenav.vue'

    export default{
        components:{
            Navbar,
            Sidenav
        },
        methods:{
        

        },
        beforeMount(){
        
        }
    }
</script>

<style>
</style>
