<template>
  <div class="authorization-page-wrapper">
    <div class="authorization-container">
      <authorization-form />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import AuthorizationForm from '@/components/authorization/AuthorizationForm.vue';

  export default defineComponent({
    name: 'AuthorizationPage',
    components: {
      AuthorizationForm,
    },
  })
</script>

<style lang="scss" src="./authorizationPage.scss" scoped></style>