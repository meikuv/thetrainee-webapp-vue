<template>
  <Card style="width: 60em; margin-left: 40px; padding: 0px 24px 0 24px;">
    <template #header>
      <div class="changePassword__header">
        <h5 class="changePassword__header-text">Settings</h5>
      </div>
    </template>
    <template #title>
      <Divider />
    </template>
    <template #content>
    </template>
  </Card>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import InputText from 'primevue/inputtext'
  import Divider from 'primevue/divider'
  import Button from 'primevue/button'
  import Card from 'primevue/card'

  export default defineComponent({
    components: {
      InputText,
      Divider,
      Button,
      Card,
    },

    setup() {


      return {

      }
    },
  })
</script>

<style lang="scss" scoped>
  .p-card {
    background-color: #f8f9fa;
    border-radius: 10px;
    border: 1px solid #dee2e6;
    opacity: 0;
    transition: 0.3s;
    animation: show 0.3s 1;
    animation-fill-mode: forwards;
    animation-delay: 0.3s;
  }

  @keyframes show {
    0% {
      opacity: 0;
    } 100% {
      opacity: 1;
    }
  }

  .changePassword__header {
    display: flex;
  }

  .changePassword__header-text {
    margin: 15px 30px 0 15px;
    color: #23272a;
    font-size: x-large;
  }
</style>