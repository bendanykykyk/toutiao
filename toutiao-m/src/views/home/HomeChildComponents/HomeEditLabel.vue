<template>
  <div>
    <!--navbar-->
    <van-nav-bar title="编辑频道" />
    <!--我的频道部分 以及 编辑按钮-->
    <van-cell class="container">
      <template v-slot:title>
        <span class="my-channel">
          我的频道
        </span>
        <span class="desc">
          点击进入频道
        </span>
      </template>
      <template v-slot:default>
        <van-button class="edit-btn" round @click="isEdit = !isEdit">{{
          isEdit ? "完成" : "编辑"
        }}</van-button>
      </template>
    </van-cell>
    <!--我的频道 标签部分-->
    <van-grid :gutter="10">
      <van-grid-item
        v-for="(item, index) in channelList"
        :class="{ active: active == item.id }"
        :key="item.id"
        :text="item.name"
        :icon="isEdit ? 'clear' : ''"
        @click="channelClickFn(index)"
      />
    </van-grid>

    <!--推荐频道部分 -->
    <van-cell class="container">
      <template v-slot:title>
        <span class="my-channel">
          推荐频道
        </span>
        <span class="desc">
          点击添加频道
        </span>
      </template>
    </van-cell>

    <van-grid :gutter="10">
      <van-grid-item
        v-for="item in recommendChaneel"
        :key="item.id"
        :text="item.name"
        @click="addFn(item)"
      />
    </van-grid>
  </div>
</template>
<script>
import { Cell, NavBar, Button, Grid, GridItem } from "vant";
export default {
  name: "HomeEditLabel",
  components: {
    [Cell.name]: Cell,
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem
  },
  props: {
    channelList: {
      type: Array,
      default() {
        return [];
      }
    },
    recommendChaneel: {
      type: Array,
      default() {
        return [];
      }
    },
    active: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      isEdit: false
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    addFn(channel) {
      this.$emit("addLabel", channel);
    },
    channelClickFn(index) {
      this.$emit("channelClick", this.isEdit, index);
    }
  }
};
</script>
<style lang="less" scoped>
/deep/.van-nav-bar__content {
  background: #fff;

  .van-nav-bar__title {
    color: rgb(65, 62, 62);
  }
}
.my-channel {
  font-size: 16px;
  margin-right: 10px;
}
.desc {
  color: rgb(177, 174, 174);
}
.container {
  /deep/.van-button {
    width: 60px;
    height: 30px;
    font-size: 12px;
  }
}
/deep/.van-grid-item__content--center {
  background: #f4f5f6;
  .van-grid-item__text {
    color: rgb(44, 43, 43);
  }
}
/deep/.van-grid-item__icon {
  position: absolute;
  right: -10px;
  top: -10px;
  color: #9e9fa0;
  font-size: 20px;
  z-index: 10;
}
/deep/.van-grid-item__icon + .van-grid-item__text {
  margin-top: 0;
}
.active {
  /deep/ .van-grid-item__text {
    color: red;
  }
}
</style>
