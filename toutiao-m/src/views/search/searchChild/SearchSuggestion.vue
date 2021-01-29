<template>
  <div>
    <van-cell
      v-for="(item, index) in suggestions"
      :key="index"
      :title="item"
      icon="search"
      @click="$emit('SearchHistory', item)"
    />
  </div>
</template>
<script>
import { Cell, Icon } from "vant";
import { getSearchSuggestions } from "network/search";
import { debounce } from "lodash";
export default {
  name: "SearchSuggestion",
  components: {
    [Cell.name]: Cell,
    [Icon.name]: Icon
  },
  props: {
    searchContent: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      searchContentHandler: null,
      suggestions: []
    };
  },
  computed: {},
  created() {
    // this.getSearchSuggestions = this._.debounce(getSearchSuggestions, 500);
  },
  watch: {
    searchContent: {
      // 如果加了immediate :true 就是watch先执行，created后
      handler: debounce(function(val, oldVal) {
        this.getSearchSuggestions(val);
      }, 200),
      immediate: true // 这个如果不开启，第一次观测就不会起效，不太懂
    }
  },

  mounted() {},
  beforeDestroy() {},
  methods: {
    getSearchSuggestions(key) {
      getSearchSuggestions(key).then(res => {
        this.suggestions = res.data.options;
      });
    }
  }
};
</script>
<style lang="less" scoped></style>
