<template>
  <div class="home-nav-bar-conatiner">
    <van-nav-bar>
      <template v-slot:title>
        <van-button
          icon="search"
          type="info"
          round
          @click="$router.push('/search')"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
  </div>
</template>
<script>
import { NavBar, Button } from "vant";
export default {
  name: "HomeNavBar",
  components: {
    [NavBar.name]: NavBar,
    [Button.name]: Button
  },
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {}
};
</script>
<style lang="less" scoped>
/deep/ .van-button {
  width: 250px;
  height: 30px;
  max-width: none;
  background: #78aaf9;
}
/deep/.van-nav-bar__title {
  max-width: none;
}
</style>
