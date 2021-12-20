<template>
  <div class="loading-page">
    <p><i class="fa fa-hourglass fa-spin"></i> Loading...</p>
  </div>
</template>

<script>
    export default {
        name: "Loading"
    }
</script>

<style scoped lang="scss">
  $ghtk_color: #058f49;

  .loading-page {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.5);
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    z-index: 1;
    color: $ghtk_color;
    opacity: 0.7;
  }
</style>
