import request from '@/utils/request'
const api_name = '/article'
export default {
    // 根据页码、每页记录条数和查询获取文章列表 
    getArticle(current,limit,condition,view,gmt) {
        return request({
        url: '/article/art/getArticle/'+current+'/'+limit+'?condition='+condition+'&viewCountSort='+view+'&gmtCreateSort='+gmt,
        method: 'get'
        })  
  },
    // 获取文章主题
    getTheme(){
        return request({
        url: `${api_name}/article-theme/getTheme`,
        method: 'get'
        })  
  },
  // 根据id获取文章
    getArticleId(id){
        return request({
            url: `${api_name}/art/getArticleId/${id}`,
            method: 'get'
            })  
    }
}