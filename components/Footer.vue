<template>
  <footer class="footer">
    <small
      >Respect <a href="http://b.hatena.ne.jp/" target="_blank">はてなブックマーク</a> and
      <a href="http://hatebu.straightline.jp/" target="_blank">嫁のはてブ</a></small
    >
    <small>Create by <a href="https://twitter.com/ryo_dg" target="_blank">Ryo Nakae</a></small>
  </footer>
</template>

<style scoped>
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--padding-content-horizontal-sp);
  color: var(--color-sub);

  & small {
    font-size: var(--fontSize-footer);
  }

  & :any-link {
    color: var(--color-text);

    @media (hover) {
      &:hover {
        color: var(--color-key);
      }
    }
  }
}
</style>
