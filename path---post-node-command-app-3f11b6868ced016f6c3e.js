webpackJsonp([21419286326168],{298:function(n,s){n.exports={data:{markdownRemark:{html:'<blockquote>\n<p>原文译自<a href="https://www.smashingmagazine.com/">Smashing Magazine</a> -- <a href="https://www.smashingmagazine.com/2017/03/interactive-command-line-application-node-js/">[How To Develop An Interactive Command Line Application Using Node.js](https://www.smashingmagazine.com/2017/03/interactive-command-line-application-node-js/)</a></p>\n</blockquote>\n<p>相信很多前端都听说过或者使用过<a href="http://www.gulpjs.com.cn/">Gulp</a>, <a href="https://cli.angular.io/">Angular CLI</a>, <a href="https://cordova.apache.org/">Cordova</a>, <a href="http://yeoman.io/">Yeoman</a>或其他类似的命令行工具。但有想过这些程序是怎么实现的吗？例如在Angular CLI中使用<code class="language-text">ng new &lt;project-name&gt;</code>后会建立一个已经有基本配置的angular项目；又或者像Yeoman，也能运行时候输入或者选择配置项，让用户能够自定义项目配置，快速搭建好开发时候需要用到的开发环境。下面的教程，就是讲如何使用node写一个像这样的命令行工具。</p>\n<p>在这篇教程中，我们会开发一个命令行工具，用户能够输入一个CSV文件地址，从而获取到文件里面的用户信息，然后模拟群发邮件（原文是使用<a href="https://github.com/sendgrid/sendgrid-nodejs">SendGrid Api</a>模拟发送）\n文章目录：\n1."Hello World"\n2.处理命令行参数\n3.运行时输入参数\n4.模拟发送邮件\n5.改变输出内容样式\n6.变成shell命令</p>\n<!-- more -->\n<hr>\n<h2>“Hello World”</h2>\n<p>开始前，首先你得有node，如果没有，请自行安装下。node中自带npm，使用<a href="https://www.npmjs.com/">npm</a>能安装许多开源的node模块。首先，使用npm创建一个node项目</p>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code class="language-bash">$ <span class="token function">npm</span> init\nname: broadcast\nversion: 0.0.1\ndescription: CLI utility to broadcast email\nentry point: broadcast.js\n</code></pre>\n      </div>\n<p>除这些参数外，npm还提供了其他如Git repository等参数，可根据自身需求设置输入。执行完<code class="language-text">npm init</code>后，会发现在同目录下生成了一个<code class="language-text">package.json</code>文件，文件里面包含了上面命令输入的信息。配置内容信息可以在<a href="https://docs.npmjs.com/files/package.json">package.json文档</a>中找到。</p>\n<p>然后，还是从最简单的Hello World入手。首先在同目录下建一个<code class="language-text">broadcast.js</code>文件</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token comment">// broadcast.js</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'Hello World!\'</span><span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<p>然后在terminal中执行</p>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code class="language-bash">$ node broadcast\nHello World<span class="token operator">!</span>\n</code></pre>\n      </div>\n<p>well done, 根据<a href="https://docs.npmjs.com/files/package.json">package.json文档</a>，我们可以找到一个<code class="language-text">dependencies</code>参数，在这参数中你可以找到所有这项目需要用到的第三方模块和它们的版本号，上面也有提及到，我们需要用到模块去开发这个工具。最后开发完成，<code class="language-text">package.json</code>应该如下</p>\n<div class="gatsby-highlight">\n      <pre class="language-json"><code class="language-json"><span class="token punctuation">{</span>\n    <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"broadcast"</span><span class="token punctuation">,</span>\n    <span class="token property">"version"</span><span class="token operator">:</span> <span class="token string">"0.0.1"</span><span class="token punctuation">,</span>\n    <span class="token property">"description"</span><span class="token operator">:</span> <span class="token string">"CLI utility to broadcast emails"</span><span class="token punctuation">,</span>\n    <span class="token property">"main"</span><span class="token operator">:</span> <span class="token string">"broadcast.js"</span>\n    <span class="token property">"license"</span><span class="token operator">:</span> <span class="token string">"MIT"</span><span class="token punctuation">,</span>\n    <span class="token property">"dependencies"</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n        <span class="token property">"chalk"</span><span class="token operator">:</span> <span class="token string">"^1.1.3"</span><span class="token punctuation">,</span>\n        <span class="token property">"commander"</span><span class="token operator">:</span> <span class="token string">"^2.9.0"</span><span class="token punctuation">,</span>\n        <span class="token property">"csv"</span><span class="token operator">:</span> <span class="token string">"^1.1.0"</span><span class="token punctuation">,</span>\n        <span class="token property">"inquirer"</span><span class="token operator">:</span> <span class="token string">"^2.0.0"</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>这几个模块 <a href="https://github.com/chalk/chalk">Chalk</a>, <a href="https://github.com/tj/commander.js">Commander</a>, <a href="https://github.com/sboudrias/Inquirer.js">Inquirer</a>, <a href="http://www.adaltas.com/en/2012/08/21/node-csv-stable-version-0-1-0/">CSV</a>的具体用处跟其他参数，可以自行查看。</p>\n<h2>处理命令行参数</h2>\n<p>node原生也有读取命令行的函数<a href="https://nodejs.org/docs/latest/api/process.html"><code class="language-text">process.argv</code></a>，但是解析参数是个繁琐的工作，所以我们会使用<a href="https://github.com/tj/commander.js">Commander</a>去替代这些工作。Commande的另外一个好处就是不用额外的去写一个<code class="language-text">--help</code>函数，只要定义了其他参数，<code class="language-text">--help</code>函数就会自动生成。首先安装一下Commander和其他package</p>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code class="language-bash">$ <span class="token function">npm</span> <span class="token function">install</span> commander chalk csv inquirer --save\n</code></pre>\n      </div>\n<p>然后修改<code class="language-text">broadcast.js</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token comment">// broadcast</span>\n<span class="token keyword">const</span> program <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'commander\'</span><span class="token punctuation">)</span>\n\nprogram\n    <span class="token punctuation">.</span><span class="token function">version</span><span class="token punctuation">(</span><span class="token string">\'0.0.1\'</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">option</span><span class="token punctuation">(</span><span class="token string">\'-l, --list [list]\'</span><span class="token punctuation">,</span> <span class="token string">\'list of customers in CSV file\'</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>process<span class="token punctuation">.</span>argv<span class="token punctuation">)</span>\n\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>program<span class="token punctuation">.</span>list<span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<p>从上面可以看出，处理一个参数是十分简单的。我们定义了一个<code class="language-text">--list</code>的参数，现在我们就能通过<code class="language-text">--list</code>参数获取到命令行传过来的值。在这程序中，list应该是接收一个csv的地址参数，然后打印在console中。</p>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code class="language-bash">$ node broadcast --list ./test.csv\n./test.csv\n</code></pre>\n      </div>\n<p>从js中可以看到还有一个<code class="language-text">version</code>参数，所以我们可以使用<code class="language-text">--version</code>读取版本号。</p>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code class="language-bash">$ node broadcast --version\n0.0.1\n</code></pre>\n      </div>\n<p>又或者能使用<code class="language-text">--help</code>获取app能接收的参数</p>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code class="language-bash">$ node broadcast --help\n\n  Usage: broadcast <span class="token punctuation">[</span>options<span class="token punctuation">]</span>\n\n  Options:\n\n    -h, --help                 output usage information\n    -V, --version              output the version number\n    -l, --list <span class="token operator">&lt;</span>list<span class="token operator">></span>          list of customers <span class="token keyword">in</span> CSV <span class="token function">file</span>\n</code></pre>\n      </div>\n<p>现在我们已经能够接收到命令行传递过来的参数了，下面我们会利用接收到的CSV文件地址，并使用<a href="http://www.adaltas.com/en/2012/08/21/node-csv-stable-version-0-1-0/">CSV</a>模块处理CSV文件的内容。\n我们会使用下面的比哦啊哥内容作为CSV文件的内容。使用CSV模块，会读取内容，并显示各列的内容。</p>\n<table>\n<thead>\n<tr>\n<th>First name</th>\n<th>Last name</th>\n<th>Email</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Dwight</td>\n<td>Schrute</td>\n<td>dwight.schrute@dundermifflin.com</td>\n</tr>\n<tr>\n<td>Jim</td>\n<td>Halpert</td>\n<td>jim.halpert@dundermifflin.com</td>\n</tr>\n<tr>\n<td>Pam</td>\n<td>Beesly</td>\n<td>pam.beesly@dundermifflin.com</td>\n</tr>\n<tr>\n<td>Ryan</td>\n<td>Howard</td>\n<td>ryan.howard@dundermifflin.com</td>\n</tr>\n<tr>\n<td>Stanley</td>\n<td>Hudson</td>\n<td>stanley.hudson@dundermifflin.com</td>\n</tr>\n</tbody>\n</table>\n<p>现在，更新下<code class="language-text">broadcast.js</code>，使用CSV读取内容并打印在console</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token comment">// broadcast.js</span>\n<span class="token keyword">const</span> program <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'commander\'</span><span class="token punctuation">)</span>\n<span class="token keyword">const</span> csv <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'csv\'</span><span class="token punctuation">)</span>\n<span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'fs\'</span><span class="token punctuation">)</span>\n\nprogram\n    <span class="token punctuation">.</span><span class="token function">version</span><span class="token punctuation">(</span><span class="token string">\'0.0.1\'</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">option</span><span class="token punctuation">(</span><span class="token string">\'-l, --list [list]\'</span><span class="token punctuation">,</span> <span class="token string">\'List of customers in CSV\'</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>process<span class="token punctuation">.</span>argv<span class="token punctuation">)</span>\n\n<span class="token keyword">const</span> stream <span class="token operator">=</span> fs<span class="token punctuation">.</span><span class="token function">createReadStream</span><span class="token punctuation">(</span>program<span class="token punctuation">.</span>list<span class="token punctuation">)</span>\nstream\n    <span class="token punctuation">.</span><span class="token function">pipe</span><span class="token punctuation">(</span>csv<span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token punctuation">{</span> delimiter <span class="token punctuation">:</span> <span class="token string">","</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">\'data\'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n         <span class="token keyword">const</span> firstname <span class="token operator">=</span> data<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>\n         <span class="token keyword">const</span> lastname <span class="token operator">=</span> data<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>\n         <span class="token keyword">const</span> email <span class="token operator">=</span> data<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span>\n\n         console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>firstname<span class="token punctuation">,</span> lastname<span class="token punctuation">,</span> email<span class="token punctuation">)</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<p>除csv模块外，还使用了node的<a href="https://nodejs.org/dist/latest-v7.x/docs/api/fs.html">File System</a>模块读取文件内容，csv的<code class="language-text">parse</code>方法把列数据解析为数组，然后在terminal中运行一下命令</p>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code class="language-bash">$ node broadcast.js --list ./test.csv\nDwight Schrute dwight.schrute@dundermifflin.com\nJim Halpert jim.halpert@dundermifflin.com\nPam Beesly pam.beesly@dundermifflin.com\nRyan Howard ryan.howard@dundermifflin.com\nStanley Hudson stanley.hudson@dundermifflin.com\n</code></pre>\n      </div>\n<h2>运行时输入参数</h2>\n<p>上面已经实现了获取命令行参数，但如果想在运行时候接收参数值的话我们就需要另外一个模块<a href="https://github.com/sboudrias/Inquirer.js">inquirer.js</a>，通过这个模块，用户可以自定义多种参数类型，如文本，密码，单选或者多选列表等。</p>\n<p>下面的demo会通过inquirer接收邮件发送人的名字，email还有邮件主题。</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token comment">// broadcast.js</span>\n<span class="token comment">// ...</span>\n<span class="token keyword">const</span> inquirer <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'inquirer\'</span><span class="token punctuation">)</span>\n<span class="token keyword">const</span> questions <span class="token operator">=</span> <span class="token punctuation">[</span>\n  <span class="token punctuation">{</span>\n    type <span class="token punctuation">:</span> <span class="token string">"input"</span><span class="token punctuation">,</span>\n    name <span class="token punctuation">:</span> <span class="token string">"sender.email"</span><span class="token punctuation">,</span>\n    message <span class="token punctuation">:</span> <span class="token string">"Sender\'s email address - "</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span>\n    type <span class="token punctuation">:</span> <span class="token string">"input"</span><span class="token punctuation">,</span>\n    name <span class="token punctuation">:</span> <span class="token string">"sender.name"</span><span class="token punctuation">,</span>\n    message <span class="token punctuation">:</span> <span class="token string">"Sender\'s name - "</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span>\n    type <span class="token punctuation">:</span> <span class="token string">"input"</span><span class="token punctuation">,</span>\n    name <span class="token punctuation">:</span> <span class="token string">"subject"</span><span class="token punctuation">,</span>\n    message <span class="token punctuation">:</span> <span class="token string">"Subject - "</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">]</span>\n\nprogram\n  <span class="token punctuation">.</span><span class="token function">version</span><span class="token punctuation">(</span><span class="token string">\'0.0.1\'</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">option</span><span class="token punctuation">(</span><span class="token string">\'-l, --list [list]\'</span><span class="token punctuation">,</span> <span class="token string">\'List of customers in CSV\'</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>process<span class="token punctuation">.</span>argv<span class="token punctuation">)</span>\n\n<span class="token comment">// 储存CSV数据</span>\n<span class="token keyword">const</span> contactList <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>\n<span class="token keyword">const</span> stream <span class="token operator">=</span> fs<span class="token punctuation">.</span><span class="token function">createReadStream</span><span class="token punctuation">(</span>program<span class="token punctuation">.</span>list<span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">pipe</span><span class="token punctuation">(</span>csv<span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token punctuation">{</span> delimiter <span class="token punctuation">:</span> <span class="token string">","</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n\nstream\n  <span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">\'error\'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>err<span class="token punctuation">.</span>message<span class="token punctuation">)</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">\'data\'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>data<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">let</span> name <span class="token operator">=</span> data<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token string">" "</span> <span class="token operator">+</span> data<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>\n    <span class="token keyword">let</span> email <span class="token operator">=</span> data<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span>\n    contactList<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span> name <span class="token punctuation">:</span> name<span class="token punctuation">,</span> email <span class="token punctuation">:</span> email <span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">\'end\'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    inquirer<span class="token punctuation">.</span><span class="token function">prompt</span><span class="token punctuation">(</span>questions<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span>answers<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>answers<span class="token punctuation">)</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<p>Inquire.js的<code class="language-text">prompt</code>方法接受一个数组参数，数组里可以自定义运行时需要接受的问题参数，在这demo里面，我们想知道发送者的名字还要email还有邮件主题，所以定义了一个<code class="language-text">questions</code>的数组来储存问题，从对象里面可以看到有一个<code class="language-text">input</code>的参数，除此外还可以接受<code class="language-text">password</code>等其他类型，具体可以查询一下<a href="https://github.com/SBoudrias/Inquirer.js/">inquirer的文档</a>。此外，参数<code class="language-text">name</code>保存input的key值。<code class="language-text">prompt</code>方法会返还一个promise对象，promise中会返回一个<code class="language-text">answer</code>变量，里面带有刚才输入的值。</p>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code class="language-bash">$ node broadcast -l input/employees.csv\n? Sender<span class="token string">\'s email address -  kitssang_demo@163.com\n? Sender\'</span>s name -  kit\n? Subject - Hello World\n<span class="token punctuation">{</span> sender:\n   <span class="token punctuation">{</span> email: <span class="token string">\'  kitssang_demo@163.com\'</span>,\n     name: <span class="token string">\'kit\'</span> <span class="token punctuation">}</span>,\n  subject: <span class="token string">\'Hello World\'</span> <span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<h2>模拟发送邮件</h2>\n<p>由于原文使用的<code class="language-text">sendgrid</code>没有跑通，所以只组装了一下数据模拟了发送邮件。原本的第五部分也在这里一起用上了。</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token comment">// broadcast.js</span>\n<span class="token comment">// ...</span>\nprogram\n    <span class="token punctuation">.</span><span class="token function">version</span><span class="token punctuation">(</span><span class="token string">\'0.0.1\'</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">option</span><span class="token punctuation">(</span><span class="token string">\'-l, --list [list]\'</span><span class="token punctuation">,</span> <span class="token string">\'list of customers in CSV file\'</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>process<span class="token punctuation">.</span>argv<span class="token punctuation">)</span>\n\n<span class="token keyword">const</span> <span class="token function-variable function">sendEmail</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span>to<span class="token punctuation">,</span> <span class="token keyword">from</span><span class="token punctuation">,</span> subject<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> sender <span class="token operator">=</span> chalk<span class="token punctuation">.</span><span class="token function">green</span><span class="token punctuation">(</span><span class="token template-string"><span class="token string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">from</span><span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">(</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">from</span><span class="token punctuation">.</span>email<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">)`</span></span><span class="token punctuation">)</span>\n    <span class="token keyword">const</span> receiver <span class="token operator">=</span> chalk<span class="token punctuation">.</span><span class="token function">green</span><span class="token punctuation">(</span><span class="token template-string"><span class="token string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>to<span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">(</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>to<span class="token punctuation">.</span>email<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">)`</span></span><span class="token punctuation">)</span>\n    <span class="token keyword">const</span> theme <span class="token operator">=</span> chalk<span class="token punctuation">.</span><span class="token function">blue</span><span class="token punctuation">(</span>subject<span class="token punctuation">)</span>\n\n    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>sender<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> send a mail to </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>receiver<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> and the subject of the email is </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>theme<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n\n<span class="token comment">// 储存CSV数据</span>\n<span class="token keyword">let</span> concatList <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>\n<span class="token keyword">const</span> stream <span class="token operator">=</span> fs<span class="token punctuation">.</span><span class="token function">createReadStream</span><span class="token punctuation">(</span>program<span class="token punctuation">.</span>list<span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">pipe</span><span class="token punctuation">(</span>csv<span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n    delimiter<span class="token punctuation">:</span> <span class="token string">\',\'</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">\'data\'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> name <span class="token operator">=</span> data<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token string">\' \'</span> <span class="token operator">+</span> data<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>\n    <span class="token keyword">const</span> email <span class="token operator">=</span> data<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span>\n\n    concatList<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n      name<span class="token punctuation">:</span> name<span class="token punctuation">,</span>\n      email<span class="token punctuation">:</span> email\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">\'end\'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    inquirer<span class="token punctuation">.</span><span class="token function">prompt</span><span class="token punctuation">(</span>questions<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span>ans<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n      <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> concatList<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token function">sendEmail</span><span class="token punctuation">(</span>concatList<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> ans<span class="token punctuation">.</span>sender<span class="token punctuation">,</span> ans<span class="token punctuation">.</span>subject<span class="token punctuation">)</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<p>由于没有异步请求，<code class="language-text">async</code>模块没有用上，另外使用了<code class="language-text">chalk</code>模块改变了console打印结果的颜色。</p>\n<h2>变成bash命令</h2>\n<p>至此，整个工具已经基本完成，但是如果想像一个普通的bash命令(不加<code class="language-text">$ node xx</code>)执行，还需要做以下操作。首先，添加<a href="https://zh.wikipedia.org/wiki/Shebang">shebang</a>在js的头部，让bash知道如何执行这个文件。</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript">#<span class="token operator">!</span><span class="token operator">/</span>usr<span class="token operator">/</span>bin<span class="token operator">/</span>env node\n\n<span class="token comment">// broadcast.js</span>\n<span class="token keyword">const</span> program <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"commander"</span><span class="token punctuation">)</span>\n<span class="token keyword">const</span> inquirer <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"inquirer"</span><span class="token punctuation">)</span>\n<span class="token comment">// ...</span>\n</code></pre>\n      </div>\n<p>然后再配置一下<code class="language-text">package.json</code>使代码可运行</p>\n<div class="gatsby-highlight">\n      <pre class="language-json"><code class="language-json">…\n  <span class="token property">"description"</span><span class="token operator">:</span> <span class="token string">"CLI utility to broadcast emails"</span><span class="token punctuation">,</span>\n  <span class="token property">"main"</span><span class="token operator">:</span> <span class="token string">"broadcast.js"</span><span class="token punctuation">,</span>\n  <span class="token property">"bin"</span> <span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token property">"broadcast"</span> <span class="token operator">:</span> <span class="token string">"./broadcast.js"</span>\n  <span class="token punctuation">}</span>\n…\n</code></pre>\n      </div>\n<p>从代码可以看到加了一个<a href="https://docs.npmjs.com/files/package.json#bin"><code class="language-text">bin</code></a>的参数，这个参数可以使broadcast命令与broadcast.js建立连接。</p>\n<p>最后一步，在全局安装一下依赖包。在项目目录运行一下下面的命令。</p>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code class="language-bash">$ <span class="token function">npm</span> <span class="token function">install</span> -g\n</code></pre>\n      </div>\n<p>然后测试一下命令</p>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code class="language-bash">$ broadcast --help\n</code></pre>\n      </div>\n<p>需要注意的是，在开发时候如果使用<code class="language-text">commaner</code>默认给出的命令执行<code class="language-text">broadcast</code>则在代码中所做的任何更改都是看不见的。假如输入<code class="language-text">which broadcast</code>，你会发现地址不是你当前目录，所以这时应该要用<code class="language-text">npm link</code>去查看命令的目录映射。</p>',
frontmatter:{date:"May 16, 2017",path:"/post/node-command-app",title:"使用nodejs写一个命令行程序"},headings:[{depth:2,value:"“Hello World”"},{depth:2,value:"处理命令行参数"},{depth:2,value:"运行时输入参数"},{depth:2,value:"模拟发送邮件"},{depth:2,value:"变成bash命令"}]}},pathContext:{prev:{title:"前端单元测试&Mocha指北",date:"2017-05-16",category:["前端"],tags:null,path:"/post/unit-test"},next:{title:"React-todo demo",date:"2016-03-02",category:["js framework"],tags:["React","Webpack","js框架"],path:"/post/react-todo"}}}}});
//# sourceMappingURL=path---post-node-command-app-3f11b6868ced016f6c3e.js.map