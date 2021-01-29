<template>
  <div>
    <van-nav-bar
      title="昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onComfirm"
    />
    <div class="field-wrap">
      <van-field
        v-model="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>
<script>
import { updateUserProfile } from "network/my";
import { NavBar, Field } from "vant";
export default {
  name: "MyNamePopup",
  components: {
    [NavBar.name]: NavBar,
    [Field.name]: Field
  },
  props: {
    nickName: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      localName: this.nickName
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    onComfirm() {
      //   this.isNamePopupShow = false;
      // loading 开始
      this.$toast.loading({
        message: "保存中",
        forbidclick: true // 禁止背景点击
      });
      // 更改用户名称

      updateUserProfile({ name: this.localName }).then(res => {
        this.$toast.success("保存成功");
        // 假更新，接口有问题

        this.$emit("input", this.localName);
        this.$emit("close");
      });
    }
  }
};
</script>
<style lang="less" scoped>
@deep: ~">>>"; // deep之后要无效了，如果用less和sass的话，要转义一下>>>才能使用
.field-wrap {
  margin: 10px;
}
@{deep}.van-nav-bar__content {
  background: white;
  @{deep}.van-nav-bar__title {
    color: black;
  }
}
</style>
