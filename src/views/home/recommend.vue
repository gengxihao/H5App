<!-- home -->
<template>
  <div class="recommend-page">
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
</template>

<script>
import activityData from "@/jsonData/activity.json";
import ActivityItem from '@/components/ActivityItem.vue';

export default {
  data() {
    return {
      ACTIVITYDATA: activityData,
      loading: false,
      finished: false
    }
  },
  components: {
    ActivityItem
  },
  mounted() {
  },
  methods: {
    onLoad () {
      this.finished = true;
    }
  }
}
</script>
<style lang="scss" scoped>
  .recommend-page {

  }
</style>
