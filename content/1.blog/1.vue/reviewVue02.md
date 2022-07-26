---
title: 'vue review 02'
tags: 'vue review 02, vue, vue基础, vue框架, vue技术, vue02, vue-02'
---

## vue review day02

### 组件注册

#### 全局注册

我们可以使用 app.component('name', {...})注册组件，这样就可以在任何地方使用该组件了。  
局部注册，在 setup 中可以直接引入一个 vue 组件，然后直接使用，不在 setup 则要返回  
使用 PascalCase 格式作为组件名的注册格式，在模板中可以使用 kebab-case 格式的组件名。

### props

```js
// js
const props = defineProps(['foo'])
console.log(props.foo)
```

```ts
// ts
const props = defineProps<{
  foo: string
}>()
console.log(props.foo)
```

```ts
// ts + 语法糖
const { foo = '1234' } = defineProps<{
  foo: string
}>()
console.log(props.foo)
```

### emit

```ts
const emit = defineEmit<{
  (e: 'change', id: number): void
}>()

emit('change', 1)
```

### v-model

双向绑定通常用于表单，相当于:value 和@input
组件的 v-model

```ts
<MyComponent v-model:title='bookTitle' />
```

```ts
<!-- MyComponent.vue -->
<script setup>
defineProps(['title'])
defineEmits(['update:title'])
</script>

<template>
  <input
    type="text"
    :value="title"
    @input="$emit('update:title', $event.target.value)"
  />
</template>
```

```ts
// 自定义组件v-model修饰符
<script setup>
const props = defineProps({
  modelValue: String,
  modelModifiers: { default: () => ({}) }
})

const emit = defineEmits(['update:modelValue'])

function emitValue(e) {
  let value = e.target.value
  if (props.modelModifiers.capitalize) {
    value = value.charAt(0).toUpperCase() + value.slice(1)
  }
  emit('update:modelValue', value)
}
</script>

<template>
  <input type="text" :value="modelValue" @input="emitValue" />
</template>
```

// 对于又有参数又有修饰符的 v-model 绑定，生成的 prop 名将是 arg + "Modifiers"。举个例子：

```ts
<MyComponent v-model:title.capitalize="myText">
// 则相应的声明应该是：

const props = defineProps(['title', 'titleModifiers'])
defineEmits(['update:title'])

console.log(props.titleModifiers) // { capitalize: true }
```

常用内置修饰符 .trim，.number 和 .lazy

### 透传 attribute

透传是传递给子组件的 attribute 或者 v-on 事件，但是并没有显式的声明，比如 class、style、id 等等。  
禁用 attribute 继承

```ts
<script>
// 使用普通的 <script> 来声明选项
export default {
  inheritAttrs: false
}
</script>

<script setup>
// ...setup 部分逻辑
</script>

// 禁用的可以通过$attrs来自由控制
// 设定 inheritAttrs: false 和使用 v-bind="$attrs" 来实现
```

多根节点，指定哪个继承，不然会有警告

```ts
<header>...</header>
<main v-bind="$attrs">...</main>
<footer>...</footer>
```

在 js/ts 中访问透传 attribute

```ts
<script setup>import {useAttrs} from 'vue' const attrs = useAttrs()</script>
```

需要注意的是，虽然这里的 attrs 对象总是反映为最新的透传 attribute，但它并不是响应式的 (考虑到性能因素)。你不能通过侦听器去监听它的变化。如果你需要响应性，可以使用 prop。或者你也可以使用 onUpdated() 使得在每次更新时结合最新的 attrs 执行副作用。

### 插槽

```ts
<button type='submit'>
  <slot>abc</slot>
</button>
// 有内容显示父组件里面自身标签中间的内容，没有就显示插槽里的默认内容
```

具名插槽

```ts
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
// 父
<BaseLayout>
  <template v-slot:header>
    <!-- header 插槽的内容放这里 -->
  </template>
</BaseLayout>
```

简写具名插槽和默认插槽

```ts
<BaseLayout>
  <template #header>
    <h1>Here might be a page title</h1>
  </template>

  <template #default>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </template>

  <template #footer>
    <p>Here's some contact info</p>
  </template>
</BaseLayout>
```

动态具名插槽

```ts
<base-layout>
  <template v-slot:[dynamicSlotName]>
    ...
  </template>

  <!-- 缩写为 -->
  <template #[dynamicSlotName]>
    ...
  </template>
</base-layout>
```

作用域插槽

```ts
<MyComponent v-slot="slotProps">
  {{ slotProps.text }} {{ slotProps.count }}
</MyComponent>
```

具名作用域插槽

```ts
<MyComponent>
  <template #header='headerProps'>{{ headerProps }}</template>

  <template #default='defaultProps'>{{ defaultProps }}</template>

  <template #footer='footerProps'>{{ footerProps }}</template>
</MyComponent>
```
无渲染组件
```ts
<MouseTracker v-slot="{ x, y }">
  Mouse is at: {{ x }}, {{ y }}
</MouseTracker>
```
### 依赖注入
```ts
<script setup>
import { provide } from 'vue'

provide(/* 注入名 */ 'message', /* 值 */ 'hello!')
</script>

// 可以是响应式的value
import { ref, provide } from 'vue'

const count = ref(0)
provide('key', count)
```
注入
```ts
<script setup>
import { inject } from 'vue'

const message = inject('message')
</script>
// 如果没有祖先组件提供 "message"
// `value` 会是 "这是默认值"
const value = inject('message', '这是默认值')
```
还可以使用symbol注入确保唯一
### 异步组件
```ts
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
)
```
可以实现延迟加载，仅在页面需要的时候进行加载，实现一个懒加载效果，可以搭配suspense内置组件使用  
。。。  
。。。  
。。。 
