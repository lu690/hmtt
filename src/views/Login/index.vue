<template>
  <div>
    <van-nav-bar title="登录" left-arrow @click-left="$router.back()">
      <van-icon name="cross" slot="left" />
    </van-nav-bar>

    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '请输入手机号' },
          {
            pattern:
              /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/,
            message: '不符合手机号格式',
          },
        ]"
      >
        <!-- <i class="toutiao toutiao-shouji" slot="left-icon"></i> -->
        <ToutiaoIcon name="shouji" slot="left-icon"></ToutiaoIcon>
      </van-field>
      <van-field
        v-model.trim="code"
        type="password"
        name="code"
        placeholder="请输入验证码"
        :rules="[
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码长度必须是六位' },
        ]"
      >
        <!-- <i class="toutiao toutiao-yanzhengma" slot="left-icon"></i> -->
        <ToutiaoIcon name="yanzhengma" slot="left-icon"></ToutiaoIcon>
        <template #button>
          <van-count-down
            :time="time"
            format="ss 秒"
            v-if="isCountShow"
            @finish="isCountShow = false"
          />
          <van-button
            size="small"
            class="yzm"
            native-type="button"
            v-else
            @click="onsendSms"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button round block native-type="submit" class="login-btn"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { getSmsCode, login } from '@/api/user'
export default {
  created () { },
  data () {
    return {
      mobile: '18260150884',
      code: '246810',
      time: 5 * 1000,
      isCountShow: false
    }
  },
  methods: {
    async onSubmit (values) {
      // console.log('submit', values)
      try {
        const res = await login(values)
        console.log(res)
        // res.data.data
        // token有效期2个小时，两种思路，让用户重新登录 refresh_token
        this.$store.commit('setUser', res.data.data)
        this.$router.push({ name: 'my' })
      } catch (error) {
        console.log(error)
      }
    },
    async onsendSms () {
      try {
        await this.$refs.form.validate('mobile')
        this.isCountShow = true // 显示倒计时
        console.log('校验通过')
        try {
          await getSmsCode(this.mobile)
          this.$toast.success('发送成功')
        } catch (error) {
          console.log(error)
          // this.$toast.fail('发送失败，请重试')
        }
      } catch (error) {
        console.log(error)
        console.log('校验失败')
        // 请提示
        this.$toast.fail('手机号格式不正确')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.toutiao {
  font-size: 37px;
}
.yzm {
  width: 152px;
  height: 46px;
  line-height: 80px;
  background-color: #ededed;
  border-radius: 23px;
  font-size: 22px;
  color: #666;
  position: fixed;
  right: 10px;
  .van-button__text {
    zoom: 0.95;
  }
}

.login-btn {
  width: 694px;
  height: 88px;
  background-color: #6db4fb;
  border-radius: 10px;
  .van-button__text {
    font-size: 30px;
    color: #fff;
  }
  .van-count-down {
    position: fixed;
    right: 18px;
  }
}
</style>
