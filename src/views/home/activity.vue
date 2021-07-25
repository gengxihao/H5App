<!-- home -->
<template>
  <div class="index-container">
    <div class="swipe-content">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, k) in imgList" :key="k">
          <img :src="item.url" alt="banner" class="banner-img">
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="">
      <van-grid>
        <van-grid-item v-for="(item, j) in gridList " :icon="item.url" :text="item.title" :key="j"/>
      </van-grid>
    </div>
    <div class="activity-list">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="(item, k) in ACTIVITYDATA"
          :key="k"
        >
          <activity-item
            :activityInfo="item"
          />
        </van-cell>
      </van-list>
    </div>
    <!-- <van-cell icon="success" v-for="item in list" :key="item" :title="item" /> -->
  </div>
</template>

<script>
import activityData from "@/jsonData/activity.json";
import ActivityItem from '@/components/ActivityItem.vue';

export default {
  data() {
    return {
      loading: false,
      finished: false,
      ACTIVITYDATA: activityData,
      imgList: [
        {url: require('/static/img/banner1.jpeg')},
        {url: require('/static/img/banner2.jpeg')},
        {url: require('/static/img/banner3.jpeg')},
        {url: require('/static/img/banner4.jpeg')}
      ],
      gridList: [
        {
          url: require('/static/img/money.svg'),
          title: '银行理财'
        },
        {
          url: require('/static/img/loan.svg'),
          title: '贷款'
        },
        {
          url: require('/static/img/deposit.svg'),
          title: '乐惠存'
        },
        {
          url: require('/static/img/network.svg'),
          title: '服务网点'
        },
      ]
    }
  },

  components: {
    ActivityItem,
  },

  computed: {
  },

  mounted() {
    console.log(activityData);
  },

  methods: {
    onLoad () {
      this.finished = true;
    }
  }
}
</script>
<style lang="scss" scoped>
.index-container {
  .swipe-content {
    .my-swipe {
      .banner-img {
        display: block;
        width: 100%;
      }
    }
  }
}
</style>
