<template>
  <home-grid />
</template>

<script>
  import HomeGrid from '../components/HomeGrid'

  export default {
    name: 'Home',

    components: {
      HomeGrid,
    },
  }
</script>

<style >
html {
  overflow: auto;
}
</style>
