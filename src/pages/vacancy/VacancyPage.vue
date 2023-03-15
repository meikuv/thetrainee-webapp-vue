<template>
  <div v-if="vacancyStoreData.$state.loaderIsActive" class="spinner-centred">
      <spinner />
  </div>
  <div class="vacancy-wrapper">
    <div v-if="!vacancyStoreData.$state.loaderIsActive && vacancyStoreData.$state.vacancy">
      <article class="single-post">
        <div class="single__header">
          <h1 itemprop="headline">{{ vacancyStoreData.$state.vacancy.jobName }}</h1>
          <div class="vacancy-meta">
            <span class="vacancy-depend" v-for="(item, index) in vacancyStoreData.$state.vacancy.dependencies" :key="index">
              {{ item.depName }}
            </span>
          </div>
          <div class="post-actions">
            <Button label="Respond" class="p-btn-label" />
          </div>
        </div>
        <div class="single__content">
          <h2>Basic skills</h2>
          <div class="content-header">
            <div class="skills" v-for="(item, index) in vacancyStoreData.$state.vacancy.skills" :key="index">
              <div class="round-divider"></div>
              <span>{{ item.skill }}</span>
            </div>
          </div>
          <h2>Requirements, required skills</h2>
          <ul>
            <li v-for="(item, index) in vacancyStoreData.$state.vacancy.requirements" :key="index">
              {{ item.reqName }};
            </li>
          </ul>
          <h2>Work conditions</h2>
          <ul>
            <li v-for="(item, index) in vacancyStoreData.$state.vacancy.conditions" :key="index">
              {{ item.conName }};
            </li>
          </ul>
        </div>
      </article>
    </div>
  </div>
  <aside class="aside-right" v-if="!vacancyStoreData.$state.loaderIsActive && vacancyStoreData.$state.vacancy">
    <div class="box widget-about-company">
      <a>
        <img src="http://localhost:5173/src/assets/icons8-company-100.png" width="100" height="100"/>
      </a>
      <div class="widget-caption">
        <a class="widget-caption-a">
          {{ vacancyStoreData.$state.vacancy.companyName }}
        </a>
      </div>
      <div class="widget-text small">
        Kaspi.kz – это суперприложение, в котором собраны самые разные сервисы для ежедневных потребностей.
      </div>
      <div class="about-company-jobs">
        <div class="about-company-jobs-list">
          <div 
            class="about-company-jobs-item-last-jobs" 
            v-for="(item, index) in vacancyStoreData.$state.vacancy.compVacancy"
            :key="index"
          >
            <div class="about-company-jobs-item-last-jobs-info">
              <div class="about-company-jobs-title" v-for="(itm, index) in item.vacancy" :key="index">
                <a>
                  {{ itm.name }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script lang="ts">
  import { defineComponent, onMounted } from 'vue'
  import { vacancyModuleStore } from '@/store/vacancyModule';
  import Spinner from '@components/spinner/Spinner.vue'
  import Button from 'primevue/button';

  export default defineComponent({  
    components: {
      Spinner,
      Button,
    },
    props: {
      id: {
        type: Number,
        required: true,
      },
    },
    setup(props: any) {
      const vacancyStoreData = vacancyModuleStore()

      onMounted(async () => {
        await vacancyStoreData.getDataWithID(props.id)
      })

      return { vacancyStoreData }
    }
  })
</script>

<style lang="scss" src="./vacancyPage.scss" scoped></style>