<template>
  <div v-if="entryData">
    <h1>h</h1>
    <h2>
      <a :href="entryData.channel.link" target="_blank">{{ entryData.channel.description }}</a>
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
          <span>{{ entry['dc:subject'][0] }}</span> <span>{{ entry['dc:date'] | moment }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  // async fetch({ store }) {
  //   await store.dispatch('getHotentry', 'all')
  // },

  filters: {
    moment: date => {
      return moment(date).format('YYYY/M/D')
    }
  },

  computed: {
    entryData() {
      return this.$store.state.entryData
    }
  },

  async mounted() {
    await this.$store.dispatch('getHotentry', 'all')
    console.log(this.entryData)
  }
}
</script>
