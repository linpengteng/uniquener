# A unique code generator

```javascript
Uniquener() // 'f26b0ca7-6bc9-5f0d-863e-e867318fc484'
Uniquener() // '0fbd8373-3072-5b20-9ad8-9d407a45999f'

Uniquener({ format: '????-9[a-f,o,p,q]??-???[1,8,a,c]' }) // 'b682-9ce4-50cc'
Uniquener({ format: '????-9[a-f,o,p,q]??-???[1,8,a,c]' }) // '50f0-9p2b-4421'

Uniquener({ format: '##[9,f]?-#[5-6]##-??#[1,8]', radix: 10, random: '#' }) // '09f?-3621-??21'
Uniquener({ format: '##[9,f]?-#[5-6]##-??#[1,8]', radix: 16, random: '#' }) // '65f?-25f8-??b8'
Uniquener({ format: '##[9,f]?-#[5-6]##-??#[1,8]', radix: 26, random: '#' }) // 'brf?-e5av-??a1'
Uniquener({ format: '##[9,f]?-#[5-6]##-??#[1,8]', radix: 36, random: '#' }) // '9u9?-z6ho-??v1'

Uniquener({ format: 'year=[timer:YYYY];date=[timer:YYYY-MM-DD HH:mm:ss:iii]' }) // 'year=2022;date=2022-11-24 16:24:10:374'
Uniquener({ format: 'year=[timer:YYYY];date=[timer:YYYY-MM-DD HH:mm:ss:iii]' }) // 'year=2022;date=2022-11-24 16:24:41:483'
Uniquener({ format: 'year=[timer:YYYY];date=[timer:YYYY-MM-DD HH:mm:ss:iii]' }) // 'year=2022;date=2022-11-24 16:24:54:744'
```

<br/>

# Installation
```bash
  yarn add uniquener
  pnpm add uniquener
```

<br/>

# Browser
```html
  <script src="https://linpengteng.github.io/resource/uniquener/index.browser.js"></script>
```

<br/>

# Usage
```javascript
  import Uniquener from 'uniquener'

  Uniquener({
    radix: 16,
    random: '?',
    format: '????????-????-[1-5]???-[8-b]???-????????????',
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
> 类型：10 | 16 | 26 | 36
>
> 默认：16
> 
> 值 10：0-9;  
> 值 16：0-9 And a-f;  
> 值 26：a-z;  
> 值 36：0-9 And a-z;

## format - 模版格式
> 类型：string
>
> 默认：'????????-????-[1-5]???-[8-b]???-????????????'
>
> 说明：? => 进制范围内的值随机生成  
> 说明：[] => 区间范围内的值随机生成  
> 说明：timer => 按时间顺序生成，格式 [timer:xxxx]  
> timer: YYYY: 年  
> timer: MM: 月  
> timer: DD: 天  
> timer: HH: 时  
> timer: mm: 分  
> timer: ss: 秒  
> timer: iii: 毫秒  

## random - 随机占位符
> 类型：'?' | '*' | '#'
>
> 默认：'?'

## tryCount - 尝试重新生成的次数
> 类型：number+
>
> 默认：10
>
> 说明：尝试 tryCount 次生成还重复时，则调用 reduplicateHandler 或 抛出异常

## usedUniques - 储存已使用的 Unique code
> 类型：Array\<string> | Set\<string>
>
> 默认：null
>
> 说明：调用 Uniquener 时会储存至 Uniquener Cacher 中

## listenCacherHandler - Unique Cacher 监听器
> 类型：(options: Set\<string>) => void;
>
> 默认：(_: Set<string>) => {}
>
> 说明：Cacher 每次变动则会调用此函数，同步服务端 [Used unique code]  
> 注意：options 为 Cacher 副本

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
> 说明：options 为 Cacher 副本

## onlyUpdate - 是否仅更新 Unique Cacher
> 类型：boolean
>
> 默认：false
>
> 说明：值为 true 时，会调用 listenCacherHandler  
> 注意：Uniquener 不参与生成，返回空字符串

<br/>

# 许可证
> MIT
