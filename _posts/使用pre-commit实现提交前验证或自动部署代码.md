---
path: /post/pre-commit-hook
title: 使用pre-commit实现提交前验证或自动部署代码
date: 2018-03-29 10:20:55
category:
- tools
tags:
- 自动化
- 前端工具
---

作为一个程序员，想必每个都有自己的编码风格。有风格虽好，但这问题令很多项目管理者头疼，不一样的代码风格及缩进，必会降低代码可读性，从而间接降低效率。但是这个问题都难不到我们伟大的程序员，很多如eslint，prettier等库的出现帮我们去解决问题。很多cli在生成初始项目时都会给我们加上eslint、csslint等，这不就能解决我们的问题了吗？too young too simple，每保存一次就弹出一个错误，还是一大堆英文，估计大部分人心里就默默一句what the fuck is that了，从而就导致我们嘴上虽很强硬的说着要规范我们的代码风格，身体却很诚实地默默把各种lint的配置关掉🤷🏼‍♂️。
所以在这篇文章里，会给大家提供一些好用的方法，使各位重拾定规范时候的激情。

# something useful
1. 使用`eslint --fix`格式化文件
**eslint**虽好，但是对规范还没适应的同学却是一个难题，每写一遍都弹个黑白屏出来，特别英文不好的，估计半天都不知道哪里出问题，这样子下来估计半天没写几行代码。这时候其实我们可以贴心地把配置项注释掉，只有提交前跑一下`eslint --fix`这个命令就好了，大部分代码都会根据规范格式化掉。

<!-- more -->

2. 使用各种编辑器、IDE插件
上方方法虽好，但是我们还是要从源头上解决问题，培养每个人的代码风格以及习惯，这时候插件就能帮住我们在写代码的时候及时发现，也不用看到一大片错误了。

3. 使用**prettier**格式化代码
Prettier可以帮助我们做一些代码格式化的工作，如代码缩进，双引号变单引号等一些代码格式化工作，但是有些配置项与eslint是重复的，下面会介绍到如何解决。具体配置项可以查看[官网文档](https://prettier.io/docs/en/install.html)。

虽然有很多方法提醒我们注意代码质量，但是有时候这并不能阻止我们把有linting error的代码提交到仓库上。有时候没有什么大问题，但是如果是使用YUI压缩或者其他代码检查工具导致发布失败，我们将会需要用大量地时间去找到n个人提交的代码中的1个不显眼的语法错误。

# Pre-commit hook
所以，什么是**pre-commit hook**？其实Git给我门提供了很多钩子，比如pre-commit这个，就是提交前，还有提交后，其他钩子可自行查[Git - Git 钩子](https://git-scm.com/book/zh/v2/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-Git-%E9%92%A9%E5%AD%90)。(SVN暂时无能为力，不过Google中有提供解决方案，但是看过一下实现起来颇麻烦的，大家有兴趣可以自行查找一下)

## husky + lint-stage
假设你的项目中已经有了eslint和使用vue，然后我们需要安装两个package

```shell
npm install husky lint-stage --save-dev

// or use yarn
yarn add husky lint-stage -D
```

1. 然后在`package.json`文件中添加如下配置

```javascript
// package.json
{
// ...
  "script": {
    "lint": "eslint --ext .js,.vue",
    "precommit": "lint-staged"
  },
  "lint-staged": {
    "*.{js|vue}": [
      "npm run lint"
    ]
  }
}
```

2. 然后随便找个文件删掉两个缩进空格，然后跑下提交命令`git commit -am 'test precommit'`，此时应该可以看到下图的运行及报错。
⚠️ 这里的错误大家可以看到是preiiter抛出的，是因为我的配置文件已经集成了prettier，如何集成下方有介绍。
![pre-commit-error]()

如果想使用eslint自动修复错误，可以修改成如下配置

```javascript
// package.json
{
// ...
  "script": {
    "lint": "eslint --fix --ext .js,.vue",
    "precommit": "lint-staged"
  },
  "lint-staged": {
    "*.{js|vue}": [
      "npm run lint",
      "git add"
    ]
  }
}
```

这样修正好的文件就会重新跑一遍add命令，我们只需重按一下⬆️键重新跑一下命令提交即可，perfect。

## 集成prettier和Jest
1. prettier虽然和eslint有很多共同配置，但是prettier还可以对`vue template`和样式文件做验证和格式化，更多配置方式可以查看[文档](https://prettier.io/docs/en/index.html)，下面只介绍快速集成eslint和prettier的方式。首先我们需要安装`eslint-plugin-prettier`和`eslint-config-prettier`

```shell
npm install eslint-plugin-prettier eslint-config-prettier --save-dev
```

然后修改我们的`.eslintrc.js`

```javascript
{
  "extends": ["plugin:prettier/recommended"]
}
```

然后重新执行上方配置的第二部就可以看到结果了。

2. 集成Jest做unit test。为什么这里也会抽出单独讲呢，理论上我们只需在配置中加段`npm run unit`就行了，但是运行时候会发现Jest会提升没有找到测试文件的情况。此时我们需要修改我们的npm script，给jest cli添加一个`--findRelatedTests`的参数。官网对这参数的解释是**Useful for pre-commit hook integration to run the minimal amount of tests necessary.** ，看起来是为pre-commit提供的特殊命令，but why🤷🏼‍♂️
```javascript
{
  ...
  "script": {
    "unit": "jest --config test/jest.conf.js --findRelatedTests",
    "lint": "eslint --fix --ext .js,.vue",
    "precommit": "lint-staged"
  },
  "lint-staged": {
    "*.{js|vue}": [
      "npm run lint",
      "git add",
      "npm run unit"
    ]
  }
}
```

# Last
参照上面几步，便很容易的实现提交前验证，想整合打包等功能也十分简单，只需要在`lint-stage`中添加`npm run *`或者集成其他命令。我们也可以看到lint-stage可以通过`glob`的语法区分文件类型执行对应的script，大家可以自由发挥实现一下自动部署。

## 相关文档

* [prettier- Integrating with ESLint](https://prettier.io/docs/en/eslint.html)
* [Husky](https://github.com/typicode/husky/tree/master)
* [lint-stage](https://www.npmjs.com/package/lint-staged)
* [Jest Cli Options](https://facebook.github.io/jest/docs/en/cli.html#findrelatedtests-spaceseparatedlistofsourcefiles)
