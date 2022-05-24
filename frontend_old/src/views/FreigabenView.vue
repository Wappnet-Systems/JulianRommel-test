<template>
  <div class="space-y-24">
      <div id="new-documents">
            <h2 class="text-2xl mb-5">Neue Dokumente</h2>
        <div id="document-wrapper" class="flex max-h-64 justify-between space-x-3">
            <FileCard v-for="file in getNewFiles" :key="file" :name="file.name" :uploaded="file.date" :type="file.type" />
            
            <!-- Enable these as placeholders to keep formatting alive -> only show 4 new documents -->
            <div v-if="getNewFiles.length == 1" class="p-2" style="flex-basis: 25%;"></div>
            <div v-if="getNewFiles.length <= 2" class="p-2" style="flex-basis: 25%;"></div>
            <div v-if="getNewFiles.length <= 3" class="p-2" style="flex-basis: 25%;"></div>
        </div>
      </div>
      <div id="all-documents">
        <div class="flex justify-between items-baseline">
            <h2 class="text-2xl mb-5">Alle Dokumente</h2>
            <div class="pt-2 relative text-gray-600">
                <input v-model="searchText" class="max-w-md w-full border-2 border-gray-300 h-10 px-5 pr-16 text-xl focus:outline-none focus:ring-0 focus:border-gray-300"
                type="search" name="search" placeholder="Suche">
                <button type="submit" class="absolute right-0 top-0 mt-4 mr-3 text-offgray">
                <span class="material-icons-outlined m-0">
                    search
                </span>
        </button>
      </div>
        </div>
        <div id="document-wrapper" class="">
            <FileTable :files="searchedFiles" />
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import FileCard from '@/components/FileCard.vue'
import FileTable from '@/components/FileTable.vue'

export default {
    name: 'HomeView',
    components:{
        FileCard,
        FileTable,
    },
    data(){
        return{
            files: [],
            searchText: '',
        }
    },
    methods:{
        getFilesManager(){
            this.$store.dispatch('verifyAccessToken')
            .then(() => {
                this.getFiles()
            })
            .catch(() => {
                this.$store.dispatch('refreshAccessToken')
                .then(() => {
                    this.getFiles()
                })
            })
        },
        getFiles(){
            axios.get('http://localhost:8000/api/files/', {
                headers:{
                    'Authorization': 'Bearer ' + this.$store.state.accessToken
                }
            })
            .then(response => {
                this.files = [] // Reset files because in formatData() items are pushed one by one -> leads to double entries otherwise
                this.formatData(response.data)
            })
        },
        formatData(files){
            for (let i = 0; i < files.length; i++) {
                let file = files[i]
                file.date = file.date.slice(8, 10) + "." + file.date.slice(5, 7) + "." + file.date.slice(0, 4)
                file.type = file.name.slice(file.name.indexOf('.') + 1, file.name.length).toLowerCase()

                // Replace jpeg with jpg
                if(file.type.toLowerCase() == "jpeg"){
                    file.type = "jpg"
                }
                this.files.push(file)
            }
        },
    },
    created(){
        this.getFilesManager()
    },
    computed:{
        getNewFiles(){
            let newFiles = this.files.filter(file => file.downloaded == false)
            if (newFiles.length > 4) {
                return newFiles.slice(0, 3)
            }else{
                return newFiles
            }
        },
        searchedFiles(){
            return this.files.filter(file => file.name.toLowerCase().includes(this.searchText.toLowerCase()))
        }
    }
}
</script>
