webpackJsonp([0x81b8806e4260],{288:function(n,t){n.exports={data:{allMarkdownRemark:{edges:[{node:{excerpt:"\n作为一个程序员，想必每个都有自己的编码风格。有风格虽好，但这问题令很多项目管理者头疼，不一样的代码风格及缩进，必会降低代码可读性，从而间接降低效率。但是这个问题都难不到我们伟大的程序员，很多如eslint，prettier等库的出现帮我们去解决问题。很多cli在生成初始项目时都会给我们加上eslint、csslint等，这不就能解决我们的问题了吗？too young too simple，每保存一次就弹出一个错误，还是一大堆英文，估计大部分人心里就默默一句what the fuck is that了，从而就导致我们嘴上虽很强硬的说着要规范我们的代码风格，身体却很诚实地默默把各种lint的配置关掉🤷🏼‍。\n所以在这篇文章里，会给大家提供一些好用的方法，使各位重拾定规范时候的激情。\n\n# something useful\n1. 使用`eslint --fix`格式化文件\n**eslint**虽好，但是对规范还没适应的同学却是一个难题，每写一遍都弹个黑白屏出来，特别英文不好的，估计半天都不知道哪里出问题，这样子下来估计半天没写几行代码。这时候其实我们可以贴心地把配置项注释掉，只有提交前跑一下`eslint --fix`这个命令就好了，大部分代码都会根据规范格式化掉。\n\n",frontmatter:{title:"使用pre-commit实现提交前验证或自动部署代码",date:"2018-03-29",category:["tools"],path:"/post/pre-commit-hook"}}},{node:{excerpt:"\n> 原文译自[10 Tips for Javascript Debugging Like a PRO with Console](https://medium.com/appsflyer/10-tips-for-javascript-debugging-like-a-pro-with-console-7140027eb5f6) - Yotam Kadishay\n\n在日常开发里，我们经常需要使用`console`调试我们的代码，但是使用仅仅是用来打印参数数据。在这篇文章中，将会介绍如何一些`console`的高级用法去更好的做调试工作和定位问题。\n\n我们都知道`console`的几个常用的方法\n\n```javascript\nconsole.log('hello world'); // 打印信息或者数据\nconsole.info(‘Something happened…’); // 和console log一样\nconsole.warn(‘Something strange happened…’); // 打印警告信息\nconsole.error(‘Something horrible happened…’); // 打印错误信息\n```\n\n除这些简单的使用外，下面几个`console`的用法希望能帮助你更好的调试你的应用。\n\n",frontmatter:{title:"10个console的高级使用方法",date:"2018-03-19",category:["javascript"],path:"/post/10tips-for-console"}}},{node:{excerpt:"\n这次做的是一个类似teambition的团队协作类项目，因为上级反映交互和视觉方面都没有达到要求，以前的代码也没有用模块化和用node做一些自动化的工作，旧代码是基本改不了的，所以就没看以前的代码，直接看着交互跟设计稿就开撸了。\n库选择基本没有什么选择了，angular版本不稳定，pass，react 和 vue之间为什么选后者呢，一方面受公司政治因素影响，另一方面vue文档有中文，template的写法对新手也比较友好，考虑到后期人员配置就选择vue了。\n重构了4个大模块，改版用时大概一个半月，测试时间一周左右，期间没有什么比较大卡进度的问题。下面通过对项目的构建，组织，测试等工作做下记录以及分析。\n\n# 项目构建\n项目创建是使用vue-cli创建的，模版则是使用我自己维护的[vue-mpa](https://github.com/kitwon/vue-mpa)多页模板创建的单页应用🤩(出于对自己的支持，对模版bug的测试，以及切换为单页应用也方便)。除了官方基本的功能外，项目还加入了打包完成后自动删除并拷贝到后台项目文件夹，自动生成jsp模板等一些自动化功能。\n\n",frontmatter:{title:"年底项目复盘",date:"2018-01-23",category:["工作"],path:"/post/2017-review"}}},{node:{excerpt:"\n> 这篇文章大概5500字体左右，可能需要浪费5-10分钟去阅读。\n\n----\n\n> 现在javascript性能已经足够快了，但是很多时候我们的web app还是会出现卡顿的情况。这时候我们首先会想到是去优化我们的js代码，比如将for循环改为while，但其实这些微粒度的优化其实对性能提示是皮毛。看完google的[render performance](https://developers.google.com/web/fundamentals/performance/rendering/)对前端渲染优化有了一个新的认识。\n\n# 几个重要概念\n## 60fps与设备刷新率\n目前大多数设备的刷新率都是60fps。玩游戏的都知道，如果当前刷新率在30-60fps，游戏运行会基本流畅，而少于60fps就会出现卡顿的状况了。web app基本也是如此，如果浏览器渲染帧突然下降，或者帧数低的情况，就出现程序运行卡的情况了。\n\n其中每个帧的预算时间仅比 16 毫秒多一点 (1 秒/ 60 = 16.66 毫秒)。但实际上，浏览器有整理工作要做，因此您的所有工作需要在 10 毫秒内完成。如果无法符合此预算，帧率将下降，并且内容会在屏幕上抖动。 此现象通常称为卡顿，会对用户体验产生负面影响。\n\n",frontmatter:{title:"构建60fps-web-app",date:"2017-09-13",category:["前端"],path:"/post/60fps-web-app"}}},{node:{excerpt:"\n在之前已经写过一篇关于前端单元测试的文章，相关概念就不作阐述了，有兴趣或者有需求的同学可以在往期找一下。然后这里简单介绍一下[jest](http://facebook.github.io/jest/)，这是一个[Facebook OpenSource](https://code.facebook.com/projects/)的一个开源项目。项目已经集成好了一些测试相关的框架的代码，主打的是零配置测试平台（react中应该算是零配置，其他项目还是要手动配置一下的），里面一个比较好地方是支持**快照测试**(为dom结构生成一个快照，每次测试都对比dom结构)。其他一些好用的地方可以自己查看文档，有中文。\n\n# 配置\n首先是安装jest, jset-vue-preprocessor(jest的一个插件，用来解析'.vue'文件的)。\n```bash\n$ npm install jest jest-vue-preprocessor --save-dev\n\n# or use yarn\n$ yarn add jest jest-vue-preprocessor --save\n```\n\n",frontmatter:{title:"在vue项目中使用jest进行单元测试",date:"2017-08-18",category:["前端工具"],path:"/post/vue-jest-test"}}},{node:{excerpt:"\n# 类理论\n类／继承描述了一种代码的组织结构形式，这个理论在软件设计中一直作为一个主导的角色。通过学习类理论，能为更好地学习js中的设计模式和对js中原型链的理解打下基础。\n\n类是在软件中对真实世界问题领域的建模方法。如一个经常看见的交通例子。**汽车**可以被看作**交通工具中的一种**，所以在软件开发时可以定义一个`Vehicle`类，`Vehicle`中包含推进器（引擎）、载人能力等方法。定义`Car`时，只要声明它继承或者拓展`Vehicle`这个基础定义就行了，其他交通工具如船、飞机也可以继承`Vehicle`。**这就是类的实例化与继承**。\n\n类的另外一个核心概念是**多态**，这个概念是说夫类的通用行为可以被子类更特殊的行为重写。\n\njavascript中也有类中的`new`和`instanceof`，还有ES6中的`class`关键字，但这些并不是说明js中有**类**的。javascript中只是为了满足类的设计需求而提供一些类似的语法。\n\n## js中实现类复制(混入)\njavascript中的对象机制并不会自动执行复制行为，简单来说javascript中只有对象，并不存在可以实例的类。一个对象并不会复制一个对象，只会把它关联起来(prototype)。\n\n",frontmatter:{title:"深入学习javascript-类",date:"2017-07-20",category:null,path:"/post/js-class"}}},{node:{excerpt:"\n# 关于this\n\n`this`应该是javascript中一个比较复杂的机制了，在日常工作中我们可能有意无意都会使用到这个机制，但是`this`的工作机制真正了解的可能只有皮毛，通过学习这一机制，能够提高对js代码的理解和阅读能力，还有对js程序设计模式有着更深的理解。\n\n# this的指向\nthis是运行时进行绑定的，而不是编写时绑定的，它的上下文取决于函数调用时的各种条件。this的绑定和函数声明的位置没有任何关系，只取决于函数的调用方式。\n\n通过分析调用位置，就能知道this到底引用的是什么。所以，寻找调用位置就能弄清上面的问题，通过一个例子，就能很好地理解这个问题：\n```javascript\nfunction baz() {\n  // 当前调用栈是 baz\n  // 当前调用位置是全局作用域\n\n  console.log('baz');\n  bar(); // bar的调用位置\n}\n\nfunction bar() {\n  // 当前的调用栈是 baz -> bar\n  // 当前的调用位置是baz\n\n  console.log('bar');\n  foo();\n}\n\nfunction foo() {\n  // 当前的调用栈是 baz -> bar -> foo\n  // 当前的调用位置是bar\n\n  console.log('foo');\n}\n\nbaz();\n```\n\n",frontmatter:{title:"深入学习javascript - this",date:"2017-06-27",category:null,path:"/post/js-this"}}},{node:{excerpt:"\nwebpack2已经发布了好一段时间了。但是因为之前工作的关系没有好好研究一下，后面工作应该会用得上，而且趁着这段时间有空，还有在熟悉vim，就顺便拿这来练练手了。\n\n# 从webpack1中迁移\n官方已经给出了详细的[迁移指南](https://webpack.js.org/guides/migrating/)，改动并不是很大，但是优化却蛮多的，如编译速度，代码优化等。如果你的项目正在用webpack，那么这个新版本还是挺值得迁移的。\n\n## 配置文件\n如果升级webpack之后直接运行命令的话应该会看到一片红的，可以看出配置项有改动，下面整理一下经常使用地方的改动。\n\n### `module.loaders`变成`module.rules`\n旧的`module.loader`被`module.rules`取代，后者允许配置`loader`更多选项，具体查看文档[module.rules](https://webpack.js.org/configuration/module/#module-rules)\n\n```javascript\n// ...\nmdoule: {\n    rules: [\n        {\n            test: /\\.css$/,\n            use: [\n                { loader: 'style-loader' },\n                {\n                    loader: 'css-loader',\n                    options: { module: true }\n                }\n            ]\n        },\n        {\n            test: /\\.jsx$/,\n            loader: 'babel-loader',\n            options: {\n                // ...\n            }\n        }\n    ]\n}\n// ...\n```\n\n",frontmatter:{title:"webpack2新特性&迁移",date:"2017-06-24",category:["前端工具"],path:"/post/webpack2"}}},{node:{excerpt:"\n# 什么是闭包\n记得刚开始用js的时候就听过闭包这个概念，一开始觉得只是一个语言特性，没有太深入了解，网上查资料的解释一般是：函数有权访问另一个函数作用域中变量的函数，最容易生成闭包的方式一般是函数里面套函数。\n\n> 当函数可以记住并访问所在的词法作用域时，就产生了闭包，即使函数是在当前词法作用域外执行。\n--- 你不知道的javascript（上卷）\n\n然后看个例子\n```javascript\nfunction foo() {\n\tvar a = 2;\n\n\tfuntion bar() {\n\t\tconsole.log(a);\n\t}\n\n\tbar();\n}\n\nfoo();\n```\n如果按上面第一条的定义，这里一定是生成了闭包，但是**确切的说并不是**，这里最准确的说是`bar`对`a`的引用方式是词法作用域的查找规则，而这些只是**闭包**的一部分。然后再看清晰闭包的例子\n\n```javascript\nfucntion foo() {\n\tvar a = 2;\n\n\tfunction bar() {\n\t\tconsole.log(a)\n\t}\n\n\treturn bar;\n}\n\nvar baz = foo()；\n\nbaz(); // 这就是闭包效果\n```\n\n",frontmatter:{title:"深入学习javascript-闭包",date:"2017-06-14",category:null,path:"/post/js-closures"}}},{node:{excerpt:"\n之前一直有学习python，但是一直都是在学一些比较基础的东西，所在在这段空闲的时间打算系统学一下python。在这会使用python写一个爬百科的简单爬虫，首先分析下爬虫的需求。\n\n# 主要需求\n这个demo中爬虫有3个主要模块，**URL管理器**、**下载器**、**解析器**\n* URL管理器主要处理爬取的URL的状态。\n* 下载器会通过**URL管理器**传送过来有效URL进行下载。\n* 解析器会将**下载器**下载的内容解析成字符串，再进行保存。如果解析出有效URL再传给**URL管理器**进行重复操作。\n\n## 入口程序\n`spider_main`文件为程序入口，处理整个爬虫的运行逻辑\n\n",frontmatter:{title:"用python写一个简单爬虫",date:"2017-06-11",category:null,path:"/post/python-crawler"}}},{node:{excerpt:"\n# 前言\n使用js已经有一段时间了，一开始觉得js只是一门玩具语言，用来做做前端交互效果。但是随着越来越深入，慢慢发现js的其他优点：灵活的自由的代码编写带来多种多样的设计方式，令人慢慢着迷。但是很多时候都感觉只是停留在如何使用js实现相关的功能，偶尔遇到一些特殊的情况或者需要深度优化的点，就会感到惘然，为了打破这尴尬情况，打算开始读相关的一些书籍来分析js更深层的设计还有使用方式，从而“达到知其然且知其所以然”。\n\n# 作用域是什么\nJS中每个函数都有自己的执行环境，在执行环境中能够储存变量中的值，并且能在之后对值进行访问或者修改。换句话说，规定变量储存在哪里，程序要如何找到这些变量，这套规则就称为**作用域**。\n\n\n\n## 理解作用域执行过程\n如在`var a = 2`执行过程中，分别有引擎、编译器、作用域三个参与了这次过程。\n\n首先，编译器会将这段程序分解成词法单元，然后将词法单元解析成一个树结构。\n1. 遇到var a，编译器会在**作用域**中查找是有已经存在有该名称的变量。如果是，编译器会忽略这一声明，继续编译；否则，会要求作用域在当前作用域集合中声明一个新变量，并命名为a。\n2. 接下来，编译器会为**引擎**生成运行时所需的代码，代码用来处理`a = 2`这个赋值操作。引擎运行时会首先询问**作用域**当前作用集合是否有一个`a`的变量。如果是，**引擎**就会使用这个变量；如果不是，引擎会继续查找该变量。如果**引擎**找到`a`变量，就会赋值2。否则，**引擎**会抛出一个异常。\n\n**总结**：变量赋值分别有两个动作，**编译器**会在当前**作用域**中声明一个变量（如果之前没有声明过），然后在运行时引擎会在**作用域**中查找该变量，如果能找到就对变量进行赋值。\n\n",frontmatter:{title:"深入学习javascript--作用域",date:"2017-05-31",category:null,path:"/post/js-scope"}}},{node:{excerpt:"\n# 题目\n之前在YY面试的时候遇到过的一题: 实现add(1)(2)(3)，返回6，注意可拓展性。\n当时第一反应就是用递归实现\n\n```javascript\nfunction add(x) {\n\tvar fn = function(y) {\n\t\treturn add(x + y);\n\t}\n\n\treturn fn;\n}\n\nconsole.log(add(1)(2)(3))\n```\n\n",frontmatter:{title:"js实现add(1)(2)(3)",date:"2017-05-28",category:["javascript"],path:"/post/add-chain"}}},{node:{excerpt:"\n老前端都知道，js分为同步(sync)和异步(async)两种模式，同步简单来说就是排队，一个接着一个。异步则是函数执行完后执行它的回调函数，而下一个函数不等上一个函数完成就开始执行。使用回调函数能解决大部分的异步问题，但是回调一多就很容易掉进‘回调地狱’，为了解决这个问题，[promise](https://promisesaplus.com/)（CommonJS工作组提出的一种规范）给我们提供了一种更为优雅的解决方式。\n\n下面，我们会尝试实现一个promise，通过实现这个demo，能更好地理解promise的运行方式，使平时在使用的时候更加熟练，也能从实现原理中进行深入探讨，从而达到“知其然且知其所以然”。\n\n\n\n# 初步构建一个Promise\n我们看下平时使用promise处理异步函数时候的使用方式，从调用方法看下大概用什么方式去实现\n```javascript\n// 例1\nfunction getAsyncData() {\n\treturn new Promise(function(resolve, reject) {\n\t\tsetTimeout(function() {\n\t\t\tresolve('promise done!')\n\t\t}, 1000)\n\t})\n}\n\ngetAsyncData().then(function(result) {\n\tconsole.log(result);\n}).then(function() {\n\tconsole.log('done too!');\n})\n```\n\n",frontmatter:{title:"Promise的简单实现",date:"2017-05-17",category:["前端"],path:"/post/js-promise"}}},{node:{excerpt:"\n# 什么是单元-测试?\n- 单元就是相对独立的功能模块，例如一个函数或者一个类。一个完整的模块化的程序，都应该是有许多个单元构成，单元能完成自己的任务，然后与其他单元进行交互 ，从而完成整个程序的功能。\n- 而测试，就是测试啦。\n\n所以单元测试通俗点讲就是对程序每个独立的单元分别测试，保证构成程序的每个模块的正确性，从而保证整个程序的正确运行。\n\n# 为什么要写单元测试？\n单元测试在前端还是不太普及的，因为刚开始前端也是偏向‘UI’那一块的，但随着node的发展，越来越多非‘UI’的前端代码，一个团队也越来越多人参加开发，如果系统一复杂，又或者你的模块提交到npm上面的话，一出错基本就GG了。\n又或者你这样想，测试是逃不掉的，要么在dev上测试，要么在prod上测试，怎么都得测试，而且每次提交都要测试，为什么不写自动测试呢。我也相信大多数程序员也有写完跑跑看的习惯，而单元测试的log都直接打印到console里面，也省去了很多编译，打包的时间，又能满足各位的心理需求（猥琐脸），一举两得啊。\n\n",frontmatter:{title:"前端单元测试&Mocha指北",date:"2017-05-16",category:["前端"],path:"/post/unit-test"}}},{node:{excerpt:'\n> 原文译自[Smashing Magazine](https://www.smashingmagazine.com/) -- [[How To Develop An Interactive Command Line Application Using Node.js](https://www.smashingmagazine.com/2017/03/interactive-command-line-application-node-js/)](https://www.smashingmagazine.com/2017/03/interactive-command-line-application-node-js/)\n\n相信很多前端都听说过或者使用过[Gulp](http://www.gulpjs.com.cn/), [Angular CLI](https://cli.angular.io/), [Cordova](https://cordova.apache.org/), [Yeoman](http://yeoman.io/)或其他类似的命令行工具。但有想过这些程序是怎么实现的吗？例如在Angular CLI中使用`ng new <project-name>`后会建立一个已经有基本配置的angular项目；又或者像Yeoman，也能运行时候输入或者选择配置项，让用户能够自定义项目配置，快速搭建好开发时候需要用到的开发环境。下面的教程，就是讲如何使用node写一个像这样的命令行工具。\n\n在这篇教程中，我们会开发一个命令行工具，用户能够输入一个CSV文件地址，从而获取到文件里面的用户信息，然后模拟群发邮件（原文是使用[SendGrid Api](https://github.com/sendgrid/sendgrid-nodejs)模拟发送）\n文章目录：\n1."Hello World"\n2.处理命令行参数\n3.运行时输入参数\n4.模拟发送邮件\n5.改变输出内容样式\n6.变成shell命令\n\n',frontmatter:{title:"使用nodejs写一个命令行程序",date:"2017-05-16",category:["前端"],path:"/post/node-command-app"}}},{node:{excerpt:"\n好久之前做得一个todo demo，使用了最近较火的react和webpack，由于公司电脑各种不能装，所以没用上es6（各种限制太惨了），在这顺便做个记录，年纪大记性太差了。\n\n### 小科普\n什么是React? 按官方解释，框架属于MVC中的view层，由于其设计思想独特，性能出众，逻辑简单，所以上年开始越来越多人关注。\n至于Webpack，各位官人从名字应该可以猜出，是个打包工具，但又不止是个打包工具，是一个支持模块化的打包工具，两个字就可以形容它的优点了，就是暴力，究竟有多暴力，下面demo就为各位官人揭晓！\n\n",frontmatter:{title:"React-todo demo",date:"2016-03-02",category:["js framework"],path:"/post/react-todo"}}}]}},pathContext:{}}}});
//# sourceMappingURL=path---index-e4c339b5c565f4bce18f.js.map