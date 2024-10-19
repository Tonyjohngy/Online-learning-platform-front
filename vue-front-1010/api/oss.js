import request from '@/utils/request'
export default {
  // 上传oss文件
    getOss(file) {
        return request({
        url: `/eduoss/fileoss/updatefile`,
        method: 'post',
        data: file
        })  
    }  
}