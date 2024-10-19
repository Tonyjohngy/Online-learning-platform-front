import request from '@/utils/request'
const api_name = '/ucenterservice/ucenter-front'
export default {
  // 获取用户信息
getUcMember(id) {
        return request({
        url: `${api_name}/getUcMember/${id}`,
        method: 'get',
    })
  },
  // 更新用户信息
 updateUcMember(ucenterMemberVo) {
        return request({
        url: `${api_name}/updateUcMember`,
        method: 'post',
        data: ucenterMemberVo
    })
 }
}