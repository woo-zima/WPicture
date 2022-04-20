<template>
    <div class="photoList" ref="pic">
        <div class="box" v-for="item in pictureList">
          <img :src="'http://192.168.220.128/' + item.purl" @click="imgClick(item.pid,item.purl)">
        </div> 
        <slot></slot>     
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'PhotoList',
    components: { 

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
        };
    },
    computed:{
      ...mapGetters(['user']),
    },
    mounted() {
      this.$nextTick(() => {
        this.getPhoto(this.pageNum); 
      });   
      this.$refs.pic.addEventListener('scroll',this.scrollToButton, false)
      //window.addEventListener('scroll',this.scrollToButton.bind(this),false) 
    },
    methods: {
      imgClick(pid,url){
        const clickp = {
          imgClickUrl:url,
          id:pid,
        }
        if(this.user.userId ){
          const addlist = {
            uId:this.user.userId,
            pId:pid,
            clicktime:new Date().toLocaleDateString()+" "+new Date().toLocaleTimeString('it-IT'),
          }
          this.$store.dispatch('imgClick',true);
          this.$store.commit('imgClickUrl',clickp);
          this.$parent.getcontent();
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
      scrollToButton(){
            if(this.$refs.pic.scrollTop + this.$refs.pic.clientHeight >= this.$refs.pic.scrollHeight - 20){
                this.pageNum += 20;               
                if(this.pageNum > 40)
                {
                  
                  return this.$message.info('没有更多了');
                }
                
                this.getPhoto(this.pageNum);
            }
        },

      getPhoto(pageNum) {
      this.$api.rank
        .getRank(pageNum)
        .then((res) => {
          if (!res) {
            return
          } else {
            for(let i = 0;i < res.data.length; i++){
              this.pictureList.push(res.data[i]);
            }
            //console.log(res.data);
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
.photoList{
    position: relative;
    width: 1200px;
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
.photoList::-webkit-scrollbar{
  width : 10px; 
  height: 1px;
}
.photoList::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow   : inset 0 0 5px rgba(250,235,215, 0.5);
  background   : #c0bab2;
  }
  .photoList::-webkit-scrollbar-track {
  box-shadow   : inset 0 0 5px rgba(250,235,215, 0.5);
  border-radius: 10px;
  background   : #ededed;
  }
</style>