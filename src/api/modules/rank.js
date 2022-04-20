import axios from '../base.js'

function getRank(pageNum) {
    return axios({
        url:'/system/photo/getphoto',
        method:'post',
        params:{
            startIndex:pageNum,
            pageSize:20,
        },
    })   
}
function getRankByKey(keyword,pageNum){
    return axios({
        url:'/system/photo/searcherphoto',
        method:'get',
        params:{
            key:keyword,
            startIndex:pageNum,
            pageSize:20,
        },
    })  
}
export { getRank ,getRankByKey};