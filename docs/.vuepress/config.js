module.exports = {
  title: "无所不能的前端--面试篇",
  description: "Hello world",
  themeConfig: {
    sidebarDepth: 2,
    sidebar: {
      "": [
        {
          title: "编程语言",
          children: [
              "/language/html",
              "/language/node"
            ]
        },
        {
            title: "库",
            children: [
              "/library/react.md",
              "/library/vue.md"
            ]
          }
      ]
    }
  }
};
