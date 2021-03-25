<template>
  <div id="app">
    <b-container fluid="md" class="border rounded my-5 p-5 w-50">
      <Search @search-submit="onSearchSubmit" />
      <hr />
      <Loader v-if="loadingPackages" />
      <Content v-else @change-page="onChangePage" />
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Search from '@/components/header/Search.vue'
import Loader from '@/components/common/Loader.vue'
import Content from '@/components/content/Content.vue'
export default {
  name: 'App',
  components: { Search, Loader, Content },
  computed: mapGetters(['loadingPackages']),
  methods: {
    ...mapActions(['fetchPackages', 'changePage']),
    ...mapMutations(['updatePage']),
    onSearchSubmit: function (searchValue) {
      if (this.loadingPackages) return
      this.updatePage(1) // reset current page
      if (searchValue.trim()) {
        this.fetchPackages({ searchValue })
      }
    },
    onChangePage: function (page) {
      this.changePage(page)
    },
  },
}
</script>

<style lang="scss"></style>
