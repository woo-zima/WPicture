<template>
    <div class="LeftColumn">
    <el-menu
      :collapse="isCollapse"
      :default-active="computerActiveNav"
      class="el-menu-vertical-demo"
      router
    >
      <el-menu-item
        v-for="item of navLsit"
        :key="item.name"
        :index="item.routePath"
      >
        <i :class="[item.icon]" />
        <span slot="title">{{ item.name }}</span>
      </el-menu-item>
    </el-menu>
   </div>
</template>

<script>
export default {
    name: 'LeftColumn',
    components: { 

    },
    data() {
        return {
            isCollapse: true,
        };
    },
    mounted() {
        
    },
    methods: {
    },
    computed: {
      computerActiveNav() {
      let result = '0';
      const index = this.navLsit.indexOf(
        (item) => item.routePath === this.$route.path,
      );
      if (index !== -1) {
        result = `${index}`;
      }
      return result;
    },
    navLsit() {
      return [
        {
          name: '首页',
          icon: 'el-icon-s-home',
          routePath: '/',
        },
        {
          name: '排行',
          icon: 'el-icon-s-data',
          routePath: '/rank',
        },
        {
          name: '最近浏览',
          icon: 'el-icon-view',
          routePath: '/browsing',
        },
        // {
        //   name: this.$t('Links'),
        //   icon: 'el-icon-link',
        //   routePath: '/remark',
        // },
      ];
     }
    }
};
</script>

<style>
.LeftColumn {
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
}
.el-menu-item.is-active {
    color: #EB5757 !important;
}
</style>