<template>
  <div  class="magnify">
    <div  class="large" ref="overPlay" :style="{'background-image': 'url('+blog.bgUrl+')'}"></div>
  </div>
</template>

<script setup lang=ts>
import useStore from "@/store";
const {blog} = useStore()
const overPlay=ref()
const update=(event:any)=> {
    // 设置Dom元素的位置
    // 注意：ev.pageX、ev.pageY是不带单位的，使用时需要加上单位px
    overPlay.value.style.left = event.clientX - 150  + 'px'
    overPlay.value.style.top = event.clientY - 150 +'px'
    overPlay.value.style.backgroundPosition= (-event.clientX + 150 +'px')+" "+(-event.clientY + 150 +'px')
}
onMounted(
    () => window.addEventListener('mousemove', update)
)

</script>

<style scoped lang="scss">
.magnify {
    position: fixed;
    width: 100%;
    height: 100%;
    background:  no-repeat fixed center center rgba(0,0,0,0.5);
    z-index: 1000001;
    .large{
    background-repeat:no-repeat;
    background-size:auto 955px;
    width: 300px;
    height: 300px;
    position: fixed;
    border-radius: 100%;
    box-shadow: 0 0 0 3px rgba(255,255,255,0.85), 0 0 7px 7px rgba(0,0,0,0.25), inset 0 0 40px 2px rgba(0,0,0,0.25);
    cursor: url(@/assets/styles/mouse3.cur),url(@/assets/styles/mouse3.cur),auto;
    }
}
</style>