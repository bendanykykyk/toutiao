<template>
  <van-datetime-picker
    v-model="currentDate"
    type="date"
    title="选择年月日"
    :min-date="minDate"
    :max-date="maxDate"
    @confirm="onConfirm"
    @cancel="$emit('close')"
  />
</template>
<script>
import { updateUserProfile } from "network/my";
import { DatetimePicker, Toast } from "vant";
export default {
  name: "MyNamePopup",
  components: {
    [DatetimePicker.name]: DatetimePicker,
    [Toast.name]: Toast
  },
  props: {
    // gender: {
    //   type: Number,
    //   default: 0
    // }
  },
  data() {
    return {
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date()
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    onConfirm(value) {
      const birthday = this.$day(value).format("YYYY-MM-DD");
      Toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      updateUserProfile({
        birthday
      }).then(res => {
        Toast.success("成功文案");
        // 修改假生日
        this.$emit("input", birthday);
        this.$emit("close");
      });
    },
    onCancel() {},
    onChange() {}
  }
};
</script>
<style lang="less" scoped></style>
