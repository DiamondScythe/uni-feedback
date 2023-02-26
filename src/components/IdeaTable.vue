<template>
    <table id="ideaTable">
        <tr>
            <th>id</th>
            <th>idea</th>
            <th>type</th>
            <th>actions</th>
        </tr>
        <tr v-for="idea in ideas">
            <th>{{idea.id}}</th>
            <th>{{idea.idea}}</th>
            <th>{{idea.type}}</th>
            <th><router-link to="/details">Details</router-link></th>
        </tr>
    </table>
</template>

<script>
export default {
    data() {
      return {
        ideas: [
          { id: 40, idea: 'Install bidets', type: 'Facilities' },
          { id: 21, idea: 'Hand sanitizers', type: 'Facilities' },
          { id: 89, idea: 'Bida', type: 'Facilities' },
          { id: 38, idea: 'Gaming room', type: 'Facilities' },
          { id: 20, idea: 'Install bidets', type: 'Facilities' },
          { id: 25, idea: 'Hand sanitizers', type: 'Facilities' },
          { id: 73, idea: 'Bida', type: 'Facilities' },
          { id: 18, idea: 'Gaming room', type: 'Facilities' },
        ]
      }
    }
}
</script>

<style>
table{
    border: 1px solid;
    width: 100%;
}
</style>