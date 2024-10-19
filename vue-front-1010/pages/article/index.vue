<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程列表 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">全部文章</span>
        </h2>
      </header>
      <section class="c-sort-box">
        <section class="c-s-dl">
          <dl>
            <dt>
              <span class="c-999 fsize14">文章类别</span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li>
                  <a title="全部" href="#" @click="searchOne('')">全部</a>
                </li>
                <li v-for="(item ,index) in themeList" :key="index" :class="{active:oneIndex==index}">
                  <a :title="item.title" href="#" @click="searchOne(item.id,index)">{{ item.title }}</a>
                </li>
              </ul>
            </dd>
          </dl>
          <div class="clear"></div>
        </section>
        <div class="js-wrap">
          <section class="fl">
            <ol class="js-tap clearfix">
              <li :class="{'current bg-orange':searchColor!=''}">
                <a title="默认" href="javascript:void(0);" @click="search()">默认
                  <span :class="{hide:searchColor==''}">↓</span>
                </a>
              </li>
              <li :class="{'current bg-orange':viewCountSort!=''}">
                <a title="销量" href="javascript:void(0);" @click="searchviewCount()">浏览数
                  <span :class="{hide:viewCountSort==''}">↓</span>
                </a>
              </li>
              <li :class="{'current bg-orange':gmtCreateSort!=''}">
                <a title="最新" href="javascript:void(0);" @click="searchGmtCreate()">最新
                  <span :class="{hide:gmtCreateSort==''}">↓</span>
                </a>
              </li>
            </ol>
          </section>
        </div>
        <div class="mt40">
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="data.total==0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
          </section>
          <!-- /无数据提示 结束-->
          <article class="comm-course-list" v-if="data.total>0">
            <div class="article-list">
              <el-card :body-style="{ padding: '20px' }" class="article-card" v-for="(item,index) in data.items" :key="index">
                <a style="font-size: 150%;" :href="'/article/' + item.id" :title="item.title">{{ item.title }}</a>
                <div style="text-align: right">浏览数：{{ item.viewCount }}</div>
                <div style="text-align: right">{{ item.gmtCreate }}</div>
              </el-card>
            </div>
            <div class="clear"></div>
          </article>
        </div>
        <!-- 公共分页 开始 -->
        <div>
          <div class="paging">
            <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
            <a :class="{undisable: !data.hasPrevious}" href="#" title="首页" @click.prevent="gotoPage(1)">首页</a>
            <a :class="{undisable: !data.hasPrevious}" href="#" title="前一页" @click.prevent="gotoPage(data.current-1)">&lt;</a>
            <a v-for="page in data.pages" :key="page" :class="{current: data.current == page, undisable: data.current == page}" :title="'第'+page+'页'" href="#" @click.prevent="gotoPage(page)">{{ page }}</a>
            <a :class="{undisable: !data.hasNext}" href="#" title="后一页" @click.prevent="gotoPage(data.current+1)">&gt;</a>
            <a :class="{undisable: !data.hasNext}" href="#" title="末页" @click.prevent="gotoPage(data.pages)">末页</a>
            <div class="clear" />
          </div>
        </div>
        <!-- 公共分页 结束 -->
      </section>
    </section>
    <!-- /课程列表 结束 -->
  </div>
</template>

  
<script>
import articleApi from '@/api/article'
import '~/assets/css/picture.css'

export default {
  data() {
    return {
      page: 1,
      data: {},
      searchObj: '', // 查询表单对象
      themeList: [], //主题列表
      gmtCreateSort: '',
      viewCountSort: '',
      searchColor: '',
      oneIndex: -1 //样式选择颜色变化
    }
  },
  // 初始化文章和主题数据
  created() {
    this.initArticle()
    this.getTheme()
  },
  methods: {
    // 获取文章主题
    getTheme() {
      articleApi.getTheme().then((response) => {
        this.themeList = response.data.data.list
      })
    },
    // 获取文章
    getArticle(page, size, searchObj, view, gmt) {
      articleApi.getArticle(page, size, searchObj, view, gmt).then((response) => {
        this.data = response.data.data
      })
    },
    // 获取主题子分类
    searchOne(themeId, index) {
      this.oneIndex = index
      this.searchObj = themeId
      this.gotoPage(this.page)
    },
    initArticle() {
      this.gotoPage(1)
    },
    // 跳转页面
    gotoPage(current) {
      if (current > this.data.pages) {
        current = this.data.pages
      }
      if (current < 1) {
        current = 1
      }
      this.getArticle(current, 8, this.searchObj, this.viewCountSort, this.gmtCreateSort)
    },
    // 根据创建时间排序
    searchGmtCreate() {
      this.gmtCreateSort = '1'
      this.viewCountSort = ''
      this.searchColor = ''
      this.gotoPage(this.page)
    },
    // 根据浏览数排序
    searchviewCount() {
      this.gmtCreateSort = ''
      this.viewCountSort = '1'
      this.searchColor = ''
      this.gotoPage(this.page)
    },
    // 搜索筛选文章
    search() {
      this.gmtCreateSort = ''
      this.viewCountSort = ''
      this.searchColor = '1'
      this.gotoPage(this.page)
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
</style>


		