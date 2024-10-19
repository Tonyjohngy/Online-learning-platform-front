import request from '@/utils/request'
export default {
  // 根据页码、每页记录条数和查询获取评论列表
    getPageList(current,limit,courseId) {
        return request({
        url: `/eduservice/edu-comment/getAllComment/${current}/${limit}/`+'?courseId='+courseId,
        method: 'get'
        })  
  },
  // 添加评论
    addComment(comment) {
        return request({
        url: `/eduservice/edu-comment/addComment`,
        method: 'post',
        data: comment
        })  
  },
    // 删除评论
    deleteComm(id){
        return request({
            url: `/eduservice/edu-comment/${id}`,
            method: 'delete',
            })  
    }
}