<template>
  <div class="app-container">
    <div class="layout-content">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view></router-view>
      </keep-alive>
      <router-view v-else></router-view>
    </div>
    <div class="layout-footer">
      <TabBar :data="tabbars" @change="handleChange" />
    </div>
  </div>
</template>

<script>
import TabBar from '@/components/TabBar'
export default {
  name: 'AppLayout',
  data() {
    return {
      tabbars: [
        {
          title: '活动',
          to: {
            name: 'Activity'
          },
          icon: 'home-o'
        },
        {
          title: '推荐',
          to: {
            name: 'Recommend'
          },
          icon: 'user-o'
        }
        // { 
        //   title: '商城',
        //   to: {
        //     name: 'ShoppingMall'
        //   },
        //   icon: 'user-o'
        // },
        // {
        //   title: '我的',
        //   to: {
        //     name: 'My'
        //   },
        //   icon: 'user-o'
        // }
      ]
    }
  },
  components: {
    TabBar
  },
  methods: {
    handleChange(v) {
      console.log('tab value:', v)
    }
  }
}
</script>
