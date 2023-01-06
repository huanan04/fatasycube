<template>
  <div v-if="groupTmp">
    <h3 class="jieLongTitle">{{groupTmp ?groupTmp.name : groupIdTmp}}正在进行的接龙</h3>
    <div v-if="list">
      <div v-for="item in listTmp" :key="item.id">
        <h4 class="jieLongTitle">第{{item.sequence}}回</h4>
        <span>作者：{{item.jieLongName}}</span><br>
        <span v-if="item.likes != 0">点赞：{{item.likes}}</span>
        <p v-for="(text,i) in item.formattedText" :key="i" >{{text}}</p>
      </div>
    </div>
  </div>
</template>

<script setup >
import {reactive, ref} from "vue";

const props = defineProps({
  group:Object,
  list:Array,
  groupId:Number
})
const {list,group,groupId} = props
const listTmp = reactive([])
for (let i = 0; i < list.length; i++) {
  listTmp.push(list[i])
}
const groupTmp = reactive(group)
const grouIdTmp = ref(groupId)

console.log(props.groupId,props.group,props.list,1212121)
</script>

<style scoped>
.jieLongTitle{
  text-align:center;
}
</style>