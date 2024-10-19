import request from '@/utils/request'

export default{
  // 1、课程分类
  getSubjectList() {
    return request({
      // url: '/table/list/' + current + "/" + limit,
      // 用飘的符号
      url: `/eduservice/edu-subject/getAllSubject`,
      method: 'get'
      // 由于用到requestbody注解把对象转换json进行传递到接口中
    })
  }
}
