# NestJS

## 原理

### Controller、Get、Post等装饰器封装的class，是如何和底层express建立映射关系了。

比如我们写了一个控制器:
``` js
@Controller('/test')
class SomeClass {
  @Get('/a')
  someGetMethod() {
    return 'hello world';
  }

  @Post('/b')
  somePostMethod() {}
}
```

它究竟是如何让底层的express或者koa建立正确的路由信息呢？

这里需要介绍下[Reflect Metadata API](https://rbuckton.github.io/reflect-metadata/),这是ES7的提案，可通过[reflect-metadata](https://github.com/rbuckton/reflect-metadata)来进行polyfill。

值得一提的是，Angular/midway等IOC框架，均是基于此实现的。

进入正题，我们将其定义：

``` ts
const METHOD_METADATA = 'method';
const PATH_METADATA = 'path';

const Controller = (path: string): ClassDecorator => {
  return target => {
    Reflect.defineMetadata(PATH_METADATA, path, target);
  }
}

const createMappingDecorator = (method: string) => (path: string): MethodDecorator => {
  return (target, key, descriptor) => {
    Reflect.defineMetadata(PATH_METADATA, path, descriptor.value);
    Reflect.defineMetadata(METHOD_METADATA, method, descriptor.value);
  }
}

const Get = createMappingDecorator('GET');
const Post = createMappingDecorator('POST');
```

再增加一个函数来进行route的映射：

``` ts
function mapRoute(instance: Object) {
  const prototype = Object.getPrototypeOf(instance);

  // 筛选出类的 methodName
  const methodsNames = Object.getOwnPropertyNames(prototype)
                              .filter(item => !isConstructor(item) && isFunction(prototype[item]));
  return methodsNames.map(methodName => {
    const fn = prototype[methodName];

    // 取出定义的 metadata
    const route = Reflect.getMetadata(PATH_METADATA, fn);
    const method = Reflect.getMetadata(METHOD_METADATA, fn);
    return {
      route,
      method,
      fn,
      methodName
    }
  })
};
```

就可以拿到通过controller拿到route信息了：

``` ts
Reflect.getMetadata(PATH_METADATA, SomeClass); // '/test'

mapRoute(new SomeClass());

/**
 * [{
 *    route: '/a',
 *    method: 'GET',
 *    fn: someGetMethod() { ... },
 *    methodName: 'someGetMethod'
 *  },{
 *    route: '/b',
 *    method: 'POST',
 *    fn: somePostMethod() { ... },
 *    methodName: 'somePostMethod'
 * }]
 *
 */
```

[完整demo](https://github.com/FunnyLiu/typescriptDemo/blob/master/controller2route/index.ts)