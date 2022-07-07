<template>
  <div>
    <van-loading size=".53333rem" v-if="isLoading" />
    <van-icon
      v-else
      color="#777"
      :name="is_collected ? 'star' : 'star-o'"
      @click="onClick"
    />
  </div>
</template>

<script>
import { addCollect, delCollect } from '@/api/article'
export default {
  name: 'CollectArticle',
  props: {
    is_collected: { type: Boolean, required: true }
  },
  created () { },
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    async onClick () {
      this.isLoading = true
      const target = this.$route.params.article_id
      // this.$emit('update:is_collected', !this.is_collected)
      if (this.is_collected) {
        try {
          await delCollect(target)
          this.$emit('update:is_collected', !this.is_collected)
        } catch (error) {
          console.log(error)
        }
      } else {
        try {
          await addCollect(target)
          this.$emit('update:is_collected', !this.is_collected)
        } catch (error) {
          console.log(error)
        }
      }
      this.isLoading = false
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
