<template>
<br>
Id: {{ details.id }}
<br>
Title: {{ details.title }}
<br>
Body: {{ details.body }}
<br>
User id: {{ details.user_id }}

</template>

<script>
import axios from  'axios';

export default {
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
