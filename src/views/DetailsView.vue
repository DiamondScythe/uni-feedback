<template>
<br>
Id: {{ details.id }}
<br>
Title: {{ details.title }}
<br>
Body: {{ details.body }}
<br>
User id: {{ details.user_id }}

<Comments v-if="details.id" :idea_id="details.id"/>

</template>

<script>
import axios from  'axios';
import Comments from '../components/Comments.vue'

export default {
    components: {
        Comments,
    },
    name: 'DetailsView',
    props: ['id'],
    data(){
        return {
            details: {},
        }
    },
    mounted(){
    axios.get("http://localhost:8081/details?id="+this.id)
        .then(res => {
            this.details = res.data;
        }
        )
    }
}
</script>
