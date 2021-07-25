<template>
  <div class="activity-item-template">
    <div>
      <img :src="activityInfo.img" alt="">
      <div>
        <div>
          {{activityInfo.activityName || ''}}
        </div>
        <div class="time-box">
          <span class="title">活动时间：</span>
          <span class="time">2021-07-01 - 2021-08-01</span>
        </div>
        <div class="button-box">
          <span class="text" @click="linkPage(activityInfo.pageName || '')">参与活动</span>
          <span>活动详情</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },

  props: {
    activityInfo: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },

  methods: {
    /**
     * 跳转页面
     */
    linkPage (pathName) {
      this.$router.push({
        'name': pathName
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.activity-item-template {
  img {
    width: 100%;
    height: 80px;
  }
  .time-box {
    font-size: 12px;
  }
  .button-box {
    text-align: right;
    span {
      &:first-child {
        margin-right: 6px;
      }
    }
  }
}
</style>