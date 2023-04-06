<template>
    <table>
        <tr>
            <th>Department Name</th>
            <th>Number of Ideas submitted</th>
        </tr>
        <tr v-for="department in departments">
            <td>{{department.id}}</td>
            <td>{{department.name}}</td>
        </tr>
        <tr>
            <td>Jean</td>
            <td>2</td>

        </tr>
        <tr>
            <td>John</td>
            <td>3</td>
        </tr>
    </table>

</template>

<script>
import axios from  'axios';
export default {
    data() {
      return {
        departments: [
          { id: 1, name: 'IT'},
        ]
      }
    },
    computed: {
    submittedIdea(){
        return this.idea.ideas;
    }
}
}
</script>


Style here (css):
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat|Open+Sans|Roboto');
*{
 margin: auto;
 padding: 0;
 outline: 0;
}
.filter{
 left: 0;
 top: 0;
 bottom: 0;
 right: 0;
 z-index: 1;
 background: rgb(233,76,161);
background: -moz-linear-gradient(90deg, rgba(233,76,161,1) 0%, rgba(199,74,233,1) 100%);
background: -webkit-linear-gradient(90deg, rgba(233,76,161,1) 0%, rgba(199,74,233,1) 100%);
background: linear-gradient(90deg, rgba(233,76,161,1) 0%, rgba(199,74,233,1) 100%);
filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#e94ca1",endColorstr="#c74ae9",GradientType=1);
opacity: .7;
}
table{
margin: 0px auto;
 z-index: 2;
 left: 50%;
 top: 50%;
 width: 80%; 
 border-spacing: 0;
 box-shadow: 0 2px 15px rgba(64,64,64,.7);
 border-radius: 12px 12px 0 0;
 overflow: hidden;

}
td , th{
 padding: 15px 20px;
 text-align: center;
 

}
th{
 background-color: #ba68c8;
 color: #fafafa;
 font-family: 'Open Sans',Sans-serif;
 font-weight: 200;
 text-transform: uppercase;

}
tr{
 width: 100%;
 background-color: #fafafa;
 font-family: 'Montserrat', sans-serif;
}
tr:nth-child(even){
 background-color: #eeeeee;
}
</style>
