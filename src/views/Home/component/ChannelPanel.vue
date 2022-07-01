<template>
  <div>
    <div class="channel-container">
      <div class="title">
        <h3>我的频道</h3>
        <van-button
          size="mini"
          plain
          type="primary"
          color="#f85a5a"
          @click="isCloseShow = !isCloseShow"
          >{{ isCloseShow ? "完成" : "编辑" }}</van-button
        >
      </div>
      <van-row type="flex">
        <van-col span="6" v-for="(item, index) in myChannels" :key="index">
          <!-- :style="{ color: active === index ? 'red' : '' }"  利用索引，动态绑定当前频道为红色 -->
          <div
            class="inner"
            :style="{ color: active === index ? 'red' : '' }"
            @click="onclick(index)"
          >
            {{ item.name }}
            <van-icon
              v-show="isCloseShow"
              name="close"
              v-if="index !== 0"
              :style="{ color: active === index ? 'red' : '' }"
            />
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="channel-container">
      <div class="title">
        <h3>推荐频道</h3>
      </div>
      <van-row type="flex">
        <van-col span="6" v-for="(item, index) in recommandPanel" :key="index">
          <div class="inner" @click="add(item.id)">+{{ item.name }}</div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { getAllArticleList, saveChannel } from '@/api/home'
import { setItem } from '@/utils/storage'
const CHANNELS = 'CHANNELS'
export default {
  name: 'ChannelPanel',
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  async created () {
    try {
      const res = await getAllArticleList()
      console.log(res)
      this.recommandPanel = res.data.data.channels.filter(item => this.myChannels.every(item1 => item1.id !== item.id))
      console.log(this.recommandPanel)
    } catch (error) {
      console.log(error)
    }
  },
  data () {
    return {
      recommandPanel: [],
      isCloseShow: false
    }
  },
  methods: {
    add (id) {
      const index = this.recommandPanel.findIndex(item => item.id === id)
      this.myChannels.push(this.recommandPanel[index])
      this.recommandPanel.splice(index, 1)
    },
    onclick (index) {
      if (this.isCloseShow) {
        if (index === 0) return // 推荐不能删除，所以要排除掉
        // 删除
        const obj = this.myChannels[index]
        this.myChannels.splice(index, 1)
        this.recommandPanel.push(obj)

        if (index < this.active) {
          this.$emit('del-event', this.active - 1)
        }
      } else {
        // 将鼠标点击的那个，以index索引的方式传给父元素
        this.$emit('change-active', index)
      }
    }
  },
  computed: {},
  watch: {
    channels: {
      // 登陆过 把持久化放在后台服务器（用ajax）  未登录 方本地储存
      async handler (newVal) {
        if (this.$store.state.user && this.$store.state.user.token) { // 登录过
          const arr = []
          newVal.forEach((item, index) => {
            arr.push({ id: item.id, seq: index })
          })
          console.log(arr)
          try {
            const res = await saveChannel(arr)
            console.log(res)
          } catch (error) {
            console.log(error)
          }
        } else { // 没有登录
          setItem(CHANNELS, newVal)
        }
      },
      deep: true // 深度监听
    }
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.channel-container {
  padding: 0 20px;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    margin-bottom: 16px;
    h3 {
      width: 133px;
      height: 32px;
      font-size: 32px;
      font-weight: 400;
      line-height: 36px;
      color: #333333;
    }
    .van-button {
      color: #f85a5a;
      width: 96px;
      height: 46px;
      border-radius: 20px;
    }
  }
  .inner {
    width: 160px;
    height: 86px;
    background-color: #f4f5f6;
    border-radius: 6px;

    font-size: 28px;
    text-align: center;
    line-height: 86px;
    color: #222222;
    margin-left: 10px;
    margin-bottom: 20px;
    position: relative;

    .van-icon-close {
      position: absolute;
      right: 0;
      top: 0;
      transform: translate(50%, -50%);
    }
  }
}
</style>
