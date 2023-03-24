<template>
  <Toast />
  <div class="form-demo">
    <div class="flex justify-content-center">
      <div class="card">
        <h2 class="text-center">Login</h2>
        <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
          <div class="field">
              <div class="p-float-label">
                <InputText id="username" v-model="v$.username.$model" :class="{'p-invalid':v$.username.$invalid && submitted}" autocomplete="false"/>
                <label for="username" :class="{'p-error':v$.username.$invalid && submitted}">Username</label>
              </div>
              <small v-if="(v$.username.$invalid && submitted) || v$.username.$pending.$response" class="p-error">{{v$.username.required.$message.replace('Value', 'Username')}}</small>
          </div>
          <div class="field">
            <div class="p-float-label">
              <Password id="password" toggleMask :feedback="false" v-model="v$.password.$model" :class="{'p-invalid':v$.password.$invalid && submitted}" />
              <label for="password" :class="{'p-error':v$.password.$invalid && submitted}">Password</label>
            </div>
            <small v-if="(v$.password.$invalid && submitted) || v$.password.$pending.$response" class="p-error">{{v$.password.required.$message.replace('Value', 'Password')}}</small>
          </div>
          <Button type="submit" label="Submit" class="mt-2"/>
        </form>
        <h4 class="text-center"><a href="/register">Don't have an account? Sign Up</a></h4>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { reactive, ref, computed, onMounted, defineComponent } from 'vue'
  import { required } from '@vuelidate/validators'
  import { useVuelidate } from '@vuelidate/core'
  import { useRouter } from 'vue-router'
  import { authModuleStore } from '../../store/authModule'
  import { useToast } from 'primevue/usetoast'
  import InputText from 'primevue/inputtext'
  import Password from 'primevue/password'
  import Button from 'primevue/button'
  import Toast from 'primevue/toast'

  export default defineComponent ({
    components: {
      InputText,
      Password,
      Button,
      Toast,
    }, 

    setup() {
      const toast = useToast()
      const router = useRouter()
      const authUserStore = authModuleStore()
      const currentUser = computed(() => authUserStore.getCurrentUser)

      const state = reactive({
        username: '',
        password: '',
      })

      const rules = {
        username: { required },
        password: { required }, 
      }

      const errorMessage = ref('')
      const submitted = ref(false)
      const v$ = useVuelidate(rules, state) as any

      const showMessage = (
        severity: string,
        summary: string,
        detail: string,
        life: number,
        ) => {
          toast.add({ severity: severity, summary: summary, detail: detail, life: life })
      }

      const handleSubmit = (isFormValid: boolean) => {
        submitted.value = true
        if (!isFormValid) {
          return
        }

        login()
      }

      function login() {
        const user = {
          username: state.username,
          password: state.password,
        }
        authUserStore.login(user).then(
          () => {
            router.push({ 
              name: 'home'
            })
          }, 
          error => {
            errorMessage.value =
              (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            showMessage('error', 'Error Message', errorMessage.value, 3000)
          },
        )
      }

      onMounted(() => {
        if (currentUser.value !== null) {
          router.push({
            name: '/'
          })
        } else {
          return
        }
      })

      return { 
        authUserStore,
        errorMessage,  
        handleSubmit, 
        submitted,
        router,  
        state,
        login,
        v$, 
      }
    }
  })
</script>

<style lang="scss" src="./authorizationForm.scss" scoped></style>