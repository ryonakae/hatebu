<template>
  <nav>
    <ul>
      <li v-for="(category, key) in categories" :key="key">
        <nuxt-link :to="'/' + key" @click.prevent="setCurrentCategory(key)">{{
          category
        }}</nuxt-link>
      </li>
      <li><a href="https://kadenkaigi.com/" target="_blank">家電</a></li>
    </ul>
  </nav>
</template>

<script>
export default {
  computed: {
    categories() {
      return this.$store.state.categories
    }
  },

  methods: {
    setCurrentCategory(category) {
      this.$store.commit('SET_CURRENT_CATEGORY', category)
    }
  }
}
</script>
