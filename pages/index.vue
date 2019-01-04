<template>
  <div>
    <h1>h</h1>
    <h2>
      <a :href="entryData.channel.link">{{ entryData.channel.title }}</a>
    </h2>
    <ul>
      <li v-for="entry in entryData.item" :key="entry.link">
        <h3>
          <a :href="entry.link">{{ entry.title }}</a>
        </h3>
        <div>{{ entry['hatena:bookmarkcount'] }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  async asyncData({ store }) {
    await store.dispatch('getHotentry', 'all')
  },

  computed: {
    entryData() {
      return this.$store.state.entryData
    }
  }
}
</script>
