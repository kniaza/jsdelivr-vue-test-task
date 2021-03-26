<template>
  <b-modal
    id="package-details-dialog"
    size="lg"
    hide-footer
    @hide="handleClose"
  >
    <template #modal-title>
      {{ propData.nameVersion }}
      <a
        v-if="propData.links"
        :href="`${propData.links.npm}/v/${propData.version}`"
        target="_blank"
        ><BIconLink45deg
      /></a>
    </template>
    <Loader v-if="dialogsLoading" />
    <div v-else class="d-block">
      <div>
        <h5>Versions:</h5>
        <Tags
          :tags="packageVersions"
          :clickable="true"
          @click-tag="handleOpenOtherVersion"
        />
      </div>
      <hr />
      <FileTree :files="packageFiles" />
    </div>
  </b-modal>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import { BIconLink45deg } from 'bootstrap-vue'
import Loader from '@/components/common/Loader'
import FileTree from '@/components/common/FileTree'
import Tags from '@/components/common/Tags'
export default {
  components: { Loader, BIconLink45deg, FileTree, Tags },
  computed: mapGetters([
    'propData',
    'dialogsLoading',
    'packageFiles',
    'packageVersions',
  ]),
  methods: {
    ...mapMutations(['setInitialData']),
    handleClose: function () {
      this.setInitialData() // set initail data in vuex dialgs state
    },
    handleOpenOtherVersion: function (version) {
      const cpPropData = { ...this.propData }

      cpPropData.nameVersion = `${cpPropData.name}@${version}`
      cpPropData.version = version

      this.$bvModal.hide('package-details-dialog')
      setTimeout(() => {
        this.$emit('open-dialog', cpPropData)
      }, 500)
    },
  },
}
</script>
