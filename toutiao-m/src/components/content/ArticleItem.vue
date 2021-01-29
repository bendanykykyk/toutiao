<template>
  <div class="article-item-container">
    <van-cell @click="$router.push('/detail/' + article.art_id)">
      <template v-slot:title>
        <div class="title">
          {{ article.title }}
        </div>
      </template>
      <!-- article.cover.type===3 的时候，显示三张图 -->

      <template v-slot:label>
        <div v-if="article.cover.type === 3" class="image-container">
          <van-image
            v-for="(img, index) in article.cover.images"
            :key="index"
            width="116"
            height="73"
            fit="cover"
            :src="img"
          />
        </div>
        <div class="article-detail">
          <div v-if="article.is_top" class="top">置顶</div>
          <div class="aut">{{ article.aut_name }}</div>
          <div class="comment-count">{{ "评论 " + article.comm_count }}</div>
          <div class="date">{{ time }}</div>
        </div>
      </template>
      <template v-if="article.cover.type === 1" v-slot:default>
        <van-image width="116" height="73" :src="article.cover.images[0]" />
      </template>
    </van-cell>
  </div>
</template>
<script>
import { Cell, Image } from "vant";
export default {
  name: "ArticleItem",
  components: {
    [Cell.name]: Cell,
    [Image.name]: Image
  },
  props: {
    article: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      type: 1
    };
  },
  computed: {
    time() {
      return this.$day().from(this.$day(this.article.pubdate));
    }
  },
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {}
};
</script>
<style lang="less" scoped>
.article-item-container {
  .title {
    font-size: 18px;
  }
  .article-detail {
    display: flex;
    margin-top: 5px;
    color: #d3d5d6;
    .top {
      color: red;
      margin-right: 5px;
    }
    .aut {
      margin-right: 5px;
    }
    .comment-count {
      margin-right: 5px;
    }
  }
}
.van-cell__title {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.image-container {
  display: flex;
}
</style>
