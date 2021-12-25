<template>
  <div id="layout-menu-header-v2">
    <loading v-if="isLoading"></loading>
    <div class="d-flex justify-content-between align-items-end">
      <div class="log-out" v-on:click="logout">
        <i class="fa fa-sign-out mr-1"></i>
        Đăng xuất
      </div>
      <div class="float-right">
        <i class=""></i>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "../../components/Common/Loading.vue";

export default {
  name: "MenuHeader",
  components: {Loading},

  data() {
    return {
      isLoading: false
    }
  },

  methods: {
    async logout() {
      await this.$auth.logout()

      if (!this.$auth.loggedIn) {
        this.isLoading = false;
        this.$toast.success('Đăng xuất thành công!');
        this.$cookie.delete('token');
        ;

        this.$router.push('/login');
      }
    }
  }
}
</script>

<style scoped lang="scss">
#layout-menu-header-v2 {
  background-color: #058f49;
  color: white;
  padding: 0.5rem 1rem;

  h5 {
    margin-bottom: unset;
    font-weight: 600;
  }

  img {
    height: 22px;
  }

  .log-out {
    cursor: pointer
  }
}
</style>
