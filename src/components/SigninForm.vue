<template>
    <form @submit.prevent="handleSubmit">
        <br>
        <label>Email </label>
        <input type="email" required v-model="email">
        <br>
        <label>Password </label>
        <input type="password" required v-model="password">
        <br>
        <br>
        <button>Login</button>
    </form>

    <p>Email: {{ email }}</p>
    <p>Password: {{ password }}</p>
</template>

<script>
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

export default {
    data(){
        return{
            email: 'abc@gmail.com',
            password: '123456',
            role: ''
        }
    },
    methods: {
        handleSubmit(){
            //TODO: validate stuff here
            const auth = getAuth();
            signInWithEmailAndPassword(auth, this.email, this.password)
                .then((userCredential) => {
                    //signed in
                    const user = userCredential.user;
                    alert("Signin successful");

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(error.message)
                });
        },
    }
}
</script>

<style>

</style>