<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class extends Vue {
  fetch(ctx: Context) {
    return ctx.redirect('/all')
  }
}
</script>
