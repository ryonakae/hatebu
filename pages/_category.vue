<template>
  <div>
    <div v-if="!entryData">Loading</div>
    <div v-else>
      <h2>
        <a :href="entryData.channel.link" target="_blank">{{
          entryData.channel.description + ' - ' + categoryName
        }}</a>
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
    entryData() {
      return this.$store.state.entryData
    },

    category() {
      return this.$route.params.category
    },

    categoryName() {
      return this.$store.state.categories[this.category]
    }
  },

  async mounted() {
    console.log(this.category)
    await this.$store.dispatch('getHotentry', this.category)
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
