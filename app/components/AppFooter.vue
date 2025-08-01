<template>
  <footer class="footer">
    <ul class="footer-shortcuts">
      <li class="footer-shortcuts-item">
        <pre>H</pre>
        <span>人気エントリーを表示</span>
      </li>
      <li class="footer-shortcuts-item">
        <pre>N</pre>
        <span>新着エントリーを表示</span>
      </li>
      <li class="footer-shortcuts-item">
        <pre>←</pre>
        <span>前のカテゴリーを表示</span>
      </li>
      <li class="footer-shortcuts-item">
        <pre>→</pre>
        <span>次のカテゴリーを表示</span>
      </li>
    </ul>

    <div class="footer-copyright">
      <small>Respect
        <a
          href="https://b.hatena.ne.jp/"
          target="_blank"
          rel="noopener noreferrer"
        >はてなブックマーク</a>
        and
        <a
          href="http://hatebu.straightline.jp/"
          target="_blank"
          rel="noopener noreferrer"
        >嫁のはてブ</a></small>
      <small>Created by
        <a
          href="https://twitter.com/ryo_dg"
          target="_blank"
          rel="noopener noreferrer"
        >Ryo Nakae</a></small>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 24px var(--padding-content-horizontal-sp);
  font-size: var(--fontsize-footer);
  color: var(--color-sub);
  background-color: var(--color-bg-footer);
}

.footer-shortcuts {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 8px;
  list-style-type: none;

  @media (--sp) {
    display: none;
  }
}

.footer-shortcuts-item {
  display: flex;
  align-items: center;
  margin: 0 0.5em 1em;

  & pre {
    display: block;
    padding: 0.4em 0.6em 0.3em;
    font-weight: bold;
    line-height: 1;
    color: var(--color-text);
    background-color: var(--color-bg-pre);
    border-radius: var(--border-radius);
  }

  & span {
    margin-left: 8px;
  }
}

.footer-copyright {
  display: flex;
  flex-direction: column;
  align-items: center;

  & small {
    font-size: var(--fontsize-footer);
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
