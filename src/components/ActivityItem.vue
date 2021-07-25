<template>
  <div class="activity-item-template">
    <div @click="linkPage(activityInfo.pageName || '')">
      <img :src="activityInfo.img" alt="">
      <div>
        <div>
          {{activityInfo.activityName || ''}}
        </div>
        <div class="time-box">
          <span class="title">活动时间：</span>
          <span class="time">2021-07-01 - 2021-08-01</span>
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
}
</style>