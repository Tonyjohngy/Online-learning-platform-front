import request from '@/utils/request'
// 文章URL资源路径
const api_name = '/article/art'
export default {
  // 根据页码、每页记录条数和查询获取文章列表
  getArticle(current, limit, condition, view, gmt) {
    return request({
      url: '/article/art/getArticle/' + current + '/' + limit + '?condition=' + condition + '&viewCountSort=' + view + '&gmtCreateSort=' + gmt,
      method: 'get'
    })
  },
  // 获取文章主题
  getTheme() {
    return request({
      url: `/article/article-theme/getTheme`,
      method: 'get'
    })
  },
  // 根据id获取文章
  getArticleId(id) {
    return request({
      url: `${api_name}/getArticleId/${id}`,
      method: 'get'
    })
  },
  // 根据id删除文章
  deleteArticle(id) {
    return request({
      url: `${api_name}/deleteArticle/${id}`,
      method: 'delete'
    })
  },
  // 更新文章
  updateArticle(articleVo) {
    return request({
      url: `${api_name}/updateArticle`,
      method: 'post',
      data: articleVo
    })
  },
  // 添加文章
  addArticle(articleVo) {
    return request({
      url: `${api_name}/addArticle`,
      method: 'post',
      data: articleVo
    })
  }
}
