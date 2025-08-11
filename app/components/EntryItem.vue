<template>
  <div
    class="entry-content"
    :class="{ 'is-noimage': !entry['hatena:imageurl'] }"
  >
    <h3 class="entry-title">
      <NuxtLink
        :to="entry.link"
        external
        target="_blank"
      >
        {{ entry.title }}
      </NuxtLink>
    </h3>

    <NuxtLink
      v-if="entry['hatena:imageurl']"
      :to="entry.link"
      external
      target="_blank"
      class="entry-image"
    >
      <img
        :src="entry['hatena:imageurl']"
        :alt="entry.title"
        loading="lazy"
      >
    </NuxtLink>

    <div class="entry-info">
      <NuxtLink
        :to="entry['hatena:bookmarkCommentListPageUrl']"
        external
        target="_blank"
        class="entry-users"
      >
        <span>{{ entry['hatena:bookmarkcount'] }} users</span>
      </NuxtLink>

      <div class="entry-subject">
        {{ getSubject(entry['dc:subject']) }}
      </div>

      <div class="entry-date">
        {{ formatDate(entry['dc:date']) }}
      </div>
    </div>

    <div class="entry-hostname">
      <img
        :src="getFaviconUrl(entry.link)"
        alt=""
        loading="lazy"
      >

      <span>{{ getHostName(entry.link) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import Url from 'url-parse'

defineProps<{
  entry: EntryItem
}>()

// Methods
function formatDate(date: string): string {
  const today = dayjs().startOf('day')
  const entryDate = dayjs(date).startOf('day')
  let format: string

  // 1日以内なら時刻だけ、1日以上なら日付を表示する
  if (today.diff(entryDate, 'day') === 0) {
    format = 'HH:mm'
  }
  else {
    format = 'YYYY/MM/DD'
  }

  return dayjs(date).format(format)
}

function getSubject(subject: string[]): string {
  return subject[0] || ''
}

function getHostName(url: string): string {
  return new Url(url).hostname
}

function getFaviconUrl(url: string): string {
  const hostName = new Url(url).hostname
  return 'https://www.google.com/s2/favicons?domain=' + hostName
}
</script>

<style scoped>
.entry-content {
  display: grid;
  grid-template-columns: auto var(--image-size);
  grid-gap: 8px 16px;
  padding: var(--padding-content-vertical) var(--padding-content-horizontal);

  @media (--sp) {
    grid-gap: 4px 8px;
    padding: var(--padding-content-vertical-sp)
      var(--padding-content-horizontal-sp);
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
  font-size: var(--fontsize);
}

.entry-image {
  grid-row: 1 / 4;
  grid-column: 2 / 3;
  position: relative;
  width: var(--image-size);
  height: var(--image-size);
  background-color: var(--color-bg);
  border-radius: var(--border-radius);
  overflow: hidden;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &::after {
    position: absolute;
    content: '';
    inset: 0;
    border: 1px solid var(--color-border);
    border-radius: inherit;
  }
}

.entry-info {
  grid-row: 2 / 3;
  grid-column: 1 / 2;
  display: flex;
  align-items: center;

  & > * {
    margin-right: 8px;
  }
}

.entry-users {
  height: 20px;
  padding-inline: 8px;
  font-size: var(--fontsize-small);
  color: var(--color-accent);
  background-color: rgba(var(--color-accent-rgb), 0.08);
  border-radius: calc(20px / 2);

  @media (hover) {
    &:hover {
      color: white;
      text-decoration: none;
      background-color: var(--color-accent);
    }
  }
}

.entry-subject,
.entry-hostname,
.entry-date {
  font-size: var(--fontsize-small);
  color: var(--color-sub);
}

.entry-hostname {
  grid-row: 3 / 4;
  grid-column: 1 / 2;
  display: flex;
  align-items: center;
  column-gap: 4px;

  & img {
    width: var(--favicon-size);
    height: auto;
  }
}
</style>
