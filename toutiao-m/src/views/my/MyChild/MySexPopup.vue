<template>
  <van-picker
    title="性别"
    show-toolbar
    :columns="['女', '男']"
    default-index="0"
    @confirm="onConfirm"
    @cancel="$emit('close')"
    @change="onChange"
  />
</template>
<script>
import { updateUserProfile } from "network/my";
import { Picker, Toast } from "vant";
export default {
  name: "MyNamePopup",
  components: {
    [Picker.name]: Picker,
    [Toast.name]: Toast
  },
  props: {
    // gender: {
    //   type: Number,
    //   default: 0
    // }
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    onConfirm(value) {
      // 加载
      Toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      if (value === "男") {
        value = 1;
      } else {
        value = 0;
      }
      // 调用修改数据接口
      updateUserProfile({ gender: value }).then(res => {
        Toast.success("更改性别成功");
        // 假修改父组件的数据，接口有问题主要是
        this.$emit("input", value);
        this.$emit("close");
      });
    },
    onCancel() {},
    onChange() {}
  }
};
</script>
<style lang="less" scoped></style>
