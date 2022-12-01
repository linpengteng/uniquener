# A unique code generator

<p align="left">
  <a href="https://www.npmjs.com/package/uniquener"><img src="https://img.shields.io/npm/v/uniquener.svg" alt="npm package"></a>
  <a href="https://nodejs.org/en/about/releases/"><img src="https://img.shields.io/node/v/uniquener.svg" alt="node compatibility"></a>
  <a href="https://www.npmjs.com/package/uniquener"><img src="https://img.shields.io/npm/dw/uniquener.svg?sanitize=true" alt="downloads"></a>
  <a href="https://www.npmjs.com/package/uniquener"><img src="https://img.shields.io/npm/l/uniquener.svg?sanitize=true" alt="License"></a>
</p>

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
> Store the Unique code buffer (Set \<string >), which cannot be directly referenced.  
> Every time the Uniquener is newly generated, the listenCacherHandler will be called to transfer the Cacher copy.

<br/>

# API - Uniquener Options
## radix - Decimal number
> type：2 | 8 | 10 | 16 | 26 | 36
>
> default: 16
> 
> note1：2 -> 0-1;  
> note1：8 -> 0-7;  
> note1：10 -> 0-9;  
> note1：16 -> 0-9 And a-f;  
> note1：26 -> a-z;  
> note1：36 -> 0-9 And a-z;

## format - Template format
> type：string
>
> default：'????????-????-[1-5]???-[8-b]???-????????????'
>
> note1：? => Random generation of values in the decimal range  
> note2：[] => Random generation of values in the interval range  
> note3：[time:xxx] => Generate in chronological order   
-------- [time:YYYY] year  
-------- [time:MM] month  
-------- [time:DD] day  
-------- [time:HH] hour  
-------- [time:mm] minute  
-------- [time:ss] second  
-------- [time:iii] millisecond  
-------- [time:stamp] timestamp  

## random - Random placeholder
> type：'?' | '*' | '#'
>
> default：'?'

## algorithm - Random algorithm
> type：'Math.random' | 'crypto.getRandomValues'
>
> default：'Math.random'
>
> note：Use crypto GetRandomValues, node version>=17.4.0 is required

## tryCount - Number of attempts to reduplicate
> type：number+
>
> default：10
>
> note：When tryCount generation attempts are repeated, call reduplicateHandler or throw an exception

## usedUniques - Used Unique codes
> type：Array\<string> | Set\<string>
>
> default：null
>
> note：When Uniquener is called, it will be saved in the Uniquener Cacher

## listenCacherHandler - Uniquener Cacher Listener
> type：(options: Set\<string>) => void;
>
> default：(_: Set<string>) => {}
>
> note：This function will be called every time the Cacher changes, and the server [Used unique code] can be synchronized  
> note：Options is the Uniquener Cacher copy

## reduplicateHandler - When the unique code is repeated, the format can be expanded
> type：(options: Options) => Options;
>
> default：null
>
> note：The options in the function directly refer to the Uniquener Options
> note：Enabled only when reduplicateExit is false

## reduplicateExit - Whether to throw an exception when the unique code is repeated
> type：boolean
>
> default：true

## throwErrorHandler - Handling before throwing an exception
> type：(options: Set\<string>) => void;
>
> default：null
>
> note：Options is the Uniquener Cacher copy

## onlyUpdate - Only Update Uniquener Cacher 
> type：boolean
>
> default：false
>
> note：When the value is true, listenCacherHandler will be called  
> note：Uniquener does not participate in the generation, and will return an empty string

<br/>

# Licence
> MIT
