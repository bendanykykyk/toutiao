<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <!-- <span v-if="isDeleteStatus">全部删除</span>
      <span v-if="isDeleteStatus">完成</span> -->
      <van-icon name="delete" @click="deleteHistoryFn" />
    </van-cell>
    <van-cell
      v-for="(item, index) in historySearchList"
      :key="index"
      :title="item.q"
      @click="$emit('SearchHistory', item.q)"
    >
      <van-icon v-if="isDeleteStatus" name="close" />
    </van-cell>
  </div>
</template>

<script>
import { Icon, Cell } from "vant";
import { getSearchHistory, deleteSearchHistory } from "network/search";
export default {
  name: "SearchHistory",
  components: {
    [Icon.name]: Icon,
    [Cell.name]: Cell
  },
  props: {},
  data() {
    return {
      historySearchList: [],
      isDeleteStatus: false
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getSearchHistory();
  },
  mounted() {},
  methods: {
    getSearchHistory() {
      getSearchHistory().then(res => {
        this.historySearchList = res.data.keywords.map(x => JSON.parse(x));
        this.historySearchList.filter(x => {
          return !x.q === "";
        });
      });
    },
    deleteHistoryFn() {
      deleteSearchHistory().then(res => {
        this.historySearchList = [];
      });
    }
  }
};
</script>

<style scoped lang="less"></style>
