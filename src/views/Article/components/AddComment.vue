<template>
  <van-field
    v-model.trim="message"
    rows="2"
    autosize
    type="textarea"
    maxlength="50"
    placeholder="请输入留言"
    show-word-limit
    class="add-field"
    ref="filed"
  >
    <template #extra>
      <!-- disabled 当输入框没有内容的时候，按钮就应该是就被禁用 -->
      <van-button
        type="default"
        class="btn"
        :disabled="message.length === 0"
        @click="onclick"
        >发布</van-button
      ></template
    >
  </van-field>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  props: {
    target: {
      type: [Number, String],
      required: true
    },
    art_id: {
      type: [Number, String]
    }
  },
  created () { },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    async onclick () {
      try {
        const res = await addComment({ target: this.target, content: this.message, art_id: this.art_id })
        console.log(res)
        this.$emit('add-comment', res.data.data.new_obj)
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {},
  mounted () {
    this.$refs.filed.$el.querySelector('textarea').focus()
  }
}
</script>

<style scoped lang='less'>
.add-field {
  align-items: center;
  .btn {
    border: none;
  }
}
</style>
