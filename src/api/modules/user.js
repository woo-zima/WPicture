import axios from '../base.js';
import  Qs from 'qs'

// 获取图形验证码
export function verificationCode(t) {
  return axios({
    url: '/captcha/captchaImage',
    method: 'get',
    params:{
      type:'math',
      time:t
    }
  });

}

// 登录
export function login(params) {
    return axios({
      url: '/login',
      method: 'post',
      transformRequest: [function (data) {
        // 对 data 进行任意转换处理
        return Qs.stringify(data)
      }],
      headers: {
        'deviceCode': 'A95ZEF1-47B5-AC90BF3'
      },
      crossDomain: true,
      data:params,
      });   
  }

  //注册
  export function register(params){
    return axios({
      url:'/register',
      method: 'post',
      transformRequest:[function(data){
        return Qs.stringify(data)
      }],
      headers:{
        'deviceCode': 'A95ZEF1-47B5-AC90BF3'
      },
      crossDomain: true,
      data:params,
    })
  }
  // 用户头像上传
  export function uploadImg(param) {
    return axios({
      url: '/system/user/editheadurl',
      method: 'post',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: param,
    });
  }
     //获取评论
  export function getcontent(id){
    return axios({
      url:'/system/table/getcontent',
      method: 'get',
      params:{
        pid:id,
      }
    })
   }
   //发表评论
   export function release(params){
    return axios({
      url:'/system/table/release',
      method: 'post',
      transformRequest:[function(data){
        return Qs.stringify(data)
      }],
      headers:{
        'deviceCode': 'A95ZEF1-47B5-AC90BF3'
      },
      crossDomain: true,
      data:params,
    })
   }
   //获取是否收藏
   export function issc(uid,pid){
    return axios({
      url:'/system/sctable/issc',
      method: 'get',
      params:{
        uid:uid,
        pid:pid,
      }
    })
   }
   //获取收藏列表
   export function scquery(uid){
    return axios({
      url:'/system/sctable/scquery',
      method: 'get',
      params:{
        uid:uid
      }
    })
   }
   //添加收藏
   export function scadd(params){
    return axios({
      url:'/system/sctable/scadd',
      method: 'post',
      transformRequest:[function(data){
        return Qs.stringify(data)
      }],
      headers:{
        'deviceCode': 'A95ZEF1-47B5-AC90BF3'
      },
      crossDomain: true,
      data:params,
    })
   }
   //取消收藏
   export function remove(params){
    return axios({
      url:'/system/sctable/remove',
      method: 'post',
      transformRequest:[function(data){
        return Qs.stringify(data)
      }],
      headers:{
        'deviceCode': 'A95ZEF1-47B5-AC90BF3'
      },
      crossDomain: true,
      data:params,
    })
   }
   //获取收藏数
   export function scnum(pid){
    return axios({
      url:'/system/photo/getNum',
      method: 'get',
      params:{
        pid:pid
      }
    })
   }
   //获取排行榜
   export function scrank(start){
    return axios({
      url:'/system/photo/getRank',
      method: 'get',
      params:{
        startIndex:start,
        pageSize:20

      }
    })
   }
  //获取最近浏览列表
  export function zjlook(uid){
    return axios({
      url:'/system/looktable/zjlook',
      method: 'get',
      params:{
        uId:uid
      }
    })
   }

   //点击图片添加点击时间
   export function zjlookadd(params){
    return axios({
      url:'/system/looktable/zjlookadd',
      method: 'post',
      transformRequest:[function(data){
        return Qs.stringify(data)
      }],
      headers:{
        'deviceCode': 'A95ZEF1-47B5-AC90BF3'
      },
      crossDomain: true,
      data:params,
    })
   }

  // export function users() {
  //   return axios({
  //     url: '/test/user/1',
  //     method: 'get',
  //   });
    
  // }
