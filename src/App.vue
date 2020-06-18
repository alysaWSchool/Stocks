


<template>
  <div id="app">
     
        <div id="nav" v-if="authenticated" >
          <h3>Stock History</h3>
          
          <router-link to="/login" v-on:click.native="logout()" replace>
              <md-button class="md-raised" id="button">Logout</md-button>
          </router-link>
        </div>

      <router-view @authenticated="setAuthenticated" />
  </div>
</template>

<script>
  export default {
      name: 'App',
      data() {
          return {
              authenticated: false,
              mockAccount: {
                  username: "mcap",
                  password: "password"
              }
          }
      },
    
      methods: {
          setAuthenticated(status) {
              this.authenticated = status;
          },
          logout() {
              this.authenticated = false;
          }
      }
  }
</script>

<style>
 
  #nav{
    background:#1d267f;
    display:flex;
    color: white;;
    padding-left:10px;
  }
  #button{
    position:absolute;
    top:0;
    right:0;
  }

</style>
