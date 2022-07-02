<template>
  <div>
    <van-nav-bar fixed>
      <!-- <template v-slot:title> -->
      <template #title>
        <van-button type="info" icon="search" to="/search">搜索</van-button>
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" animated>
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>
      <template #nav-right>
        <div class="menu">
          <i
            class="toutiao toutiao-gengduo"
            @click="isChannelPannelShow = true"
          ></i>
        </div>
        <div class="menu1"></div>
      </template>
    </van-tabs>
    <van-popup
      v-model="isChannelPannelShow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '95%', paddingTop: '1.5rem' }"
    >
      <!-- 父元素接收点击change-active事件，并触发父元素active事件，其实就是子组件的index跟active能够对应上，同时关闭推荐面板 -->
      <ChannelPanel
        :channels="channels"
        :active="active"
        @change-active="
          active = $event;
          isChannelPannelShow = false;
        "
        @del-active="active = $event"
      ></ChannelPanel>
    </van-popup>
  </div>
</template>

<script>
import ChannelPanel from '@/views/Home/component/ChannelPanel.vue'
import ArticleList from '@/components/ArticleList.vue'
import { getMyChannels } from '@/api/home'
import { getItem } from '@/utils/storage'
const CHANNELS = 'CHANNELS'
export default {
  name: 'Home',
  created () {
    this.getMyChannels()
  },
  data () {
    return {
      active: 0,
      channels: [],
      isChannelPannelShow: false
    }
  },
  methods: {
    async getMyChannels () {
      const channels = getItem(CHANNELS)
      if (!(this.$store.state.user && this.$store.state.user.token) && channels) {
        this.channels = channels
      } else {
        try {
          const res = await getMyChannels()
          // console.log(res.data.data.channels)
          this.channels = res.data.data.channels
        } catch (error) {
          console.log(error)
        }
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    ArticleList,
    ChannelPanel
  }
}
</script>

<style scoped lang='less'>
.van-nav-bar {
  /deep/.van-nav-bar__title {
    max-width: unset;
    .van-button {
      width: 555px;
      height: 64px;
      background: rgba(255, 255, 255, 0.2);
      // opacity: 0.2;
      border-radius: 32px;
    }
  }
}
.van-tabs {
  /deep/ .van-tabs__wrap--scrollable .van-tab {
    padding: 0 69px;
    border-right: 1px solid #edeff3;
  }
  /deep/.van-tabs__line {
    width: 31px;
    height: 6px;
    background-color: #3296fa;
    border-radius: 3px;
  }
  .menu {
    min-width: 100px;
    height: 82px;
    background-color: #fff;
    position: fixed;
    right: 0;
    text-align: center;
    .toutiao-gengduo {
      font-size: 33px;
      color: #333333;
    }
  }
  .menu1 {
    min-width: 100px;
    height: 82px;
    background-color: rgba(255, 255, 255, 0.9);
  }
  /deep/ .van-tabs__wrap {
    width: 100%;
    position: fixed;
    top: 92px;
    z-index: 1;
    border-bottom: 1px solid #edeff3;
  }
}
/deep/ .van-pull-refresh {
  height: calc(100vh - 274px);
  overflow: auto;
}
</style>
