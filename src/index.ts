import crypto from 'crypto'


/**
 * Type
 */
type TypeRandomizeOptions = {
  algorithm?: 'Math.random' | 'crypto.getRandomValues' | null;
  bytes: string[];
  max: number;
  min: number;
}

type TypeUniquenerOptions = {
  radix?: 10 | 16 | 26 | 36;
  format?: string | null;
  random?: '?' | '*' | '#' | null;
  algorithm?: 'Math.random' | 'crypto.getRandomValues' | null;
  usedUniques?: Array<string> | Set<string> | null;
  listenCacherHandler?: TypeListenCacherHandler | null;
  reduplicateHandler?: TypeReduplicateHandler | null;
  throwErrorHandler?: TypeThrowErrorHandler | null;
  reduplicateExit?: boolean | null;
  onlyUpdate?: boolean | null;
  tryCount?: number | null;
}

type TypeCacherOptions = Set<string>
type TypeListenCacherHandler = (options: TypeCacherOptions) => void;
type TypeReduplicateHandler = (options: TypeUniquenerOptions) => TypeUniquenerOptions;
type TypeThrowErrorHandler = (options: TypeCacherOptions) => void;
type TypeUniquener = (options?: TypeUniquenerOptions) => string;
type TypeRandomize = (options: TypeRandomizeOptions) => string;


/**
 * Cacher
 */
const Cacher: Set<string> = new Set([''])


/**
 * Uniquener
 */
const Uniquener: TypeUniquener = (options = {}) => {
  const algorithm = options.algorithm
  const onlyUpdate = options.onlyUpdate
  const usedUniques = options.usedUniques
  const reduplicateExit = options.reduplicateExit !== false
  const throwErrorHandler = options.throwErrorHandler || ((_: TypeCacherOptions) => {})
  const reduplicateHandler = options.reduplicateHandler || ((o: TypeUniquenerOptions) => o)
  const listenCacherHandler = options.listenCacherHandler || ((_: TypeCacherOptions) => {})
  const isExitOnRegenerate = reduplicateExit === true || typeof options.reduplicateHandler !== 'function'

  let radix = options.radix || 16
  let random = options.random || '?'
  let format = options.format || null
  let tryCount = typeof options.tryCount === 'number' ? options.tryCount : 10

  if (onlyUpdate === true) {
    try {
      usedUniques instanceof Array && usedUniques.forEach(key => typeof key === 'string' && Cacher.add(key.trim()))
      usedUniques instanceof Set && usedUniques.forEach(key => typeof key === 'string' && Cacher.add(key.trim()))
      listenCacherHandler(new Set(Cacher))
      return ''
    } catch {
      throwErrorHandler(new Set(Cacher))
      throw new Error('[Options.listenCacherHandler] is Call Error')
    }
  }

  if (![2, 8, 10, 16, 26, 36].includes(radix)) {
    radix = 16
  }

  if (!['?', '*', '#'].includes(random)) {
    random = '?'
  }

  if (String(format) !== format) {
    format = '????????-????-[1-5]???-[8-b]???-????????????'
    format = format.replace(/\?/g, random)
  }

  if (usedUniques instanceof Set) {
    try {
      usedUniques.forEach(key => typeof key === 'string' && Cacher.add(key.trim()))
      listenCacherHandler(new Set(Cacher))
    } catch {
      throwErrorHandler(new Set(Cacher))
      throw new Error('[Options.listenCacherHandler] is Call Error')
    }
  }

  if (usedUniques instanceof Array) {
    try {
      usedUniques.forEach(key => typeof key === 'string' && Cacher.add(key.trim()))
      listenCacherHandler(new Set(Cacher))
    } catch {
      throwErrorHandler(new Set(Cacher))
      throw new Error('[Options.listenCacherHandler] is Call Error')
    }
  }

  let unique = ''
  let regenerate = true
  let reduplicateCalled = false
  const byteOffset = radix === 26 ? 10 : 0
  const characters = Array.from({ length: 36 }, (_, key) => key.toString(36))
  const appendCacher = Cacher.add.bind(Cacher)

  const randomizer: TypeRandomize = opt => {
    const min = opt.min
    const max = opt.max
    const bytes = opt.bytes
    const algorithm = opt.algorithm

    return algorithm === 'crypto.getRandomValues'
      ? bytes[crypto.getRandomValues(new Uint8Array(1))[0] % (max - min + 1) + min | 0]
      : bytes[Math.random() * (max - min + 1) + min | 0]
  }

  while (regenerate && tryCount-- > 0) {
    const template = format.replace(/\[([^\]]+?)\]/g, (match, group) => {
      if (typeof group === 'string') {
        const caches: Set<string> = new Set()
        const append = caches.add.bind(caches)
        const splits = group.toLowerCase().split(/\s*,\s*/g)
        const filters = splits.filter(str => /^[a-zA-Z0-9\s/|\-*?#=:;]+$/ui.test(str))
        const isRange = (str: string) => /^\s*[a-zA-Z0-9]\s*-\s*[a-zA-Z0-9]\s*$/.test(str)
        const isTime = (str: string) => /^\s*time\s*:\s*(YYYY|MM|DD|HH|mm|ss|iii|stamp|:|-|\||\/|\s)+\s*$/.test(str)

        if (isTime(group.trim())) {
          const date = new Date()
          const time = `${date.getTime()}`
          const year = `${date.getFullYear()}`
          const month = date.getMonth() + 1 > 9 ? `${date.getMonth() + 1}` : `0${date.getMonth() + 1}`
          const minute = date.getMinutes() > 9 ? `${date.getMinutes()}` : `0${date.getMinutes()}`
          const second = date.getSeconds() > 9 ? `${date.getSeconds()}` : `0${date.getSeconds()}`
          const milli = date.getMilliseconds() > 99 ? `${date.getMilliseconds()}` : date.getMilliseconds() > 9 ? `0${date.getMilliseconds()}` : `00${date.getMilliseconds()}`
          const hours = date.getHours() > 9 ? `${date.getHours()}` : `0${date.getHours()}`
          const day = date.getDate() > 9 ? `${date.getDate()}` : `0${date.getDate()}`

          return group.trim()
            .replace(/^\s*time\s*:\s*/, '')
            .replace(/stamp/g, time)
            .replace(/YYYY/g, year)
            .replace(/MM/g, month)
            .replace(/DD/g, day)
            .replace(/HH/g, hours)
            .replace(/mm/g, minute)
            .replace(/ss/g, second)
            .replace(/iii/g, milli)
            .replace(/\s+/g, ' ')
        }

        const collects = filters.reduce((caches, string) => {
          if (isRange(string.trim())) {
            const str1 = string.trim().split(/\s*-\s*/)[0]
            const str2 = string.trim().split(/\s*-\s*/)[1]
            const key1 = characters.indexOf(str1.trim())
            const key2 = characters.indexOf(str2.trim())
            const first = Math.min(key1, key2)
            const second = Math.max(key1, key2) + 1
            characters.slice(first, second).forEach(append)
          }

          if (!isRange(string.trim())) {
            append(string.trim())
          }

          return caches
        }, caches)

        const temp = Array.from(collects)
        const bytes = temp.filter(every => !!every)

        return randomizer({
          bytes,
          algorithm,
          max: bytes.length - 1,
          min: 0
        })
      }
      return match
    })

    const min = 0
    const max = radix - 1
    const bytes = characters.slice(byteOffset)

    unique = [...template.toLowerCase()]
      .filter(str => /^[a-zA-Z0-9\s/|\-*?#=:;]+$/ui.test(str))
      .map(v => v === random ? randomizer({ bytes, algorithm, max, min }) : v)
      .join('')
      .trim()

    if (!Cacher.has(unique)) {
      try {
        regenerate = false
        appendCacher(unique)
        listenCacherHandler(new Set(Cacher))
      } catch {
        throwErrorHandler(new Set(Cacher))
        throw new Error('[Options.listenCacherHandler] is Call Error')
      }
    }
  }

  if (regenerate && isExitOnRegenerate) {
    throwErrorHandler(new Set(Cacher))
    throw new Error('[Uniquener generate unique] is Reduplicated')
  }

  if (regenerate && !isExitOnRegenerate) {
    try {
      const newOptions = reduplicateHandler(options)
      const overOptions = { reduplicateExit: true }

      reduplicateCalled = true

      return Uniquener({
        ...options,
        ...newOptions,
        ...overOptions
      })
    } catch {
      !reduplicateCalled && throwErrorHandler(new Set(Cacher))
      throw new Error(!reduplicateCalled ? '[Options.reduplicateHandler] is Call Error' : '[Uniquener generate unique] is Reduplicated')
    }
  }

  return unique
}

export default Uniquener
