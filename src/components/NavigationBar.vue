<template>
    <nav>
        <div class="flex-container">
            <div class="logo">
                <router-link to="/">University Feedback</router-link>
            </div>
            <div class="menu">
                <div class="menu-item">
                <router-link to="/signup" v-if="!isSignedIn">Sign Up</router-link>
                </div>
                <div class="menu-item">
                <router-link to="/login" v-if="!isSignedIn">Login</router-link>
                <a href="" @click.prevent="logout" v-if="isSignedIn">Logout </a>
                </div>
                <div class="menu-item">
                <router-link to="/post">Post an idea</router-link>
                </div>
                <span v-if="isSignedIn">Welcome {{ userEmail }}</span>
                
            </div>
        </div>
    </nav>
</template>

<script>
    import { checkAuthStatus } from "../utils/auth.js";
    import Cookies from "js-cookie";
    

    export default {
        data() {
            return {
                isSignedIn: false,
                userEmail: "",
            };
        },
        async created() {
            //checkAuthStatus returns a promise, so you have to use await to get the value.
            //You can't use the value of a promise directly.
            const isAuthenticated = await checkAuthStatus();
            if (isAuthenticated) {
                //get user data here
                this.isSignedIn = isAuthenticated;
            } else {
                this.isSignedIn = false;
            }
        },
        mounted() {
            this.emitter.on("toggle-signedin", (isSignedIn) => {
                this.isSignedIn = isSignedIn;
            });
        },
        methods: {
            logout() {
                Cookies.remove("jwt");
                this.isSignedIn = false;
            },
        },
    };
</script>

<style>

    .flex-container {
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #1F2937;
        
    }

        .flex-container div {
            height: fit-content;
            text-align: center;
            color: white;
            background-color: #1F2937;
            
        }
        

    .logo {
        width: 200px;
        font-family: Monospace, 'Lucida Console', sans-serif;
        font-weight: bold;
        font-size: 25px;
        padding-left: 30px;
        
    }

    .menu {
        width: 300px;
        padding-right: 50px;
        font-family: Monospace, 'Lucida Console', sans-serif;
        font-size: 18px;
        

    }
    .menu-item {
        float: left;
        display: block;
        padding: 8px;        
        border-radius: 4px;
        border: 1px solid #ccc;
    }
    .menu a,
    .logo a,
    .menu router-link {
    text-decoration: none;
}
</style>
