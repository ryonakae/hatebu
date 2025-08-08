export default defineNuxtRouteMiddleware((to, from) => {
  const nuxtApp = useNuxtApp()

  // クライアントサイドでのみ & 初回ページ読み込み移行のページ遷移時のみ、遷移先ページをfetchする
  // ブラウザ上でのページ遷移は、 /api へリクエストされるが /<route.path> へはリクエストされないので、
  // それをVercelに無理やりキャッシュさせる
  if (import.meta.client && !nuxtApp.isHydrating) {
    console.log('fetchPage middleware:', 'to:', to.path, 'from:', from.path)

    useFetch(to.path, {
      method: 'HEAD',
      server: false,
    })
  }
})
