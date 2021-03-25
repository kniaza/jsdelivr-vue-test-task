<template>
  <div id="app">
    <b-container fluid="md" class="border my-5 p-5 w-50">
      <Search />
      <hr />
      <Loader />
    </b-container>
  </div>
</template>

<script>
import Search from './components/header/Search.vue'
import Loader from './components/common/Loader.vue'
export default {
  name: 'App',
  components: { Search, Loader },
}
</script>

<style lang="scss"></style>
