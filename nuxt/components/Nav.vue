<template>
  <nav class="nav">
    <ul class="display">
      <li
        class="display-item link is-noborder"
        :class="{ 'is-active': displayMode === 'hotentry' }"
        @click.prevent="changeDisplayMode('hotentry')"
      >
        人気
      </li>
      <li
        class="display-item link is-noborder"
        :class="{ 'is-active': displayMode === 'entrylist' }"
        @click.prevent="changeDisplayMode('entrylist')"
      >
        新着
      </li>
    </ul>

    <ul class="category">
      <li v-for="(category, key) in categories" :key="key" class="category-item">
        <nuxt-link
          class="category-link is-noborder"
          :to="'/' + key"
          @click.prevent="setCurrentCategory(key)"
        >
          <span>{{ category }}</span>
        </nuxt-link>
      </li>
      <li class="category-item">
        <a class="category-link is-noborder" href="https://kadenkaigi.com/" target="_blank">
          <span>家電</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  computed: {
    categories() {
      return this.$store.state.categories
    },

    displayMode() {
      return this.$store.state.displayMode
    }
  },

  methods: {
    setCurrentCategory(category) {
      this.$store.commit('SET_CURRENT_CATEGORY', category)
    },

    async changeDisplayMode(mode) {
      if (mode === this.displayMode) return

      window.scrollTo(0, 0)
      let data

      data = await this.$store.dispatch('getEntry', {
        mode: mode,
        category: this.$route.params.category
      })

      this.$store.commit('SET_ENTRY_DATA', data)
      this.$store.commit('SET_DISPLAY_MODE', mode)
    }
  }
}
</script>

<style scoped>
.nav {
  position: sticky;
  top: -1px;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  overflow: hidden;
  font-size: var(--fontSize-nav);
  background-color: var(--color-contentBg);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.display,
.category {
  display: flex;
  white-space: nowrap;
  list-style-type: none;
}

.display {
  padding: 0 8px;
  background-color: var(--color-contentBg);
}

.display-item {
  height: 26px;
  padding: 0 10px;
  margin-left: 2px;
  line-height: 26px;
  color: inherit;
  background-color: var(--color-bg);
  border-radius: calc(26px / 2);

  &:first-child {
    margin-left: 0;
  }

  &.is-active {
    font-weight: bold;
    color: white;
    background-color: var(--color-key);
  }

  @media (hover) {
    &:hover {
      color: var(--color-key);
    }

    &.is-active:hover {
      color: white;
    }
  }
}

.category {
  height: 100%;
  overflow-x: auto;
}

.category-item {
  &:last-child .category-link {
    padding-right: 16px;
  }
}

.category-link {
  display: block;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 0 8px;
  color: inherit;

  &.nuxt-link-active {
    font-weight: bold;
    color: var(--color-key);
  }

  @media (hover) {
    &:hover {
      color: var(--color-key);
    }
  }
}
</style>
