declare global {
  type State = {
    categories: Categories
    currentCategory: Category
    displayMode: DisplayMode
    rssData: RSSData | null
  }
}

export {}
