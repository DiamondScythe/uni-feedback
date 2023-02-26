<template>
    <form>
        <br>
        <label>Post title </label>
        <input type="text" required v-model="title">
        <br>
        <label>Post body </label>
        <input type="text" required v-model="body">
        <br>
        <label>Idea type:</label>
        <select v-model="type">
            <option value="facilities">Facilities</option>
            <option value="staff">Staff</option>
        </select>
        <br>
        <button>Post</button>
    </form>

    <p>Title: {{ title }}</p>
    <p>Body: {{ body }}</p>
    <p>Type: {{ type }}</p>
</template>

<script>

export default {
    beforeUpdate(){
        console.log("before Updated!")
    },
    data(){
        return{
            title: '',
            body: '',
            type: '',
        }
    }
}
</script>

<style>

</style>