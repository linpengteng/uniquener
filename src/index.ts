/**
 * Type
 */
type TypeOptions = {
  radix?: 10 | 16 | 26 | 36;
  format?: string | null;
  random?: '?' | '*' | '#' | null;
  usedUniques?: Array<string> | Set<string> | null;
  listenCacherHandler?: TypeListenCacherHandler | null;
  reduplicateHandler?: TypeReduplicateHandler | null;
  throwErrorHandler?: TypeThrowErrorHandler | null;
  reduplicateExit?: boolean | null;
  onlyUpdate?: boolean | null;
  tryCount?: number | null;
}
type TypeUniquener = (options?: TypeOptions) => string;
type TypeListenCacherHandler = (options: Set<string>) => void;
type TypeReduplicateHandler = (options: TypeOptions) => TypeOptions;
type TypeThrowErrorHandler = (options: Set<string>) => void;


/**
 * Cacher
 */
const Cacher: Set<string> = new Set([''])


/**
 * Uniquener
 */
const Uniquener: TypeUniquener = (options = {}) => {
  const onlyUpdate = options.onlyUpdate
  const usedUniques = options.usedUniques
  const reduplicateExit = options.reduplicateExit !== false
  const throwErrorHandler = options.throwErrorHandler || ((_: Set<string>) => {})
  const reduplicateHandler = options.reduplicateHandler || ((o: TypeOptions) => o)
  const listenCacherHandler = options.listenCacherHandler || ((_: Set<string>) => {})
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

  if (![10, 16, 26, 36].includes(radix)) {
    radix = 16
  }

  if (!['?', '*', '#'].includes(random)) {
    random = '?'
  }

  if (String(format) !== format) {
    format = '????????-????-[1-5]???-[8-b]???-????????????'
    format = format.replace(/\?/g, random)
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

  if (usedUniques instanceof Set) {
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
  const characters = Array.from({ length: 36 }, (_, key) => key.toString(36))
  const appendCacher = Cacher.add.bind(Cacher)

  while (regenerate && tryCount-- > 0) {
    const template = format.replace(/\[([^\]]+?)\]/g, (match, group) => {
      if (typeof group === 'string') {
        const caches: Set<string> = new Set()
        const append = caches.add.bind(caches)
        const splits = group.toLowerCase().split(/\s*,\s*|\s+/g)
        const filters = splits.filter(str => /^[a-zA-Z0-9\-*?#]+$/ui.test(str))
        const isRange = (str: string) => /^[a-zA-Z0-9]-[a-zA-Z0-9]$/.test(str)

        const collects = filters.reduce((caches, string) => {
          if (isRange(string)) {
            const str1 = string.split('-')[0]
            const str2 = string.split('-')[1]
            const key1 = characters.indexOf(str1)
            const key2 = characters.indexOf(str2)
            const first = Math.min(key1, key2)
            const second = Math.max(key1, key2) + 1
            characters.slice(first, second).forEach(append)
          }

          if (!isRange(string)) {
            append(string)
          }

          return caches
        }, caches)

        const temp = Array.from(collects)
        const array = temp.filter(every => !!every)
        const index = Math.random() * array.length | 0

        return array[index] || ''
      }
      return match
    })

    unique = [...template.toLowerCase()]
      .filter(str => /^[a-zA-Z0-9\-*?#]+$/ui.test(str))
      .map(v => v === random ? characters[Math.random() * radix | 0 + (radix === 26 ? 10 : 0)] : v)
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
