<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程列表 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">搜索结果</span>
        </h2>
      </header>
      <section class="c-sort-box">
        <div class="js-wrap">
          <section class="fl">
            <ol class="js-tap clearfix">
              <a title="返回" href="/course">返回</a>
            </ol>
          </section>
        </div>
        <div class="mt40">
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="searchObj.total==''">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">没有查询到相关数据，小编正在努力整理中...</span>
          </section>
          <!-- /无数据提示 结束-->
          <article class="comm-course-list" v-if="searchObj.total!=''">
            <ul class="of" id="bna">
              <li v-for="(item,index) in data" :key="index">
                <div class="cc-l-wrap">
                  <section class="course-img">
                    <img :src="item.cover" class="img-responsive picture" :alt="item.title">
                    <div class="cc-mask">
                      <a :href="'/course/' + item.id" title="开始学习" class="comm-btn c-btn-1">开始学习</a>
                    </div>
                  </section>
                  <h3 class="hLh30 txtOf mt10">
                    <a :href="'/course/' + item.id" v-html="item.title" class="course-title fsize18 c-333"></a>
                  </h3>
                  <section class="mt10 hLh20 of">
                    <span class="fr jgTag bg-green">
                      <i class="c-fff fsize12 f-fA">{{item.price>0 ?item.price:"免费"}}</i>
                    </span>
                    <span class="fl jgAttr c-ccc f-fA">
                      <i class="c-999 f-fA">{{ item.viewCount }}</i>
                      |
                      <i class="c-999 f-fA">{{ item.buyCount }}</i>
                    </span>
                  </section>
                </div>
              </li>
            </ul>
            <div class="clear"></div>
          </article>
        </div>
        <!-- 公共分页 开始 -->
        <div>
            <div class="paging">
        <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
        <a :class="{undisable: !searchObj.hasPreviousPage}" href="#" title="首页" @click.prevent="gotoPage(1)">首页</a>
        <a :class="{undisable: !searchObj.hasPreviousPage}" href="#" title="前一页" @click.prevent="gotoPage(page-1)">&lt;</a>
              {{ this.page }}
              <a :class="{undisable: !searchObj.hasNextPage}" href="#" title="后一页" @click.prevent="gotoPage(page+1)">&gt;</a>
              <a :class="{undisable: !searchObj.hasNextPage}" href="#" title="末页" @click.prevent="gotoPage(searchObj.pages)">末页</a>
            <div class="clear" />
            </div>
          </div>
          <!-- <div>
          <div class="paging">
           undisable这个class是否存在，取决于数据属性hasPrevious -->
            <!-- <a :class="{undisable: !data.hasPrevious}" href="#" title="首页" @click.prevent="gotoPage(1)">首页</a>
            <a :class="{undisable: !data.hasPrevious}" href="#" title="前一页" @click.prevent="gotoPage(data.current-1)">&lt;</a>
            <a v-for="page in data.pages" :key="page" :class="{current: data.current == page, undisable: data.current == page}" :title="'第'+page+'页'" href="#" @click.prevent="gotoPage(page)">{{ page }}</a>
            <a :class="{undisable: !data.hasNext}" href="#" title="后一页" @click.prevent="gotoPage(data.current+1)">&gt;</a>
            <a :class="{undisable: !data.hasNext}" href="#" title="末页" @click.prevent="gotoPage(data.pages)">末页</a>
            <div class="clear" />
          </div> -->
        <!-- </div> -->
        <!-- 公共分页 结束 -->
      </section>
    </section>
    <!-- /课程列表 结束 -->
  </div>
</template>
  <script>
import '~/assets/css/picture.css'
import searchApi from '@/api/search'

export default {
  data() {
    return {
      page: 1,
      size: 8,
      keyword: '',
      searchObj: {},
      data:[]
    }
  },
  created() {
    this.keyword = this.$route.query.keyword
    this.search()
  },
  methods: {
    // 分页处理
    gotoPage(current) {
      if (current <= 0) {
        current = 1
      }
      if (current > this.searchObj.pages) {
        current = this.searchObj.pages
      }
      this.page = current
      this.keyword = this.$route.query.keyword
      this.search()
    },
    // 搜索
    search() {
      searchApi.search(this.keyword, this.page, this.size).then((response) => {
        this.searchObj = response.data.data.search
        this.data = response.data.data.search.list
        // JSON.parse() JSON.stringify
        console.log(this.data)
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
</style>