<template>
  <button @click.native="getInfo">按钮</button>
  <div>
    <h1 @click="getInfo">数据展示</h1>
    {{data.length!=0?true:false}}
    <div v-if="data" v-for="content in data">
      <p :key="content.id">{{content.content}}</p>
    </div>
  </div>
</template>

<script setup>
import {useRoute} from "vue-router";
import service from "../api/request.js";
import {reactive, ref} from "vue";
const route = useRoute()
let groupId = route.params.groupId;
let data = reactive([]);
function getInfo() {
  console.log(groupId,2222)
  service.get("/gushijielong/v1/get_now_jie_long_by_group",{params:{'groupId':groupId}}).then(e=>{
    for (let i = 0; i < e.data.length; i++) {
      data.push(e.data[i])
    }
    console.log(data)
  })
}


</script>

<style scoped>

</style>