# 项目

## 做过最满意的项目是什么？

## 项目背景

### 为什么要做这件事情？
### 最终达到什么效果？

## 你处于什么样的角色，起到了什么方面的作用？

## 在项目中遇到什么技术问题？具体是如何解决的？

## 如果再做这个项目，你会在哪些方面进行改善？

## 描述一个你遇到过的技术问题，你是如何解决的？

## 有没有遇到过很不常见的问题？比如在网上根本搜不到解决方法的？

## 是否有设计过通用的组件？
### 请设计一个 Dialog（弹出层） / Suggestion（自动完成） / Slider（图片轮播） 等组件
### 你会提供什么接口？
### 调用过程是怎样的？可能会遇到什么细节问题？

## 自动写changelog和打tag

* commit符合规范，如regular的规范
* 使用[standard-version](https://github.com/conventional-changelog/standard-version#readme)根据log commit 编写changelog文件、更新版本并git commit、打tag
* 执行npm publish 发布包

## commit自动eslint、校验commit msg

* 先引入eslint，和相关规范，如prettier、airbnb、standard
* [husky](https://typicode.github.io/husky/#/)包将git各个阶段执行对应的命令。如commit-msg、pre-commit、pre-push。
* 校验commit: msg:commit-msg阶段执行了一段nodejs代码. 参考[vue的代码](https://github.com/vuejs/vue/blob/v2.6.14/package.json#L48)
* 自动eslint: 在pre-commit阶段 用[lint-staged](https://github.com/okonet/lint-staged#readme)对增量的指定后缀文件执行eslint命令. 参考[vue的代码](https://github.com/vuejs/vue/blob/v2.6.14/package.json#L50)

