<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程详情 开始 -->
    <section class="container">
      <section class="path-wrap txtOf hLh30">
        <span href="#" title class="c-999 fsize14">首页</span>

        <span href="#" title class="c-999 fsize14">{{course.subjectLevelOne}}</span>

        <span class="c-333 fsize14">{{course.subjectLevelTwo}}</span>
      </section>
      <div>
        <article class="c-v-pic-wrap" style="height: 357px;">
          <section class="p-h-video-box cover" id="videoPlay">
            <img height=357px :src="course.cover" :alt="course.title" class="dis c-v-pic">
          </section>
        </article>
        <aside class="c-attr-wrap">
          <section class="ml20 mr15">
            <h2 class="hLh30 txtOf mt15">
              <span class="c-fff fsize24">{{ course.title }}</span>
            </h2>
            <section class="c-attr-jg">
              <span class="c-fff">价格：</span>
              <b class="c-yellow" style="font-size:24px;">￥{{ course.price }}</b>
            </section>
            <section class="c-attr-mt c-attr-undis">
              <span class="c-fff fsize14">主讲： {{ course.teacherName }}&nbsp;&nbsp;&nbsp;</span>
            </section>
            <!-- TODO -->
            <!-- <section class="c-attr-mt of">
              <span class="ml10 vam">
                <em class="icon18 scIcon"></em>
                <a class="c-fff vam" title="收藏" href="#">收藏</a>
              </span>
            </section> -->
            <section v-if="isBuy || (Number(course.price) === 0)" class="c-attr-mt">
              <a :href="'/player/'+this.firstVideo" title="立即观看" target="_blank" class="comm-btn c-btn-3">立即观看</a>
            </section>
            <section v-else class="c-attr-mt">
              <a @click="createOrder()" href="#" title="立即购买" class="comm-btn c-btn-3">立即购买</a>
            </section>
          </section>
        </aside>
        <aside class="thr-attr-box">
          <ol class="thr-attr-ol">
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">购买数</span>
                <br>
                <h6 class="c-fff f-fM mt10">{{ course.buyCount }}</h6>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">课时数</span>
                <br>
                <h6 class="c-fff f-fM mt10">{{ course.lessonNum }}</h6>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">浏览数</span>
                <br>
                <h6 class="c-fff f-fM mt10">{{ course.viewCount }}</h6>
              </aside>
            </li>
          </ol>
        </aside>
        <div class="clear"></div>
      </div>
      <!-- /课程封面介绍 -->
      <div class="mt20 c-infor-box">
        <article class="fl col-7">
          <section class="mr30">
            <div class="i-box">
              <div>
                <section id="c-i-tabTitle" class="c-infor-tabTitle c-tab-title">
                  <a name="c-i" class="current" :title="course.title">课程详情</a>
                </section>
              </div>
              <article class="ml10 mr10 pt20">
                <div>
                  <h6 class="c-i-content c-infor-title">
                    <span>课程介绍</span>
                  </h6>
                  <div class="course-txt-body-wrap">
                    <section class="course-txt-body">
                      <p v-html="course.description">
                      </p>
                    </section>
                  </div>
                </div>
                <!-- /课程介绍结束 -->
                <div class="mt50">
                  <h6 class="c-g-content c-infor-title">
                    <span>课程大纲</span>
                  </h6>
                  <section class="mt20">
                    <div class="lh-menu-wrap">
                      <menu id="lh-menu" class="lh-menu mt10 mr10">
                        <ul>
                          <!-- 文件目录 -->
                          <li class="lh-menu-stair" v-for="(chapter,index) in chapterList" :key="index">
                            <a href="javascript: void(0)" :title="chapter.title" class="current-1">
                              <em class="lh-menu-i-1 icon18 mr10"></em>{{ chapter.title }}</a>
                            <ol class="lh-menu-ol" style="display: block;">
                              <li class="lh-menu-second ml30" v-for="(video,index) in chapter.children" :key="index">
                                <a v-if=" video.videoSourceId !== null " :title="video.title" @click="checkPurchase(video)" target="_blank">
                                  <span v-if="video.isFree === true" class="fr">
                                    <i class="free-icon vam mr10">免费试看</i>
                                  </span>
                                  <em class="lh-menu-i-2 icon16 mr5">&nbsp;
                                  </em>{{ video.title }}
                                  <span v-if="video.isFree === false" class="fr">
                                    <i class="free-icon-red vam mr10 red">付费观看</i>
                                  </span>
                                </a>
                              </li>
                            </ol>
                          </li>
                        </ul>
                      </menu>
                    </div>
                  </section>
                </div>
                <!-- /课程大纲结束 -->
              </article>
            </div>
          </section>
        </article>
        <aside class="fl col-3">
          <div class="i-box">
            <div>
              <section class="c-infor-tabTitle c-tab-title">
                <a title href="javascript:void(0)">主讲讲师</a>
              </section>
              <section class="stud-act-list">
                <ul style="height: auto;">
                  <li>
                    <div class="u-face">
                      <a href="#">
                        <img :src="course.avatar" width="50" height="50" alt>
                      </a>
                    </div>
                    <section class="hLh30 txtOf">
                      <a class="c-333 fsize16 fl" :href="'/teacher/' + this.course.teacherId">{{ course.teacherName }}</a>
                    </section>
                    <!-- <section class="hLh20 txtOf">
                      <span class="c-999">{{ course.intro }}</span>
                    </section> -->
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </aside>
        <div class="clear"></div>
      </div>

    </section>
    <!-- /课程详情 结束 -->

    <!-- 课程评论 -->
    <div class="mt50 commentHtml">
      <div>
        <h6 class="c-c-content c-infor-title" id="i-art-comment">
          <span class="commentTitle">课程评论</span>
        </h6>
        <section class="lh-bj-list pr mt20 replyhtml">
          <ul>
            <li class="unBr">
              <aside class="noter-pic">
                <img width="50" height="50" class="picImg" src="~/assets/img/avatar-boy.gif" />
              </aside>
              <div class="of">
                <section class="n-reply-wrap">
                  <fieldset>
                    <textarea name="" v-model="comment.content" placeholder="输入您要评论的文字" id="commentContent"></textarea>
                  </fieldset>
                  <p class="of mt5 tar pl10 pr10">
                    <span class="fl"><tt class="c-red commentContentmeg" style="display: none"></tt></span>
                    <input type="button" @click="addComment()" value="回复" class="lh-reply-btn" />
                  </p>
                </section>
              </div>
            </li>
          </ul>
        </section>
        <section class="">
          <section class="question-list lh-bj-list pr">
            <ul class="pr10">
              <li v-for="comment in data.items" :key="comment.id">
                <aside class="noter-pic">
                  <img width="50" height="50" class="picImg" :src="comment.avatar" />
                </aside>
                <div class="of">
                  <span class="fl">
                    <font class="fsize12 c-blue">{{ comment.nickname }}</font>
                    <font class="fsize12 c-999 ml5">评论：</font>
                  </span>
                </div>
                <div class="noter-txt mt5">
                  <p>{{ comment.content }}</p>
                </div>

                <div v-if="loginInfo.id==comment.memberId">
                  <button size="mini" icon="el-icon-delete" @click="deleteComm(comment.id)">删除</button>
                </div>

                <div class="of mt5">
                  <span class="fr">
                    <font class="fsize12 c-999ml5">{{comment.gmtCreate}}</font>
                  </span>
                </div>
              </li>
            </ul>
          </section>
        </section>
        <!-- 公共分页 开始 -->
        <div class="paging">
          <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
          <a :class="{undisable: !data.hasPrevious}" href="#" title="首页" @click.prevent="gotoPage(1)">首页</a>
          <a :class="{undisable: !data.hasPrevious}" href="#" title="前一页" @click.prevent="gotoPage(data.current-1)">&lt;</a>
          <a v-for="page in data.pages" :key="page" :class="{current: data.current == page, undisable: data.current == page}" :title="'第'+page+'页'" href="#" @click.prevent="gotoPage(page)">{{ page }}</a>
          <a :class="{undisable: !data.hasNext}" href="#" title="后一页" @click.prevent="gotoPage(data.current+1)">&gt;</a>
          <a :class="{undisable: !data.hasNext}" href="#" title="末页" @click.prevent="gotoPage(data.pages)">末页</a>
          <div class="clear" />
        </div>
        <!-- 公共分页 结束 -->
      </div>
    </div>
  </div>
</template>
  
<script>
import courseApi from '@/api/course'
import comment from '@/api/comment'
import order from '@/api/order'
import '~/assets/css/picture.css'
import cookie from 'js-cookie'

export default {
  data() {
    return {
      loginInfo: [],
      chapterList: [],
      course: {
        courseId: ''
        // subjectLevelOne:'',
        // subjectLevelTwo:'',
        // cover:'',
        // title:'',
        // price:'',
        // teacherName:''
      },
      teacher: {},
      data: {},
      page: 1,
      limit: 4,
      total: 10,
      comment: {
        content: '',
        courseId: '',
        teacherId: ''
      },
      isBuy: false,
      firstVideo: ''
    }
  },
  created() {
    this.course.courseId = this.$route.params.id
    // 获取课程详细信息
    this.getCourseInfo()
    this.initComment()
    this.displayDel()
  },
  methods: {
    // handleClick(event) {
    //   event.preventDefault(); // 阻止默认点击行为
    //   // 处理非免费视频的点击操作，可以在这里添加自定义逻辑
    // },
    //获取课程详细信息
    getCourseInfo() {
      courseApi.getCourseDetail(this.course.courseId).then((resp) => {
        this.chapterList = resp.data.data.video
        this.course = resp.data.data.courseWebVo
        this.course.courseId = resp.data.data.courseWebVo.id
        this.isBuy = resp.data.data.isBuy
        this.firstVideo = resp.data.data.firstVideo.videoSourceId
      })
     
    },
    // 显示课程是否需要购买
    checkPurchase(video){
      if (video.isFree === true) {
        const newTab = window.open('/player/'+video.videoSourceId, '_blank');
      }else if(this.isBuy === true){
        const newTab = window.open('/player/'+video.videoSourceId, '_blank');
        // this.$router.push('/player/'+video.videoSourceId)
      }else{
        event.preventDefault();  // 阻止默认点击事件
      }

      // if (this.isBuy === true) {  // 检查用户是否已购买
      // if (video.isFree === true) {  // 如果视频不免费
      //     event.preventDefault();  // 阻止默认点击事件
      //     // 这里可以添加提示用户购买的逻辑或弹出购买窗口等操作
      //   }else{
      //     this.$router.push('/player/'+video.videoSourceId)
      //   }
      // }
    },
    // 初始化评论
    initComment() {
      comment.getPageList(this.page, this.limit, this.course.courseId).then((response) => {
        this.data = response.data.data
      })
    },
    // 添加评论
    addComment() {
      this.comment.courseId = this.course.courseId
      this.comment.teacherId = this.course.teacherId
      comment.addComment(this.comment).then((response) => {
        if (response.data.success) {
          this.$message({
            message: '评论成功',
            type: 'success'
          })
          this.comment.content = ''
          this.initComment()
        }
      })
    },
    // 跳转评论分页
    gotoPage(page) {
      comment.getPageList(page, this.limit, this.course.courseId).then((response) => {
        this.data = response.data.data
      })
    },
    // 创建订单
    createOrder() {
      order.createOrder(this.course.courseId).then((response) => {
        if (response.data.success) {
          //订单创建成功，跳转到订单页面
          this.$router.push({ path: '/orders/' + response.data.data.orderId })
        }
      })
    },
    // 校验该用户是否购买课程
    displayDel() {
      var jsonStr = cookie.get('ucenter')
      if (jsonStr) {
        this.loginInfo = JSON.parse(jsonStr)
      }
    },
    // 删除评论
    deleteComm(id) {
      this.$confirm('此操作将永久删除评论, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //删除讲师信息
        comment.deleteComm(id).then((response) => {
          //提示已删除
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          //刷新页面
          this.initComment()
        })
      })
    }
  }
}
</script>

<style scoped>
.active {
  background: #bdbdbd;
}
.hide {
  display: none;
}
.show {
  display: block;
}

.no-click {
  pointer-events: none;
}
</style>
  