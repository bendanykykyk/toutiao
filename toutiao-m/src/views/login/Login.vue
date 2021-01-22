<template>
  <div class="login-container">
    <van-nav-bar title="注册/登录" left-arrow @click-left="$router.back()" />

    <!-- 登录/注册表单 -->
    <van-form
      :show-error-message="false"
      :show-error="false"
      validate-first
      @submit="loginFn"
      @failed="failFn"
      ref="loginForm"
    >
      <van-cell-group>
        <van-field
          v-model="userForm.mobile"
          icon-prefix="iconfont"
          left-icon="iconfont iconshouji"
          clearable
          placeholder="请输入手机号"
          name="mobile"
          :rules="userFormValidate.mobile"
        />
        <van-field
          v-model="userForm.code"
          icon-prefix="iconfont"
          left-icon="iconfont iconyanzhengma"
          placeholder="请输入验证码"
          name="code"
          :rules="userFormValidate.code"
        >
          <template #button>
            <van-count-down
              v-if="isCountDownShow"
              :time="1000 * 10"
              format="ss s"
              @finish="finishCountFn"
            />
            <van-button
              v-else
              class="send-btn"
              size="small"
              type="primary"
              @click.prevent="sendCodeFn"
              >发送验证码</van-button
            >
          </template>
        </van-field>
      </van-cell-group>
      <div class="login-btn">
        <van-button type="info" block>登录</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { NavBar, Field, CellGroup, Button, Form, Toast, CountDown } from "vant";
// 导入网络请求
import { login, getCode } from "network/login";
export default {
  name: "Login",
  components: {
    [NavBar.name]: NavBar,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [Form.name]: Form,
    [Toast.name]: Toast,
    [CountDown.name]: CountDown
  },
  props: {},
  data() {
    return {
      userForm: {
        mobile: "18758580113",
        code: "246810"
      },
      userFormValidate: {
        mobile: [
          { required: true, message: "请填写手机号" }
          // {
          //   pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/,
          //   message: "请填写正确的手机号"
          // }
        ],
        code: [{ required: true, message: "请填写验证码" }]
      },
      isCountDownShow: false
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    // 登录
    loginFn() {
      // 开始加载提示
      Toast.loading({
        message: "登录中...",
        forbidClick: true
      });

      login(this.userForm).then(
        res => {
          console.log(res);
          this.$toast.success("登录成功");
          this.$router.push("/");
        },
        err => {
          console.log(err.response);
          this.$toast.fail("手机号或者验证码错误");
        }
      );
    },
    // 登录失败
    failFn(error) {
      this.$toast(error.errors[0].message);
    },
    sendCodeFn() {
      this.$refs.loginForm.validate("mobile");

      this.isCountDownShow = true;
      getCode(this.userForm.mobile).then(
        res => {
          // 等待用户自己接受code，输入
        },
        err => {
          let message = "";
          if (err && err.response && err.response.status === 429) {
            message = "发送太频繁了，请稍后再试";
          } else if (err.name === "mobile") {
            message = err.message;
          } else {
            message = "未知错误，请稍后再试";
          }
          this.$toast(message);
        }
      );
    },
    // 倒计时结束后，切换回去
    finishCountFn() {
      this.isCountDownShow = false;
    }
  }
};
</script>
<style lang="less" scoped>
.send-btn {
  border-radius: 2px;
}
.login-container {
  .login-btn {
    padding: 19px;
    .van-button {
      background: #85b3f8;
      border: none;
    }
  }
}
</style>
