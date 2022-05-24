<template>
<div class="flex space-x-5 hover:text-jet" v-bind:class="{'text-jet font-semibold': $route.path == to}">
    <span class="material-icons-outlined text-3xl">
        {{icon}}
    </span>
    <router-link :to="to" class="text-3xl leading-1">{{name}}</router-link>
</div>
</template>

<script>

export default({
    name: 'SidenavLink',
    props: {
        name: String,
        to: String,
        icon: String,
    },
})
</script>
