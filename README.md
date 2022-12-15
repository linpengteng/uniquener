# A unique code generator
<p align="left">
  <a href="https://www.npmjs.com/package/uniquener"><img src="https://img.shields.io/npm/v/uniquener.svg" alt="npm package"></a>
  <a href="https://nodejs.org/en/about/releases/"><img src="https://img.shields.io/node/v/uniquener.svg" alt="node compatibility"></a>
  <a href="https://www.npmjs.com/package/uniquener"><img src="https://img.shields.io/npm/dm/uniquener.svg?sanitize=true" alt="downloads"></a>
  <a href="https://www.npmjs.com/package/uniquener"><img src="https://img.shields.io/npm/l/uniquener.svg?sanitize=true" alt="License"></a>
</p>

## [README.en.md](https://github.com/linpengteng/uniquener/blob/main/README.en.md)

```javascript
/**
 * ouput:
 *  'f26b0ca7-6bc9-5f0d-863e-e867318fc484'
 *  '0fbd8373-3072-5b20-9ad8-9d407a45999f'
 */
Uniquener()
Uniquener()

/**
 * ouput:
 *  'b682-9ce4-50cc'
 *  '50f0-9p2b-4421'
 */
Uniquener({ format: '????-9[a-f,o,p,q]??-???[1,8,a,c]' })
Uniquener({ format: '????-9[a-f,o,p,q]??-???[1,8,a,c]' })

/**
 * ouput:
 *  '20221125030308622|stamp:1669316588622'
 *  '2022-11-25 03:04:51:983|stamp:1669316691983'
 *  '2022-11-25-03-05-20-560|stamp:1669316720560'
 */
Uniquener({ format: '[time:YYYYMMDDHHmmssiii]|stamp:[time:stamp]' })
Uniquener({ format: '[time:YYYY-MM-DD HH:mm:ss:iii]|stamp:[time:stamp]' })
Uniquener({ format: '[time:YYYY-MM-DD-HH-mm-ss-iii]|stamp:[time:stamp]' })

/**
 * ouput:
 *  '3793-1f?-572-??08'
 *  'e2b1-ef?-61d-??58'
 *  'rqff-q9?-5fq-??e8'
 *  'b2s5-c9?-5xj-??m8'
 */
Uniquener({ format: '####-#[9,f]?-[5-6]##-??#[1,8]', radix: 10, random: '#' })
Uniquener({ format: '####-#[9,f]?-[5-6]##-??#[1,8]', radix: 16, random: '#' })
Uniquener({ format: '####-#[9,f]?-[5-6]##-??#[1,8]', radix: 26, random: '#' })
Uniquener({ format: '####-#[9,f]?-[5-6]##-??#[1,8]', radix: 36, random: '#' })
```

<br/>

# Run View
> [https://linpengteng.github.io/example/uniquener](https://linpengteng.github.io/example/uniquener)

<br/>

# Browser
```html
  <script src="https://linpengteng.github.io/resource/uniquener/index.browser.js"></script>
```

<br/>

# Installation
```bash
  yarn add uniquener
  pnpm add uniquener
```

<br/>

# Usage
```javascript
  import Uniquener from 'uniquener'

  Uniquener({
    radix: 16,
    random: '?',
    format: '????????-????-[1-5]???-[8-b]???-????????????',
    algorithm: 'Math.random',
    usedUniques: null,
    listenCacherHandler: null,
    reduplicateHandler: null,
    throwErrorHandler: null,
    reduplicateExit: true,
    onlyUpdate: false,
    tryCount: 10
  })
```

<br/>

# API - Uniquener Cacher
> 存储 Unique code 缓存区（Set\<string\>）, 不可直接引用  
> 每次 Uniquener 新生成，都会调用 listenCacherHandler 传输 Cacher 副本

<br/>

# API - Uniquener Options
## radix - 进制数
> 类型：2 | 8 | 10 | 16 | 26 | 36
>
> 默认：16
> 
> 值 2：0-1;  
> 值 8：0-7;  
> 值 10：0-9;  
> 值 16：0-9 And a-f;  
> 值 26：a-z;  
> 值 36：0-9 And a-z;

## format - 模版格式
> 类型：string
>
> 默认：'????????-????-[1-5]???-[8-b]???-????????????'
>
> 注1：? => 进制范围内的值随机生成  
> 注2：[] => 区间范围内的值随机生成  
> 注3：[time:xxx] => 按时间顺序生成   
[time:YYYY] 年  
[time:MM] 月  
[time:DD] 天  
[time:HH] 时  
[time:mm] 分  
[time:ss] 秒  
[time:iii] 毫秒  
[time:stamp] 时间戳  

## random - 随机占位符
> 类型：'?' | '*' | '#'
>
> 默认：'?'

## algorithm - 随机所用算法
> 类型：'Math.random' | 'crypto.getRandomValues'
>
> 默认：'Math.random'
>
> 说明：在 Node 中使用 crypto.getRandomValues，需 node 版本 >= 17.4.0

## tryCount - 尝试重新生成的次数
> 类型：number+
>
> 默认：10
>
> 说明：尝试 tryCount 次生成还重复时，则调用 reduplicateHandler 或 抛出异常

## usedUniques -已使用过的 Unique code
> 类型：Array\<string> | Set\<string>
>
> 默认：null
>
> 说明：调用 Uniquener 时会储存至 Uniquener Cacher 中

## listenCacherHandler - Uniquener Cacher 监听器
> 类型：(options: Set\<string>) => void;
>
> 默认：(_: Set<string>) => {}
>
> 说明：Cacher 每次变动则会调用此函数，同步服务端 [Used unique code]  
> 注意：options 为 Uniquener Cacher 副本

## reduplicateHandler - Unique code 重复时, 扩容 format
> 类型：(options: Options) => Options;
>
> 默认：null
>
> 说明：函数中 options 并非拷贝，而是引用 Uniquener Options  
> 注意：仅在 reduplicateExit 为 false 时启用

## reduplicateExit - Unique code 重复时, 是否抛出异常
> 类型：boolean
>
> 默认：true

## throwErrorHandler - 抛出异常前处理 (finally)
> 类型：(options: Set\<string>) => void;
>
> 默认：null
>
> 说明：options 为 Uniquener Cacher 副本

## onlyUpdate - 是否仅更新 Uniquener Cacher
> 类型：boolean
>
> 默认：false
>
> 说明：值为 true 时，会调用 listenCacherHandler  
> 注意：Uniquener 不参与生成，会返回空字符串

<br/>

# 许可证
> MIT
