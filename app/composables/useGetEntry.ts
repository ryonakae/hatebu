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

// カスタムfetch関数の作成
const customFetch = $fetch.create({
  baseURL: import.meta.client ? '/api' : 'https://b.hatena.ne.jp',
  credentials: 'include',
})

export const useGetEntry = async (options: GetEntryOptions) => {
  let url!: string

  if (options.mode === 'hotentry') {
    url
          = options.category === 'all'
        ? '/hotentry?mode=rss'
        : `/hotentry/${options.category}.rss`
  }
  else if (options.mode === 'entrylist') {
    url
          = options.category === 'all'
        ? '/entrylist?mode=rss'
        : `/entrylist/${options.category}.rss`
  }

  try {
    const xml = await customFetch(url, {
      query: {
        timestamp: Date.now(),
      },
    })
    const json = (await getJson(xml as string)) as RSSData
    return json
  }
  catch (error) {
    await navigateTo('/')
    throw new Error(String(error))
  }
}
