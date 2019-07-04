<template>
<div class="loginContainer">
  <h1>Sessions</h1>
</div>
</template>

<script>
export default {
  data () {
    return {      
      activeUsers: []
    }
  },
  methods: {
    log(obj){
        console.log(obj);
    }
  },
  mounted() {
    const socket = io('http://localhost:3000');
  },
}
</script>

<style scoped>

</style>
