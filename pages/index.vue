<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class extends Vue {
  // lifecycle
  async mounted() {
    await this.$nextTick()
    this.$router.replace('/all')
  }
}
</script>
