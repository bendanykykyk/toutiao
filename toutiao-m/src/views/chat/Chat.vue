<template>
  <div class="chat-container">
    <van-nav-bar title="小智同学" left-arrow @click-left="$router.back()" />
    <!-- 消息列表 -->
    <!-- <div class="message-list" ref="message-list">
      <div
        class="message-item"
        :class="{ reverse: item.userId === user.user_id }"
        v-for="(item, index) in messages"
        :key="index"
      >
        <van-image class="avatar" round fit="cover" :src="item.photo" />
        <div class="msg-wrap" style="flex: 1;">
          <div class="title">{{ item.msg }}</div>
        </div>
      </div>
    </div> -->
    <!-- /消息列表 -->

    <div class="chat-input">
      <van-field v-model="sms" center clearable placeholder="请输入聊天信息">
        <template #button>
          <van-button type="primary">发送</van-button>
        </template>
      </van-field>
    </div>
  </div>
</template>
<script>
import { NavBar, Field, Button } from "vant";
// import io from "socket.io-client";
export default {
  name: "Chat",
  components: {
    [NavBar.name]: NavBar,
    [Field.name]: Field,
    [Button.name]: Button
  },
  props: {},
  data() {
    return {
      sms: "",
      socket: null // WebSocket 通信对象
    };
  },
  computed: {},
  watch: {},
  created() {
    // // 断开连接了
    // socket.on("disconnect", () => {
    //   console.log("断开连接了");
    // });
    // // 监听 message 事件，接收服务端消息
    // socket.on("message", data => {
    //   // 把对方发给我的消息放到数组中
    //   this.messages.push(data);
    // });
    // 建立连接
    // const token = this.$store.state.user.token;
    // this.socket = io(`http://ttapi.research.itcast.cn?token=${token}`);
    // this.socket = socket;
    // this.socket.on("connect", () => {
    //   console.log("连接建立成功了");
    // });
  },
  mounted() {},
  beforeDestroy() {},
  methods: {}
};
</script>
<style lang="less" scoped>
.chat-container {
  height: 100vh;
  background: #f5f5f6;
}
.chat-input {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
