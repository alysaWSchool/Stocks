<template>
    <div class="container">
        <md-content class="md-elevation-1" id="login">
            <h1>Login</h1>
          
            <md-field>
                <label>Username</label>
                <md-input v-model="input.username"></md-input>
            </md-field>
            <md-field>
                <label>Password</label>
                <md-input v-model="input.password" type="password"></md-input>
            </md-field>
            <ErrorMessage  :msg="error"/>

            <md-button class="md-dense md-raised md-primary" v-on:click="login()">Login</md-button>

        </md-content>
    </div>
    
</template>


<script>
    import ErrorMessage from '../components/ErrorMessage.vue'
    
    export default {
        name: 'Login',
        components: {
            ErrorMessage
        },
        data() {
            return {
                input: {
                    username: "",
                    password: ""
                },
                error: null
            }
        },
        methods: {
            login() {
                this.error=null;
                if(this.input.username != "" && this.input.password != "") { 
                    if(this.input.username == this.$parent.mockAccount.username && this.input.password == this.$parent.mockAccount.password) {
                        //  both not empty input, and username and/or password match 
                        this.$emit("authenticated", true);// show the nav bar
                        this.$store.commit("setAuthentication", true);// this allows the redirect to happen
                        this.$router.replace({ name: "history", params:{auth:true} });// redirect to / history
                    } else {
                        // both not empty but dont match
                        this.error="The username and / or password is incorrect"
                        console.log("The username and / or password is incorrect");
                    }
                } else {
                    // input empty
                    this.error="A username and password must be present"
                    console.log("A username and password must be present");
                }
            }
        }
    }
</script>

<style scoped>
    #login {
        width: 500px;
        border: 1px solid white;
        background-color: white;
        margin: auto;
        padding: 20px;
        text-align: center;
       

    }
    .container{
        padding-top:10%;
        height:100vh;
        background-image: url("../assets/bg.jpg");
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;


    }
    @media only screen and (max-width: 600px) {
        #login {
            width: 100%;

        }
    }
</style>