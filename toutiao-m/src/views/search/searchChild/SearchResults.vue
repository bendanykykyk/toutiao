<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="item in list"
        :key="item.art_id"
        :title="item.title"
        @click="$router.push(`/detail/${item.art_id}`)"
      />
    </van-list>
  </div>
</template>
<script>
import { getSearchResults } from "network/search";
import { List, Cell } from "vant";
export default {
  name: "SearchResults",
  components: {
    [List.name]: List,
    [Cell.name]: Cell
  },
  props: {
    searchContent: {
      type: String,
      require: true
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
  mounted() {
    this.onLoad();
  },
  beforeDestroy() {},
  methods: {
    onLoad() {
      getSearchResults({
        q: this.searchContent,
        page: this.page,
        per_page: this.perPage
      }).then(res => {
        this.list.push(...res.data.results);
        this.loading = false;
        this.page++;
      });
    }
  }
};
</script>
<style lang="less" scoped>
.search-result {
  position: fixed;
  left: 0;
  right: 0;
  top: 54px;
  bottom: 0;
  overflow-y: auto;
}
</style>
