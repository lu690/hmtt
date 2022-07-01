<template>
  <div>
    <van-cell-group>
      <van-pull-refresh
        v-model="refreshing"
        @refresh="onRefresh"
        ref="pullrefresh"
      >
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <!-- <van-cell
            :title="item.title"
            value="内容"
            v-for="(item, index) in articleList"
            :key="index"
            label="描述信息"
          /> -->
          <ArticleItem
            v-for="(item, index) in articleList"
            :key="index"
            :article="item"
          ></ArticleItem>
        </van-list>
      </van-pull-refresh>
    </van-cell-group>
  </div>
</template>

<script>
import { getArticleList } from '@/api/home'
import ArticleItem from './ArticleItem.vue'
let ele = null
let scrollTop = 0
export default {
  name: 'ArticleList',
  props: {
    id: {
      type: Number,
      required: true
    }

  },
  created () {
    this.getArticleList()
  },
  mounted () {
    // console.log(this.$refs.pullrefresh)
    ele = this.$refs.pullrefresh.$el
    this.$refs.pullrefresh.$el.addEventListener('scroll', function () {
      // console.log(this.scrollTop)
      scrollTop = this.scrollTop
    })
  },
  activated () {
    ele.scrollTop = scrollTop
  },
  data () {
    return {
      timestamp: Date.now(),
      articleList: [],
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  methods: {
    async getArticleList () {
      setTimeout(() => {
        if (this.refreshing) {
          this.articleList = []
          this.refreshing = false
          this.getArticleList()
        }
      }, 500)
      try {
        const res = await getArticleList({ channel_id: this.id, timestamp: this.timestamp })
        console.log(res)
        this.timestamp = res.data.data.pre_timestamp
        // this.articleList = res.data.data.results
        if (this.timestamp === null) {
          this.finished = true
        }
        this.articleList.push(...res.data.data.results)
        this.loading = false
      } catch (error) {
        console.log(error)
      }
    },
    onLoad () {
      this.getArticleList()
    },
    onRefresh () {
      this.finished = false // 清空列表数据
      this.loading = true // 将 loading 设置为 true，表示处于加载状态
      // this.articleList = []
      this.timestamp = Date.now()
      this.getArticleList()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    ArticleItem
  }
}
</script>

<style scoped lang='less'>
.van-cell-group {
  margin-top: 174px;
}
</style>
