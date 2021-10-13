module.exports = {
  title: "无所不能的前端--十万个为什么",
  description: "Hello world",
  themeConfig: {
    repo: "omnipotent-front-end/Interview",
    nav: [{ text: "awesome-url", link: "https://brizer.github.io/urls/zh/" },{ text: "设计模式", link: "https://omnipotent-front-end.github.io/-Design-Patterns-Typescript/#/" }],
    sidebarDepth: 2,
    sidebar: {
      "": [
        {
          title: "计算机基础",
          children: [
            "/cp/algorithm",
            "/cp/browser",
            "/cp/compiler",
            "/cp/network",
            "/cp/os",
            "/cp/soft"
          ]
        },
        {
          title: "编程语言",
          children: [
            "/language/css",
            "/language/dart",
            "/language/html",
            "/language/javascript",
            "/language/node",
            "/language/shell"
          ]
        },
        {
          title: "库",
          children: [
            "/library/axios.md",
            "/library/babel.md",
            "/library/docker.md",
            "/library/egg.md",
            "/library/express.md",
            "/library/koa.md",
            "/library/nest.md",
            "/library/nginx.md",
            "/library/pm2.md",
            "/library/react.md",
            "/library/redux.md",
            "/library/rollup.md",
            "/library/taro.md",
            "/library/typescript.md",
            "/library/vue.md",
            "/library/webpack.md"
          ]
        },
        {
          title: "Web工程",
          children: [
            "/web/backend.md",
            "/web/database.md",
            "/web/deploy.md",
            "/web/fed.md",
            "/web/safe.md"
          ]
        },
        {
          title: "实践",
          children: [
            "/practice/project.md",
            "/practice/git.md",
            "/practice/iq.md",
            "/practice/person.md"
          ]
        },
        {
          title: '企业',
          children: [
            '/company/bank.md',
            '/company/it.md',
            '/company/party.md'
          ]
        }
      ]
    }
  }
};
