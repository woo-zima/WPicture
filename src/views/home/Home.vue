<template>
    <div class="Home" >
    <PhotoList>
      <Mainp ref="mychild"/>
    </PhotoList>
  </div>
</template>

<script>
import PhotoList from '../../components/photoList/PhotoList.vue'
import Mainp from '../../components/publicP/Mainp.vue'
export default {
    name: 'Home',
    components: {
      PhotoList,
      Mainp
     },

    data() {
        return {
        };
    },
    mounted() {
         //localStorage.setItem('waterfull-column', 4);
         //this.fatherMounted = true;
    },
    methods: {
      getcontent(){
        this.$refs.mychild.getcontent();
        this.$refs.mychild.isscfn();
        this.$refs.mychild.scnum();
      },
        
    },
    computed:{
        
    },
};
</script>

<style>
.Home {
  height: calc(100vh - 120px);
  /* overflow-y: scroll; */
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>