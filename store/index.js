import xmlJson from 'xmljson'

export const state = () => ({
  entryData: null,
  categories: {
    all: '総合',
    general: '一般',
    social: '世の中',
    economics: '政治と経済',
    life: '暮らし',
    knowledge: '学び',
    it: 'テクノロジー',
    fun: 'おもしろ',
    entertainment: 'エンタメ',
    game: 'アニメとゲーム'
  },
  currentCategory: 'all'
})

export const mutations = {
  SET_ENTRY_DATA(state, data) {
    state.entryData = data
  },

  SET_CURRENT_CATEGORY(state, category) {
    state.currentCategory = category
  }
}

export const actions = {
  async getHotentry({ commit }, categoryId) {
    const getUrl =
      categoryId === 'all'
        ? 'http://b.hatena.ne.jp/hotentry?mode=rss'
        : 'http://b.hatena.ne.jp/hotentry/' + categoryId + '.rss'

    const xml = await this.$axios.$get(getUrl, {
      responseType: 'text',
      data: null,
      headers: {
        'Content-Type': 'application/xml',
        'X-Requested-With': 'XMLHttpRequest',
        'Access-Control-Allow-Origin': '*'
      },
      withCredentials: true
    })

    const json = await new Promise(resolve => {
      xmlJson.to_json(xml, (_, data) => {
        resolve(data)
      })
    })

    return commit('SET_ENTRY_DATA', json['rdf:RDF'])
  }
}
