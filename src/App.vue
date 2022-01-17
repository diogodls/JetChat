<template>
  <HelloWorld/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style lang="scss">
body{
  background: rgb(2,0,36);
  background: linear-gradient(146deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(38,7,146,1) 47%, rgba(164,0,255,1) 100%);
  width: 100%;
  height: 100vh;
}

</style>
