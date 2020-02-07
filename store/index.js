export const state = () => ({
  authUser: null
})

export const mutations = {
  SET_USER (state, user) {
    state.authUser = user
  }
}

export const actions = {
  async login ({ commit }, { email, password }) {
    try {
      const { data } = await this.$axios.post(process.env.ApiUrl + 'auth/login', { email, password })
      commit('SET_USER', data)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },

  async logout ({ commit }) {
    await this.$axios.post('/api/logout')
    commit('SET_USER', null)
  }

}
