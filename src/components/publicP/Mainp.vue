<template>
    <div class="PhotoMainp">
        <el-dialog
        v-if="$store.getters.imgClick"
        :visible="$store.getters.imgClick"
        top="8vh"
        width="85%"
        @close="$store.dispatch('imgClick',false)"
        >
        <div class="dialogbox">
          <div class="leftimg">
            <div class="up">
            <img :src="'http://192.168.220.128/'+ $store.getters.imgClickUrl.imgClickUrl" />
            <div class="aixin">
            <p v-if="issc" @click="markp"><svg t="1621995664864" class="icon" viewBox="0 0 1170 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1474" width="200" height="200"><path d="M1066.676944 101.025891A351.539301 351.539301 0 0 0 584.680751 90.428552a351.539301 351.539301 0 0 0-481.996194 10.597339 344.230792 344.230792 0 0 0 0 490.035554l403.795143 400.140888a109.627641 109.627641 0 0 0 156.402101 0l403.795143-399.775463a344.230792 344.230792 0 0 0 0-490.400979z m-52.255842 438.510563L610.625959 939.677342a36.542547 36.542547 0 0 1-51.890417 0L154.574973 539.536454a271.876549 271.876549 0 0 1 0-386.985572A277.357931 277.357931 0 0 1 534.982887 146.338649L584.680751 189.093429 634.013189 146.338649a277.357931 277.357931 0 0 1 380.407913 8.03936 271.876549 271.876549 0 0 1 0 385.158445z" fill="#d81e06" p-id="1475"></path><path d="M338.018559 182.881196A155.305824 155.305824 0 0 0 182.712735 338.18702a18.271273 18.271273 0 0 0 36.542546 0A118.763277 118.763277 0 0 1 338.018559 219.423743a18.271273 18.271273 0 0 0 0-36.542547z" fill="#d81e06" p-id="1476"></path></svg></p>
            <p v-else @click="markp"><svg t="1621995664864" class="icon" viewBox="0 0 1170 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1474" width="200" height="200"><path d="M1066.676944 101.025891A351.539301 351.539301 0 0 0 584.680751 90.428552a351.539301 351.539301 0 0 0-481.996194 10.597339 344.230792 344.230792 0 0 0 0 490.035554l403.795143 400.140888a109.627641 109.627641 0 0 0 156.402101 0l403.795143-399.775463a344.230792 344.230792 0 0 0 0-490.400979z m-52.255842 438.510563L610.625959 939.677342a36.542547 36.542547 0 0 1-51.890417 0L154.574973 539.536454a271.876549 271.876549 0 0 1 0-386.985572A277.357931 277.357931 0 0 1 534.982887 146.338649L584.680751 189.093429 634.013189 146.338649a277.357931 277.357931 0 0 1 380.407913 8.03936 271.876549 271.876549 0 0 1 0 385.158445z" fill="#2c2c2c" p-id="1475"></path><path d="M338.018559 182.881196A155.305824 155.305824 0 0 0 182.712735 338.18702a18.271273 18.271273 0 0 0 36.542546 0A118.763277 118.763277 0 0 1 338.018559 219.423743a18.271273 18.271273 0 0 0 0-36.542547z" fill="#2c2c2c" p-id="1476"></path></svg></p> 
            </div>  
            </div>
            <div class="message">
             <div>{{pname}}</div>
             <div></div>
             <div>♡ {{marknumer}}</div>
             <div>{{fbtime}}</div>
            </div>
          </div>
          <div class="righttext">
            <div class="usertetx">
              <div class="comment" v-for="(item,i) in userpl">
                <img :src="'http://192.168.220.128/' + item.headurl">
                <div class="uname">{{item.loginname}}</div>
                <div class="commentmain">
                  {{item.content}}
                  <div class="commenttime">
                  {{item.plTime}}
                  </div>
                </div>
              </div>
            </div>
            <div class="userInput">
                 <el-input
                   placeholder="留个言吧"
                   v-model="textarea"
                   clearable>
                 </el-input>
                 <el-button type="primary" plain @click="release">发送</el-button>
            </div>
          </div>
        </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'PhotoMainp',
    components: {},
    data() {
        return {
            pname:'',
            pup:'',
            issc:false,
            textarea: '',
            marknumer:'',
            fbtime:'',
            userpl:[],
            sclist:'',
        };
    },
    computed:{
      ...mapGetters(['user']),
    },
    mounted() {

    },
    methods: {
      async scnum(){
        const pid = this.$store.state.imgClickUrl.id;
        const res = await this.$api.user.scnum(pid);
        if(res.data.length != 0){
           //console.log(res.data);
           this.marknumer = res.data[0].number;
           this.pname = res.data[0].pname;
           let tstr = res.data[0].uptime.split(" ");
           this.fbtime = tstr[0];
           return
         }
         this.marknumer = 0;
      },
        async isscfn(){
          const uid = this.$store.state.user.userId;
          const pid = this.$store.state.imgClickUrl.id;
         const res = await this.$api.user.issc(uid,pid);
         if(res.data.length != 0){
           //console.log(res.data);
           this.issc = true;
           this.sclist = res.data[0].scId;
           return
         }
         //console.log(res);
         this.issc = false;
        },
        markp(){
            if(this.issc){
              const reqbody = {
                scId : this.sclist
              }
              this.$api.user.remove(reqbody).then((res) =>{
                if(res){
                  this.$message.success("取消收藏成功")
                  this.isscfn()
                  this.scnum()
                }
              })
              return
            }
            const reqBody = {
              uId:this.$store.state.user.userId,
              pId:this.$store.state.imgClickUrl.id,
              scTime:new Date().toLocaleDateString()+" "+new Date().toLocaleTimeString('it-IT'),
            }
            //console.log(reqBody);
            this.$api.user.scadd(reqBody).then((res) => {
              if(res){
                this.$message.success("收藏成功")
                this.isscfn()
                this.scnum()
                return
              }
            });
        },
        async release(){
         const reqBody = {
           pId:this.$store.state.imgClickUrl.id,
           uId:this.$store.state.user.userId,
           content:this.textarea,
           plTime:new Date().toLocaleDateString()+" "+new Date().toLocaleTimeString('it-IT'),
         }
         if(this.textarea == '' || this.textarea == null){
           this.$message.info("淦!还未输入内容呢")
           return;
         }
         //console.log(reqBody);
         const res = await this.$api.user.release(reqBody);
         if(res.data.code === 0){
           this.$message.success("成功评论，请等待审核");
           
           this.getcontent();
           return
         }
         //console.log(res.data.msg);
      },

      async getcontent(){
        const id= this.$store.state.imgClickUrl.id;
        const res = await this.$api.user.getcontent(id);
         if(res.data){
           //console.log(res.data);
           this.userpl = res.data
           return
         }
         //console.log(res.data);
       },

    },
  
};
</script>

<style lang="scss" scoped>
.dialogbox{
  height: calc(100vh - 180px);
  display: flex;
  justify-content: space-around;
  border-radius: 2px;
}
.dialogbox .leftimg{
  box-shadow: 0 8px 32px 0 rgba(230, 221, 223, 0.37);
  width: 25rem;
}
.dialogbox .leftimg .up{
    position: relative;
    height: 23rem;
}
.up img{
  border-radius: 2px;
  max-width: 80%;
  height: 90%;
}
.aixin{
    width: 2rem;
    height: 2rem;
    background-color: #FAEBD7;
}
.aixin p,.aixin p svg{
    position: absolute;
    right: 0;
    bottom: 0;
    margin: 0;
    width: 2rem;
    height: 2rem;
}
.message{
  height: 10rem;
  display: flex;
  flex-wrap:wrap;
  margin-top: 1rem;
  user-select:none;
  :first-child{
      font-weight: bold;
  }
  div{
      margin: 0 2rem;
      width: 100%;
      height: 2rem;
      font-size: 0.6rem;
      text-align: start;
      line-height: 2rem;
  }
}
.dialogbox .righttext{
    box-shadow: 0 8px 32px 0 rgba(230, 221, 223, 0.37);
    width: 40rem;
    display: flex;
    flex-direction:column;
    justify-content: space-between;
}
.righttext .usertetx{
    height: 25rem;
    overflow: hidden;
}
.usertetx .comment{
  position: relative;
  display: flex;
  align-content:center;
  height: 5rem;
  border-radius: 0.2rem;
  border-bottom: 1px solid rgb(157, 188, 223);
  border-right: 1px solid rgb(157, 188, 223);
  margin: 0.3rem 0;
}
.usertetx img{
  margin-top: 1rem;
  margin-left:0.5rem ;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
}
.usertetx .uname{
  width: 0.3rem;
  font-weight: bold;
  white-space:nowrap;
}
.usertetx .commentmain{
  height: 3rem;
  margin-left: 1rem;
  text-align: start;
  line-height: 3rem;
  width: 35rem;
  margin-top: 1rem;
  padding: 0 1rem;
}
.commentmain .commenttime{
  position:absolute;
  right: 2px;
  bottom: -0.8rem;
}
.righttext .userInput{
    position: relative;
    height: 5rem;
}
.el-button--primary.is-plain{
  position: absolute;
  bottom: 0;
  right: 0;

}
</style>