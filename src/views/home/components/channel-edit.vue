<template>
  <div class="channel-edit">
    <van-cell title="我的频道" center :border="false">
      <van-button
        size="mini"
        round
        type="danger"
        plain
        @click="onEdit()"
      >{{ !isEdit ? '编辑' : '完成' }}</van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="channel-item"
        :class="{ active : index === active }"
        :icon="(isEdit && index !== 0) ? 'clear' : ''"
        v-for="(channel,index) in userChannels"
        :key="index"
        :text="channel.name"
        @click="onUserChannelClick(channel,index)"
      />
    </van-grid>
    <van-cell title="频道推荐" :border="false"></van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="channel-item"
        v-for="channel in recommendChannels"
        :key="channel.id"
        :text="channel.name"
        @click="onAdd(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addChannel, deleteChannel } from "@/api/channel";
import { mapState } from "vuex"
import { setItem } from '@/utils/storage'

export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    userChannels:Array,
    active:Number
  },
  data () {
    return {
      allChannels:[],
      isEdit:false
    }
  },
  computed: {
    // 映射用户信息
    ...mapState(['user']),
    // 推荐频道
    recommendChannels(){
      return this.allChannels.filter(channel => {
        return !this.userChannels.find(userChannel =>{
          return userChannel.id === channel.id
        })
      })
    }
  },
  watch: {},
  created () {
    this.loadAllChannels()
  },
  methods: {
    // 获取所有频道
    async loadAllChannels(){
      const { data } = await getAllChannels();
      this.allChannels = data.data.channels
    },
    // 添加频道到我的频道
    async onAdd(channel){
      this.userChannels.push(channel)

      // 数据持久化
      if (this.user) {
        await addChannel({
          channels:[{id: channel.id, seq: this.userChannels.length}]
        })
      }else{
        setItem('user-channels', this.userChannels)
      }

    },
    onEdit(){
      this.isEdit = !this.isEdit
    },
    onUserChannelClick(channel,index){
      // 根据isEdit状态判断当前是编辑状态还是非编辑状态
      if(this.isEdit && index !== 0){
        // 编辑状态
        this.deleteChannel(channel,index)
      }else{
        this.switchChannel(index)
      }
    },
    async deleteChannel(channel,index) {
      if(index <= this.active){
        this.$emit('update-active', this.active-1)
      }

      this.userChannels.splice(index,1)

      // 数据持久化
      if (this.user) {
        await deleteChannel(channel.id)
      }else{
        setItem('user-channels', this.userChannels)
      }

    },
    switchChannel(index){
      this.$emit('update-active',index)
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  padding-top: 54px;
  .channel-item {
    height: 40px;
    width: 43px;
    /deep/ .van-grid-item__content {
      background-color: #f5f5f6;
      .van-grid-item__text {
        color: #222;
        font-size: 14px;
        margin-top: 0;
      }
    }
    /deep/ .van-grid-item__icon{
      position: absolute;
      right: -5px;
      top: -5px;
      font-size: 18px;
      color: #ccc;
    }
  }
  .active{
    /deep/ .van-grid-item__text{
      color: red !important;
    }
  }
}
</style>