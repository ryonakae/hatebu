<template>
  <div class="entries">
    <div
      v-if="!props.data"
      class="loading"
    >
      <span>読み込み中…</span>
    </div>

    <template v-else>
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
          v-for="entry in displayedEntries"
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
    </template>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  type: EntryType
  category: Category
  data: RSSData
  displayEntries?: number
}>()

// Composables
const store = useCommonStore()
const route = useRoute()

// currentCategoryを設定
store.currentCategory = props.category as Category

// 表示するエントリーリストを計算
const displayedEntries = computed(() => {
  const entries = props.data.item
  if (props.displayEntries && props.displayEntries > 0) {
    return entries.slice(0, props.displayEntries)
  }
  return entries
})

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
.loading {
  min-height: calc(100svh - var(--header-height) - var(--nav-height));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & span {
    font-size: var(--fontsize-nav);
    color: var(--color-sub);
  }
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
  padding-block: 12px;
  text-align: center;
}
</style>
