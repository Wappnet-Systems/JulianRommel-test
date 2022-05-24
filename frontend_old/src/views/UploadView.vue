<template>
    <div class="mx-auto">
        <div action="" class="flex flex-col items-center space-y-10 mt-32 max-w-md mx-auto">
            <h2 class="text-2xl">Datei freigeben</h2>
            <div class="space-y-7 flex flex-col w-full">
                <div class="flex flex-col">
                    <label class="inline-flex items-center mt-3">
                        <input v-model="uploadTo" type="radio" name="upload-to" value="freigaben" class="form-radio h-5 w-5 " checked><span class="ml-2 text-jet">Freigabe</span>
                    </label>
                    <label class="inline-flex items-center mt-3">
                        <input v-model="uploadTo" type="radio" name="upload-to" value="documents" class="form-radio h-5 w-5 "><span class="ml-2 text-jet">Dokument</span>
                    </label>
                </div>
                <div>
                    <input :disabled="uploadTo == 'documents'" id="client" type="text" list="clients" placeholder="Mandant" v-model="client" class="px-4 py-2 w-full block border-jet border focus:outline-none focus:ring-2 text-lg disabled:opacity-30 disabled:cursor-not-allowed">
                    <datalist id="clients">
                        <option value="172268"></option>
                        <option value="172269"></option>
                    </datalist>
                </div>
                <div id="uploadField">
                    <input type="file" ref="file" class="w-full" v-on:change="handleFileUpload()">
                </div>
            </div>
            <button type="button" class="py-2 border rounded bg-green-500 text-white px-6 text-lg focus:ring" @click="submitFile()">Upload</button>
            <progress v-if="uploadPercentage != 0" id="file" max="100" :value="uploadPercentage" class="w-full rounded bg-red-400"></progress>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

export default({
    name: 'UploadView',
    data(){
        return{
            file: '',
            client: '',
            uploadPercentage: 0,
            uploadTo: '',
        }
    },
    methods:{
        handleFileUpload(){
            this.file = this.$refs.file.files[0]
        },
        submitFile(){
            let formData = new FormData()
            formData.append('file', this.file)
            formData.append('name', this.file.name)
            let apiUrl = 'http://localhost:8000/api/files/upload/'

            if (this.uploadTo == 'documents') {
                formData.append('client', this.client)
                apiUrl = 'http://localhost:8000/api/documents/upload/'
            }

            axios.post(apiUrl,
            formData,
            {
                headers:{
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer '+ this.getAccessToken
                },
                onUploadProgress: function(progressEvent){
                    this.uploadPercentage = parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100))
                }.bind(this)
            })
            .catch(error => {
                if(error.response.status == 401){
                    this.$store.dispatch('refreshAccessToken')
                }
            })
        },
        refreshToken(){
            this.$store.dispatch('refreshAccessToken')
            .then(() => {
                console.log(this.getAccessToken)
            })

        }
    },
    computed:{
        getAccessToken(){
            return this.$store.state.accessToken
        }
    }
    
})
</script>
