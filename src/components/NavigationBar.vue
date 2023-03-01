<template>
    <nav>
        <div class="flex-container">
            <div class="logo">
                <router-link to="/">University Feedback</router-link>
            </div>
            <div class="menu">
                <router-link to="/login">Login</router-link> |
                <router-link to="/post">Post an idea</router-link>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
}
</script>

<style>
.flex-container {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color:#1F2937;
}

.flex-container div{
    height: fit-content;
    text-align: center;
    color: white;
    background-color: #1F2937;
}

.logo {
    width: 200px;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    font-weight: bold;
    padding-left: 30px;
}

.menu {
    width: 300px;
    padding-right: 30px;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
}
</style>