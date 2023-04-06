<template>
    <table>
        <tr>
            <th>id</th>
            <th>idea</th>
            <th>type</th>
            <th>actions</th>
        </tr>

        <tr v-for="idea in ideas">
            <td>{{idea.id}}</td>
            <td>{{idea.idea}}</td>
            <td>{{idea.type}}</td>
            <td><router-link to="/details">Details </router-link></td>
        </tr>
        
        <tr>
            <td>1</td>
            <td>Jean</td>
            <td>leBon</td>
            <td><router-link to="/details" tag="button">Details / </router-link>
                <router-link to="/delete" tag="button">delete / </router-link>
                <router-link to="/edit" tag="button">edit </router-link></td>
        </tr>
        <tr>
            <td>2</td>
            <td>John</td>
            <td>Wick</td>
            <td><router-link to="/details">Details</router-link></td>
        </tr>
        <tr>
            <td>3</td>
            <td>James</td>
            <td>Bond</td>
            <td><router-link to="/details">Details</router-link></td>
        </tr>
        <tr>
            <td>3</td>
            <td>James</td>
            <td>Bond</td>
            <td><router-link to="/details">Details</router-link></td>
        </tr>
        <tr>
            <td>3</td>
            <td>James</td>
            <td>Bond</td>
            <td><router-link to="/details">Details</router-link></td>
        </tr>
        <tr>
            <td>3</td>
            <td>James</td>
            <td>Bond</td>
            <td><router-link to="/details">Details</router-link></td>
        </tr>
        <tr>
            <td>3</td>
            <td>James</td>
            <td>Bond</td>
            <td><router-link to="/details">Details</router-link></td>
        </tr>
        <tr>
            <td>3</td>
            <td>James</td>
            <td>Bond</td>
            <td><router-link to="/details">Details</router-link></td>
        </tr>
        
    </table>
    {{ ideas }}
</template>