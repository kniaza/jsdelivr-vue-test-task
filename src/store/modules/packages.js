import axios from 'axios'

export const PAGE_LIMIT = 10

export default {
  state: {
    searchValue: '',
    loadingPackages: false,
    packages: null,
    currentPage: 1,
    totalFoundedPackages: 0,
  },
  mutations: {
    changeLoading: (state, status = false) => {
      state.loadingPackages = status
    },
    updatePackages: (state, packages) => {
      state.packages = packages
    },
    updateTotalFoundedPackages: (state, total) => {
      state.totalFoundedPackages = total
    },
    updateSearchValue: (state, searchValue) => {
      state.searchValue = searchValue
    },
    updatePage: (state, page) => {
      if (page === 0 || !page) state.currentPage = 1
      state.currentPage = page
    },
  },
  actions: {
    fetchPackages: async (
      ctx,
      { searchValue, limit = PAGE_LIMIT, offset = 0 },
    ) => {
      ctx.commit('changeLoading', true)
      ctx.commit('updateSearchValue', searchValue)
      try {
        const url = `http://registry.npmjs.org/-/v1/search?text=${searchValue}&size=${limit}&from=${offset}`
        const res = await axios.get(url)

        const { objects, total } = res.data
        ctx.commit(
          'updatePackages',
          objects.map((obj) => obj.package),
        )
        ctx.commit('updateTotalFoundedPackages', total)
      } catch (error) {
        console.error(error)
      }
      ctx.commit('changeLoading', false)
    },
    changePage: (ctx, page) => {
      const { searchValue, currentPage } = ctx.state
      ctx.dispatch('fetchPackages', {
        searchValue,
        offset: ((page || currentPage) - 1) * PAGE_LIMIT,
      })
    },
  },
  getters: {
    packages: (s) => s.packages,
    loadingPackages: (s) => s.loadingPackages,
    totalFoundedPackages: (s) => s.totalFoundedPackages,
    currentPage: (s) => s.currentPage,
  },
}
