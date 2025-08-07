declare global {
  type State = {
    loading: boolean
    categories: Categories
    currentCategory: Category | null
  }
}

export {}
