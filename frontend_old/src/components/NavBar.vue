<template>
<nav id="nav" class="flex justify-between py-3 px-16 shadow-sm border-b">
    <h1 class="text-3xl leading-none my-auto font-semibold">{{currentRouteName}}</h1>
    <router-link v-if="!this.$store.getters.loggedIn" to="/login" tag="button" class="py-2 border rounded bg-green-500 text-white px-6 text-lg focus:ring">Login</router-link>
    <div v-else class="flex">
        <span class="flex py-2 px-5 text-lg bg-green-500 border rounded text-white space-x-3 cursor-pointer focus:ring-2">
            <span class="text-white font-bold">
                {{this.$store.state.client}}
            </span>
            <span class="material-icons-outlined text-lg my-auto leading-1">
                expand_more
            </span>
        </span>
    </div>
</nav>
</template>

<script>

export default({
    name: 'Navbar',
    computed:{
        currentRouteName() {
            return this.$route.name;
        }
    }
})
</script>
