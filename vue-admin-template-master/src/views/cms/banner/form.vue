<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="标题">
        <el-input v-model="banner.title" />
      </el-form-item>

      <el-form-item label="链接地址">
        <el-input v-model="banner.linkUrl" />
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="banner.sort" />
      </el-form-item>
      <!-- 图片 -->
      <el-form-item :square="true" label="图片">
        <!-- 头衔缩略图 -->
        <pan-thumb :image="banner.imageUrl" />
        <!-- 文件上传按钮 -->
        <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换图片
        </el-button>
        <!--
          v-show：是否显示上传组件
          :key：类似于id，如果一个页面多个图片上传控件，可以做区分
          :url：后台上传的url地址
          @close：关闭上传组件
          @crop-upload-success：上传成功后的回调 -->
        <image-cropper
          v-show="imagecropperShow"
          :width="300"
          :height="300"
          :key="imagecropperKey"
          :url="BASE_API+'/eduoss/fileoss/updatefile'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess" />
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import bannerApi from '@/api/edu/banner/banner'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'

export default {
  components: { ImageCropper, PanThumb },
  data() {
    return {
      banner: {},
      imagecropperKey: 0, // 上传组件的值
      imagecropperShow: false, // 禁用显示组件
      BASE_API: process.env.BASE_API, // 接口API地址
      saveBtnDisabled: false // 禁用保存按钮，防止多次提交
    }
  },
  watch: {
    // 监听
    $route(to, from) {
      // 路由的方式变化，方法就会执行
      this.init()
    }
  },
  created() {
    this.init()
  },
  methods: {
    close() { // 关闭弹窗
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
    },
    cropSuccess(data) { // 上传成功
      this.imagecropperShow = false
      this.banner.imageUrl = data.url
      this.imagecropperKey = this.imagecropperKey + 1
    },
    init() {
      if (this.$route.params && this.$route.params.id) {
        // 从路径中获取ID
        const id = this.$route.params.id
        // 调用id查询的方法
        this.getInfo(id)
      } else {
        this.banner = {}
      }
    },
    saveOrUpdate() {
      if (!this.banner.id) {
        this.saveBanner()
      } else {
        this.updateBanner()
      }
    },
    saveBanner() {
      bannerApi
        .addBanner(this.banner)
        .then((response) => {
          // 提示已添加
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          // 路由跳转页面
          this.$router.push({ path: '/cms/banner/list' })
        })
        .catch((error) => {
          console.error('保存失败', error) // 打印错误信息到控制台
          this.$message({
            type: 'error',
            message: '保存失败，请稍后再试'
          })
        })
    },

    getInfo(id) {
      bannerApi.getBanner(id).then((response) => {
        this.banner = response.data.banner
      })
    },

    updateBanner() {
      bannerApi
        .updateBanner(this.banner)
        .then((response) => {
          // 提示已添加
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          // 路由跳转页面
          this.$router.push({ path: '/cms/banner/list' })
        })
        .catch((error) => {
          console.error('保存失败', error) // 打印错误信息到控制台
          this.$message({
            type: 'error',
            message: '保存失败，请稍后再试'
          })
        })
    }
  }
}
</script>
