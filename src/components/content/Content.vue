<template>
  <div>
    <h4 v-if="packages.length === 0" class="text-center">
      Could't find the package
    </h4>
    <div v-else>
      <div v-for="(packageItem, index) in packages" :key="index">
        <div class="border rounded mb-2 px-3 py-2">
          <h4 class="mb-1">{{ packageItem.name }}</h4>
          <p class="sub_title">{{ packageItem.description }}</p>
          <div class="tags">
            <span
              class="tag"
              v-for="(keyword, index) in packageItem.keywords"
              :key="index"
            >
              {{ keyword }}
            </span>
          </div>
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
import { PAGE_LIMIT } from '@/store/modules/packages'
export default {
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
  },
}
</script>

<style scoped lang="scss">
.sub_title {
  font-size: 0.8rem;
  color: #555555;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  .tag {
    border: 1px solid #cccccc50;
    background: #cccccc30;
    border-radius: 10px;
    padding: 0.3rem 0.7rem;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    font-size: 0.8rem;
  }
}
</style>
