<template>
  <!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>购买协议</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
    }

    h1 {
      text-align: center;
    }

    p {
      margin-bottom: 15px;
    }
  </style>
</head>
<body>
  <h1>购买协议</h1>

  <p>欢迎访问我们的购买协议页面。请在购买前仔细阅读以下条款和条件：</p>

  <h2>1. 条款一</h2>
  <p>这是第一条款的详细说明。</p>

  <h2>2. 条款二</h2>
  <p>这是第二条款的详细说明。</p>

  <h2>3. 条款三</h2>
  <p>这是第三条款的详细说明。</p>

  <h2>4. 条款四</h2>
  <p>这是第四条款的详细说明。</p>

  <h2>5. 条款五</h2>
  <p>这是第五条款的详细说明。</p>

  <p>如果您不同意这些条款和条件，请不要继续进行购买。</p>

  <p>感谢您的合作和支持！</p>
  <div>
    <button @click="goBack()">返回上一页</button>
  </div>
</body>
</html>
</template>

<script>
export default {
methods: {
  goBack() {
      this.$router.go(-1);
      // this.$router.back;
    }
},
}
</script>
