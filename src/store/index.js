import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    currentItem: {}
  },
  mutations: {
    setList (state, paymentsList) {
      state.list = paymentsList
    },
    addDataToList (state, payment) {
      state.list.push(payment)
    },
    setCurrentItem (state, item) {
      Vue.set(state, 'currentItem', item)
    }
  },
  getters: {
    // получаем список покупок
    getList: state => state.list
  },
  actions: {
    fetchData ({ commit }) {
      const initialPaymentsList = [
        {
          id: 1,
          date: '28.03.2020',
          category: 'Food',
          value: 169
        },
        {
          id: 2,
          date: '24.03.2020',
          category: 'Transport',
          value: 360
        },
        {
          id: 3,
          date: '24.03.2020',
          category: 'Food',
          value: 532
        },
        {
          id: 4,
          date: '20.03.2020',
          category: 'Food',
          value: 169
        },
        {
          id: 5,
          date: '19.03.2020',
          category: 'Navigation',
          value: 50
        },
        {
          id: 6,
          date: '12.03.2020',
          category: 'Sport',
          value: 450
        }
      ]
      commit('setList', initialPaymentsList)
    },
    // fetchData ({ commit }) {
    //   fetch('https://raw.githubusercontent.com/Nguenchik/vue-final-project/lesson4-hw/src/server/server.json')
    //     .then(res => res.json())
    //     .then(response => {
    //       const result = [].concat(...Object.values(response))
    //       commit('setList', response)
    //       commit('setList', result)
    //     })
    // },
    removeItem ({ commit, state }, item) {
      const list = state.list.filter(el => el.id !== item.id)
      commit('setList', list)
    }
  },
  modules: {
    namespaced: true
  }
})
