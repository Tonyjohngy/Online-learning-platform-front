import request from '@/utils/request'
const api_name = '/eduvod/video'
export default {
  // 获取视频播放信息
getPlayAuth(vid) {
    return request({
    url: `${api_name}/getPlayAuth/${vid}`,
    method: 'get'
 })
 },

}