import { defineStore } from 'pinia'
import { type convertableToString, parseString } from 'xml2js'

const fetch = useCustomFetch()

export const useCommonStore = defineStore('commonStore', {
  state: (): State => ({
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
      game: 'アニメとゲーム',
    },
    currentCategory: 'all',
    displayMode: 'hotentry',
    rssData: null,
  }),
  actions: {
    getJson(xml: convertableToString) {
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
    },
    async getEntry(options: GetEntryOptions) {
      let getUrl!: string

      if (options.mode === 'hotentry') {
        getUrl
          = options.category === 'all'
            ? '/hotentry?mode=rss'
            : `/hotentry/${options.category}.rss`
      }
      else if (options.mode === 'entrylist') {
        getUrl
          = options.category === 'all'
            ? '/entrylist?mode=rss'
            : `/entrylist/${options.category}.rss`
      }

      try {
        const xml = await fetch(getUrl, {
          query: {
            timestamp: Date.now(),
          },
        })
        const json = (await this.getJson(xml as string)) as RSSData
        return json
      }
      catch (error) {
        await navigateTo('/')
        throw new Error(String(error))
      }
    },
    async changeDisplayMode(options: GetEntryOptions) {
      if (options.mode === this.displayMode) return

      window.scrollTo(0, 0)

      const json = await this.getEntry({
        mode: options.mode,
        category: options.category,
      })
      this.rssData = json

      this.displayMode = options.mode
    },
    prohibitScroll(event: Event | WheelEvent | TouchEvent) {
      console.log('prohibitScroll')
      event.preventDefault()
    },
    enableProhibitScroll() {
      window.addEventListener('scroll', this.prohibitScroll, { passive: false })
      window.addEventListener('wheel', this.prohibitScroll, { passive: false })
      window.addEventListener('touchmove', this.prohibitScroll, {
        passive: false,
      })
    },
    disableProhibitScroll() {
      window.removeEventListener('scroll', this.prohibitScroll)
      window.removeEventListener('wheel', this.prohibitScroll)
      window.removeEventListener('touchmove', this.prohibitScroll)
    },
  },
})
