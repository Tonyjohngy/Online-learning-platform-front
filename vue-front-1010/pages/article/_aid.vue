<template>
<!-- 在 body 中添加一个 id 为 app 的 div -->
<div id="app">
  <el-card shadow="hover" style="margin: 20px;">
    <div slot="header" class="clearfix">
      <span :v-model="this.data.title" style="line-height: 36px;">{{ this.data.title }}</span>
      <!-- <el-button style="float: right; margin-top: -4px;" type="text">编辑</el-button> -->
    </div>
    <span :v-model="this.data.name" style="float: right; color: #999;">作者：{{ this.data.name }}</span>
    <div :v-model="this.data.content" v-html="this.data.content" class="text item" style="padding: 20px 0;">
    </div>
    <el-divider></el-divider>
    <div class="actions clearfix">
  <!-- TODO -->
      <!-- <el-tooltip effect="dark" content="赞" placement="top">
        <el-button size="small" icon="el-icon-thumb-up"></el-button>
      </el-tooltip>
      <el-tooltip effect="dark" content="踩" placement="top">
        <el-button size="small" icon="el-icon-thumb-down"></el-button>
      </el-tooltip>
      <el-tooltip effect="dark" content="分享" placement="top">
        <el-button size="small" icon="el-icon-share"></el-button>
      </el-tooltip> -->
      <span :v-model="this.data.gmtCreate" style="float: right; color: #999;">发布时间：{{ this.data.gmtCreate }}</span>
    </div>
  </el-card>
</div>
</template>

<script>
import articleApi from '@/api/article'
export default {
  data(){//定义变量和初始值
      return{
         data:[],
         artId:''
      }
  },
  created(){//页面渲染之前，必须调用methods定义的方法
    this.artId = this.$route.params.aid
    console.log(this.artId)
    this.getArticle()
  },
  methods: {//创建具体的方法，调用teacher.js定义的方法
      getArticle(){
        articleApi.getArticleId(this.artId).then(response => {
          this.data = response.data.data.article
        })
      } 
    }
  
}
</script>