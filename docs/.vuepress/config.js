module.exports = {
  title: "无所不能的前端--面试篇",
  description: "Hello world",
  themeConfig: {
    sidebarDepth: 2,
    sidebar: {
      "": [
        {
          title: "编程语言",
          children: ["/language/html", "/language/node"]
        },
        {
          title: "库",
          children: [
            "/library/babel.md",
            "/library/react.md",
            "/library/vue.md"
          ]
        },
        {
          title: "Web工程",
          children: [
            "/web/safe.md"
          ]
        }
      ]
    }
  }
};
