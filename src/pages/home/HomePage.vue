<template>
  <header-template />
  <div class="container">
    <sidebar />
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import HeaderTemplate from '@/components/header/HeaderTemplate.vue'
  import ProfilePage from '../profile/ProfilePage.vue'
  import Sidebar from '@/components/sidebar/Sidebar.vue'

  export default defineComponent({
    name: 'HomePage',
    components: {
      HeaderTemplate,
      ProfilePage,
      Sidebar,
    },
  })
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    width: 1350px;
    margin: 0 auto;
    margin-top: 15px;
    padding: 3px;
  }
</style>