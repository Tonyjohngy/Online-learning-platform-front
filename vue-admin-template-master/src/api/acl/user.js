import request from '@/utils/request'
// 用户URL资源路径
const api_name = '/admin/acl/user'

export default {
  // 根据页码、每页记录条数和查询对象获取用户列表
  getPageList(page, limit, searchObj) {
    return request({
      url: `${api_name}/${page}/${limit}`,
      method: 'get',
      params: searchObj // url查询字符串或表单键值对
    })
  },
  // 根据查询用户
  getById(id) {
    return request({
      url: `${api_name}/get/${id}`,
      method: 'get'
    })
  },
  // 保存用户管理
  save(user) {
    return request({
      url: `${api_name}/save`,
      method: 'post',
      data: user
    })
  },
  // 根据id更新用户信息
  updateById(user) {
    return request({
      url: `${api_name}/update`,
      method: 'put',
      data: user
    })
  },
  // 根据id获取用户权限
  getAssign(userId) {
    return request({
      url: `${api_name}/toAssign/${userId}`,
      method: 'get'
    })
  },
  // 保存用户角色权限
  saveAssign(userId, roleId) {
    return request({
      url: `${api_name}/doAssign`,
      method: 'post',
      params: { userId, roleId }
    })
  },
  // 根据id移除用户
  removeById(id) {
    return request({
      url: `${api_name}/remove/${id}`,
      method: 'delete'
    })
  },
  // 根据id列表批量移除用户
  removeRows(idList) {
    return request({
      url: `${api_name}/batchRemove`,
      method: 'delete',
      data: idList
    })
  }
}
