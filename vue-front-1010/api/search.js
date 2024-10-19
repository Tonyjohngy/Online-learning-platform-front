import request from '@/utils/request'
const api_name = '/es/search'
export default {
  // 根据页码、每页记录条数和查询获取搜索列表
    search(keyword,page,size) {
        return request({
        url: `${api_name}/parse/${keyword}/${page}/${size}`,
        method: 'get'
        })  
    },
}