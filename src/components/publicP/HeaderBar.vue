<template>
<div class="HeaderBar">
    <el-row
      align="middle"
      justify="space-between"
      style="width:100%;"
      type="flex"
    >
      <el-col>
        <a href="/">
          <img alt src="../../assets/images/q.svg">
        </a>
      </el-col>

      <el-col>
        <el-autocomplete
          v-model="params.key"
          :debounce="300"
          :fetch-suggestions="querySearch"
          :maxlength="40"
          class="input-with-select"
          placeholder="搜索"
          @keyup.enter.native="handleSearch"
        >
        </el-autocomplete>
        <!-- <el-popover
          placement="bottom"
          style="margin-left:10px"
          trigger="hover"
        >
          <i
            slot="reference"
            class="el-icon-s-flag"
            style="color:#409EFF"
          />
          <ImgTags
            v-if="hotTags.length"
            :tagslist="hotTags"
            @on-click="handleClickTag"
          />
        </el-popover> -->
      </el-col>

      <el-col class="header-info">
        <div style="margin-right:10px;">
          <div v-if="user.userId">
            <el-dropdown
              trigger="click"
              @command="clickMenu"
            >
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="item of MenuList"
                  :key="item.handler"
                  :command="item.handler"
                  :divided="item.divided"
                >
                  {{ item.name }}
                </el-dropdown-item>
              </el-dropdown-menu>
              <div>
                <el-avatar                 
                  :src="'http://192.168.220.128/' + user.headUrl"
                  fit="cover"
                  shape="square"
                />
              </div>
            </el-dropdown>
          </div>
          <div v-else> 
            <span class="button-text" @click="login">登录</span>
             <span class="button-text" @click="signUp">注册</span>
          </div>
        </div>
      </el-col>
    </el-row>
    <SetDialog
      v-if="settingVisible"
      :setting-visible.sync="settingVisible"
      :user="user"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SetDialog from './Setting.vue'
export default {
    name: 'HeaderBar',  
    components: {
      SetDialog,
    },
    data() {
        return {
          restaurants: [],
          params: {
            key:'',
          },
          settingVisible:false,
        };
    },
    computed:{

        ...mapGetters(['user']),

         MenuList() {
         return [
          {
          name: '关注',
          handler: 'followed',
          },
          {
          name: '收藏',
          handler: 'bookmarked',
          },
          {
          name: '设置',
          handler: 'setting',
          },
          {
          name:'退出登录',
          handler: 'logout',
          divided: true,
          },
         ];
       },

    },
    mounted() { 
         this.restaurants = this.loadAll();
    },
    methods: {
         querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
         },
         createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
          loadAll() {
            return[
              {"value": "白毛"},
              {"value": "美少女"},
              {"value": "sakura"},
              {"value": "flcl"},
            ]
          },
     clickMenu(type) {
      switch (type) {
        case 'followed':
          this.toFollowed();
          break;
        case 'bookmarked':
          this.toBookmarked();
          break;
        case 'setting':
          this.setModal();
          break;
        case 'logout':
          this.logout();
          break;
        default:
          break;
      }
    },

    //搜索跳转
    handleSearch() {
      const keyword = this.params.key;
      if (keyword == null || keyword == '') {
      this.$message.info('请输入关键字搜索');
      return
      }
      this.$router.push({
       path: '/keywords',
       query: {
        tag: keyword,
        },
      });
    },

    //跳转到关注页
    toFollowed() {
      this.$router.push({
        path: '/users/followed',
        query: {
          userId: this.$store.state.user.userId,
        },
      });
    }, 
    // 跳转收藏页
    toBookmarked() {
      this.$router.push({
        path: '/users/bookmarked',
      });
    },
     // 退出登录
    logout() {
      localStorage.removeItem('user');
      this.$store.commit('setUser', {});
      this.$message.success('成功开溜');
    },
    //设置
    setModal(){
      this.settingVisible = !this.settingVisible;
    },
    
     signUp() {
        this.$store.dispatch('LoginBoolean',true);
        this.$store.dispatch('LoginOrSign',false);
        //console.log(this.$store.state.loginBoolean);
        //console.log(this.$store.state.loginOrSign);

    },
    login() {
        this.$store.dispatch('LoginBoolean',true);
        this.$store.dispatch('LoginOrSign',true);
    },

    },
};
</script>

<style lang="scss" scoped>
.HeaderBar {
  background-color: #fff;
  height: 100%;
  width: 100%;
  display: flex;
  overflow: hidden;
  .el-col-24{
    width: auto;
  }
   .el-col a img{
     height: 3rem;
   }
   .el-select .el-input {
    width: 80px;
  }
   .input-with-select {
    width: 25vw;
    background-color: #fff;
  }
  .input-with-select:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }
  .header-info {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
.user-tools {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-bottom: 20px;
  .tool {
    height: 2rem;
    width: 2rem;
    border-radius: 2px;
    border: 1px solid #dcdfe6;
    text-align: center;
  }
}
.button-text {
  user-select: none;
  transition: background 20ms ease-in 0s;
  cursor: pointer;
  padding: 4px 10px;
  border-radius: 3px;
  flex-shrink: 0;
  font-size: 15px;
  margin-left: 2px;
  margin-right: 2px;
  font-weight: 500;
  width: auto;
  &:hover {
    background: rgba(55, 53, 47, 0.16);
  }
}
</style>