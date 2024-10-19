import request from '@/utils/request'
// 目录编辑的URL资源路径
const api_name = '/admin/acl/permission'

export default {
  // 获取目录列表
  getNestedTreeList() {
    return request({
      url: `${api_name}`,
      method: 'get'
    })
  },
  // 根据id移除目录
  removeById(id) {
    return request({
      url: `${api_name}/remove/${id}`,
      method: 'delete'
    })
  },
  // 保存新目录
  saveLevelOne(menu) {
    return request({
      url: `${api_name}/save`,
      method: 'post',
      data: menu
    })
  },
  // 更新目录
  update(menu) {
    return request({
      url: `${api_name}/update`,
      method: 'put',
      data: menu
    })
  },
  // 根据角色id获取权限
  toAssign(roleId) {
    return request({
      url: `${api_name}/toAssign/${roleId}`,
      method: 'get'
    })
  },
  // 保存角色的权限
  doAssign(roleId, permissionId) {
    return request({
      url: `${api_name}/doAssign`,
      method: 'post',
      params: { roleId, permissionId }
    })
  }
}
