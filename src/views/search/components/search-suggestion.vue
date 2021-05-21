<template>
  <div class="search-suggestion">
    <van-cell 
      v-for="(str, index) in suggestions" 
      :key="index" 
      icon="search"
      @click="$emit('search', str)"
    >
      <div slot="title" v-html="highlight(str)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from "@/api/search";
// lodash 支持按需加载，有利于打包结果优化
import { debounce } from "lodash"

export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText:{
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: []
    }
  },
  computed: {},
  watch: {
    // searchText(){}
    // searchText: {
    //   async handler(){
    //     // 请求联想建议
    //     const { data } = await getSearchSuggestions(this.searchText);
    //     this.suggestions = data.data.options
    //   },
    //   immediate: true
    // }

    // 防抖优化
    searchText: {
       handler: debounce( async function() {
        const { data } = await getSearchSuggestions(this.searchText);
        this.suggestions = data.data.options
      }, 500),
      immediate: true
    }
  },
  created () {},
  mounted () {},
  methods: {
    highlight (source) {
      // /searchContent/ 正则表达式中的一切内容都会当做字符串使用
      // 这里可以 new RegExp 方式根据字符串创建一个正则表达式
      // RegExp 是原生 JavaScript 的内置构造函数
      // 参数1：字符串，注意，这里不要加 //
      // 参数2：匹配模式，g 全局，i 忽略大小写
      const reg = new RegExp(this.searchText, 'gi')
      return source.replace(reg, `<span style="color: #3296fa">${this.searchText}</span>`)
    },
  }
}
</script>

<style scoped lang="less"></style>