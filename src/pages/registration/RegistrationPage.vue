<template>
  <div class="registration-page-wrapper">
    <div class="registration-container">
      <registration-form />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import RegistrationForm from '@/components/registration/RegistrationForm.vue'

  export default defineComponent({
    name: 'RegistrationPage',
    components: {
      RegistrationForm,
    },
  })
</script>

<style lang="scss" src="./registrationPage.scss" scoped></style>