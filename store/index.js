import xmlJson from 'xmljson'

export const state = () => ({
  entryData: null
})

export const mutations = {
  SET_ENTRY_DATA(state, data) {
    state.entryData = data
  }
}

export const actions = {
  async getHotentry({ commit }, categoryId) {
    const getUrl =
      categoryId === 'all'
        ? 'https://b.hatena.ne.jp/hotentry?mode=rss'
        : 'https://b.hatena.ne.jp/hotentry/' + categoryId + '.rss'

    const xml = await this.$axios.$get(getUrl, {
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
