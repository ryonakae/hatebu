declare global {
  type State = {
    loading: boolean
    entryType: EntryType
    categories: Categories
    currentCategory: Category | null
  }
}

export {}
