<template>
  <div class="content-wrapper">
    <h4 v-if="packages === null" class="text-center">
      Enter package name in search field
    </h4>
    <h4 v-else-if="packages.length === 0" class="text-center">
      Could't find the package
    </h4>
    <div v-else>
      <div
        v-for="(packageItem, index) in packages"
        @click="handleOpenDialog(packageItem)"
        :key="index"
      >
        <div class="item rounded mb-2 px-3 py-2">
          <h4 class="mb-1">{{ packageItem.name }}</h4>
          <p class="sub_title">{{ packageItem.description }}</p>
          <Tags :tags="packageItem.keywords" />
        </div>
        <div></div>
      </div>

      <b-pagination
        :value="currentPage"
        :total-rows="totalFoundedPackages"
        :per-page="perPage"
        @change="setPage"
        first-number
        last-number
        align="center"
        class="mt-5"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Tags from '@/components/common/Tags.vue'
import { PAGE_LIMIT } from '@/store/modules/packages'
export default {
  components: { Tags },
  computed: {
    ...mapGetters(['packages', 'currentPage', 'totalFoundedPackages']),
  },
  data: () => ({
    perPage: PAGE_LIMIT,
  }),
  methods: {
    ...mapMutations(['updatePage']),
    setPage: function (page) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
      this.updatePage(page)
      this.$emit('change-page', page)
    },
    handleOpenDialog: function (packageData) {
      this.$emit('open-dialog', packageData)
    },
  },
}
</script>

<style scoped lang="scss">
.item {
  cursor: pointer;
  transition: 0.2s ease-in;
  border: 1px solid #dee2e6;

  &:hover {
    border-color: var(--blue);
  }
}
.sub_title {
  font-size: 0.8rem;
  color: #555555;
}
</style>
