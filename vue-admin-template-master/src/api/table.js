import request from '@/utils/request'

// 获取列表
export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}
