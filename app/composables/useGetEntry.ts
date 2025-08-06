import { type convertableToString, parseString } from 'xml2js'

// xmlをjsonに変換する関数
function getJson(xml: convertableToString) {
  return new Promise((resolve, reject) => {
    parseString(
      xml,
      {
        trim: true,
        explicitArray: false,
      },
      (err, data) => {
        if (err) {
          return reject(err)
        }
        resolve(data['rdf:RDF'])
      },
    )
  })
}

export const useGetEntry = async (options: GetEntryOptions) => {
  console.log('useGetEntry:', options)

  const store = useCommonStore()

  store.loading = true
  let url!: string

  if (options.type === 'hotentry') {
    url = options.category === 'all'
      ? '/hotentry?mode=rss'
      : `/hotentry/${options.category}.rss`
  }
  else if (options.type === 'entrylist') {
    url = options.category === 'all'
      ? '/entrylist?mode=rss'
      : `/entrylist/${options.category}.rss`
  }

  const xml = await $fetch(url, {
    baseURL: import.meta.client ? '/api' : 'https://b.hatena.ne.jp',
    credentials: 'include',
  })
  const json = (await getJson(xml as string)) as RSSData

  store.loading = false
  return json
}
