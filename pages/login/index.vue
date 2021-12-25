<template>
  <div id="login">
    <loading v-if="isLoading"></loading>
    <div class="login-container py-5">
      <div class="card">
        <div class="p-4 p-sm-5">
          <div class="logo">

          </div>
          <h5 class="text-center text-muted font-weight-bolder mb-4 login-title">Đăng nhập vào hệ thống</h5>
          <form>
            <div class="form-group">
              <label class="form-label">Username:</label>
              <input type="text" class="form-control" placeholder="Nhập username" v-model="login.username">
            </div>
            <div class="form-group">
              <label class="form-label">
                <div>Password:</div>
              </label>
              <input type="password" class="form-control pw-form-control" placeholder="Nhập mật khẩu" v-model="login.password" v-on:keyup.enter="xteamLogin">
            </div>
            <div class="d-flex justify-content-center align-items-center m-0">
              <button type="button" class="btn btn-ghtk" v-on:click="xteamLogin">Đăng nhập</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Loading from "../../components/Common/Loading.vue";
  import nuxtConfig from "../../nuxt.config.js";
  import {asyncLocalStorage} from "@/store/localStorage";
  export default {
    name: "index",
    layout: 'default-without-layout',
    data() {
      return {
        login: {
          username: '',
          password: '',
        },
        isLoading: false,
      }
    },

    components: {
      Loading
    },

    methods: {
      async xteamLogin() {
        this.isLoading = true
        if (this.login.username && this.login.password) {
          try {
            let response = await this.$auth.loginWith('local', {data: this.login});
            if (response.data.success) {
              window.localStorage.setItem('access_token', 'Bearer '+ response.data.data.access_token);
              this.$store.dispatch('localStorage/reset');
              this.$toast.success('Đăng nhập thành công!');
              this.$router.push('/home');
              this.isLoading = false;
            } else {
              this.isLoading = false;
              this.$toast.error('Đăng nhập thất bại, vui lòng đăng nhập lại!');
            }
          } catch (err) {
            this.isLoading = false;
            this.$toast.error('Đăng nhập thất bại, vui lòng đăng nhập lại!');
          }
        } else {
          this.isLoading = false;
          this.$toast.error('Vui lòng truyền đủ thông tin!');
        }
      },
    }
  }
</script>

<style scoped lang="scss">
  $color: #058f49;
  .row-cus {
    display: flex;
    align-items: center;
    justify-items: center;
  }

  #login {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: #e4e4e4;
    background-position: center center;
    background-size: cover;

    .login-container {
      width: 380px;

      .card {
        .logo {
          display: flex;
          margin-bottom: 1.5rem;

          .image-logo {
            width: 15rem;
            margin: auto;
          }
        }

        .login-title {
          color: #060621 !important;
          font-size: 1.1rem;
          font-family: Arial, Helvetica, sans-serif;
        }

        .form-label {
          margin-bottom: calc(.438rem - 2px);
          font-weight: 500;
        }

        .form-control {
          color: #4E5155;
          border-radius: unset;
        }

        .form-control:focus {
          border-color: $color;
          box-shadow: 0 0 0 0.01rem $color;
        }

        .d-flex {
          .btn-ghtk {
            background-color: $color;
            color: white;
            width: 60%;
            font-size: .894rem;
            border-radius: unset;
          }

          .btn-ghtk:focus {
            box-shadow: unset;
          }

          .btn-ghtk:hover{
            transform: scale(1.1);
          }

        }
      }
    }
  }

</style>
