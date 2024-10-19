import request from '@/utils/request'
export default {
  // 根据页码、每页记录条数和查询获取教师列表
getTeacher(current,limit) {
    return request({
    url: `/eduservice/teacher/getTeacher/${current}/${limit}`,
    method: 'get',
 })
  },
  // 通过id获取教师详情
 getTeacherById(id) {
    return request({
    url: `/eduservice/teacher/getCourseById/${id}`,
    method: 'get',
 })
 },

}