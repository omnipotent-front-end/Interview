# React

## Web

## Cli

### 使用react操作cli的工具ink的原理是什么？

react在传统的web开发中，通过react，和react-dom两个包来配合使用。在app开发中则是react和react-native来完成。所以自然可以操作各种终端的前端开发。

[ink](https://github.com/vadimdemedes/ink)是一款基于react的操作bash的图形化工具。我在参与一个[开源项目yoso](https://github.com/Linjovi/yoso)的时候用到过。

这里简单介绍下它的原理。
首先它内置的部分组件如Color，[Text](https://github.com/vadimdemedes/ink/blob/v2.3.0/src/components/Text.js#L6)是直接基于[chalk](https://www.npmjs.com/package/chalk)，其他逻辑则是[在render时](https://github.com/vadimdemedes/ink/blob/v2.3.0/src/renderer.js#L21)，基于[wrap-ansi](https://github.com/chalk/wrap-ansi)来转化为命令行[asni转义码](https://en.wikipedia.org/wiki/ANSI_escape_code#Colors_and_Styles)的。
