<template>
  <div class="article-container">
    <div v-html="content" class="markdown-body"></div>
  </div>
</template>
<script>
export default {
  name: "DetailArticleContent",
  components: {},
  props: {
    content: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {}
};
</script>
<style lang="less" scoped></style>
