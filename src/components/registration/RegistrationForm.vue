
<template>
  <Toast />
  <div class="form-demo">
    <Dialog v-model:visible="showMsg" :breakpoints="{ '960px': '80vw' }" :style="{ width: '30vw' }" position="top">
      <div class="flex align-items-center flex-column pt-6 px-3">
        <i class="pi pi-check-circle" :style="{fontSize: '5rem', color: 'var(--green-500)' }"></i>
        <h5>Registration Successful!</h5>
        <p>
          Your account is registered under username <b>{{state.username}}</b><br/>Please check <b>{{state.email}}</b> for activation instructions.
        </p>
      </div>
      <template #footer>
        <div class="flex justify-content-center">
            <Button label="OK" @click="toggleDialog" class="p-button-text" />
        </div>
      </template>
    </Dialog>

    <div class="flex justify-content-center">
      <div class="card">
        <h2 class="text-center">Register</h2>
        <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
          <div class="field">
            <div class="p-float-label">
              <InputText id="username" v-model="v$.username.$model" :class="{'p-invalid':v$.username.$invalid && submitted}" />
              <label for="username" :class="{'p-error':v$.username.$invalid && submitted}">Username</label>
            </div>
            <small v-if="(v$.username.$invalid && submitted) || v$.username.$pending.$response" class="p-error">{{v$.username.required.$message.replace('Value', 'Username')}}</small>
          </div>
          <div class="field">
            <div class="p-float-label p-input-icon-right">
              <i class="pi pi-envelope" />
              <InputText id="email" v-model="v$.email.$model" :class="{'p-invalid':v$.email.$invalid && submitted}" aria-describedby="email-error"/>
              <label for="email" :class="{'p-error':v$.email.$invalid && submitted}">Email</label>
            </div>
            <span v-if="v$.email.$error && submitted">
              <span id="email-error" v-for="(error, index) of v$.email.$errors" :key="index">
              <small class="p-error">{{error.$message}}</small>
              </span>
            </span>
            <small v-else-if="(v$.email.$invalid && submitted) || v$.email.$pending.$response" class="p-error">{{v$.email.required.$message.replace('Value', 'Email')}}</small>
          </div>
          <div class="field">
            <div class="p-float-label">
              <Password id="password" v-model="v$.password.$model" :class="{'p-invalid':v$.password.$invalid && submitted}" toggleMask>
                <template #header>
                  <h6>Pick a password</h6>
                </template>
                <template #footer="sp">
                  {{sp.level}}
                  <Divider />
                  <p class="mt-2">Suggestions</p>
                  <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                    <li>At least one lowercase</li>
                    <li>At least one uppercase</li>
                    <li>At least one numeric</li>
                    <li>Minimum 8 characters</li>
                  </ul>
                </template>
              </Password>
              <label for="password" :class="{'p-error':v$.password.$invalid && submitted}">Password</label>
            </div>
            <small v-if="(v$.password.$invalid && submitted) || v$.password.$pending.$response" class="p-error">{{v$.password.required.$message.replace('Value', 'Password')}}</small>
          </div>
          <Button type="submit" label="Submit" class="mt-2" />
          <h4 class="text-center"><a href="/">Do you have an account? Login</a></h4>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { reactive, ref, defineComponent, computed, onMounted } from 'vue'
  import { email, required } from "@vuelidate/validators"
  import { useVuelidate } from "@vuelidate/core"
  import { useRouter } from 'vue-router'
  import { authModuleStore } from '../../store/authModule'
  import { useToast } from 'primevue/usetoast'
  import InputText from 'primevue/inputtext'
  import Checkbox from 'primevue/checkbox'
  import Password from 'primevue/password'
  import Divider from 'primevue/divider'
  import Button from 'primevue/button'
  import Toast from 'primevue/toast'

  export default defineComponent ({
    components: {
      InputText,
      Password,
      Checkbox,
      Divider,
      Button,
      Toast,
    }, 

    setup() {
      const toast = useToast()
      const router = useRouter()
      const authUserStore = authModuleStore()
      const errorMessage = ref('')
      const success = ref(false)

      const state = reactive({
          username: '',
          email: '',
          password: '',
      })

      const rules = {
          username: { required },
          email: { required, email },
          password: { required },
      }

      const submitted = ref(false)
      const showMsg = ref(false)
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

          register()
      }

      function register() {
        const user = {
          username: state.username,
          email: state.email,
          password: state.password,          
        }
        authUserStore.register(user).then(
          () => {
            toggleDialog()
          },
          error => {
            errorMessage.value =
              (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            showMessage('error', 'Error Message', errorMessage.value, 3000)
            resetForm()
          },
        )
      }

      const toggleDialog = () => {
        showMsg.value = !showMsg.value
      
        if(!showMsg.value) {
            resetForm()
        }

        router.push({
          name: 'Verify Email'
        })
      }

      const resetForm = () => {
        state.username = ''
        state.email = ''
        state.password = ''
        submitted.value = false
      }

      onMounted(() => {
        if (success.value) {
          toggleDialog()
        }
      })

      return { 
        handleSubmit,
        toggleDialog,
        showMsg,
        submitted,
        state, 
        v$, 
      }
    }
  })
</script>

<style lang="scss" src="./registrationForm.scss" scoped>
</style>
