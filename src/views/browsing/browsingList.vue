<template>
    <div v-if="user.userId" class="PhotoBrowsinglist">
        <div class="box" v-for="item in pictureList">
          <img :src="'http://192.168.220.128/' + item.purl" @click="imgClick(item.pId,item.purl)">
        </div> 

        <Mainp ref="mychild"/>
    </div>
    <div v-else>
      <p>尚未登陆 无浏览记录</p>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Mainp from '../../components/publicP/Mainp.vue'
export default {
    name: 'PhotoBrowsinglist',
    components: { 
        Mainp
    },
    data() {
        return {
             scrollY: 0,
            columnHeight: [],
            column: 4,
            gap:10,
            itemWidth:288,
            pageNum:0,
            pageSize:20,
            heightArr:[],
            pictureList:[],
            keyword:'',
            
        };
    },
    computed:{
       ...mapGetters(['user']),
    },
    mounted() {
        this.$nextTick(() => {
        this.getPhoto(this.pageNum); 
        });    
        
    },
    methods: {
        imgClick(pid,url){
        const clickp = {
          id:pid,
          imgClickUrl:url,
        }
        const addlist = {
            uId:this.user.userId,
            pId:pid,
            clicktime:new Date().toLocaleDateString()+" "+new Date().toLocaleTimeString('it-IT'),
          }
        if(this.user.userId ){
          this.$store.dispatch('imgClick',true);
          this.$store.commit('imgClickUrl',clickp);
          this.$refs.mychild.getcontent();
          this.$refs.mychild.isscfn();
          this.$refs.mychild.scnum();
          this.$api.user.zjlookadd(addlist).then((res) =>{
            if(!res){
              //console.log(res);
              return
            }
            else{
              //console.log(res);
            }
          })
          return
        }
        this.$message.warning('没登陆不给看');
      },
    

      getPhoto(pageNum) {
      this.$api.user
        .zjlook(this.user.userId)
        .then((res) => {
          if (!res) {
            return
          } else {
            for(let i = 0;i < res.data.length; i++){
              this.pictureList.push(res.data[i]);
            }
            this.$nextTick(() => {
             this.renderList(res.data,pageNum);
            }); 
            //this.renderList(res.data,pageNum);
          }
        });
    },

    renderList(data,pageNum){
      let oItems = document.getElementsByClassName('box');
      data.forEach(function(elem, idx){
        
        let minIdx = -1;
        let p = this.pictureList[idx];
        let itemleft = (idx + 1) % this.column === 1 ? '0' : idx * (this.itemWidth + this.gap);
        oItems[idx + pageNum].style.width = this.itemWidth + 'px';
        oItems[idx + pageNum].style.height = Math.round(elem.pheight * this.itemWidth / elem.pwidth) + 'px';

        if(idx < this.column && pageNum == 0){
              this.heightArr.push(oItems[idx].offsetHeight)
              oItems[idx + pageNum].style.top = '0';
              oItems[idx + pageNum].style.left = itemleft + 'px';
              //console.log(this.heightArr);                
              }else{
              minIdx = this.getMin(this.heightArr);        
              oItems[idx + pageNum].style.left = oItems[minIdx].offsetLeft + 'px';     
              oItems[idx + pageNum].style.top = this.heightArr[minIdx] + this.gap + 'px';
              this.heightArr[minIdx] += oItems[idx + pageNum].offsetHeight + this.gap;
        }

      },this);
    },
    getMin(arr){
        return [].indexOf.call(arr,Math.min.apply(null,arr));
    },
        
    },
};
</script>

<style lang="scss" scoped>
.PhotoBrowsinglist{
    position: relative;
    width: 1200px;
    height: calc(100vh - 120px);
    margin: 0 auto;
    overflow-y: scroll;
    //background-color: #acb;  
}
.box{
    position: absolute;
    background-color: #abc;
    /* overflow: hidden; */
    border-radius: 10px;
}
.box img{
    display: block;
    width: 100%;
    border-radius: 10px;
    cursor: pointer;
}
.PhotoBrowsinglist::-webkit-scrollbar{
  width : 10px; 
  height: 1px;
}
.PhotoBrowsinglist::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow   : inset 0 0 5px rgba(250,235,215, 0.5);
  background   : #c0bab2;
  }
  .PhotoBrowsinglist::-webkit-scrollbar-track {
  box-shadow   : inset 0 0 5px rgba(250,235,215, 0.5);
  border-radius: 10px;
  background   : #ededed;
  }
</style>