<template>
  <div>
    <div v-if="!entryData">Loading</div>
    <div v-else>
      <h2>
        <a :href="entryData.channel.link" target="_blank">{{ pageTitle }}</a>
      </h2>

      <ul>
        <li v-for="entry in entryData.item" :key="entry.link">
          <h3>
            <a :href="entry.link" target="_blank">{{ entry.title }}</a>
          </h3>
          <img
            v-if="entry['hatena:imageurl']"
            :src="entry['hatena:imageurl']"
            :alt="entry.title"
            width="100"
          />
          <div>
            <a :href="'http://b.hatena.ne.jp/entry/' + entry.link" target="_blank"
              >{{ entry['hatena:bookmarkcount'] }} users</a
            >
          </div>
          <div>{{ entry['dc:subject'] | subject }}</div>
          <div>
            <img :src="getFaviconUrl(entry.link)" alt="" /> <span>{{ entry.link | hostName }}</span>
          </div>
          <div>{{ entry['dc:date'] | moment }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  async fetch({ store, params }) {
    const data = await store.dispatch('getHotentry', params.category)
    store.commit('SET_ENTRY_DATA', data)
  },

  head() {
    return {
      title: this.pageTitle + ' | ' + process.env.siteTitle,
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.pageTitle + ' | ' + process.env.siteTitle
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: location.href
        }
      ]
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
      return new URL(url).hostname
    }
  },

  computed: {
    siteInfo() {
      return this.$store.state.siteInfo
    },

    entryData() {
      return this.$store.state.entryData
    },

    pageTitle() {
      const categoryName = this.$store.state.categories[this.$route.params.category]
      return categoryName + 'の人気エントリー'
    }
  },

  async mounted() {
    console.log(this.$route)
    console.log(this.entryData)
  },

  methods: {
    getFaviconUrl(url) {
      const hostName = new URL(url).hostname
      return 'http://www.google.com/s2/favicons?domain=' + hostName
    }
  }
}
</script>
