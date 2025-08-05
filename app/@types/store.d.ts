declare global {
  type State = {
    loading: boolean
    categories: Categories
    currentCategory: Category
    rssData: RSSData | null
  }
}

export {}
