<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <div v-for="(item, index) in value" :key="index">
      <slot v-bind:item="item">{{ item }}</slot>
    </div>
  </van-list>
</template>

<script>
import { List } from "vant";
export default {
  name: "LoadingList",
  components: {
    [List.name]: List
  },
  props: {
    fn: {
      type: Function,
      required: true
    },
    value: {
      type: Array,
      default: () => []
    },
    totalCount: {
      type: Number
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 10
    };
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    onLoad() {
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
      }, 1000);
      // 加载状态结束
      this.loading = false;
      // 1. 请求获取数据
      // const { data } = await this.fn({
      //   page: this.page,
      //   per_page: this.perPage
      // });
      // // 2. 将数据添加到列表中
      // const { results, total_count: totalCount } = data.data;
      // this.value.push(...results);
      // // 更新总数量
      // this.$emit("update:total-count", totalCount);
      // // 3. 停止 loading
      // this.loading = false;
      // // 4. 判断是否还有数据
      // if (results.length) {
      //   this.page++;
      // } else {
      //   this.finished = true;
      // }
    }
  }
};
</script>

<style scoped>
body {
  background: #fff;
}
</style>
