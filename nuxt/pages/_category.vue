<template>
  <div class="content">
    <div v-if="!entryData" class="loading"><span>Loading</span></div>

    <div v-else class="entries">
      <h2 class="entries-title">
        <span v-if="displayMode === 'hotentry'">{{ categoryName }}の人気エントリー</span>
        <span v-else-if="displayMode === 'entrylist'">{{ categoryName }}の新着エントリー</span>
      </h2>

      <ul class="entries-list">
        <li
          v-for="entry in entryData.item"
          :key="entry.link"
          class="entry"
          :class="{ 'is-noimage': !entry['hatena:imageurl'] }"
        >
          <h3 class="entry-title">
            <a :href="entry.link" target="_blank">{{ entry.title }}</a>
          </h3>
          <a
            v-if="entry['hatena:imageurl']"
            :href="entry.link"
            target="_blank"
            class="entry-image"
            :style="{ backgroundImage: 'url(' + entry['hatena:imageurl'] + ')' }"
          ></a>
          <div class="entry-info">
            <a
              class="entry-users"
              :href="'http://b.hatena.ne.jp/entry/' + entry.link"
              target="_blank"
            >
              <span>{{ entry['hatena:bookmarkcount'] }} users</span>
            </a>
            <div class="entry-subject">{{ entry['dc:subject'] | subject }}</div>
            <div class="entry-date">{{ entry['dc:date'] | moment }}</div>
          </div>
          <div class="entry-hostName">
            <img :src="getFaviconUrl(entry.link)" alt="" /> <span>{{ entry.link | hostName }}</span>
          </div>
        </li>
      </ul>

      <div class="entries-link">
        <a
          v-if="displayMode === 'hotentry'"
          :href="'http://b.hatena.ne.jp/hotentry/' + category"
          target="_blank"
          >{{ categoryName }}の人気エントリーをもっと読む</a
        >
        <a
          v-else-if="displayMode === 'entrylist'"
          :href="'http://b.hatena.ne.jp/entrylist/' + category"
          target="_blank"
          >{{ categoryName }}の新着エントリーをもっと読む</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import Url from 'url-parse'

export default {
  async fetch({ app, store, params }) {
    await store.dispatch('getEntry', {
      mode: store.state.displayMode,
      category: params.category
    })

    store.commit('SET_CURRENT_CATEGORY', params.category)

    if (process.client) {
      app.$toast.hide('読み込み完了', 500)
    }
  },

  filters: {
    moment: date => {
      const today = moment().startOf('day')
      const _date = moment(date).startOf('day')
      let format

      if (today.diff(_date, 'days') === 0) {
        format = 'HH:mm'
      } else {
        format = 'YYYY/MM/DD'
      }

      return moment(date).format(format)
    },

    subject: subject => {
      let _subject

      if (typeof subject === 'object') {
        _subject = subject[0]
      } else if (typeof subject === 'string') {
        _subject = subject
      } else {
        _subject = ''
      }

      return _subject
    },

    hostName: url => {
      return new Url(url).hostname
    }
  },

  computed: {
    siteInfo() {
      return this.$store.state.siteInfo
    },

    entryData() {
      return this.$store.state.entryData
    },

    category() {
      return this.$route.params.category
    },

    categoryName() {
      return this.$store.state.categories[this.category]
    },

    displayMode() {
      return this.$store.state.displayMode
    }
  },

  mounted() {
    this.$nextTick(() => {
      console.log(this.$route)
      console.log(this.entryData)
    })
  },

  methods: {
    getFaviconUrl(url) {
      const hostName = new Url(url).hostname
      return 'https://www.google.com/s2/favicons?domain=' + hostName
    }
  }
}
</script>

<style scoped>
@import 'custom-media.css';

.content {
  min-height: 100vh;
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  font-size: var(--fontSize-nav);
  color: var(--color-sub);
}

.entries-title {
  padding: 8px var(--padding-content-horizontal);
  font-size: var(--fontSize-small);
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
  font-size: var(--fontSize-nav);
  border-top: 1px solid var(--color-border);

  & :any-link {
    display: block;
    width: 100%;
    height: 100%;
    padding-top: 15px;
    padding-bottom: 15px;
    text-align: center;
  }
}

.entry {
  display: grid;
  grid-template-columns: auto var(--image-size);
  grid-row-gap: 3px;
  grid-column-gap: 10px;
  padding: var(--padding-content-vertical) var(--padding-content-horizontal);
  border-top: 1px solid var(--color-border);

  @media (--sp) {
    padding: var(--padding-content-vertical-sp) var(--padding-content-horizontal-sp);
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
  margin-bottom: 3px;
  font-size: var(--fontSize);
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
    margin-right: 5px;
  }
}

.entry-users {
  height: 20px;
  padding: 0 8px;
  font-size: var(--fontSize-small);
  color: var(--color-accent);
  background-color: rgba(var(--color-accent-rgb), 0.08);
  border-radius: calc(20px / 2);

  @media (hover) {
    &:hover {
      color: white;
      text-decoration: none;
      background-color: rgba(var(--color-accent-rgb), 1);
    }
  }
}

.entry-subject,
.entry-hostName,
.entry-date {
  font-size: var(--fontSize-small);
  color: var(--color-sub);
}

.entry-hostName {
  display: flex;
  grid-row: 3 / 4;
  grid-column: 1 / 2;
  align-items: center;

  & img {
    width: var(--favicon-size);
    height: auto;
    margin-right: 5px;
  }
}
</style>
