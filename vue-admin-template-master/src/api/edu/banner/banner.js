import request from '@/utils/request'
const api_name = '/educms/banneradmin/'
export default{
  // 获取广播栏图片
  getBannerPage(current, limit) {
    return request({
      url: api_name + `getBannerPage/${current}/${limit}`,
      method: 'get'
    })
  },
  // 更新广播栏图片
  updateBanner(banner) {
    return request({
      url: api_name + `updateBanner`,
      method: 'post',
      data: banner
    })
  },
  // 添加广播栏图片
  addBanner(banner) {
    return request({
      url: api_name + `addBanner`,
      method: 'post',
      data: banner
    })
  },
  // 删除广播栏图片
  removeChapter(id) {
    return request({
      url: api_name + `removeBanner/${id}`,
      method: 'delete'
    })
  },
  // 通过ID查询图片
  getBanner(id) {
    return request({
      url: api_name + `getBanner/${id}`,
      method: 'get'
    })
  }
}
