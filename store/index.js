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
  async getEntry({ commit }, options) {
    let getUrl

    if (options.mode === 'hotentry') {
      getUrl =
        options.category === 'all'
          ? '/api/hotentry?mode=rss'
          : '/api/hotentry/' + options.category + '.rss'
    } else if (options.mode === 'entrylist') {
      getUrl =
        options.category === 'all'
          ? '/api/entrylist?mode=rss'
          : '/api/entrylist/' + options.category + '.rss'
    }

    const xml = await this.$axios.$get(getUrl)

    const json = await new Promise(resolve => {
      xmlJson.to_json(xml, (_, data) => {
        resolve(data)
      })
    })

    return json['rdf:RDF']
  }
}
