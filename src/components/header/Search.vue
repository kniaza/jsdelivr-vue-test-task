<template>
  <div>
    <b-form @submit.prevent="onSubmit" class="d-flex">
      <b-form-input
        id="search-input"
        v-model="search"
        type="text"
        placeholder="Search package..."
      ></b-form-input>
      <b-button class="ml-3" type="submit" variant="primary"
        ><BIconSearch
      /></b-button>
    </b-form>
  </div>
</template>

<script>
import { BIconSearch } from 'bootstrap-vue'
export default {
  data: () => ({
    search: '',
  }),
  methods: {
    onSubmit: function () {
      this.$emit('search-submit', this.search)
    },
  },
  components: {
    BIconSearch,
  },
}
</script>
