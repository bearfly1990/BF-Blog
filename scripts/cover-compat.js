// Hexo 根目录/scripts/cover-compat.js
// 适配 Hexo 7.3.0：header-img → cover 映射（增加空值判断，避免报错）
hexo.extend.filter.register(
  "after_post_render",
  function (post) {
    // 1. 空值保护：确保 post 存在
    if (!post) return post;

    // 2. 兼容 header-img / header_img 写法
    let headerImg = post["header-img"] || post.header_img;
    if (headerImg && !post.cover) {
      // 3. 强制转为根路径（补全 /）
      if (!headerImg.startsWith("/")) {
        headerImg = "/" + headerImg;
      }
      // 4. 优先赋值 post.cover（Hexo 7.x 核心字段），避免 post.data 不存在
      post.cover = headerImg;
      // 5. 兼容 post.data（仅当 data 存在时赋值）
      if (post.data) {
        post.data.cover = headerImg;
      }
      console.log(
        `[Cover兼容] 文章《${
          post.title || "未知"
        }》映射 header-img → cover: ${headerImg}`
      );
    }
    return post;
  },
  0
); // 最高优先级

// 处理独立页面（增加空值判断）
hexo.extend.filter.register(
  "after_generate",
  function () {
    // 空值保护：确保 locals 存在
    if (!this.locals) return;

    const pages = this.locals.get("pages") || [];
    pages.forEach((page) => {
      if (!page) return;

      let headerImg = page["header-img"] || page.header_img;
      if (headerImg && !page.cover) {
        if (!headerImg.startsWith("/")) {
          headerImg = "/" + headerImg;
        }
        page.cover = headerImg;
        if (page.data) {
          page.data.cover = headerImg;
        }
      }
    });
  },
  0
);
