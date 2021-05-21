<!--
 * @Descripttion: 
 * @version: 
 * @Author: xuchunyuan
 * @Date: 2020-10-16 09:45:24
-->
<template>
  <div class="my-container">
    <van-cell-group class="my-info" v-if="user">
      <van-cell 
        class="base-info"
        center
        :border="false"
      >
        <van-image
          class="avatar"
          slot="icon"
          fit="cover"
          round
          :src="currentUser.photo"
        />
        <div slot="title" class="name">{{ currentUser.name }}</div>
        <van-button size="small" round class="update-btn">编辑资料</van-button>
      </van-cell>
      <van-grid :border="false" class="data-info">
        <van-grid-item text="文字" class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="span">{{ currentUser.art_count }}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item text="文字" class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="span">{{ currentUser.follow_count }}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item text="文字" class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="span">{{ currentUser.fans_count }}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item text="文字" class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="span">{{ currentUser.like_count }}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>

    <!-- 未登录信息 -->
    <div class="not-login" v-else>
      <div @click="$router.push('/login')">
        <img class="mobile" src="./mobile.png" alt="">
      </div>
       <div class="text">登录 / 注册</div>
    </div>

    <van-grid :column-num="2" class="nav-grid mb4">
      <van-grid-item class="nav-grid-item" icon="star-o" text="收藏" />
      <van-grid-item class="nav-grid-item" icon="underway-o" text="历史" />
    </van-grid>

    <van-cell title="消息推送" is-link to="/" />
    <van-cell title="小艾同学" is-link to="/" class="mb4" />
    <van-cell title="退出登陆" @click="logout" class="logout" v-if="user" />
  </div>
</template>

<script>
import { mapState } from "vuex"
import { getCurrentUser } from "@/api/user"

export default {
  name: "MyIndex",
  data(){
    return {
      currentUser: {}
    }
  },
  methods:{
    logout(){
      this.$dialog.confirm({
        title: '退出提示',
        message: '确认退出吗?'
      })
        .then(() => {
          // on confirm
          this.$store.commit('setUser', null);
        })
        .catch(() => {
          // on cancel
        });
    },
    // 加载当前用户信息
    loadCurrentUser(){
      getCurrentUser().then((res) => {
        this.currentUser = res.data.data
      })
    }
    // async loadCurrentUser(){
    //   const { data } = await getCurrentUser();
    //   this.currentUser = data.data
    //   console.log(data);
    // }
  },
  created () {
    this.loadCurrentUser()
  },
  computed:{
    // 将vuex中的主句映射到本组件中
    ...mapState(['user'])
  },
};
</script>

<style lang="less">
.my-container{
  .my-info{
    background:url("./banner.png") no-repeat;
    background-size: cover;
    .base-info{
      box-sizing: border-box;
      background-color: unset;
      height: 115px;
      padding-top: 38px;
      padding: bottom 11px;
      .avatar{
        box-sizing: border-box;
        width: 66px;
        height: 66px;
        border: 1px solid #fff;
        margin-right: 11px;
      }
      .name{
        color: #fff;
        font-size:15px;
      }
      .update-btn{
        height: 16px;
        font-size: 10px;
        color: #666666;
      }
    }
    .data-info{
      .data-info-item{
        height: 65px;
        color: #fff;
        .text-wrap{
          display: flex;
          flex-direction:column;
          justify-content:center;
          align-items:center;
          .span{
            font-size:18px;
          }
          .text{
            font-size:11px;
          }
        }
      }
    }
    .van-grid-item__content{
      background-color: unset;
    }
  }
  .nav-grid{
    .nav-grid-item{
      height: 70px;
      .van-icon{
        font-size: 22px;
      }
      .van-icon-star-o{
        color: #eb5253;
      }
      .van-icon-underway-o{
        color: #ff9d1d;
      }
      .van-grid-item__text{
        font-size: 14px;
        color: #333333;
      }
    }
  }
  .logout{
    text-align: center;
    color: #d86262;
  }
  .mb4{
    margin-bottom: 4px;
  }
  .not-login{
    height: 180px;
    background:url("./banner.png") no-repeat;
    background-size: cover;
    display: flex;
    flex-direction:column;
    justify-content:center;
    align-items: center;
    .mobile{
      height: 66px;
      width: 66px;
    }
    .text{
      color: #fff;
      font-size: 14px;
    }
  }
}
</style>
