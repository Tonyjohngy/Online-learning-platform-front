import request from '@/utils/request'
export default {
  // 根据页码、每页记录条数和查询获取课程列表
getCourse(current,limit,searchObj) {
    return request({
    url: `/eduservice/course/getCourseByCon/${current}/${limit}`,
    method: 'post',
    data: searchObj
 })
  },
  // 获取课程分类
getSubjectList() {
   return request({
     url: `/eduservice/edu-subject/getAllSubject`,
     method: 'get',
   })
  },
// 获取课程详情
getCourseDetail(courseId) {
   return request({
     url: `/eduservice/course/getInfoWebById/${courseId}`,
     method: 'get',
   })
}
}