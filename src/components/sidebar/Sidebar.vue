<template>
  <div class="sidebar">
    <PanelMenu :model="items" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { RouterLink } from 'vue-router'
  import PanelMenu from 'primevue/panelmenu'

  export default defineComponent({
    components: {
      RouterLink,
      PanelMenu,
    },
    setup() {
      const items = ref([
        {
          key: '0',
          label: 'Home',
          icon: 'pi pi-fw pi-home',
          to: '/home',
        },
        {
          key: '0_0',
          label: 'Posts',
          icon: 'pi pi-fw pi-comments',
          to: '/home/posts',
        },
        {
          key: '1',
          label: 'Company',
          icon: 'pi pi-fw pi-building',
          to: '/home/company',
        }, 
        {
          key: '3',
          label: 'Events and Courses',
          icon: 'pi pi-fw pi-ticket',
          to: '/home/events',
        },
        {
          key: '4',
          label: 'Games',
          icon: 'pi pi-fw pi-play',
          to: '/home/games',
        }, 
        {
          key: '5',
          label: 'Formats',
          items: [{
                  key: '0_0',
                  label: 'Tasks',
                  icon: 'pi pi-fw pi-code',
                  to: '/home/tasks',
                }, {
                  key: '0_1',
                  label: 'Tests and quizzes',
                  icon: 'pi pi-fw pi-question',
                  to: '/home/tests',
                }, {
                  key: '0_2',
                  label: 'Books and articles',
                  icon: 'pi pi-fw pi-book',
                  to: '/home/books',
                }
          ]
        }
      ]) as any

      return { items }
    }
  })

</script>

<style lang="scss" src="./sidebar.scss" scoped></style>