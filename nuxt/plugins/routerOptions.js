export default ({ app }) => {
  const router = app.router

  router.beforeEach((to, from, next) => {
    app.$toast.show('読み込み中…')
    next()
  })
}
