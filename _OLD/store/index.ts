import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import { CommonModule } from '~/store/modules/common'

Vue.use(Vuex)

interface RootState {
  common: CommonModule
}

export const store = new Vuex.Store<RootState>({})
const createStore = (): Store<RootState> => {
  return store
}
export default createStore
