<template>
  <div id="detail">
   我是详情页面<br/>
   <button @click='goH'>前往home页面</button>
  </div>
</template>

<script>
export default {
  name: 'detail',
  methods:{
    goH(){
        location.hash='#/'
    }
  }
}
</script>

<style>
</style>
