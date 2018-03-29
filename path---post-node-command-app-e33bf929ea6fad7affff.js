webpackJsonp([21419286326168],{299:function(e,n){e.exports={data:{markdownRemark:{html:'<blockquote>\n<p>原文译自<a href="https://www.smashingmagazine.com/">Smashing Magazine</a> -- <a href="https://www.smashingmagazine.com/2017/03/interactive-command-line-application-node-js/">[How To Develop An Interactive Command Line Application Using Node.js](https://www.smashingmagazine.com/2017/03/interactive-command-line-application-node-js/)</a></p>\n</blockquote>\n<p>相信很多前端都听说过或者使用过<a href="http://www.gulpjs.com.cn/">Gulp</a>, <a href="https://cli.angular.io/">Angular CLI</a>, <a href="https://cordova.apache.org/">Cordova</a>, <a href="http://yeoman.io/">Yeoman</a>或其他类似的命令行工具。但有想过这些程序是怎么实现的吗？例如在Angular CLI中使用<code>ng new &#x3C;project-name></code>后会建立一个已经有基本配置的angular项目；又或者像Yeoman，也能运行时候输入或者选择配置项，让用户能够自定义项目配置，快速搭建好开发时候需要用到的开发环境。下面的教程，就是讲如何使用node写一个像这样的命令行工具。</p>\n<p>在这篇教程中，我们会开发一个命令行工具，用户能够输入一个CSV文件地址，从而获取到文件里面的用户信息，然后模拟群发邮件（原文是使用<a href="https://github.com/sendgrid/sendgrid-nodejs">SendGrid Api</a>模拟发送）\n文章目录：\n1."Hello World"\n2.处理命令行参数\n3.运行时输入参数\n4.模拟发送邮件\n5.改变输出内容样式\n6.变成shell命令</p>\n<!-- more -->\n<hr>\n<h2>“Hello World”</h2>\n<p>开始前，首先你得有node，如果没有，请自行安装下。node中自带npm，使用<a href="https://www.npmjs.com/">npm</a>能安装许多开源的node模块。首先，使用npm创建一个node项目</p>\n<pre><code class="language-shell">$ npm init\nname: broadcast\nversion: 0.0.1\ndescription: CLI utility to broadcast email\nentry point: broadcast.js\n</code></pre>\n<p>除这些参数外，npm还提供了其他如Git repository等参数，可根据自身需求设置输入。执行完<code>npm init</code>后，会发现在同目录下生成了一个<code>package.json</code>文件，文件里面包含了上面命令输入的信息。配置内容信息可以在<a href="https://docs.npmjs.com/files/package.json">package.json文档</a>中找到。</p>\n<p>然后，还是从最简单的Hello World入手。首先在同目录下建一个<code>broadcast.js</code>文件</p>\n<pre><code class="language-javascript">// broadcast.js\nconsole.log(\'Hello World!\')\n</code></pre>\n<p>然后在terminal中执行</p>\n<pre><code class="language-shell">$ node broadcast\nHello World!\n</code></pre>\n<p>well done, 根据<a href="https://docs.npmjs.com/files/package.json">package.json文档</a>，我们可以找到一个<code>dependencies</code>参数，在这参数中你可以找到所有这项目需要用到的第三方模块和它们的版本号，上面也有提及到，我们需要用到模块去开发这个工具。最后开发完成，<code>package.json</code>应该如下</p>\n<pre><code class="language-json">{\n    "name": "broadcast",\n    "version": "0.0.1",\n    "description": "CLI utility to broadcast emails",\n    "main": "broadcast.js",\n    "license": "MIT",\n    "dependencies": {\n        "chalk": "^1.1.3",\n        "commander": "^2.9.0",\n        "csv": "^1.1.0",\n        "inquirer": "^2.0.0"\n    }\n}\n</code></pre>\n<p>这几个模块 <a href="https://github.com/chalk/chalk">Chalk</a>, <a href="https://github.com/tj/commander.js">Commander</a>, <a href="https://github.com/sboudrias/Inquirer.js">Inquirer</a>, <a href="http://www.adaltas.com/en/2012/08/21/node-csv-stable-version-0-1-0/">CSV</a>的具体用处跟其他参数，可以自行查看。</p>\n<h2>处理命令行参数</h2>\n<p>node原生也有读取命令行的函数<a href="https://nodejs.org/docs/latest/api/process.html"><code>process.argv</code></a>，但是解析参数是个繁琐的工作，所以我们会使用<a href="https://github.com/tj/commander.js">Commander</a>去替代这些工作。Commande的另外一个好处就是不用额外的去写一个<code>--help</code>函数，只要定义了其他参数，<code>--help</code>函数就会自动生成。首先安装一下Commander和其他package</p>\n<pre><code class="language-shell">$ npm install commander chalk csv inquirer --save\n</code></pre>\n<p>然后修改<code>broadcast.js</code></p>\n<pre><code class="language-javascript">// broadcast\nconst program = require(\'commander\')\n\nprogram\n    .version(\'0.0.1\')\n    .option(\'-l, --list [list]\', \'list of customers in CSV file\')\n    .parse(process.argv)\n\nconsole.log(program.list)\n</code></pre>\n<p>从上面可以看出，处理一个参数是十分简单的。我们定义了一个<code>--list</code>的参数，现在我们就能通过<code>--list</code>参数获取到命令行传过来的值。在这程序中，list应该是接收一个csv的地址参数，然后打印在console中。</p>\n<pre><code class="language-shell">$ node broadcast --list ./test.csv\n./test.csv\n</code></pre>\n<p>从js中可以看到还有一个<code>version</code>参数，所以我们可以使用<code>--version</code>读取版本号。</p>\n<pre><code class="language-shell">$ node broadcast --version\n0.0.1\n</code></pre>\n<p>又或者能使用<code>--help</code>获取app能接收的参数</p>\n<pre><code class="language-shell">$ node broadcast --help\n\n  Usage: broadcast [options]\n\n  Options:\n\n    -h, --help                 output usage information\n    -V, --version              output the version number\n    -l, --list &#x3C;list>          list of customers in CSV file\n</code></pre>\n<p>现在我们已经能够接收到命令行传递过来的参数了，下面我们会利用接收到的CSV文件地址，并使用<a href="http://www.adaltas.com/en/2012/08/21/node-csv-stable-version-0-1-0/">CSV</a>模块处理CSV文件的内容。\n我们会使用下面的比哦啊哥内容作为CSV文件的内容。使用CSV模块，会读取内容，并显示各列的内容。</p>\n<table>\n<thead>\n<tr>\n<th>First name</th>\n<th>Last name</th>\n<th>Email</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Dwight</td>\n<td>Schrute</td>\n<td>dwight.schrute@dundermifflin.com</td>\n</tr>\n<tr>\n<td>Jim</td>\n<td>Halpert</td>\n<td>jim.halpert@dundermifflin.com</td>\n</tr>\n<tr>\n<td>Pam</td>\n<td>Beesly</td>\n<td>pam.beesly@dundermifflin.com</td>\n</tr>\n<tr>\n<td>Ryan</td>\n<td>Howard</td>\n<td>ryan.howard@dundermifflin.com</td>\n</tr>\n<tr>\n<td>Stanley</td>\n<td>Hudson</td>\n<td>stanley.hudson@dundermifflin.com</td>\n</tr>\n</tbody>\n</table>\n<p>现在，更新下<code>broadcast.js</code>，使用CSV读取内容并打印在console</p>\n<pre><code class="language-javascript">// broadcast.js\nconst program = require(\'commander\')\nconst csv = require(\'csv\')\nconst fs = require(\'fs\')\n\nprogram\n    .version(\'0.0.1\')\n    .option(\'-l, --list [list]\', \'List of customers in CSV\')\n    .parse(process.argv)\n\nconst stream = fs.createReadStream(program.list)\nstream\n    .pipe(csv.parse({ delimiter : "," }))\n    .on(\'data\', function(data) {\n         const firstname = data[0]\n         const lastname = data[1]\n         const email = data[2]\n\n         console.log(firstname, lastname, email)\n    })\n</code></pre>\n<p>除csv模块外，还使用了node的<a href="https://nodejs.org/dist/latest-v7.x/docs/api/fs.html">File System</a>模块读取文件内容，csv的<code>parse</code>方法把列数据解析为数组，然后在terminal中运行一下命令</p>\n<pre><code class="language-shell">$ node broadcast.js --list ./test.csv\nDwight Schrute dwight.schrute@dundermifflin.com\nJim Halpert jim.halpert@dundermifflin.com\nPam Beesly pam.beesly@dundermifflin.com\nRyan Howard ryan.howard@dundermifflin.com\nStanley Hudson stanley.hudson@dundermifflin.com\n</code></pre>\n<h2>运行时输入参数</h2>\n<p>上面已经实现了获取命令行参数，但如果想在运行时候接收参数值的话我们就需要另外一个模块<a href="https://github.com/sboudrias/Inquirer.js">inquirer.js</a>，通过这个模块，用户可以自定义多种参数类型，如文本，密码，单选或者多选列表等。</p>\n<p>下面的demo会通过inquirer接收邮件发送人的名字，email还有邮件主题。</p>\n<pre><code class="language-javascript">// broadcast.js\n...\nconst inquirer = require(\'inquirer\')\nconst questions = [\n  {\n    type : "input",\n    name : "sender.email",\n    message : "Sender\'s email address - "\n  },\n  {\n    type : "input",\n    name : "sender.name",\n    message : "Sender\'s name - "\n  },\n  {\n    type : "input",\n    name : "subject",\n    message : "Subject - "\n  }\n]\n\nprogram\n  .version(\'0.0.1\')\n  .option(\'-l, --list [list]\', \'List of customers in CSV\')\n  .parse(process.argv)\n\n// 储存CSV数据\nconst contactList = []\nconst stream = fs.createReadStream(program.list)\n    .pipe(csv.parse({ delimiter : "," }))\n\nstream\n  .on(\'error\', function (err) {\n    return console.error(err.message)\n  })\n  .on(\'data\', function (data) {\n    let name = data[0] + " " + data[1]\n    let email = data[2]\n    contactList.push({ name : name, email : email })\n  })\n  .on(\'end\', function () {\n    inquirer.prompt(questions).then(function (answers) {\n      console.log(answers)\n    })\n  })\n</code></pre>\n<p>Inquire.js的<code>prompt</code>方法接受一个数组参数，数组里可以自定义运行时需要接受的问题参数，在这demo里面，我们想知道发送者的名字还要email还有邮件主题，所以定义了一个<code>questions</code>的数组来储存问题，从对象里面可以看到有一个<code>input</code>的参数，除此外还可以接受<code>password</code>等其他类型，具体可以查询一下<a href="https://github.com/SBoudrias/Inquirer.js/">inquirer的文档</a>。此外，参数<code>name</code>保存input的key值。<code>prompt</code>方法会返还一个promise对象，promise中会返回一个<code>answer</code>变量，里面带有刚才输入的值。</p>\n<pre><code class="language-shell">$ node broadcast -l input/employees.csv\n? Sender\'s email address -  kitssang_demo@163.com\n? Sender\'s name -  kit\n? Subject - Hello World\n{ sender:\n   { email: \'  kitssang_demo@163.com\',\n     name: \'kit\' },\n  subject: \'Hello World\' }\n</code></pre>\n<h2>模拟发送邮件</h2>\n<p>由于原文使用的<code>sendgrid</code>没有跑通，所以只组装了一下数据模拟了发送邮件。原本的第五部分也在这里一起用上了。</p>\n<pre><code class="language-javascript">// broadcast.js\n...\nprogram\n    .version(\'0.0.1\')\n    .option(\'-l, --list [list]\', \'list of customers in CSV file\')\n    .parse(process.argv)\n\nconst sendEmail = function(to, from, subject) {\n    const sender = chalk.green(`${from.name}(${from.email})`)\n    const receiver = chalk.green(`${to.name}(${to.email})`)\n    const theme = chalk.blue(subject)\n\n    console.log(`${sender} send a mail to ${receiver} and the subject of the email is ${theme}`)\n}\n\n// 储存CSV数据\nlet concatList = []\nconst stream = fs.createReadStream(program.list)\n  .pipe(csv.parse({\n    delimiter: \',\'\n  }))\n  .on(\'data\', function(data) {\n    const name = data[0] + \' \' + data[1]\n    const email = data[2]\n\n    concatList.push({\n      name: name,\n      email: email\n    })\n  })\n  .on(\'end\', function() {\n    inquirer.prompt(questions).then((ans) => {\n      for (let i = 0; i &#x3C; concatList.length; i++) {\n        sendEmail(concatList[i], ans.sender, ans.subject)\n      }\n    }).catch((err) => {\n      console.log(err)\n    })\n  })\n</code></pre>\n<p>由于没有异步请求，<code>async</code>模块没有用上，另外使用了<code>chalk</code>模块改变了console打印结果的颜色。</p>\n<h2>变成shell命令</h2>\n<p>至此，整个工具已经基本完成，但是如果想像一个普通的shell命令(不加<code>$ node xx</code>)执行，还需要做以下操作。首先，添加<a href="https://zh.wikipedia.org/wiki/Shebang">shebang</a>在js的头部，让shell知道如何执行这个文件。</p>\n<pre><code class="language-javascript">#!/usr/bin/env node\n\n// broadcast.js\nconst program = require("commander")\nconst inquirer = require("inquirer")\n...\n</code></pre>\n<p>然后再配置一下<code>package.json</code>使代码可运行</p>\n<pre><code class="language-json">…\n  "description": "CLI utility to broadcast emails",\n  "main": "broadcast.js",\n  "bin" : {\n    "broadcast" : "./broadcast.js"\n  }\n…\n</code></pre>\n<p>从代码可以看到加了一个<a href="https://docs.npmjs.com/files/package.json#bin"><code>bin</code></a>的参数，这个参数可以使broadcast命令与broadcast.js建立连接。</p>\n<p>最后一步，在全局安装一下依赖包。在项目目录运行一下下面的命令。</p>\n<pre><code class="language-shell">$ npm install -g\n</code></pre>\n<p>然后测试一下命令</p>\n<pre><code class="language-shell">$ broadcast --help\n</code></pre>\n<p>需要注意的是，在开发时候如果使用<code>commaner</code>默认给出的命令执行<code>broadcast</code>则在代码中所做的任何更改都是看不见的。假如输入<code>which broadcast</code>，你会发现地址不是你当前目录，所以这时应该要用<code>npm link</code>去查看命令的目录映射。</p>',frontmatter:{date:"May 16, 2017",path:"/post/node-command-app",title:"使用nodejs写一个命令行程序"},headings:[{depth:2,value:"“Hello World”"},{depth:2,value:"处理命令行参数"},{depth:2,value:"运行时输入参数"},{depth:2,value:"模拟发送邮件"},{depth:2,value:"变成shell命令"}]}},pathContext:{prev:{title:"前端单元测试&Mocha指北",date:"2017-05-16",category:["前端"],tags:null,path:"/post/unit-test"},next:{title:"React-todo demo",date:"2016-03-02",category:["js framework"],tags:["React","Webpack","js框架"],path:"/post/react-todo"}}}}});
//# sourceMappingURL=path---post-node-command-app-e33bf929ea6fad7affff.js.map