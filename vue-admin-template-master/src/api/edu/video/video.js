import request from '@/utils/request'

export default{
  // 添加小节
  addVideo(eduVideo) {
    return request({
      url: `/eduservice/edu-video/addVideo`,
      method: 'post',
      data: eduVideo
    })
  },
  // 修改小节
  updateVideo(eduvideo) {
    return request({
      url: `/eduservice/edu-video/updateVideo`,
      method: 'post',
      data: eduvideo
    })
  },
  // 删除小节
  removeVideo(videoId) {
    return request({
      url: `/eduservice/edu-video/deleteVideo/${videoId}`,
      method: 'delete'
    })
  },
  // 通过id查询小节
  getVideo(videoId) {
    return request({
      url: `/eduservice/edu-video/getVideo/${videoId}`,
      method: 'get'
    })
  },
  // 删除视频
  removeVideoById(videoId) {
    return request({
      url: `/eduvod/video/removeVideoById/${videoId}`,
      method: 'delete'
    })
  }
}
