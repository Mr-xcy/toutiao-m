<!--
 * @Descripttion: 登录
 * @version: 
 * @Author: xuchunyuan
 * @Date: 2020-10-16 09:32:57
-->
<template>
  <div class="login-container">
    <van-nav-bar
      class="app-nav-bar"
      title="登录/注册"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 登录表单 -->
    <!--
      基于 Vant 的表单验证：
      1、使用 van-form 组件包裹所有的表单项 van-field
      2、给 van-form 绑定 submit 事件
         当表单提交的时候会触发 submit 事件
         提示：只有表单验证通过，它才会调用 submit
      3、使用 Field 的rules属性定义校验规则
     -->
    <van-form
      @submit="onLogin"
      ref="login-form"
      :show-error="false"
      :show-error-message="false"
      :validate-first="true"
      @failed="onFailed"
    >
      <van-field
        v-model="user.mobile"
        center
        left-icon="phone-o"
        placeholder="请输入手机号"
        name="mobile"
        :rules="formRules.mobile"
      />
      <van-field
        v-model="user.code"
        center
        left-icon="aim"
        placeholder="请输入验证码"
        name="code"
        :rules="formRules.code"
      >
        <template #button>
          <!-- 倒计时组件 -->
          <!-- @finish 倒计时结束触发，显示文字提示 -->
          <van-count-down 
            v-if="isCountDownShown"
            :time="1000 * 60" 
            format="ss s" 
            @finish="isCountDownShown = false"
          />
          <van-button 
            v-else
            class="send-btn" 
            size="small" 
            @click.prevent="sendSms" 
            :loading = 'isSendSmsLoading'
            round
          >发送验证码
          </van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" type="info" block>登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from "@/api/user";
// import { Toast } from "vant";
export default {
  name: "LoginIndex",
  data() {
    return {
      user: {
        mobile: "13611111111",
        code: "246810"
      },
      formRules: {
        mobile: [
          { required: true, message: "请填写手机号" },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: "手机号格式错误" },
        ],
        code: [
          { required: true, message: "请填写验证码" },
          { pattern: /^\d{6}$/, message: "验证码格式错误" },
        ],
      },
      isCountDownShown: false,
      isSendSmsLoading: false,
    };
  },
  methods: {
    // 登录
    async onLogin() {
            // Toast.loading({
      this.$toast.loading({
        message: "登录中...",
        forbidClick: true, //是否禁止背景点击
        duration: 0, //展示时长(ms),值为 0 时，toast 不会消失
      });
      try {
        // const res = await login(this.user);
        const { data } = await login(this.user)
        // Toast.success("登录成功");
        this.$toast.success("登录成功");

        //登录成功，保存用户信息
        this.$store.commit('setUser',data.data); 

        // 
        this.$router.back();

      } catch (err) {
        console.log('登录失败' + err);
        Toast.fail("登录失败，手机号或验证码错误");
        this.$toast.fail("登录失败，手机号或验证码错误");
      }
    },
    //提交表单且验证不通过后触发
    onFailed(error) {
      if (error.errors[0]) {
        this.$toast({
          message: error.errors[0].message,
          position: top
        });
      }
    },
    // 发送验证码
    async sendSms(){
      try {
        // 验证手机号
        await this.$refs['login-form'].validate('mobile')
        // 验证通过，发送验证码 按钮加载动画
        this.isSendSmsLoading = true
        const res =  await sendSms(this.user.mobile)
        console.log(res);
        // 短信发送成功，显示倒计时
        this.isCountDownShown = true;
      } catch (err) {
        console.log('验证失败' , err);
        let message = ''
        if (err && err.response && err.response.status === 429) {
          message = '1分钟内只能发送1次，请稍后重试'
        }else if (err.name === 'mobile'){
          message = err.message
        }else{
          message = '发送失败，请稍后重试'
        }
        this.$toast({
          message: message,
          position: top
        });
      }

      this.isSendSmsLoading = false;
      
    },

  },
};
</script>

<style lang="less" scoped>
.login-container {
  .login-btn-wrap {
    padding: 26px 16px;
    .login-btn {
      background-color: #6db4fb;
      border-radius: 5px;
      border: none;
      font-size: 15px;
    }
  }
  .send-btn {
    width: 85px;
    height: 23px;
    background-color: #ededed;
    .van-button__text {
      font-size: 11px !important;
      color: #666666;
    }
  }
}
</style>
