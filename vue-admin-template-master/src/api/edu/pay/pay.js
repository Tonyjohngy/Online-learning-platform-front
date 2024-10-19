import request from '@/utils/request'

export default {
  // 根据页码、每页记录条数和查询获取账单列表
  getPayList(current, limit, orderQuery) {
    return request({
      url: `/orderservice/order/getOrder/${current}/${limit}`,
      method: 'post',
      data: orderQuery
    })
  },
  // 删除账单
  deleteOrder(id) {
    return request({
      url: `/orderservice/order/deleteOrder/${id}`,
      method: 'delete'
    })
  }
}
