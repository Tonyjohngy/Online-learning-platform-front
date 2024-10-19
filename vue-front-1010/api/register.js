import request from '@/utils/request'
export default {
// 发送信息验证
sendMsm(phone) {
    return request({
    url: `/edumsm/msm/send/${phone}`,
    method: 'post',
 })
 },
// 注册
 register(registerVo) {
    return request({
    url: `/ucenterservice/ucenter-member/register`,
    method: 'post',
    data: registerVo
     })
     }
}