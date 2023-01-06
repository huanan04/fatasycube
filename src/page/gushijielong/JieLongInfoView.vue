<template>
  <div>
    <h1>接龙信息</h1>
    <JieLongInfo v-if="isTrue" :group="group" :groupId="groupId" :list="list"/>
  </div>
</template>

<script setup>
import {getJieLongInfo} from "../../api/http/jielongHttp";
import JieLongInfo from "../../components/jielong/JieLongInfo.vue";
import {reactive, ref} from "vue";
import {useRoute} from "vue-router";

let list = reactive([])
let groupId = ref(0)
let group = reactive();
let isTrue = ref(false)
const route = useRoute()
/**
 * 获取当前接龙
 */
const getInfo = () => {
  getJieLongInfo(groupId)
      .then(e => {
        e.data.contents.forEach((v)=>{
          list.push(v)
        })
        group = e.data.group
      }).catch(e => {
    console.log(e, '请求报错')
  })
}
groupId = route.query.groupId
if (groupId != 0) {
  const location = window.location
  groupId = location.href.slice(location.href.indexOf('=') + 1, location.href.length)
} else {
  getInfo()
}
if (list.length == 0 && groupId) {
  getInfo()
}
console.log(list,333333)
if (list) {
  isTrue = true
}

</script>

<style scoped>

</style>