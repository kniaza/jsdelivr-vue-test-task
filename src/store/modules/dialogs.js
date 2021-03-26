// import axios from 'axios'

import axios from 'axios'

export default {
  state: {
    dialogsLoading: true,
    propData: {},
    packageFiles: [],
    packageVersions: [],
  },
  mutations: {
    setLoading: (state, status = false) => {
      state.dialogsLoading = status
    },
    setPropData: (state, data) => {
      state.propData = { ...data }
    },
    setPackageFiles: (state, files) => {
      state.packageFiles = files.slice()
    },
    setPackageVersions: (state, versions) => {
      state.packageVersions = versions.slice()
    },
    setInitialData: (state) => {
      state.propData = {}
      state.packageFiles = []
      state.packageVersions = []
    },
  },
  actions: {
    fetchPackageDetails: async function (ctx, { nameVersion, name }) {
      ctx.commit('setLoading', true)

      try {
        const getFilesUrl = `https://data.jsdelivr.com/v1/package/npm/${nameVersion}`
        const getVersionsUrl = `https://data.jsdelivr.com/v1/package/npm/${name}`

        const resFiles = axios.get(getFilesUrl)
        const resVersions = axios.get(getVersionsUrl)
        const [files, versions] = await Promise.all([resFiles, resVersions])

        ctx.commit('setPackageFiles', files.data.files)
        ctx.commit('setPackageVersions', versions.data.versions)
      } catch (error) {
        console.error(error)
      }

      ctx.commit('setLoading', false)
    },
  },
  getters: {
    propData: (s) => s.propData,
    dialogsLoading: (s) => s.dialogsLoading,
    packageFiles: (s) => s.packageFiles,
    packageVersions: (s) => s.packageVersions,
  },
}
