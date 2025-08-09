<template>
  <div class="entries">
    <div class="entries-title-wrapper">
      <h2 class="entries-title">
        {{ getTitleText(props.type, props.category) }}
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

// Computed
const displayedEntries = computed(() => {
  const entries = props.data.item

  if (props.displayCount && props.displayCount > 0) {
    return entries.slice(0, props.displayCount)
  }

  return entries
})

// Methods
function getTitleText(type: EntryType, category: Category) {
  const typeName = type === 'hotentry' ? '人気' : '新着'
  return `${categories[category]}の${typeName}エントリー`
}
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
