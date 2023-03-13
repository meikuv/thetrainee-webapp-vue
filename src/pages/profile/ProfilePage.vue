<template>
  <header-template />
  <div class="profile-container">
    <navigation-card />
    <router-view />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import HeaderTemplate from '@/components/header/HeaderTemplate.vue'
  import NavigationCard from '@/components/userPofile/NavigationCard.vue'

  export default defineComponent({
    components: {
      HeaderTemplate,
      NavigationCard,
    }
  })
</script>

<style lang="scss" scoped>
  .profile-container {
    display: flex;
    width: 95.3%;
    max-width: 1350px;
    height: 700px;
    margin: 0 auto;
    margin-top: 10px;
    padding: 3px;
  }
</style>