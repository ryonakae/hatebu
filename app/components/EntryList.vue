<template>
  <div class="entries">
    <div class="entries-title-wrapper">
      <h2 class="entries-title">
        <span v-if="props.type === 'hotentry'">
          {{ store.categories[props.category as Category] }}の人気エントリー
        </span>
        <span v-else-if="props.type === 'entrylist'">
          {{ store.categories[props.category as Category] }}の新着エントリー
        </span>
      </h2>
      <CommonDivider />
    </div>

    <ul class="entries-list">
      <li
        v-for="entry in displayedEntries"
        :key="entry.link"
        class="entry"
      >
        <EntryItem :entry="entry" />
        <CommonDivider />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  type: EntryType
  category: Category
  data: RSSData
  displayCount?: number
}>()
const store = useCommonStore()

// 表示するエントリーリストを計算
const displayedEntries = computed(() => {
  const entries = props.data.item

  if (props.displayCount && props.displayCount > 0) {
    return entries.slice(0, props.displayCount)
  }

  return entries
})
</script>

<style scoped>
.entries-title-wrapper {
  position: sticky;
  top: 0;
  z-index: var(--z-index-entry-title);
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
</style>
