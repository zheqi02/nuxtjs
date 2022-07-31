---
title: 'Front-end development'
tag: 'Front-end development front-end development note web learn path ts WebAssembly rust 浏览器 前端开发 学习路线'
---

# ~~web标准~~与前端开发（学习路线） | 青训营笔记

**这是我参与「第四届青训营 」笔记创作活动的第1天** 

由李松峰老师给我们上的web标准与前端开发课，然后加上我个人的一些看法，因为前面互联网起源我相信网上资料已经很多了，所以这里就不过多展开叙述，感兴趣的可以去搜一些互联网起源的一些视频看，所以本次笔记涉及到以下几点，因为我也是个萌新，如果有不对的地方还请及时指正。

通过这篇笔记你可以学到什么：

- Web标准与前端开发课没有涉及到的技术
- 前端自学路线我个人的一些看法
- 以及对未来前端趋势概括，给出的一些经验
- 给想了解前端前沿、主流技术的萌新一点启发

笔记包括：

- 前端应用的领域
- 语言、框架、工具
- 前端学习的路线图
- 前端架构和变迁



## 前端应用的领域

前端开发主要应用领域在浏览器、安卓和ios，但是前端也可以用于桌面应用开发，npm包开发，甚至嵌入式开发

市面上主流浏览器，随着IE在6月份被结束生命周期，主要就chrome、edge、firefox、safari、opera等浏览器

移动端也就H5、小程序、app开发，小程序用得多的还是uniapp，app主要还得看flutter吧，在移动端flutter属实强大，是个不错的选择

然后是服务端的前端开发

现在的前端生态很大一部分功劳来自于nodejs，nodejs的express、koa作者写完跑路了，交给手底下的人维护，这个express和koa的作者确实厉害，手底下一大堆人都顶不了他一个，只能维护着

nodejs作者于2018年写了个叫deno的js运行时，说是nodejs缺陷太多了，写个deno来弥补，deno顾名思义delete nodejs，是一个js/ts运行时，可以直接编写ts而不需要打包编译，deno现在的框架是一个叫fresh的框架，我个人觉得deno的亮点在小恐龙很好看，fresh的夏日柠檬小恐龙很好看，哈哈，目前配合deno他自家的serverless平台deploy，倒是可以简单实现一个部署上线，听说什么没有构建步骤、零运行时开销、边缘实时渲染等等，fresh这个框架他们说是像nextjs和nestjs的结合版，整体偏向remix，说歪了，这里是vue3生态，看到这里跟我一起默念，谢谢你尤大赏口饭吃

deno解决了nodejs问题吗，首先不可否认，deno的开发体验确实不错，生态还不够完善，听说前段时间由红杉资本融资2100万美元，未来可期吧，然后解决好像首先是安全，文件的读写，网络那些都要使用终端命令开启，至于性能，还不如nodejs，感觉差了四分之一的性能，deno基于rust和谷歌v8吧好像，谷歌v8真是个老六，大家都说js拖了v8的后腿，然后说到性能这里不得不提到bunjs，是nodejs的**三倍**性能，妥妥的一个老六，是一个叫zig的语言编写，是一个ts/js运行时，一经发布就收获了快30k的star，底层没使用谷歌的v8引擎，而是JavaScriptcore引擎，说这个性能更高但是更难集成什么什么的感兴趣可以去[bun官网](https://bun.sh/)了解，三倍的nodejs性能能带来什么影响我也不多说了，懂得都懂

话说这个bunjs是一个人写了98%的代码，妥妥的卷王，一年写了百万行代码，好了bunjs先告一段落，来看看现在nodejs的一些框架，express、koa、koa2、egg、nestjs......

这里面我最看好的就是nestjs了吧，但是作为老牌框架express有着很强的生态，nestjs相当于一个封装，底层还是express，Fastify等框架，express处理并发相当low阿，但是生态强大，所以给了两种框架切换，可能可以切换别的框架但是会复杂，Fastify切换会快一点

egg的话也差不多，但是在国内用的人多一点，都可以选吧，见仁见智吧

至于express，koa那些可以写写小小项目，当然市面上也提供一些无头cms叫啥strapi也是比较有名的一个算是低代码的后端，操作仪表盘提供接口，用过一段时间，外包/毕设神器吧只能说，nuxt也有@nuxt/strapi，虽然我不会用这个但是仍然觉得很棒

然后是终端和桌面应用和移动端的前端开发

命令行是可以拿js写的，有专门的库干这个，有兴趣你也可以去写一个简易版cli

桌面跨端有新星tauri，老牌electron，这里推荐使用tauri，tauri基于rust，可以通过rust调用底层api，并且非常兼容前端大部分库和框架，基本就是你有一个项目代码放上去就能跑在你的桌面上，基本不怎么需要rust，tauri好像是使用的你本地的浏览器，他不会封装一个浏览器内核给你，打包体积也低，性能也高，然后基于前端开发的一些桌面应用都有一个通病在缩放窗口的时候会有个黑边，原因我记得是webview渲染速度跟不上桌面的渲染速度，这个问题vscode都有，但是不影响使用，不是吗

然后移动端不可否认谷歌flutter的地位，但是要去学习新的语言新的知识，这我只能说见仁见智吧

uniapp3也是个不错的选择，当然是在小程序方面，也就吃吃国内的小程序市场，现在也就eletron、tauri、flutter能看吧

## 语言、框架、工具

语言，一些基础的我也不讨论了，什么三剑客，重点说说WebAssembly

WebAssembly性能高吗，高啊，typescript有希望直接编译成WebAssembly吗而不是js，这个不好说，就目前来说，js生态还是很强大的，性能也不是特别差，wasm在特殊领域才能用上吧，我了解的是基本不可能，wasm目前只能使用c/c++、rust、wasmscript这几种方式开发，在一些高性能领域发挥作用

说到框架不得不重点说说vue3 vite esbuild ts那些

首先说说vue3，vue3嘛，懂得都懂，配合ts写起来舒服，性能比react高，react能写的vue都能写，vue简单，团队开发效率高，代码也配合更好，除了生态方面没有react强大

然后是vite，官方的说法是下一代打包构建工具，说到vite就不得不提起esbuild，esm

相信用了vite的小伙伴直呼回不去了，webpack真的太慢了，随着vite的日益完善，esbuild、esm的不断发展，在未来某一天占领webpack市场份额也说不定，esbuild是go语言编写的，是传统打包构建工具的10-100倍，包越大差距越大，esm全称es module，是一套现在主流浏览器都支持的代码规范，在浏览器中通过`<script type="module"></script>`原生支持 ESM，具体的可以去网上搜资料了解

esm比cjs，umd都要好，因为esm的特性以及esbuild的速度才导致了vite热更新快速的主要原因，所有代码都被打包成esm在浏览器上运行

至于typescript，是js的超集，编译时报错的特性写习惯了可能就离不开了

## 前端学习的路线图

下面路径的给个参考

尤大说2023年结束vue2的生命周期，vue2项目尽快迁移vue3，加上vite开箱即用的配置和自身的速度总结以下路线图：

- 亘古不变前端三剑客：HTML5、CSS3、JavaScript
- 写一个原生项目以及多个小demo，github上很多的
- 了解nodejs、npm、esm、js高级、es6等知识
- 学习vue3以及周边生态（pinia，router，element-plus，vueuse等），学习ts，学习tailwind，学习vite
- 写个项目练手
- 现在你可以选择背面试题找工作或者继续深造
- 学习nuxt3、uniapp3（小程序）、tauri等框架
- 写两个项目练手
- 深入学习vite3、mini-vue3、学习nodejs框架可以是nestjs
- 学习算法基础，网络方面知识，力扣先刷个2-300题吧
- 现在你又可以选择背八股文刷面试题找实习了
- 学习微前端，前端智能化，低代码，WebGL，WebRTC，WebSocket，WebWorker等
- 学习rust等对前端有用的底层语言

持续观察前端趋势，有什么更新更好的东西第一时间了解，在追求更新更好的技术的同时，当然也别忘了时长复习前端三剑客，vue3，ts等知识

vue3推荐观看这个文档https://staging-cn.vuejs.org/guide/introduction.html加视频

## 前端架构和变迁

计算机网络诞生于上个世纪60年代，标志性通信协议是TCP/IP

1989年诞生时，web由三种技术构成，分别是：HTML、HTTP、URL

CSS和JavaScript是在几年之后才出现的

上面的一笔带过就行了，这个查资料也有的，笔记重点不在这里

**变迁**

只读时代 1989-2004 代表技术：HTML、CSS、JavaScript

体验时代 2005-2010 代表技术：Ajax、Web api、jQuery

敏捷时代 2010-2021 代表技术：fetch、deno、vite3、vue3、nuxt3



以上就是我的笔记，至于web标准在哪，标准都是一些人制定的，通过层层审核放出来的，统一的标准确实给web开发带来了非常好的反响