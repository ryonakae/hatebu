import {
  Module,
  Mutation,
  VuexModule,
  getModule,
  Action
} from 'vuex-module-decorators'
import { AxiosError } from 'axios'
import { convertableToString, parseString } from 'xml2js'
import { store } from '~/store'
import { $axios, $redirect } from '~/plugins/axios'

@Module({
  dynamic: true,
  namespaced: true,
  name: 'common',
  store
})
export class CommonModule extends VuexModule {
  public readonly categories: Categories = {
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
  }

  public currentCategory = 'all'
  public displayMode: DisplayMode = 'hotentry'
  public rssData = null as unknown as RSSData

  @Mutation
  public SET_RSS_DATA(data): void {
    this.rssData = data
  }

  @Mutation
  public SET_CURRENT_CATEGORY(category: string): void {
    this.currentCategory = category
  }

  @Mutation
  public SET_DISPLAY_MODE(mode: DisplayMode): void {
    this.displayMode = mode
  }

  @Action({ rawError: true })
  private getJson(xml: convertableToString): Promise<any> {
    return new Promise((resolve, reject) => {
      parseString(
        xml,
        {
          trim: true,
          explicitArray: false
        },
        (err, data): void => {
          if (err) {
            return reject(err)
          }
          resolve(data['rdf:RDF'])
        }
      )
    })
  }

  @Action({ rawError: true })
  public async getEntry(options: GetEntryOptions): Promise<any> {
    let getUrl!: string

    if (options.mode === 'hotentry') {
      getUrl =
        options.category === 'all'
          ? '/hotentry?mode=rss'
          : '/hotentry/' + options.category + '.rss'
    } else if (options.mode === 'entrylist') {
      getUrl =
        options.category === 'all'
          ? '/entrylist?mode=rss'
          : '/entrylist/' + options.category + '.rss'
    }

    try {
      const xml = await $axios.$get(getUrl, {
        params: {
          timestamp: Date.now()
        }
      })
      const json = await this.getJson(xml)
      return json
    } catch (error) {
      $redirect('/')
      throw new Error(error as any)
    }
  }

  @Action({ rawError: true })
  public async changeDisplayMode(options: GetEntryOptions): Promise<void> {
    if (options.mode === this.displayMode) return

    window.scrollTo(0, 0)

    const json = await this.getEntry({
      mode: options.mode,
      category: options.category
    })
    this.SET_RSS_DATA(json)

    this.SET_DISPLAY_MODE(options.mode)
  }

  @Action({ rawError: true })
  public prohibitScroll(event: Event | WheelEvent | TouchEvent): void {
    console.log('prohibitScroll')
    event.preventDefault()
  }

  @Action({ rawError: true })
  public enableProhibitScroll(): void {
    window.addEventListener('scroll', this.prohibitScroll, { passive: false })
    window.addEventListener('wheel', this.prohibitScroll, { passive: false })
    window.addEventListener('touchmove', this.prohibitScroll, {
      passive: false
    })
  }

  @Action({ rawError: true })
  public disableProhibitScroll(): void {
    window.removeEventListener('scroll', this.prohibitScroll)
    window.removeEventListener('wheel', this.prohibitScroll)
    window.removeEventListener('touchmove', this.prohibitScroll)
  }
}

export const common = getModule(CommonModule, store)
