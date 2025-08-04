declare global {
  type State = {
    loading: boolean
    categories: Categories
    currentCategory: Category
    displayMode: DisplayMode
    rssData: RSSData | null
  }
}

export {}
