<template>
  <div>
    <div class="tags">
      <span
        :class="{ tag: true, clickable }"
        v-for="(tag, index) in tags"
        :key="index"
        @click="$emit('click-tag', tag)"
      >
        <span>{{ tag }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tags: Array,
    clickable: Boolean,
  },
}
</script>

<style lang="scss" scoped>
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
    &.clickable {
      transition: 0.2s ease-in;
      &:hover {
        border-color: var(--blue) !important;
        cursor: pointer;
      }
    }
  }
}
</style>
