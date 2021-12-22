import {
  Module,
  Mutation,
  VuexModule,
  getModule,
  Action
} from 'vuex-module-decorators'
import { AxiosError } from 'axios'
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
  public isToastShow = false

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

  @Mutation
  public SET_IS_TOAST_SHOW(bool: boolean): void {
    this.isToastShow = bool
  }

  @Action({ rawError: true })
  public async getEntry(options: GetEntryOptions): Promise<any> {
    const res = await $axios
      .$get('.netlify/functions/api', {
        params: {
          mode: options.mode,
          category: options.category
        }
      })
      .catch(error => {
        $redirect('/')
        throw new Error(error)
      })

    return res.content
  }

  @Action({ rawError: true })
  public async changeDisplayMode(options: GetEntryOptions): Promise<void> {
    if (options.mode === this.displayMode) return

    this.SET_IS_TOAST_SHOW(true)
    window.scrollTo(0, 0)

    const json = await this.getEntry({
      mode: options.mode,
      category: options.category
    })
    this.SET_RSS_DATA(json)

    this.SET_DISPLAY_MODE(options.mode)
    this.SET_IS_TOAST_SHOW(false)
  }
}

export const common = getModule(CommonModule, store)
