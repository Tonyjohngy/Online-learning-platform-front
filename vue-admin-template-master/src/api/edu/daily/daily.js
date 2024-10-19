import request from '@/utils/request'

export default {
  // 获取指定日期的统计表
  createStatistic(day) {
    return request({
      url: `/staservice/statistics-daily/createStatistic/${day}`,
      method: 'post'
    })
  },
  // 根据条件生成统计表格
  getStatistic(searchObj) {
    return request({
      url: `/staservice/statistics-daily/getStatistic/${searchObj.begin}/${searchObj.end}/${searchObj.type}`,
      method: 'get'
    })
  }
}
