<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <!-- <van-cell v-for="(item, index) in commentList" :key="index">
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px"
          :src="item.aut_photo"
        />
        <span style="color: #466b9d" slot="title">hello</span>
        <div slot="label">
          <p style="color: #363636">{{ item.content }}</p>
          <p>
            <span style="margin-right: 10px">{{
              item.pubdate | dateformate
            }}</span>
            <van-button size="mini" type="default">回复</van-button>
          </p>
        </div>
        <van-icon slot="right-icon" name="like-o" />
      </van-cell> -->
      <CommentItem
        v-for="(item, index) in commentList"
        :key="index"
        :item="item"
        @replay-show="$emit('replay-show', $event)"
      ></CommentItem>
    </van-list>
  </div>
</template>

<script>
import CommentItem from './CommentItem.vue'
import { getCommentList } from '@/api/comment'
export default {
  props: {
    type: {
      type: String,
      required: true,
      // props自定义校验函数
      validator (value) {
        // return ['a', 'c'].indexOf(value) !== -1
        return ['a', 'c'].includes(value)
      }
    },
    source: {
      type: [String, Number],
      required: true
    },
    commentList: {
      type: Array,
      required: true
    }
  },
  created () {
    this.getCommentList()
  },
  data () {
    return {
      paramObj: {
        type: this.type,
        source: this.source,
        offset: null,
        limit: 5
      },
      // commentList: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    async getCommentList () {
      try {
        const res = await getCommentList(this.paramObj)
        console.log('和')
        console.log(res)
        if (res.data.data.results.length === 0) {
          // 若数据已全部加载完毕，则直接将 finished 设置成 true，阻止继续加载
          this.finished = true
        }
        // this.commentList = res.data.data.results
        this.$emit('set-count', res.data.data.total_count)
        // 保留每一页数据，避免数据重复
        this.commentList.push(...res.data.data.results)
        // console.log(this.commentList)
        // 本次返回结果的最后一个评论id，作为请求下一页数据的offset参数，若本次无具体数据，则值为null
        this.paramObj.offset = res.data.data.last_id
        // 每次当前页面数据拿回来了，就把loading加载关闭
        this.loading = false
      } catch (error) {
        console.log(error)
      }
    },
    onLoad () {
      this.getCommentList()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { CommentItem }
}
</script>

<style scoped lang='less'>
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>
