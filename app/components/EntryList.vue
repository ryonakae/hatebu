<template>
  <div class="content">
    <div
      v-if="!store.rssData"
      class="loading"
    >
      <span>読み込み中…</span>
    </div>

    <div
      v-else
      class="entries"
    >
      <div class="entries-title-wrapper">
        <h2
          class="entries-title"
          @click="scrollTop"
        >
          <span v-if="props.type === 'hotentry'">
            {{ store.categories[props.category as Category] }}の人気エントリー
          </span>
          <span v-else-if="props.type === 'entrylist'">
            {{ store.categories[props.category as Category] }}の新着エントリー
          </span>
        </h2>
        <CommonDivider />
      </div>

      <ul class="entries-list">
        <li
          v-for="entry in store.rssData.item"
          :key="entry.link"
          class="entry"
        >
          <EntryItem :entry="entry" />
          <CommonDivider />
        </li>
      </ul>

      <div class="entries-link">
        <NuxtLink
          v-if="props.type === 'hotentry'"
          :to="'https://b.hatena.ne.jp/hotentry/' + $props.category"
          external
          target="_blank"
        >
          {{ store.categories[$props.category as Category] }}の人気エントリーをもっと読む
        </NuxtLink>
        <NuxtLink
          v-else-if="props.type === 'entrylist'"
          :to="'https://b.hatena.ne.jp/entrylist/' + $props.category"
          external
          target="_blank"
        >
          {{ store.categories[$props.category as Category] }}の新着エントリーをもっと読む
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  type: EntryType
  category: Category
}>()

// Composables
const store = useCommonStore()
const route = useRoute()

// エントリーを取得
const { data: rssData, error } = await useAsyncData(
  `entries-${props.type}-${props.category}`,
  () => useGetEntry({
    type: props.type as EntryType,
    category: props.category as Category,
  }),
  {
    server: true,
    default: () => null,
  },
)
if (error.value) {
  console.log(error.value)
  throw createError({
    statusCode: error.value.statusCode,
    statusMessage: error.value.statusMessage,
  })
}
if (rssData.value) {
  store.rssData = rssData.value
  store.currentCategory = props.category as Category
}

// クライアントサイドでのみページをfetchする（キャッシュさせるため）
if (import.meta.client) {
  const pathsToFetch = (() => {
    if (route.path === '/' || route.path === '/hotentry/all') {
      return ['/', '/hotentry/all']
    }
    else {
      return [route.path]
    }
  })()

  pathsToFetch.forEach((path) => {
    useFetch(path, {
      method: 'HEAD',
      server: false,
      onRequest: () => {
        console.log('useFetch:', path)
      },
    })
  })
}

// Methods
function scrollTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
</script>

<style scoped>
.content {
  min-height: calc(100svh - var(--header-height) - var(--nav-height));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.loading {
  font-size: var(--fontsize-nav);
  color: var(--color-sub);
}

.entries-title-wrapper {
  position: sticky;
  top: 0;
  z-index: var(--z-index-entry-title);
}

.entries-title {
  padding: 8px var(--padding-content-horizontal);
  font-size: var(--fontsize-small);
  text-align: center;
  background-color: var(--color-bg-footer);

  @media (--sp) {
    padding-inline: var(--padding-content-horizontal-sp);
  }
}

.entries-list {
  list-style-type: none;
}

.entries-link {
  font-size: var(--fontsize-nav);

  & :any-link {
    display: block;
    width: 100%;
    height: 100%;
    padding-block: 15px;
    text-align: center;
  }
}
</style>
