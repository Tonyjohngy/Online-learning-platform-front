import request from '@/utils/request'

export default {
  // 根据课程对象添加课程
  addCourseInfo(courseInfo) {
    return request({
      url: `/eduservice/edu-course/addCourseInfo`,
      method: 'post',
      data: courseInfo
    })
  },
  // 查询所有教师
  findAllTeacher() {
    return request({
      url: `/eduservice/edu-teacher/findAll`,
      method: 'get'
    })
  },
  // 根据id查课程详情
  getCourseById(id) {
    return request({
      url: `/eduservice/edu-course/getCourseInfo/${id}`,
      method: 'get'
    })
  },
  // 新建和更新课程信息
  updateCourseInfo(courseInfoVo) {
    return request({
      url: `/eduservice/edu-course/updateCourseInfo`,
      method: 'post',
      data: courseInfoVo
    })
  },
  // 根据id获取已发布课程的信息
  getCoursePublic(courseId) {
    return request({
      url: `/eduservice/edu-course/getCoursePublic/${courseId}`,
      method: 'get'
    })
  },
  // 发布课程前台信息
  coursePublic(courseId) {
    return request({
      url: `/eduservice/edu-course/coursePublic/${courseId}`,
      method: 'post'
    })
  },
  // 根据条件搜索课程
  listCourse(page, limit, courseQuery) {
    return request({
      url: `/eduservice/edu-course/listCourse/${page}/${limit}`,
      method: 'post',
      data: courseQuery
    })
  },
  // 删除课程
  deleteCourse(courseId) {
    return request({
      url: `/eduservice/edu-course/deleteCourse/${courseId}`,
      method: 'delete'
    })
  }
}
