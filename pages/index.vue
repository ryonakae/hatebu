<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  fetch({ redirect }) {
    return redirect('/all')
  }
})
</script>
