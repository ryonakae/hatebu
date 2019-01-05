<template>
  <div v-if="entryData">
    <h2>
      <a :href="entryData.channel.link" target="_blank"
        >最近の人気エントリー - {{ getCurrentCategoryName(category) }}</a
      >
    </h2>
    <ul>
      <li v-for="entry in entryData.item" :key="entry.link">
        <h3>
          <a :href="entry.link" target="_blank">{{ entry.title }}</a>
        </h3>
        <div>
          <a :href="'http://b.hatena.ne.jp/entry/' + entry.link" target="_blank"
            >{{ entry['hatena:bookmarkcount'] }} users</a
          >
          <div>{{ entry['dc:subject'] | categoryName }}</div>
          <div>{{ entry.link }}</div>
          <div>{{ entry['dc:date'] | moment }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  async asyncData({ params, store }) {
    await store.dispatch('getHotentry', params.category)
    return { category: params.category }
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

    categoryName: subject => {
      let categoryName

      if (typeof subject === 'object') {
        categoryName = subject[0]
      } else if (typeof subject === 'string') {
        categoryName = subject
      } else {
        categoryName = ''
      }

      return categoryName
    },

    hostName: url => {
      const parser = new URL(url)
      return parser.hostname
    }
  },

  computed: {
    entryData() {
      return this.$store.state.entryData
    }
  },

  async mounted() {
    console.log(this.entryData)
    console.log(this.$route.params.category)
  },

  methods: {
    getCurrentCategoryName(category) {
      return this.$store.state.categories[category]
    }
  }
}
</script>
