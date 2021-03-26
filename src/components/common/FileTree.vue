<template>
  <div>
    <div v-for="file in files" :key="file.name">
      <span>
        <BIconFolder v-if="file.type === 'directory'" />
        <BIconFileEarmarkCode v-if="file.type === 'file'" />
      </span>
      <span class="name">{{ file.name }}</span>
    </div>
  </div>
</template>

<script>
import { BIconFileEarmarkCode, BIconFolder } from 'bootstrap-vue'
export default {
  components: { BIconFileEarmarkCode, BIconFolder },
  props: {
    files: Array,
  },
}
</script>

<style lang="scss" scoped>
.name {
  display: inline-block;
  padding-left: 1rem;
}
</style>
