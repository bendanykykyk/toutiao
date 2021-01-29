<template>
  <div class="my-container">
    <van-nav-bar title="个人信息" left-arrow @click-left="$router.back()" />
    <van-cell-group>
      <van-cell
        title="头像"
        is-link
        value="内容"
        center
        @click="$refs.file.click()"
      >
        <template #default>
          <van-image round width="1rem" height="1rem" :src="user.photo" />
        </template>
      </van-cell>
      <van-cell
        title="昵称"
        is-link
        :value="user.name"
        @click="isNamePopupShow = true"
      />
      <van-cell
        title="性别"
        is-link
        :value="user.gender === 1 ? '男' : '女'"
        @click="isSexPopupShow = true"
      />
      <van-cell
        title="生日"
        is-link
        :value="user.birthday"
        @click="isBirthdayShow = true"
      />
    </van-cell-group>

    <!--隐藏的表单控件-->
    <input
      hidden
      type="file"
      ref="file"
      accept="image/*"
      @change="onFileChange"
    />
    <!--昵称弹出-->
    <van-popup
      class="name-popup"
      v-model="isNamePopupShow"
      position="bottom"
      :style="{ height: '100%' }"
      @closed="closeNamePopup"
    >
      <my-name-popup
        :nickName="user.name"
        @close="closeNamePopup"
        v-model="user.name"
      ></my-name-popup>
    </van-popup>
    <!--性别弹出-->
    <van-popup
      class="name-popup"
      v-model="isSexPopupShow"
      position="bottom"
      :style="{ height: '30%' }"
    >
      <my-sex-popup
        v-model="user.gender"
        @close="isSexPopupShow = false"
      ></my-sex-popup>
    </van-popup>
    <!--时间选择器弹出-->
    <van-popup
      v-model="isBirthdayShow"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <my-time-picker
        v-model="user.birthday"
        @close="isBirthdayShow = false"
      ></my-time-picker>
    </van-popup>
    <!--头像弹出-->
    <van-popup
      v-model="isPicShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <image-cropper
        v-if="isPicShow"
        ref="cropper"
        :src="previewImage"
      ></image-cropper>
      <div class="crop-bottom">
        <span @click="isPicShow = false">取消</span>
        <span @click="onPhotoConfirm">完成</span>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { getUserProfile } from "network/my";
import { updatePhoto } from "network/profile";
import { NavBar, Cell, CellGroup, Image, Popup, Field, Toast } from "vant";
import MyNamePopup from "./MyChild/MyNamePopup";
import MySexPopup from "./MyChild/MySexPopup";
import MyTimePicker from "./MyChild/MyTimePicker";
import ImageCropper from "components/common/img-cropper/index";
export default {
  name: "My",
  components: {
    [NavBar.name]: NavBar,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Image.name]: Image,
    [Popup.name]: Popup,
    [Field.name]: Field,
    [Toast.name]: Toast,
    MyNamePopup,
    MySexPopup,
    MyTimePicker,
    ImageCropper
  },
  props: {},
  data() {
    return {
      user: {
        photo: "",
        name: "haha",
        gender: 0,
        birthday: "2000-12-04"
      },
      isNamePopupShow: false, // TODO: 记得改成false
      isSexPopupShow: false, // TODO: 记得改成false
      isBirthdayShow: false,
      isPicShow: false,
      previewImage: ""
    };
  },
  computed: {
    file() {
      return this.$refs.file;
    }
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
        this.user = res.data;
        this.name = res.data.name;
      });
    },
    closeNamePopup() {
      // 将原本的值，再次赋给name,gender等
      this.isNamePopupShow = false;
    },
    onFileChange() {
      // 获取到文件路径
      const fileObj = URL.createObjectURL(this.file.files[0]);
      console.log(fileObj);
      console.log(this.file.files[0]);
      this.previewImage = fileObj;
      this.isPicShow = true;
      this.file.value = "";
      // this.file.files = [];
    },
    onPhotoConfirm() {
      // 构造包含文件的表单数据对象
      const fd = new FormData();

      this.$refs.cropper.getCroppedBlob().then(res => {
        const blob = res;
        console.log(blob);
        fd.append("photo", blob);
        console.log(fd);
        updatePhoto(fd).then(res => {
          // 更新视图
          this.user.photo = URL.createObjectURL(blob);

          // 关闭图片预览
          this.isPicShow = false;
        });
      });
    }
  }
};
</script>
<style lang="less" scoped>
.name-popup {
  background: #f6f7f9;
}
.crop-bottom {
  position: fixed;
  bottom: 0;
  height: 44px;
  font-size: 16px;
  color: #fff;
  /* background: #000; */
  /* background-color: rgba(0, 0, 0, .6); */
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
}
</style>
