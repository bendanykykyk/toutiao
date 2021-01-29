<template>
  <div class="home-container">
    <home-nav-bar class="aa"></home-nav-bar>
    <div class="home-tab-bar-container">
      <van-tabs :border="true" class="channel-tabs" v-model="active">
        <van-tab
          class="tab-item"
          v-for="item in channelList"
          :key="item.id"
          :name="item.id"
          :title="item.name"
        >
          <home-article-list :channel_id="item.id"></home-article-list>
        </van-tab>
        <!--站位符，解决汉堡按钮遮住内容-->
        <van-tab>
          <template #title>
            <div class="space"></div>
          </template>
        </van-tab>
        <template v-slot:nav-right>
          <van-icon
            name="wap-nav"
            class="more"
            @click="showLabelPopFn"
          ></van-icon>
        </template>
        <slot name="article-lsit"></slot>
      </van-tabs>
    </div>
    <!-- label弹出 -->
    <van-popup
      v-model="isLabelPopShow"
      :overlay="false"
      closeable
      round
      position="bottom"
      :style="{ height: '100%' }"
    >
      <home-edit-label
        :channelList="channelList"
        :recommendChaneel="recommendChaneel"
        :active="active"
        @addLabel="addLabel"
        @channelClick="channelClick"
      ></home-edit-label>
    </van-popup>
  </div>
</template>
<script>
// 导入子组件
import HomeNavBar from "./HomeChildComponents/HomeNavBar";
import HomeArticleList from "./HomeChildComponents/HomeArticleList";
import HomeEditLabel from "./HomeChildComponents/HomeEditLabel";
import {
  getUserChannel,
  getAllChannel,
  editChannelsByPatch
} from "network/home";
import { mapState } from "vuex";
import { Tabs, Tab, Icon, Popup } from "vant";
export default {
  name: "Home",
  components: {
    HomeNavBar,
    HomeArticleList,
    HomeEditLabel,
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [Icon.name]: Icon,
    [Popup.name]: Popup
  },
  props: {},
  data() {
    return {
      channelList: [],
      allChaneelList: [],
      isLabelPopShow: false,
      active: 0
    };
  },
  computed: {
    recommendChaneel() {
      return this._.xorBy(this.allChaneelList, this.channelList, "id");
    },
    ...mapState(["user"])
  },
  watch: {},
  created() {
    this.getUserChannel();
    this.getAllChannel();
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    getUserChannel() {
      getUserChannel().then(res => {
        this.channelList = res.data.channels;
      });
    },
    getAllChannel() {
      getAllChannel().then(res => {
        this.allChaneelList = res.data.channels;
      });
    },
    showLabelPopFn() {
      this.isLabelPopShow = true;
    },
    addLabel(channel) {
      this.channelList.push(channel);
      // todo: 频道数据持久化 暂搁
      if (this.user) {
        // 登录状态下，进行数据持久化，调用接口
        this.editChannelsByPatch({
          channels: [
            {
              id: channel.id,
              seq: this.channelList.length
            }
          ]
        });
      }
    },
    channelClick(editStatus, index) {
      console.log(editStatus, index);
      // 1.如果是编辑状态下，那么点击就是删除
      if (editStatus) {
        this.channelList.splice(index, 1);
      } else {
        // 2.如果是非编辑状态下，点击就是跳转
        this.isLabelPopShow = false;
        this.active = this.channelList[index].id;
      }
    },
    editChannelsByPatch(data) {
      editChannelsByPatch(data).then(res => {});
    }
  }
};
</script>
<style lang="less" scoped>
.tab-item {
  border-right: 1px solid gray;
}
.channel-tabs {
  position: fixed;
  top: 46px;
  left: 0;
  right: 0;
  /deep/.van-tab {
    border-right: 1px solid #edeff3;
    min-width: 50px;
    // border-bottom: 1px solid #edeff3;
  }
  // /deep/.van-tab :nth-last-child(1) {
  //   border-right: none;
  // }
}
/deep/.van-tabs__line {
  background-color: rgb(75, 75, 160);
}
.more {
  position: fixed;
  right: 0;
  height: 44px;
  line-height: 44px;
}
.space {
  color: white;
  width: 24px;
}
.aa {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 46px;
}
</style>
