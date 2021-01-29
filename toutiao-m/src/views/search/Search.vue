<template>
  <div>
    <form action="/">
      <van-search
        v-model="value"
        show-action
        clearable
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isSearchResultsShow = false"
      />
    </form>
    <search-results
      v-if="isSearchResultsShow"
      :searchContent="value"
    ></search-results>
    <search-history
      v-else-if="!value"
      @SearchHistory="onSearch"
    ></search-history>
    <search-suggestion
      v-else
      :searchContent="value"
      @SearchHistory="onSearch"
    ></search-suggestion>
  </div>
</template>
<script>
import SearchHistory from "./searchChild/SearchHistory";
import SearchResults from "./searchChild/SearchResults";
import SearchSuggestion from "./searchChild/SearchSuggestion";
import { Search } from "vant";
// import { getSearchResults } from "network/search";
export default {
  name: "Search",
  components: {
    [Search.name]: Search,
    SearchHistory,
    SearchResults,
    SearchSuggestion
  },
  props: {},
  data() {
    return {
      value: "",
      // searchResultsList: [],
      isSearchHistoryShow: true,
      isSearchResultsShow: false
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    onSearch(q) {
      // this.searchResultsList = [];
      // this.getSearchResults(key, page, perPage);
      this.value = q;
      // 1.显示搜索结果
      this.isSearchResultsShow = true;
      this.isSearchHistoryShow = false;
    },
    onCancel() {
      this.$router.back();
    }
    // getSearchResults(key, page, perPage) {
    //   getSearchResults({ q: key, page: page, per_page: perPage }).then(res => {
    //     this.searchResultsList.push(...res.data.results);
    //     this.isSearchResultsShow = true;
    //     this.page++;
    //   });
    // }
  }
};
</script>
<style lang="less" scoped>
.van-search__action {
  color: white;
}
.van-search__action:active {
  background: rgb(28, 28, 180);
}
</style>
