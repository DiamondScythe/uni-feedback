<template>

<PostVoting v-if="details.id" :user_id="details.user_id" :idea_id="details.id"/>
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
import PostVoting from '../components/PostVoting.vue'

export default {
    components: {
        Comments,
        PostVoting,
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
