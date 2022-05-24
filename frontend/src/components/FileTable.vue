<template>
<table class="w-full">
    <tr class="bg-kblue text-lg text-offgray">
        <th></th>
        <th class="py-4 text-left font-normal">Name</th>
        <th class="py-3 text-left font-normal">Datum</th>
        <th class="py-3 font-normal">Heruntergeladen</th>
        <th class="py-3 font-normal">Download</th>
    </tr>
    <tr v-for="file in files" :key="file" class="border-b text-xl">
        <td class="py-3 pl-3">
            <img :src="'/img/'+file.type+'.svg'" alt="" class="w-10">
        </td>
        <td class="py-3">
            <div class="w-full whitespace-nowrap overflow-ellipsis overflow-hidden">
                {{file.name}}
            </div>
        </td>
        <td class="py-3">{{file.date}}</td>
        <td v-if="file.downloaded" class="py-3">
            <img src="/img/checkmark.svg" alt="" class="mx-auto">
        </td>
        <td v-else class="py-3"></td>
        <td class="py-3 text-center">
            <a v-bind:href="'http://localhost:8000/api/files/download/'+file.id" @click="refreshFiles">
                <span class="material-icons-outlined text-3xl my-auto cursor-pointer">
                    file_download
                </span>
            </a>
        </td>
    </tr>
</table>    
</template>

<script>

export default({
    name: 'FileTable',
    props:{
            files: Array,
    }
})
</script>
