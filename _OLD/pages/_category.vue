<template>
  <div class="content">
    <div v-if="!rssData" class="loading">
      <span>読み込み中…</span>
    </div>

    <div v-else class="entries">
      <h2 class="entries-title">
        <span v-if="displayMode === 'hotentry'"
          >{{ categoryName }}の人気エントリー</span
        >
        <span v-else-if="displayMode === 'entrylist'"
          >{{ categoryName }}の新着エントリー</span
        >
      </h2>
      <Divider />

      <ul class="entries-list">
        <li v-for="entry in rssData.item" :key="entry.link" class="entry">
          <div
            class="entry-content"
            :class="{ 'is-noimage': !entry['hatena:imageurl'] }"
          >
            <h3 class="entry-title">
              <a
                :href="entry.link"
                target="_blank"
                rel="noopener noreferrer"
                v-html="entry.title"
              />
            </h3>
            <a
              v-if="entry['hatena:imageurl']"
              :href="entry.link"
              target="_blank"
              rel="noopener noreferrer"
              class="entry-image"
              :style="{
                backgroundImage: 'url(' + entry['hatena:imageurl'] + ')'
              }"
            />
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
                {{ entry['dc:subject'] | subject }}
              </div>
              <div class="entry-date">{{ entry['dc:date'] | dayjs }}</div>
            </div>
            <div class="entry-hostname">
              <img :src="getFaviconUrl(entry.link)" alt="" />
              <span>{{ entry.link | hostName }}</span>
            </div>
          </div>
          <Divider />
        </li>
      </ul>

      <div class="entries-link">
        <a
          v-if="displayMode === 'hotentry'"
          :href="'https://b.hatena.ne.jp/hotentry/' + category"
          target="_blank"
          rel="noopener noreferrer"
          >{{ categoryName }}の人気エントリーをもっと読む</a
        >
        <a
          v-else-if="displayMode === 'entrylist'"
          :href="'https://b.hatena.ne.jp/entrylist/' + category"
          target="_blank"
          rel="noopener noreferrer"
          >{{ categoryName }}の新着エントリーをもっと読む</a
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import dayjs from 'dayjs'
import Url from 'url-parse'
import { Context } from '@nuxt/types'
import { common } from '~/store/modules/common'

import Divider from '~/components/Divider.vue'

@Component({
  head: {
    meta: [{ name: 'robots', content: 'noindex,nofollow,noarchive' }]
  },
  components: {
    Divider
  },
  filters: {
    dayjs: (date: string): string => {
      const today = dayjs().startOf('day')
      const entryDate = dayjs(date).startOf('day')
      let format: string

      // 1日以内なら時刻だけ、1日以上なら日付を表示する
      if (today.diff(entryDate, 'day') === 0) {
        format = 'HH:mm'
      } else {
        format = 'YYYY/MM/DD'
      }

      return dayjs(date).format(format)
    },

    subject: (subject: string[]): string => {
      return subject[0]
    },

    hostName: (url: string): string => {
      return new Url(url).hostname
    }
  }
})
export default class extends Vue {
  async fetch(ctx: Context) {
    const json = await common.getEntry({
      mode: common.displayMode,
      category: ctx.route.params.category as Category
    })
    common.SET_RSS_DATA(json)
    common.SET_CURRENT_CATEGORY(ctx.route.params.category)
  }

  // computed
  get rssData() {
    return common.rssData
  }

  get category() {
    return this.$route.params.category
  }

  get categoryName() {
    return common.categories[this.category]
  }

  get displayMode() {
    return common.displayMode
  }

  // methods
  getFaviconUrl(url) {
    const hostName = new Url(url).hostname
    return 'https://www.google.com/s2/favicons?domain=' + hostName
  }

  // lifecycle
  async mounted() {
    await this.$nextTick()
    console.log(this.$route)
    console.log(this.rssData)
  }
}
</script>

<style scoped>
.content {
  min-height: 100vh;
}

.loading {
  position: fixed;
  top: 50%;
  left: 0;
  width: 100%;
  font-size: var(--fontsize-nav);
  color: var(--color-sub);
  text-align: center;
  transform: translateY(-50%);
}

.entries-title {
  padding: 8px var(--padding-content-horizontal);
  font-size: var(--fontsize-small);
  text-align: center;
  background-color: var(--color-bg-footer);

  @media (--sp) {
    padding-right: var(--padding-content-horizontal-sp);
    padding-left: var(--padding-content-horizontal-sp);
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
    padding-top: 15px;
    padding-bottom: 15px;
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
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.entry-image {
  position: relative;
  display: block;
  grid-row: 1 / 4;
  grid-column: 2 / 3;
  height: var(--image-size);
  background-color: var(--color-bg);
  background-position: 50% 50%;
  background-size: cover;
  border-radius: var(--border-radius);

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: '';
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
  }
}

.entry-info {
  display: flex;
  grid-row: 2 / 3;
  grid-column: 1 / 2;
  align-items: center;

  & > * {
    margin-right: 8px;
  }
}

.entry-users {
  height: 20px;
  padding: 0 8px;
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
  display: flex;
  grid-row: 3 / 4;
  grid-column: 1 / 2;
  align-items: center;

  & img {
    width: var(--favicon-size);
    height: auto;
    margin-right: 4px;
  }
}
</style>
