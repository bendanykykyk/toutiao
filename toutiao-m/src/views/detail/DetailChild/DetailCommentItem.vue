<template>
  <div class="comment-item-container">
    <van-cell
      v-for="item in comment"
      :key="item.com_id + ''"
      :title="item.aut_name"
    >
      <template v-slot:icon>
        <van-image
          class="avator"
          round
          width="1rem"
          height="1rem"
          :src="item.aut_photo"
        />
      </template>
      <template v-slot:label>
        <div class="desc">
          {{ item.content }}
        </div>
        <div class="comment-message">
          <span>{{ time(item.pubdate) }}</span>
          <!-- <van-button size="mini">回复{{ item.reply_count }}</van-button> -->
        </div>
      </template>
      <!-- <template v-slot:default>
        <van-icon name="good-job-o" @click="OnLikingComment(item)" />
        <span>{{ time2 }}</span>
      </template> -->
    </van-cell>
  </div>
</template>
<script>
import { Cell, Image, Icon, Button } from "vant";
import { likingComment } from "network/detail";
export default {
  name: "DetailCommentItem",
  components: {
    [Cell.name]: Cell,
    [Image.name]: Image,
    [Icon.name]: Icon,
    [Button.name]: Button
  },
  props: {
    comment: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      isLike: false,
      time2: 0
    };
  },
  computed: {
    time() {
      return function(time) {
        return this.$day().from(this.$day(time));
      };
    }
  },
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    OnLikingComment(item) {
      likingComment(item.com_id).then(res => {
        this.time2++;
      });
    }
  }
};
</script>
<style lang="less" scoped>
.avator {
  width: 40px;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 50%;
  text-align: center;
  line-height: 40px;
  margin-right: 10px;
}
.comment-item-container {
  //   border-bottom: 1px solid rgb(236, 236, 236);
  .desc {
    color: black;
    width: 200px;
  }
  .comment-message {
    display: flex;
    align-items: center;
  }
}
</style>
