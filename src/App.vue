<template>
  <div id="app">
    <b-container fluid="md" class="border rounded my-5 p-5 w-50">
      <Search @search-submit="onSearchSubmit" />
      <hr />
      <Loader v-if="loadingPackages" />
      <Content
        v-else
        @change-page="onChangePage"
        @open-dialog="handleOpenDialog"
      />

      <PackageDetailsDialog @open-dialog="handleOpenDialog" />
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Search from '@/components/header/Search.vue'
import Loader from '@/components/common/Loader.vue'
import Content from '@/components/content/Content.vue'
import PackageDetailsDialog from '@/components/dialogs/PackageDetailsDialog.vue'
export default {
  name: 'App',
  components: { Search, Loader, Content, PackageDetailsDialog },
  computed: {
    ...mapGetters(['loadingPackages']), //packages getters
    ...mapGetters(['propData']), // dialogs getters
  },
  methods: {
    ...mapActions(['fetchPackages', 'changePage']), // packages actions
    ...mapMutations(['updatePage']),
    ...mapActions(['fetchPackageDetails']), // dialogs actions
    ...mapMutations(['setPropData']),
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
    handleOpenDialog: function (packageData) {
      const { name, version } = packageData

      const nameVersion = `${name}@${version}`
      const data = { nameVersion, ...packageData }

      this.$bvModal.show('package-details-dialog')

      this.setPropData(data)
      this.fetchPackageDetails(data)
    },
  },
}
</script>

<style lang="scss"></style>
