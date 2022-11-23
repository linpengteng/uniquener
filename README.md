# Uniquener ——— A unique code generator

```javascript
Uniquener() // 'f26b0ca7-6bc9-5f0d-863e-e867318fc484'
Uniquener() // '0fbd8373-3072-5b20-9ad8-9d407a45999f'
Uniquener() // '51da5471-4312-2ed0-b2ad-da16e87b99fd'

Uniquener({ format: '????-9[a-f]??-???[1,8,a,c]' }) // '9091-9d2a-9eac'
Uniquener({ format: '????-9[a-f]??-???[1,8,a,c]' }) // '064c-9e66-1bda'
Uniquener({ format: '????-9[a-f]??-???[1,8,a,c]' }) // '59d6-9f96-1fe8'

Uniquener({ format: '##[9,f]?-#[5-6]##-??#[1,8]', radix: 10, random: '#' }) // '09f?-3621-??21'
Uniquener({ format: '##[9,f]?-#[5-6]##-??#[1,8]', radix: 16, random: '#' }) // '65f?-25f8-??b8'
Uniquener({ format: '##[9,f]?-#[5-6]##-??#[1,8]', radix: 36, random: '#' }) // '9u9?-z6ho-??v1'
```

<br/>

# Install
```bash
  yarn add uniquener
  pnpm add uniquener
```

<br/>

# Usage
```javascript
  Uniquener({
    radix: 16,
    random: '?',
    format: '????????-????-[1-5]???-[8-b]???-????????????',
    includes: null,
    listenHandler: null,
    errorHandler: null,
    errorListen: false,
    onlyUpdate: false,
    errorExit: true,
    tryCount: 10
  })
```

<br/>

# API - Uniquener Cacher
> 存储 Unique code 缓存区（Set\<string\>）, 不可直接引用
>
> 每次 Uniquener 新生成时，会通过 listenHandler 传输 Cacher 副本

<br/>

# API - Uniquener Options
## radix - 随机数进制
> 类型：10 | 16 | 36
>
> 默认：16

## random - 随机占位符
> 类型：'?' | '*' | '#' 
>
> 默认：'?'

## format - 唯一值格式
> 类型：string
>
> 默认：'????????-????-[1-5]???-[8-b]???-????????????'

## tryCount - 重复时重新生成的尝试次数
> 类型：number
>
> 默认：10
>
> 说明：当 tryCount 次生成还重复时，如果 errorExit 为 true 或者 errorHandler 不为 Function, 则抛出异常

## includes - 现有的 Unique code 存储
> 类型：Array\<string> | Set\<string>
>
> 默认：null
>
> 说明：会添加到 Uniquener Cacher 中

## listenHandler - Unique Cacher 监听器
> 类型：(options: Set\<string>) => void;
>
> 默认：(_: Set<string>) => {}
>
> 说明：Cacher 每次变动否会调用此函数，可用与服务端同步[现已有 Unique code], options 为 Cacher 副本

## errorHandler - Unique 异常时处理, 常用于修改format进行扩容
> 类型：(options: Options) => Options;
>
> 默认：null
>
> 说明：此函数的 options 并非拷贝，而是直接引用 Uniquener Options，另该函数仅在 errorExit 不为 true 时启用

## errorListen - 抛出异常时，是否调用 listenHandler 函数
> 类型：boolean
>
> 默认：null

## errorExit - 尝试 tryCount 次数生成失败后，是否抛出异常
> 类型：boolean
>
> 默认：null

## onlyUpdate - 是否仅更新 Unique Cacher
> 类型：boolean
>
> 默认：null
>
> 说明：值为 true 时，会尝试将includes数据添加到 Cacher 中，无论成功失败都会调用 listenHandler 函数。最终 Uniquener 返回 空字符串, 不参与生成

<br/>

# 许可证
> MIT