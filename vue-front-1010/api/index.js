import request from '@/utils/request'
export default {
  // 获取首页信息
 getList() {
        return request({
        url: `/eduservice/index`,
        method: 'get'
        })  
    }
}