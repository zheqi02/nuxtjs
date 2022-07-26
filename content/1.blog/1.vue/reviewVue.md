---
title: 'vue review'
tags: 'vue review, vue, vue基础, vue框架, vue技术, vue01, vue-01'
---
[面向有基础且快速复习的作用，着重容易忘、重要、细节知识点]{.text-green-400}

#### 模板语法

模板语法比`jsx/tsx`编译速度要快，vue 是一个编译+运行的框架

指令：如`v-if`{.bg-primary-400}、`v-html`{.bg-primary-400}、`v-text`{.bg-primary-400}、`v-pre`{.bg-primary-400}、`v-cloak`{.bg-primary-400}、`v-once`{.bg-primary-400}等等

动态参数：比如`v-bind[value]`{.bg-primary-400} 或者简写`:[value]`{.bg-primary-400}

修饰符：比如 `@submit.prevent`{.bg-primary-400}

#### 响应式基础

reactive：创建一个响应式引用类型（对象、数组、set、map）

dom 更新时机： vue dom 更新是异步的，无论多少次更改，每隔组件只更新一次

状态改变后的 dom 更新完成可以使用`nextTick()`{.bg-primary-400}这个全局 API

reactive 是默认深层响应式的，也可以用 shallowReactive 创建浅层，更改深层数据不会

触发视图更新，但是同时更改响应式的数据，底层会调用一个方法会强制刷新视图，

会导致 shallowReactive 创建出来的深层数据触发视图更新

ref：需要.value 取数据，可以解构数据出来还是响应式，但是 reactive 不行，可以使用

`foo.value = []`{.bg-primary-400}来清空这个数组不丢失响应式，但是 reactive 不行，reactive 可以

使用`foo.length = 0`{.bg-primary-400}的方式清空数组或者:`let { foo } = toRefs(reactive({ foo: [] }))`{.bg-primary-400}

这样定义数组并`foo = []`{.bg-primary-400} 来清空数组不丢失 foo 的响应式

ref 除了在模板中不用.value 在响应式对象中也会自动解包 `count = ref(0)`{.bg-primary-400}

`state = reactive({ count })`{.bg-primary-400} count 不用.value，count.value 和 count.value 指向同一块内存地址

使用 map 如果 value 是一个响应式也要.value

#### 计算属性

可写计算属性，返回值是 get 里返回的，修改操作在 set

```ts
const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed({
  get() {
    return `${firstName.value} ${lastName.value}`
  },
  set(newValue) {
    const parts = newValue.split(' ')
    firstName.value = parts[0]
    lastName.value = parts[1]
  }
})

const change = () => {
  fullName.value = 'Jane Doe'
}
```

不要在计算属性异步请求或者修改 dom，计算属性的返回值应该视为只读属性而不应该被修改

#### 动态 class 和 style 和 v-if

```html
<div :class="响应式类名" class="xxx"></div>
<div :class="{ 类名: 布尔值, 'text-danger': true }" class="xxx"></div>
<div :class="['class1', 'class2']" class="xxx"></div>
<div :class="[{ class: true }]" class="xxx"></div>
```

style 一样

'case-sensitive'或者 camelCase 指定属性，多值使用数组 key: ['value1', 'value2'...]

v-if 在 vue3 优先级高于 v-for vue2 反之，不能写同一个标签上，但是可以这样

```html
<template v-for="x in xx" key="x">
  <div v-if="!x.isx"></div>
</template>
```

#### 列表渲染

```html
<span v-for="n in 10" :key="'一定要加key' + n"> {{ n[1..11] }} </span>
```

计算属性中谨慎使用 reveres 和 sort 这两个会变更数组所以应该拷贝出来用，避免影响原数组

#### 事件和表单处理

```ts
'<button @click="greet($event)">a</button>'

const greet = event => {
  ;(event.target as HTMLElement).tagName
}
```

事件修饰符

```html
<!-- 单击事件将停止传递 -->
<a @click.stop="doThis"></a>

<!-- 提交事件将不再重新加载页面 -->
<form @submit.prevent="onSubmit"></form>

<!-- 修饰语可以使用链式书写 -->
<a @click.stop.prevent="doThat"></a>

<!-- 也可以只有修饰符 -->
<form @submit.prevent></form>

<!-- 仅当 event.target 是元素本身时才会触发事件处理器 -->
<!-- 例如：事件处理器不来自子元素 -->
<div @click.self="doThat">...</div>

<!-- 添加事件监听器时，使用 `capture` 捕获模式 -->
<!-- 例如：指向内部元素的事件，在被内部元素处理前，先被外部处理 -->
<div @click.capture="doThis">...</div>

<!-- 点击事件最多被触发一次 -->
<a @click.once="doThis"></a>

<!-- 滚动事件的默认行为 (scrolling) 将立即发生而非等待 `onScroll` 完成 -->
<!-- 以防其中包含 `event.preventDefault()` -->
<div @scroll.passive="onScroll">...</div>
```

按键修饰符

```html
<!-- 仅在 `key` 为 `Enter` 时调用 `vm.submit()` -->
<input @keyup.enter="submit" />

可以直接使用 KeyboardEvent.key 暴露的按键名称作为修饰符，但需要转为 kebab-case
形式
<input @keyup.page-down="onPageDown" />
在上面的例子中，仅会在 $event.key 为 'PageDown' 时调用事件处理 Vue
为一些常用的按键提供了别名： .enter .tab .delete
(捕获“Delete”和“Backspace”两个按键) .esc .space .up .down .left .right
你可以使用以下系统按键修饰符来触发鼠标或键盘事件监听器，只有当按键被按下时才会触发。
.ctrl .alt .shift .meta
<!-- Alt + Enter -->
<input @keyup.alt.enter="clear" />
<!-- Ctrl + 点击 -->
<div @click.ctrl="doSomething">Do something</div>

.exact 修饰符允许控制触发一个事件所需的确定组合的系统按键修饰符
<!-- 当按下 Ctrl 时，即使同时按下 Alt 或 Shift 也会触发 -->
<button @click.ctrl="onClick">A</button>

<!-- 仅当按下 Ctrl 且未按任何其他键时才会触发 -->
<button @click.ctrl.exact="onCtrlClick">A</button>

<!-- 仅当没有按下任何系统按键时触发 -->
<button @click.exact="onClick">A</button>

鼠标 .left .right .middle
```

```
<input
  :value="text"
  @input="event => text = event.target.value">
```

`v-model`{.bg-primary-400} 指令帮我们简化了这一步骤：

```
<input v-model="text">
```

还可用于 &lt;textarea&gt; 和 &lt;select&gt;元素

修饰符

添加 `lazy`{.bg-primary-400} 修饰符来改为在每次 `change`{.bg-primary-400} 事件后更新数据

```
<!-- 在 "change" 事件后同步更新而不是 "input" -->
<input v-model.lazy="msg" />
```

.number .trim 等， vue3 可以有多个 v-model，没有.sync 了，组件上也可以 v-model 用于可复用的组件

生命周期不想说什么就那 12 个 8 个常用加上 2 个 keep-alive 的还有什么错误还有个啥的

#### watch

```ts
const a = ref(0)
watch(a, () => {
    a函数触发响应式时执行的回调
},{})

const x = ref(0)
const y = ref(0)

// 单个 ref
watch(x, (newX) => {
  console.log(`x is ${newX}`)
})

// getter 函数
watch(
  () => x.value + y.value,
  (sum) => {
    console.log(`sum of x + y is: ${sum}`)
  }
)

// 多个来源组成的数组
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x is ${newX} and y is ${newY}`)
})

const obj = reactive({ count: 0 })

// 这不起作用，因为你向 watch() 传入了一个 number
watch(obj.count, (count) => {
  console.log(`count is: ${count}`)
})

而是用 getter 函数
// 提供一个 getter 函数
watch(
  () => obj.count,
  (count) => {
    console.log(`count is: ${count}`)
  }
)
第三个参数是一个object可以{ deep: true }或者一个什么i还是什么开头的可以让watch一上来
就执行一遍
```

watchEffect

是懒执行的，依赖的的值触发响应式才会执行回调跟 computed 差不多。

watchEffect 一上来就会执行一遍回调`watchEffect`{.bg-primary-400} 仅会在其**同步**执行期间，才追踪依赖。

在使用异步回调时，只有在第一个 `await`{.bg-primary-400} 正常工作前访问到的 property 才会被追踪。

如果想在侦听器回调中能访问被 Vue 更新**之后**的 DOM，你需要指明 `flush: 'post'`{.bg-primary-400} 选项

```ts
watch(source, callback, {
  flush: 'post'
})

watchEffect(callback, {
  flush: 'post'
})
```

后置刷新的 `watchEffect()`{.bg-primary-400} 有个更方便的别名 `watchPostEffect()`{.bg-primary-400}：

```ts
import { watchPostEffect } from 'vue'

watchPostEffect(() => {
  /* 在 Vue 更新后执行 */
})
```

```ts
const unwatch = watchEffect(() => {})

// ...当该侦听器不再需要时
unwatch()
```

```ts
// 需要异步请求得到的数据
const data = ref(null)

watchEffect(() => {
  if (data.value) {
    // 数据加载后执行某些操作...
  }
})
```

#### 模板 ref（获取 dom）

```ts
// 声明一个 ref 来存放该元素的引用
// 必须和模板 ref 同名
const input = ref(null)
因为dom更新是异步的所以要在dom更新完成再操作dom
onMounted(() => {
  input.value.focus()
})
```

当 `ref` 在 `v-for`{.bg-primary-400} 中使用时，相应的 ref 中包含的值是一个数组，它将在元素被挂载后填充

ref 数组**不能**保证与源数组相同的顺序

除了使用字符串值作名字，`ref`{.bg-primary-400} attribute 还可以绑定为一个函数，会在每次组件更新时都被调用

函数接受该元素引用作为第一个参数：

```
<input :ref="(el) => { /* 将 el 分配给 property 或 ref */ }">
```

如果你正在使用一个动态的 `:ref`{.bg-primary-400} 绑定，我们也可以传一个函数。

当元素卸载时，这个 `el`{.bg-primary-400} 参数会是 `null`{.bg-primary-400}。你当然也可以使用一个方法而不是内联函数

`ref`{.bg-primary-400} 也可以被用在一个子组件上。此时 ref 中引用的是组件实例

#### 组件

父子传值就不用多说了

动态组件

```
<!-- currentTab 改变时组件也改变 -->
<component :is="tabs[currentTab]"></component>
```

可以通过 keep-alive 强制不活跃的组件仍然保持“存活”的状态 ，路由页面也可以 keep-alive 缓存

```
<table>
  <blog-post-row></blog-post-row>
</table>
```

自定义的组件将作为无效的内容被忽略，因而在最终呈现的输出中造成错误。

我们可以使用特殊的作为一种解决方案：

```
<table>
  <tr is="vue:blog-post-row"></tr>
</table>
```

当使用在原生 HTML 元素上时，`is`{.bg-primary-400} 的值必须加上前缀 `vue:`{.bg-primary-400} 才可以被解析为一个 Vue 组件。

这一点是必要的，为了避免和原生的 自定义内置元素 相混淆

大小写区分、闭合标签就不想多说了
