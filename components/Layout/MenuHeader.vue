<template>

  <div class="header" id="layout-menu-header-v2">
    <loading v-if="isLoading"></loading>

    <a href="#default" class="logo" id="header-logo">CitizenV</a>
    <div class="header-right">
      <span class="name-user">
        {{ this.$auth.user[0].province != null ? this.$auth.user[0].province.name : '' }}
        {{ this.$auth.user[0].district != null ? ' / '+this.$auth.user[0].district.name : '' }}
        {{ this.$auth.user[0].ward != null ? ' / '+this.$auth.user[0].ward.name : '' }}
        {{ this.$auth.user[0].hamlet != null ? ' / '+this.$auth.user[0].hamlet.name : '' }}
      </span>
      <div class="log-out" v-on:click="logout">
        <i class="fa fa-sign-out mr-1"></i>
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
  min-height: 35px;

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

.name-user {
  font-weight: bold;
}

.log-out i {
  float: right;
}
#header-logo {
  color: white;
  font-family: BonFoyage;
  width: 20%;
  font-size: 45px;
  text-align: left;
  padding: 5px !important;
  padding-top: 10px !important;
}

.header-right {
  float: right;
}

/* Style the header with a grey background and some padding */
.header {
  overflow: hidden;
  background-color: #f1f1f1;
  padding: 20px 10px;
}

/* Style the header links */
.header a {
  float: left;
  color: black;
  text-align: center;
  padding: 12px;
  text-decoration: none;
  font-size: 18px;
  line-height: 25px;
  border-radius: 4px;
}

/* Style the logo link (notice that we set the same value of line-height and font-size to prevent the header to increase when the font gets bigger */
.header a.logo {
  font-size: 25px;
  font-weight: bold;
}

/* Change the background color on mouse-over */
.header a:hover {
  background-color: #ddd;
  color: black;
}

/* Style the active/current link*/
.header a.active {
  background-color: dodgerblue;
  color: white;
}

/* Float the link section to the right */
.header-right {
  float: right;
}

/* Add media queries for responsiveness - when the screen is 500px wide or less, stack the links on top of each other */
@media screen and (max-width: 500px) {
  .header a {
    float: none;
    display: block;
    text-align: left;
  }
  .header-right {
    float: none;
  }
}
</style>
