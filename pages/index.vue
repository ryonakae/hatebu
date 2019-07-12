<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Context } from '@nuxt/vue-app'

@Component
export default class extends Vue {
  fetch(ctx: Context): void {
    return ctx.redirect('/all')
  }
}
</script>
