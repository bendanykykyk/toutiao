<template>
  <div class="article-list-container">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh(channel_id)">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad(channel_id)"
      >
        <!-- <van-cell
          v-for="item in channelRecommendList"
          :key="item.id"
          :title="item.title"
          >{{ item.title }}</van-cell
        > -->
        <article-item
          v-for="item in channelRecommendList"
          :key="item.id"
          :article="item"
        ></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { List, Cell, PullRefresh } from "vant";
import { getChannelRecommend } from "network/home";
import ArticleItem from "components/content/ArticleItem";
export default {
  name: "HomeArticleList",
  components: {
    [List.name]: List,
    [Cell.name]: Cell,
    [PullRefresh.name]: PullRefresh,
    ArticleItem
  },
  props: {
    indexAndDataList: {
      type: Array,
      default() {
        return [];
      }
    },
    channel_id: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      loading: false,
      finished: false,
      refreshing: false,
      channelRecommendList: [],
      page: 0
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    onLoad(id) {
      getChannelRecommend({
        channel_id: id,
        timestamp: new Date().getTime(),
        with_top: "1"
      }).then(res => {
        this.loading = false;
        this.channelRecommendList.push(...res.data.results);
        if (res.data.results.length) {
          //  如果此时results有长度，说明有数据，那么实际上可以把page+1之类的操作
        } else {
          // 没长度，那么就停止加载
          this.finished = true;
        }
      });
    },
    onRefresh(id) {
      getChannelRecommend({
        channel_id: id,
        timestamp: new Date().getTime(),
        with_top: "1"
      }).then(res => {
        this.loading = false;
        this.channelRecommendList.unshift(...res.data.results);
        this.refreshing = false;
      });
    }
  }
};
</script>
<style lang="less" scoped>
.article-list-container {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 50px;
  top: 90px;
  overflow-y: auto;
}
</style>
