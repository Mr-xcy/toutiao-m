<!--
 * @Descripttion: 
 * @version: 
 * @Author: xuchunyuan
 * @Date: 2020-10-16 09:45:08
-->
<template>
  <div class="home page-container">
    <!-- 导航栏 -->
    <van-nav-bar class="app-nav-bar">
      <van-button
        class="search-btn"
        slot="title"
        size="small"
        icon="search"
        type="info"
        round
        to="/search"
        >搜索</van-button
      >
    </van-nav-bar>

    <!-- tab标签 -->
    <van-tabs v-model="active" class="channel-tabs">
      <van-tab
        :title="channel.name"
        v-for="channel in channels"
        :key="channel.id"
      >
        <article-list :channel="channel" />
      </van-tab>

      <!-- 占位 -->
      <div slot="nav-right" class="nav-right-wrap"></div>

      <!-- 右侧我的频道按钮 -->
      <div slot="nav-right" class="nav-right" @click="isChannelEditShow = true">
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>

    <!-- 弹出层 -->
    <van-popup
      v-model="isChannelEditShow"
      class="channel-edit-popup"
      position="bottom"
      closeable
      close-icon-position="top-left"
      get-container="body"
      style="height: 100%"
      >
        <channel-edit 
          :user-channels="channels" 
          @close="isChannelEditShow = false"
          @update-active="updateActive" 
          :active = 'active'
        />
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from "@/api/user";
import ArticleList from "./components/article-list";
import ChannelEdit from "./components/channel-edit";
import { mapState } from "vuex"
import { getItem } from '@/utils/storage'

export default {
  name: "HomeIndex",
  components: { ArticleList, ChannelEdit },
  data() {
    return {
      active: 0,
      channels: [],
      isChannelEditShow: false,
    };
  },
  methods: {
    async loadChannels() {
      let channels = []
      if (this.user) {
        // 已登录
        const { data } = await getUserChannels();
        channels = data.data.channels
      }else{
        // 未登录，使用本地存储的数据
        const localChannels = getItem('user-channels');
        if (localChannels) {
          channels = localChannels
        }else{
          // 未登录，也没有本地数据，获取推荐数据
          const { data } = await getUserChannels();
          channels = data.data.channels;
        }
      }
      // const { data } = await getUserChannels();
      // this.channels = data.data.channels;

      this.channels = channels
    },
    updateActive(index){
      this.active = index;
    }
  },
  created() {
    this.loadChannels();
  },
  computed: {
    // 映射用户信息
    ...mapState(['user']),
  }
};
</script>

<style lang="less" scoped>
.home {
  /deep/ .van-nav-bar__title {
    max-width: none;
  }
  .search-btn {
    width: 277px;
    height: 32px;
    background: #5babfb;
    border: none;
    .van-button__text {
      font-size: 14px;
    }
    .van-button__icon {
      font-size: 16px;
    }
  }
  .channel-tabs {
    /deep/ .van-tab {
      border-right: 1px solid #edeff3;
      border-bottom: 1px solid #edeff3;
    }
    /deep/ .van-tabs__line {
      width: 15px !important;
      height: 3px;
      background: #3296fa;
      bottom: 20px;
    }
    .nav-right{
      position:fixed;
      right: 0;
      width: 33px;
      height: 43px;
      display: flex;
      justify-content:center;
      align-items:center;
      background-color: #fff;
      opacity: .9;
      .van-icon{
        font-size: 24px;
      }
      &:before{
        content:'|';
        width: 1px;
        height: 43px;
        opacity: .5;
        position: absolute;
        left:0;
        top: 8px;
      }
    }
    .nav-right-wrap{
      width: 33px;
      flex-shrink: 0;
    }
  }
}
</style>
