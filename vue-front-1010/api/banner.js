import request from '@/utils/request'
export default {
  // 获取广告拦
    getAllBanner() {
        return request({
        url: `/educms/crm-banner/getAllBanner`,
        method: 'get'
        })  
    }
}