module.exports = {
  title: "无所不能的前端--十万个为什么",
  description: "Hello world",
  themeConfig: {
    sidebarDepth: 2,
    sidebar: {
      "": [
        {
          title: "计算机基础",
          children: ["/cp/network", "/cp/soft"]
        },
        {
          title: "编程语言",
          children: [
            "/language/css",
            "/language/html",
            "/language/javascript",
            "/language/node"
          ]
        },
        {
          title: "库",
          children: [
            "/library/babel.md",
            "/library/nest.md",
            "/library/nginx.md",
            "/library/pm2.md",
            "/library/react.md",
            "/library/vue.md",
            "/library/webpack.md"
          ]
        },
        {
          title: "Web工程",
          children: ["/web/fed.md", "/web/safe.md"]
        }
      ]
    }
  }
};
