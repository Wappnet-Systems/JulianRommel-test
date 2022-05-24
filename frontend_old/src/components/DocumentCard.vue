<template>
    <div id="card" class="flex flex-col p-2 bg-kblue max-h-64">
        <span class="text-sm text-offgray">{{date}}</span>
        <img src="/img/pdf.svg" alt="" class="h-full p-7">
        <span class="text-xl text-center pb-5 overflow-hidden overflow-ellipsis whitespace-nowrap">
            {{name}}
        </span>
    </div>
</template>

<script>

export default({
    name: 'FileCard',
    props:{
        name: String,
        date: String,
        type: String,
    },
})
</script>

<style>
#card{
    flex-basis: 25%;
}
</style>