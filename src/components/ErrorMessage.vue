<template>
   <div class="error">{{msg}}</div>
</template>

<script>
    export default {
        name: 'ErrorMesssage',
        props: {
            msg: String
        },
    }
</script>
  
<style>
  .error{
    color:red;
    font-weight: 500;
    height:20px;
  }
</style>
  