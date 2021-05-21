<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <!--
      Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮
     -->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch(searchText)"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>

    <!-- 搜索结果 -->
    <search-result 
      v-if="isResultShow" 
      :search-text="searchText" 
    />

    <!-- 联想建议 -->
    <search-suggestion 
      :search-text="searchText" 
      @search="onSearch" 
      v-else-if="searchText" 
    />

    <!-- 搜索历史记录 -->
    <search-history :search-history='searchHistory' v-else />

  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import SearchResult from './components/search-result'

export default {
  name: 'SearchIndex',
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  props: {},
  data () {
    return {
      searchText: '', //搜索输入框内容
      isResultShow: false, //控制搜索结果显示状态
      searchHistory:[], //搜索历史记录
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onSearch (val) {
      // 把输入框设置为自己想要搜所得文本
      this.searchText = val;
      // 展示搜索结果
      this.isResultShow = true;
      // 记录搜索记录
      const index = this.searchHistory.indexOf('val')
      if (index != -1){
        // 将重复搜索的文本去除掉
        this.searchHistory.splice(index, 1);
      }
      // 将不重复的搜索历史保存
      this.searchHistory.unshift(val);
    },
    onCancel () {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="less">
.search-container {
  .van-search__action {
    color: #fff;
  }
}
</style>