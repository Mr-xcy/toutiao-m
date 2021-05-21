<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell 
        v-for="item in list" 
        :key="item.art_id" 
        :title="item.title" 
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from "@/api/search";

export default {
  name: 'SearchResult',
  components: {},
  props: {
    searchText:{
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 10
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLoad () {
      let params = {
        page: this.page, //页码
        per_page: this.perPage, //每页数量，不传每页数量由后端决定
        q: this.searchText //搜索关键词
      }
      const { data } = await getSearchResult(params)
      const { results } = data.data
      this.list.push(...results)
      this.loading = false
      if (results.length){
        this.page ++
      }else{
        this.finished = true
      }
    }
  }
}
</script>

<style scoped lang="less">
.search-result{
  position: fixed;
  left: 0;
  right: 0;
  top: 54px;
  bottom: 0;
  overflow-y: auto;
}
</style>