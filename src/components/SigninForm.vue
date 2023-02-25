<template>
    <form>
        <label>Email </label>
        <input type="email" required v-model="email">
        <br>
        <label>Password </label>
        <input type="password" required v-model="password">
    </form>

    <p>Email: {{ email }}</p>
    <p>Password: {{ password }}</p>
</template>

<script>
export default {
    data(){
        return{
            email: 'mario',
            password: '',
            role: ''
        }
    }
}
</script>

<style>

</style>