<template>
    <div>
        <h2 class="text-2xl mb-5">Alle Dokumente</h2>
        <div class="flex flex-wrap gap-3 items-start justify-between">
            <DocumentCard v-for="doc in documents" :key="doc.id" :name="doc.name" :date="doc.date" class="flex-1" />
            <!-- <DocumentCard v-for="doc in documents" :key="doc.id" :name="doc.name" :date="'01.01.2021'" class="flex-1" />
            <DocumentCard v-for="doc in documents" :key="doc.id" :name="doc.name" :date="'01.01.2021'" class="flex-1" />
            <DocumentCard v-for="doc in documents" :key="doc.id" :name="doc.name" :date="'01.01.2021'" class="flex-1" />
            <DocumentCard v-for="doc in documents" :key="doc.id" :name="doc.name" :date="'01.01.2021'" class="flex-1" />
            <DocumentCard v-for="doc in documents" :key="doc.id" :name="doc.name" :date="'01.01.2021'" class="flex-1" /> -->
            <div class="flex flex-1" style="flex-basis: 25%;"></div>
        </div>

    </div>
</template>

<script>
    import axios from 'axios'
    import DocumentCard from '../components/DocumentCard.vue'

export default({
    name: 'DocumentsView',
    components:{
        DocumentCard
    },
    data(){
        return{
            documents: '',
        }
    },
    methods:{   
        getDocuments(){
            axios.get('http://localhost:8000/api/documents/', {
                // headers:{
                //     'Authorization': 'Bearer ' + this.$store.state.accessToken
                // }
            })
            .then(response => {
                this.documents = response.data
                console.log("this.documents" , this.documents);
            })
        },
    },
    beforeMount(){
        this.getDocuments()
    }
})
</script>
