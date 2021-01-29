<template>
  <div class="profile-container">
    <!--用户头部信息-->
    <div v-if="user" class="user-info">
      <div class="user-base-wrap">
        <div class="user">
          <van-image round width="66px" height="66px" :src="userInfo.photo" />
          <span>{{ userInfo.name }}</span>
        </div>

        <van-button type="default" size="mini" @click="$router.push('/my')"
          >编辑信息</van-button
        >
      </div>
      <div class="user-base-data">
        <van-grid :border="false">
          <van-grid-item text="文字" class="item">
            <template v-slot:text>
              <div>{{ userInfo.art_count }}</div>
              <div>头条</div>
            </template>
          </van-grid-item>
          <van-grid-item text="文字">
            <template v-slot:text>
              <div>{{ userInfo.follow_count }}</div>
              <div>关注</div>
            </template>
          </van-grid-item>
          <van-grid-item text="文字">
            <template v-slot:text>
              <div>{{ userInfo.fans_count }}</div>
              <div>粉丝</div>
            </template>
          </van-grid-item>
          <van-grid-item text="文字">
            <template v-slot:text>
              <div>{{ userInfo.like_count }}</div>
              <div>获赞</div>
            </template>
          </van-grid-item>
        </van-grid>
      </div>
    </div>

    <div v-else class="user-info-not-login" @click="loginFn">
      <img src="~assets/avator.png" alt="" />
      <div>注册 / 登录</div>
    </div>
    <!--用户收藏以及历史-->
    <div class="center-user">
      <van-grid :column-num="2">
        <van-grid-item
          icon="star-o"
          text="收藏"
          @click="$router.push('/userList/collect')"
        />
        <van-grid-item
          icon="browsing-history-o"
          text="历史"
          @click="$router.push('/userList/history')"
        />
      </van-grid>
    </div>
    <div class="bottom-user">
      <!-- <van-cell
        title="小智同学"
        is-link
        url=""
        @click="$router.push('/chat')"
      /> -->
      <van-cell v-if="user" title="退出登录" class="logout" @click="logoutFn" />
    </div>
  </div>
</template>
<script>
import { Cell, Grid, GridItem, Button, Image, Dialog } from "vant";
import { mapState } from "vuex";
import { getUserProfile, getUserDataList } from "network/profile";
export default {
  name: "Profile",
  components: {
    [Cell.name]: Cell,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Button.name]: Button,
    [Image.name]: Image,
    [Dialog.name]: Dialog
  },
  props: {},
  data() {
    return {
      userid: "",
      userInfo: {}
    };
  },
  computed: {
    ...mapState(["user"])
  },
  watch: {},
  created() {
    this.getUserProfile();
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    getUserProfile() {
      getUserProfile().then(res => {
        if (res.message && res.message === "OK") {
          this.userid = res.data.id;
        }
        getUserDataList(this.userid).then(res => {
          this.userInfo = res.data;
        });
      });
    },
    logoutFn() {
      // this.user = null;
      Dialog.confirm({
        title: "退户确认",
        message: "退出当前账号，将不能同步收藏，发布评论等功能"
      })
        .then(() => {
          // on confirm
          this.$store.commit("setUser", null);
          this.$router.push("/login");
        })
        .catch(() => {
          // on cancel
        });
    },
    loginFn() {
      this.$router.push("/login");
    }
  }
};
</script>
<style lang="less" scoped>
.profile-container {
  width: 100vw;
  height: 100vh;
  background: #ececec;
}
.profile-container {
  .user-info {
    padding: 25px 20px;
    background: #669bf6;
    .user-base-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .user {
        display: flex;
        align-items: center;
        color: #fff;
        font-size: 16px;
        span {
          margin-left: 10px;
        }
      }
    }
    .user-base-data {
      /deep/ .van-grid-item__content {
        background: transparent;
        color: #fff;
        font-size: 16px;
      }
    }
  }
  .user-info-not-login {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #fff;
    background: url("../../assets/banner.png") no-repeat;
    height: 188px;
    img {
      width: 80px;
      height: 80px;
    }
  }
  .center-user {
    margin-bottom: 10px;
    /deep/.van-icon-star-o::before {
      color: red;
    }
    /deep/ .van-icon-browsing-history-o::before {
      color: orange;
    }
  }
  .bottom-user {
    .van-cell {
      margin-bottom: 10px;
    }
    .logout .van-cell__title {
      display: flex;
      justify-content: center;
      color: red;
    }
  }
}
</style>
