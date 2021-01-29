<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div
        v-for="item in list"
        :key="item.art_id + ''"
        class="item"
        @click="$router.push('/detail/' + item.art_id)"
      >
        <!--item项， 头像名称部分-->
        <van-cell>
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #icon>
            <van-image
              class="image-avator"
              round
              width="1rem"
              height="1rem"
              src="https://img.yzcdn.cn/vant/cat.jpeg"
            />
          </template>
          <template #title>
            <div>{{ item.aut_name }}</div>
          </template>
          <template #label>
            <div>4个月前</div>
          </template>
        </van-cell>

        <!--内容，图片部分-->
        <van-cell>
          <template #title>
            <div>
              1234
            </div>
          </template>
          <template #default>
            <van-image height="73" width="116" :src="item.cover.images[0]" />
          </template>
        </van-cell>
        <!--评论，点赞，收藏-->
        <div class="bottom">
          <div>
            <van-icon name="chat-o" />
            <span>{{ item.comm_count }}</span>
          </div>

          <div>
            <van-icon name="good-job-o" />
            <span>{{ item.like_count }}</span>
          </div>
          <div>
            <van-icon name="star-o" />
            <span>{{ item.collect_count }}</span>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>
<script>
import { List, Cell, Toast, Image, Icon } from "vant";
export default {
  name: "CHList",
  components: {
    [List.name]: List,
    [Cell.name]: Cell,
    [Toast.name]: Toast,
    [Image.name]: Image,
    [Icon.name]: Icon
  },
  props: {
    fn: null
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    onLoad() {
      // 异步更新数据

      this.fn().then(
        res => {
          this.list.push(...res.data.results);
        },
        err => {
          if (err && err.response && err.response.status === 500) {
            this.list = [];
            console.log(err.response);
            this.$toast.fail(err.response.data.message);
            this.finished = true;
            // this.$toast.fali("服务器500错误");
          }
        }
      );

      // 加载状态结束
      this.loading = false;
      // 数据全部加载完成
      if (this.list.length === 0) {
        this.finished = true;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.image-avator {
  margin-right: 10px;
}
.bottom {
  display: flex;
  justify-content: space-around;
  align-items: center;
  .van-icon {
    font-size: 16px;
  }
  span {
    font-size: 16px;
  }
}
</style>
