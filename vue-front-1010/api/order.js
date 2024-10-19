import request from '@/utils/request'
export default {
  // 新建账单
    createOrder(orderNo) {
        return request({
        url: `/orderservice/order/createOrder/${orderNo}`,
        method: 'post'
        })  
  },
  // 获取账单编号
    getOrder(orderNo) {
        return request({
        url: `/orderservice/order/getOrder/${orderNo}`,
        method: 'post'
        })  
  },
    // 新建本地账单
    createNative(orderNo) {
        return request({
        url: `/orderservice/pay-log/createNative/${orderNo}`,
        method: 'get'
        })  
  },
    // 获取账单状态
    getPayStatus(orderNo) {
        return request({
        url: `/orderservice/pay-log/getPayStatus/${orderNo}`,
        method: 'get'
        })  
    }
    
}