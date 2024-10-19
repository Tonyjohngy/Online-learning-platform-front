import request from '@/utils/request'

export default{
  // 1、讲师列表（分页查询）
  // 当前页current,每页记录条数limit,查询条件teacherQuery
  getTeacherListPage(page, limit, teacherQuery) {
    return request({
      // url: '/table/list/' + current + "/" + limit,
      // 用飘的符号
      url: `/eduservice/edu-teacher/pageTeacherCondition/${page}/${limit}`,
      method: 'post',
      // 由于用到requestbody注解把对象转换json进行传递到接口中
      data: teacherQuery
    })
  },

  // 2、根据Id删除讲师列表
  removeById(id) {
    return request({
      url: `/eduservice/edu-teacher/${id}`,
      method: 'delete'
    })
  },
  // 3、添加讲师

  addTeacher(teacher) {
    return request({
      url: `/eduservice/edu-teacher/addTeacher`,
      method: 'post',
      data: teacher
    })
  },
  // 根据id查询讲师
  getTeacherInfo(id) {
    return request({
      url: `/eduservice/edu-teacher/getTeacher/${id}`,
      method: 'get'
    })
  },
  // 根据全部讲师
  findAllTeacher() {
    return request({
      url: `/eduservice/edu-teacher/findAll`,
      method: 'get'
    })
  },
  // 讲师修改功能
  updateTeacher(teacher) {
    return request({
      url: `/eduservice/edu-teacher/updateTeacher`,
      method: 'put',
      data: teacher
    })
  }
}
