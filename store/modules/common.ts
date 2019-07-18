import { Module, Mutation, VuexModule, getModule, Action } from 'vuex-module-decorators'
import xml2js from 'xml2js'
import { $axios } from '~/plugins/axios'
import { store } from '~/store'

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
  public entryData!: any
  public isToastShow = false

  @Mutation
  public SET_ENTRY_DATA(data): void {
    this.entryData = data
  }

  @Mutation
  public SET_CURRENT_CATEGORY(category: string): void {
    this.currentCategory = category
  }

  @Mutation
  public SET_DISPLAY_MODE(mode: DisplayMode): void {
    this.displayMode = mode
  }

  @Mutation
  public SET_IS_TOAST_SHOW(bool: boolean): void {
    this.isToastShow = bool
  }

  @Action({ rawError: true })
  public async getEntry(options: GetEntryOptions): Promise<any> {
    const parseString = xml2js.parseString
    let getUrl!: string

    if (options.mode === 'hotentry') {
      getUrl =
        options.category === 'all' ? '/hotentry?mode=rss' : '/hotentry/' + options.category + '.rss'
    } else if (options.mode === 'entrylist') {
      getUrl =
        options.category === 'all'
          ? '/entrylist?mode=rss'
          : '/entrylist/' + options.category + '.rss'
    }

    const xml = await $axios.$get(getUrl)
    console.log(xml)
    const json: any = await new Promise((resolve): void => {
      parseString(
        xml,
        {
          trim: true,
          explicitArray: false
        },
        (_err, data): void => {
          resolve(data['rdf:RDF'])
        }
      )
    })
    console.log(json)

    this.SET_ENTRY_DATA(json)
  }

  @Action({ rawError: true })
  public async changeDisplayMode(options: GetEntryOptions): Promise<void> {
    if (options.mode === this.displayMode) return

    this.SET_IS_TOAST_SHOW(true)
    window.scrollTo(0, 0)

    await this.getEntry({
      mode: options.mode,
      category: options.category
    })

    this.SET_DISPLAY_MODE(options.mode)
    this.SET_IS_TOAST_SHOW(false)
  }
}

export const common = getModule(CommonModule, store)
