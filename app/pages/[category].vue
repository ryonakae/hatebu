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
      <h2 class="entries-title">
        <span v-if="store.displayMode === 'hotentry'">
          {{ store.categories[$route.params.category as Category] }}の人気エントリー
        </span>
        <span v-else-if="store.displayMode === 'entrylist'">
          {{ store.categories[$route.params.category as Category] }}の新着エントリー
        </span>
      </h2>
      <CommonDivider />

      <ul class="entries-list">
        <li
          v-for="entry in store.rssData.item"
          :key="entry.link"
          class="entry"
        >
          <div
            class="entry-content"
            :class="{ 'is-noimage': !entry['hatena:imageurl'] }"
          >
            <h3 class="entry-title">
              <a
                :href="entry.link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ entry.title }}
              </a>
            </h3>
            <a
              v-if="entry['hatena:imageurl']"
              :href="entry.link"
              target="_blank"
              rel="noopener noreferrer"
              class="entry-image"
            >
              <img
                :src="entry['hatena:imageurl']"
                :alt="entry.title"
                loading="lazy"
              >
            </a>
            <div class="entry-info">
              <a
                class="entry-users"
                :href="entry['hatena:bookmarkCommentListPageUrl']"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{{ entry['hatena:bookmarkcount'] }} users</span>
              </a>
              <div class="entry-subject">
                {{ getSubject(entry['dc:subject']) }}
              </div>
              <div class="entry-date">
                {{ formatDate(entry['dc:date']) }}
              </div>
            </div>
            <div class="entry-hostname">
              <img
                :src="getFaviconUrl(entry.link)"
                alt=""
                loading="lazy"
              >
              <span>{{ getHostName(entry.link) }}</span>
            </div>
          </div>
          <CommonDivider />
        </li>
      </ul>

      <div class="entries-link">
        <a
          v-if="store.displayMode === 'hotentry'"
          :href="'https://b.hatena.ne.jp/hotentry/' + $route.params.category"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ store.categories[$route.params.category as Category] }}の人気エントリーをもっと読む
        </a>
        <a
          v-else-if="store.displayMode === 'entrylist'"
          :href="'https://b.hatena.ne.jp/entrylist/' + $route.params.category"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ store.categories[$route.params.category as Category] }}の新着エントリーをもっと読む
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import Url from 'url-parse'

// Define meta for SEO
definePageMeta({
  robots: 'noindex,nofollow,noarchive',
})

// Composables
const route = useRoute()
const store = useCommonStore()

// エントリーを取得
const rssData = await useGetEntry({
  mode: store.displayMode,
  category: route.params.category as Category,
})
store.rssData = rssData
store.currentCategory = route.params.category as Category

// Methods
function formatDate(date: string): string {
  const today = dayjs().startOf('day')
  const entryDate = dayjs(date).startOf('day')
  let format: string

  // 1日以内なら時刻だけ、1日以上なら日付を表示する
  if (today.diff(entryDate, 'day') === 0) {
    format = 'HH:mm'
  }
  else {
    format = 'YYYY/MM/DD'
  }

  return dayjs(date).format(format)
}

function getSubject(subject: string[]): string {
  return subject[0] || ''
}

function getHostName(url: string): string {
  return new Url(url).hostname
}

function getFaviconUrl(url: string): string {
  const hostName = new Url(url).hostname
  return 'https://www.google.com/s2/favicons?domain=' + hostName
}

// Lifecycle
onMounted(async () => {
  await nextTick()
  console.log(route)
  console.log(store.rssData)

  // 初期データフェッチが必要な場合
  if (!store.rssData) {
    const json = await useGetEntry({
      mode: store.displayMode,
      category: route.params.category as Category,
    })
    store.rssData = json
    store.currentCategory = route.params.category as Category
  }
})
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

.entry-content {
  display: grid;
  grid-template-columns: auto var(--image-size);
  grid-gap: 8px 16px;
  padding: var(--padding-content-vertical) var(--padding-content-horizontal);

  @media (--sp) {
    grid-gap: 4px 8px;
    padding: var(--padding-content-vertical-sp)
      var(--padding-content-horizontal-sp);
  }

  &:first-child {
    border-top: none;
  }

  &.is-noimage {
    grid-template-columns: auto;
  }
}

.entry-title {
  grid-row: 1 / 2;
  grid-column: 1 / 2;
  font-size: var(--fontsize);
}

.entry-image {
  grid-row: 1 / 4;
  grid-column: 2 / 3;
  position: relative;
  width: var(--image-size);
  height: var(--image-size);
  background-color: var(--color-bg);
  border-radius: var(--border-radius);
  overflow: hidden;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &::after {
    position: absolute;
    content: '';
    inset: 0;
    border: 1px solid var(--color-border);
    border-radius: inherit;
  }
}

.entry-info {
  grid-row: 2 / 3;
  grid-column: 1 / 2;
  display: flex;
  align-items: center;

  & > * {
    margin-right: 8px;
  }
}

.entry-users {
  height: 20px;
  padding-inline: 8px;
  font-size: var(--fontsize-small);
  color: var(--color-accent);
  background-color: rgba(var(--color-accent-rgb), 0.08);
  border-radius: calc(20px / 2);

  @media (hover) {
    &:hover {
      color: white;
      text-decoration: none;
      background-color: var(--color-accent);
    }
  }
}

.entry-subject,
.entry-hostname,
.entry-date {
  font-size: var(--fontsize-small);
  color: var(--color-sub);
}

.entry-hostname {
  grid-row: 3 / 4;
  grid-column: 1 / 2;
  display: flex;
  align-items: center;
  column-gap: 4px;

  & img {
    width: var(--favicon-size);
    height: auto;
  }
}
</style>
