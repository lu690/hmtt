<template>
  <div>
    <van-nav-bar :title="title" left-arrow @click-left="$emit('close')" fixed>
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <CommentItem :item="comment" class="comment"></CommentItem>
    <van-cell title="全部回复" />
    <CommentItem
      :item="item"
      v-for="item in list"
      :key="item.com_id"
    ></CommentItem>
    <div class="comment1"></div>
    <div class="bottom">
      <van-button
        type="primary"
        block
        round
        plain
        @click="isAddCommentShow = true"
        >评论</van-button
      >
    </div>

    <!-- 新添加评论 -->
    <van-popup position="bottom" v-model="isAddCommentShow"
      ><AddComment
        :target="comment.com_id"
        :art_id="$route.params.article_id"
        v-if(isAddCommentShow)
        @add-comment="list.unshift($event)"
        comment.reply_count++
      ></AddComment>
    </van-popup>
  </div>
</template>

<script>
import AddComment from '@/views/Article/components/AddComment.vue'
import CommentItem from '@/views/Article/components/CommentItem.vue'
import { getCommentList } from '@/api/comment'
export default {
  created () {
    console.log(111)
    console.log(this.comment)
    console.log(222)
    console.log(this.getCommentList())
  },
  data () {
    return {
      comment: {
        type: Object,
        default: () => ({})
      },
      offset: null,
      limit: 10,
      list: [],
      isAddCommentShow: false
    }
  },
  methods: {
    async getCommentList () {
      try {
        const res = await getCommentList({ type: 'c', source: this.comment.com_id, offset: this.offset, limit: this.limit })
        console.log(res)
        this.list = res.data.data.results
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {
    title () {
      const count = this.comment.reply_count
      if (this.comment.reply_count === 0) {
        return '暂无回复'
      } else {
        return count + '条数据'
      }
    }
  },
  watch: {},
  filters: {},
  components: { CommentItem, AddComment }
}
</script>

<style scoped lang='less'>
// .comment {
//   margin-top: 92px;
// }

.comment1 {
  margin-bottom: 110px;
}
.bottom {
  width: 750px;
  position: fixed;
  bottom: 0;
  padding: 10px 30px;
  box-sizing: border-box;
  background-color: pink;
}
</style>
