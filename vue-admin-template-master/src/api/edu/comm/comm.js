import request from '@/utils/request'
const api_name = '/eduservice/edu-comment'
export default{
  // 获取评论
  getAllComment(current, limit, courseId) {
    return request({
      url: api_name + `/getAllComment/${current}/${limit}` + '?courseId=' + courseId,
      method: 'get'
    })
  },
  // 删除评论
  deleteComm(id) {
    return request({
      url: api_name + `/${id}`,
      method: 'delete'
    })
  }
}
