<template>
    <div id="card" class="flex flex-col p-2 bg-kblue">
        <span class="text-sm text-offgray">{{uploaded}}</span>
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
        uploaded: String,
        type: String,
    },
    // computed:{
    //     formatDate(){
    //         return this.uploaded.slice(0, 10)
    //     }
    // }
})
</script>

<style>
#card{
    flex-basis: 25%;
}
</style>