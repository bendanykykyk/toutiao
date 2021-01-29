<template>
  <div class="container">
    <img ref="image" :src="src" />
  </div>
</template>
<script>
import Cropper from "cropperjs";
export default {
  name: "index",
  components: {},
  props: {
    src: {
      type: [String, Object],
      required: true
    }
  },
  data() {
    return {
      cropper: null
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    const image = this.$refs.image;
    const cropper = new Cropper(image, {
      crop(event) {},
      viewMode: 1, // 查看模式
      dragMode: "move", // 拖动模式
      aspectRatio: 1, // 截图比例
      autoCropArea: 1, // 自动区域
      cropBoxMovable: false, // 不允许截图区域移动
      cropBoxResizable: false, // 不允许截图区域缩放
      modal: true, // 显示阴影区域
      // movable: false
      background: false, // 关闭背景
      movable: true // 允许移动
      // minContainerHeight: document.body.clientHeight, // 容器的最小高度
      // minContainerWidth: 375 // 容器的最小宽度
    });
    this.cropper = cropper;
  },
  beforeDestroy() {},
  methods: {
    getCroppedBlob() {
      return new Promise(resolve => {
        this.cropper.getCroppedCanvas().toBlob(resolve);
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "~cropperjs/dist/cropper.css";
/* Ensure the size of the image fit the container perfectly */
img {
  display: block;

  /* This rule is very important, please don't ignore this */
  max-width: 100%;
  //   height: 100%;
}
.container {
  height: 100vh;
}
</style>
