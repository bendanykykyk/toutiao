<template>
  <div class="detail-container">
    <van-nav-bar title="文章详情" left-arrow @click-left="$router.back()" />

    <div class="main-container">
      <div>
        <div class="title">{{ articleInfo.title }}</div>

        <van-cell :title="articleInfo.aut_name" :label="pubTime" center>
          <template v-slot:icon>
            <van-image
              class="avator"
              round
              width="1rem"
              height="1rem"
              :src="articleInfo.aut_photo"
            />
          </template>
          <template v-slot:default>
            <van-button type="danger" round @click="onFollow">{{
              !isFollowed ? "关注" : "已关注"
            }}</van-button>
          </template>
        </van-cell>
      </div>
      <div v-html="content" class="markdown-body" ref="articleContent"></div>
      <van-divider>正文结束</van-divider>
      <!--评论部分-->
      <div>
        <div v-if="comment.length" class="comment">全部评论</div>
        <detail-comment-item :comment="comment"></detail-comment-item>
      </div>
    </div>
    <!--底部-->
    <div class="bottom">
      <van-button round @click="isCommentShow = true"> 写评论</van-button>
      <van-icon
        name="comment-o"
        :badge="comment.length ? comment.length : null"
      />
      <van-icon v-if="!isCollected" name="star-o" @click="onColletArticle" />
      <van-icon
        v-else
        name="star"
        @click="onColletArticle"
        :style="{ color: 'red' }"
      />

      <van-icon v-if="!isGoodJob" name="good-job-o" @click="onGoodJob" />
      <van-icon
        v-else
        name="good-job"
        @click="onGoodJob"
        :style="{ color: 'red' }"
      />
    </div>
    <van-popup
      v-model="isCommentShow"
      position="bottom"
      :style="{ height: '18%' }"
    >
      <div class="comment-container">
        <van-field
          v-model="myCommentContent"
          rows="3"
          type="textarea"
          maxlength="50"
          placeholder="输入你的评论"
          show-word-limit
        >
        </van-field>
        <van-button @click="OnComment">发送</van-button>
      </div>
    </van-popup>
  </div>
</template>
<script>
import {
  NavBar,
  Cell,
  Button,
  Image,
  Divider,
  Icon,
  Toast,
  Popup,
  Field,
  ImagePreview
} from "vant";
// 子组件
// import DetailArticleContent from "./DetailChild/DetailArticleContent";
import DetailCommentItem from "./DetailChild/DetailCommentItem";
// 请求
import {
  getArticleDetail,
  getComments,
  addFollow,
  deleteFollow,
  collectArticle,
  cancelCollectArticle,
  commentArticle
} from "network/detail";
export default {
  name: "Detail",
  components: {
    [NavBar.name]: NavBar,
    [Cell.name]: Cell,
    [Button.name]: Button,
    [Image.name]: Image,
    [Divider.name]: Divider,
    [Icon.name]: Icon,
    [Popup.name]: Popup,
    [Toast.name]: Toast,
    [Field.name]: Field,
    // DetailArticleContent,
    DetailCommentItem
  },
  props: {},
  data() {
    return {
      articleInfo: {},
      content: "",
      comment: [],
      isFollowed: false,
      isCollected: false,
      isGoodJob: false,
      isCommentShow: false,
      myCommentContent: ""
    };
  },
  computed: {
    pubTime() {
      return this.$day().from(this.$day(this.articleInfo.pubdate)); // 31 年后
    }
  },
  watch: {},
  created() {
    this.getArticleDetail(this.$route.params.articleId);
    this.getComments("a", this.$route.params.articleId);
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    // 获取文章详情
    getArticleDetail(articleId) {
      getArticleDetail(articleId).then(res => {
        this.articleInfo = res.data;
        this.content = res.data.content;
        this.isFollowed = res.data.is_followed;
        this.isCollected = res.data.is_collected;

        this.$nextTick(() => {
          const articleContent = this.$refs.articleContent;
          const imgs = articleContent.querySelectorAll("img");
          const imgPaths = [];
          imgs.forEach((img, index) => {
            imgPaths.push(img.src);
            img.addEventListener("click", () => {
              console.log("我被点击啦");
              ImagePreview({
                images: imgPaths,
                startPosition: index
              });
            });
          });
        });
      });
    },

    getComments(type, source) {
      getComments({ type, source }).then(res => {
        this.comment = res.data.results;
      });
    },
    onFollow() {
      // 如果没关注，那么久调用关注接口，成功后把isFollowed改成true
      if (!this.isFollowed) {
        addFollow(this.articleInfo.aut_id).then(res => {
          this.$toast.success("成功关注");
          this.isFollowed = true;
        });
      } else {
        deleteFollow(this.articleInfo.aut_id).then(res => {
          this.$toast.success("取消关注");
          this.isFollowed = false;
        });
      }
    },
    onColletArticle() {
      if (!this.isCollected) {
        // 如果现在未收藏，那么调用收藏接口
        collectArticle(this.articleInfo.art_id).then(res => {
          this.$toast.success("成功收藏");
          this.isCollected = true;
        });
      } else {
        // 如果收藏了，调用取消收藏接口
        cancelCollectArticle(this.articleInfo.art_id).then(res => {
          this.$toast.success("取消收藏");
          this.isCollected = false;
        });
      }
    },
    onGoodJob() {
      if (!this.isGoodJob) {
        // 如果现在未点赞，那么调用收藏接口
        this.$toast.success("成功点赞");
        this.isGoodJob = true;
      } else {
        // 如果点赞了，调用取消收藏接口

        this.$toast.success("取消点赞");
        this.isGoodJob = false;
      }
    },
    OnComment() {
      // 隐藏pop
      this.isCommentShow = false;
      commentArticle({
        target: this.articleInfo.art_id,
        content: this.myCommentContent
      }).then(res => {
        // 清空评论
        this.myCommentContent = "";
        this.getArticleDetail(this.$route.params.articleId);
        this.getComments("a", this.$route.params.articleId);
      });
    }
  }
};
</script>
<style lang="less" scoped>
.main-container {
  padding: 20px 10px;
  position: fixed;
  right: 0;
  left: 0;
  top: 46px;
  bottom: 50px;
  overflow-y: auto;
}
.title {
  font-size: 16px;
  font-weight: 700;
}
.avator {
  width: 40px;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 50%;
  text-align: center;
  line-height: 40px;
  margin-right: 10px;
}
.van-button--danger {
  width: 85px;
  height: 30px;
}
.comment {
  font-size: 14px;
}
.bottom {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .van-button {
    width: 200px;
    height: 30px;
  }
}
.comment-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  /deep/ .van-field__control {
    background: #f6f7f9;
  }
  /deep/.van-field__word-limit {
    margin-top: 0px;
    background: #f6f7f9;
  }
  .van-button {
    width: 80px;
    border: none;
  }
}
</style>
