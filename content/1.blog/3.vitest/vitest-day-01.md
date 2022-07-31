---
title: 'vitest-day-01'
tag: 'vitest, day-01, day-01-learn-vitest, vitestday01, vitestday01learnvitest 单元测试'
---

# 学习 vitest 单元测试

vitest 能减少项目中的 bug，并且提高项目的质量。在写测试的过程中能更好的优化项目，并且先写测试再写代码能让你考虑得更周全。其他的我也不知道了，现在开始学。内容仅供参考，观看时保持理智，我也是刚接触一点点单元测试方面知识，打算先学一下vitest然后观看崔老师的TDD重构mini-vue课程。  

我是antfu的铁粉，所以我更愿意使用vitest而不是jest，其次vite是我非常喜欢的一个打包构建工具，我也非常喜欢evan you所以我也更愿意使用vite而不是webpack，因为用了vite就回不去了，我可能会选择以后有时间再去浅学webpack，随着vite3的出现，我觉得vite会做的更好。

首先围绕几个方面测试，首先是测试 js，dom，异步那些，然后是测试组件，听说还有个什么 e2e 测试，在 npm init vue 的时候可以选择的，还没了解过，等学完 vitest 就去了解

### 安装 vitest

首先安装 vitest 到项目，没有的话创建一个，快速创建我推荐使用`npm init vue`{.bg-red-200}创建一个 vitest 项目，vitest 选上，e2e 别选

```json
"scripts": {
    "dev": "vite",
    "build": "run-p type-check build-only",
    "preview": "vite preview --port 4173",
    "test:unit": "vitest --environment jsdom",
    "build-only": "vite build",
    "type-check": "vue-tsc --noEmit -p tsconfig.vitest.json --composite false",
    "test": "vitest run --coverage --environment jsdom"
  },
  "dependencies": {
    "@unocss/reset": "^0.44.5",
    "@vueuse/core": "^8.9.4",
    "pinia": "^2.0.16",
    "vue": "^3.2.37",
    "vue-router": "^4.1.2"
  },
  "devDependencies": {
    "@iconify/json": "^2.1.80",
    "@testing-library/vue": "^6.6.1",
    "@types/jsdom": "^16.2.15",
    "@types/node": "^18.0.6",
    "@vitejs/plugin-vue": "^3.0.1",
    "@vue/compiler-sfc": "^3.2.37",
    "@vue/test-utils": "^2.0.2",
    "@vue/tsconfig": "^0.1.3",
    "c8": "^7.12.0",
    "eslint": "^8.20.0",
    "jsdom": "^20.0.0",
    "npm-run-all": "^4.1.5",
    "typescript": "~4.7.4",
    "unocss": "^0.44.5",
    "vite": "^3.0.2",
    "vitest": "^0.18.1",
    "vue-tsc": "^0.38.9"
  }
```

我装了额外的库，因为这是一个模板
执行 pnpm install 安装依赖
然后执行 pnpm test 会测试 hello world 的那个组件会生成一个 coverage 的文件夹，我也不知道干嘛的好像是覆盖测试的  
在 components 下面有一个**test**文件夹，里面有一个 HelloWorld.spec.ts 文件，是用来测试 hello world 组件的，
当然文件夹也可以叫 test，测试文件也可以以 HelloWorld.test.ts 结尾。

安装 vscode vitest 插件提升开发体验

```bash
 ✓ src/components/__tests__/HelloWorld.spec.ts (1)

Test Files  1 passed (1)
     Tests  1 passed (1)
      Time  2.52s (in thread 26ms, 9677.48%)

----------------|---------|----------|---------|---------|-------------------
File            | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------------|---------|----------|---------|---------|-------------------
All files       |     100 |      100 |     100 |     100 |
 HelloWorld.vue |     100 |      100 |     100 |     100 |
----------------|---------|----------|---------|---------|-------------------
```
测试涵盖几个方面，什么函数覆盖率什么哪行没有测试到什么的，都可以在c8的可视化界面看到，具体的我也忘了，之前没怎么学这个。  
```ts
import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import HelloWorld from '../HelloWorld.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(HelloWorld, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
```
简单介绍一下这个页面，从vitest导出3个测试函数，从vue测试工具导出一个应该是钩子吧，然后导入需要测试的组件。
然后定义一个测试块，然后一个it测试某个部分，我记得也可以导出test，把这个it换成test，it好像是兼容别的框架，test好像是jest的测试函数。  
在回调函数中定义一个wrapper，然后wrapper.text()来获取组件的文本，然后expect(wrapper.text()).toContain('Hello Vitest')来判断是否包含了这个字符串。  
expect好像是用来执行括号里的函数，然后有一大堆方法，用来匹配函数执行后的结果。  

### day01结束
day01简单介绍一下vitest，明天测ts文件，我先去研究一下。
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
......  