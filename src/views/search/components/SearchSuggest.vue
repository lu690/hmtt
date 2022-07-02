<template>
  <div>
    <van-cell
      v-for="(item, index) in list"
      :key="index"
      icon="search"
      @click="$emit('search', item)"
    >
      <template #title>
        <span v-html="highlight(item)"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestList } from '@/api/search'
let timer = null
export default {
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  created () { },
  data () {
    return {
      list: []
    }
  },
  methods: {
    highlight (str) {
      const reg = new RegExp(this.searchText, 'g')
      return str.replace(reg, `<span style="color:red">${this.searchText}</span>`)
    }
  },
  computed: {},
  watch: {
    searchText: {
      handler (newVal) {
        // console.log(newVal)
        clearTimeout(timer)
        // 防抖处理用定时器
        timer = setTimeout(async () => {
          // console.log(newVal)
          try {
            const res = await getSuggestList(newVal)
            console.log(res)
            this.list = res.data.data.options
          } catch (error) {
            console.log(error)
          }
        }, 800)
      },
      immediate: true // 立即监听
    }
  },
  filters: {},
  components: {},
  beforeDestroy () {
    clearTimeout(timer)
  }
}
</script>

<style scoped lang='less'>
</style>
