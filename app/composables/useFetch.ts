export const useFetch = () => {
  return $fetch.create({
    baseURL: import.meta.client ? '/api' : 'https://b.hatena.ne.jp',
    credentials: 'include',
  })
}
