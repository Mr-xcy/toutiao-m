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
      :show-error="false"
      :show-error-message="false"
      validate-first
      @failed="onFailed"
    >
      <van-field
        v-model="user.mobile"
        left-icon="phone-o"
        placeholder="请输入手机号"
        :rules="formRules.mobile"
      />
      <van-field
        v-model="user.code"
        left-icon="aim"
        placeholder="请输入验证码"
        :rules="formRules.code"
      >
        <template #button>
          <van-button class="send-btn" size="small" round
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" type="info" block>登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from "@/api/user";
// import { Toast } from "vant";
export default {
  name: "LoginIndex",
  data() {
    return {
      user: {
        mobile: "",
        // code: "246810",
        code: "",
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
    };
  },
  methods: {
    // 登录
    // onLogin() {
    //   login(this.user).then((res) => {
    //     console.log(res);
    //   });
    // },
    async onLogin() {
      // Toast.loading({
      this.$toast.loading({
        message: "登录中...",
        forbidClick: true, //是否禁止背景点击
        duration: 0, //展示时长(ms),值为 0 时，toast 不会消失
      });
      try {
        const res = await login(this.user);
        console.log(res);
        // Toast.success("登录成功");
        this.$toast.success("登录成功");
      } catch (error) {
        console.log(error);
        // Toast.fail("登录失败，手机号或验证码错误");
        this.$toast.fail("登录失败，手机号或验证码错误");
      }
    },
    //提交表单且验证不通过后触发
    onFailed(error) {
      // console.log(error);
      if (error.errors[0]) {
      }
      this.$toast;
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
