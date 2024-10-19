import request from '@/utils/request'

export default{
  // 获取课程所有章节
  getChapterVideo(courseId) {
    return request({
      url: `/eduservice/edu-chapter/getAllVideoChapter/${courseId}`,
      method: 'get'
    })
  },
  // 更新上传章节
  updateChapterVideo(eduChapter) {
    return request({
      url: `/eduservice/edu-chapter/updateVideoChapter`,
      method: 'post',
      data: eduChapter
    })
  },
  // 添加章节
  addVideoChapter(eduChapter) {
    return request({
      url: `/eduservice/edu-chapter/addVideoChapter`,
      method: 'post',
      data: eduChapter
    })
  },
  // 删除章节
  removeChapter(chapterId) {
    return request({
      url: `/eduservice/edu-chapter/removeVideoChapter/${chapterId}`,
      method: 'post'
    })
  },
  // 获取一个章节
  getChapter(chapterId) {
    return request({
      url: `/eduservice/edu-chapter/getChapter/${chapterId}`,
      method: 'get'
    })
  }
}
