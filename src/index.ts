/**
 * Type
 */
type TypeOptions = {
  radix?: 10 | 16 | 36;
  format?: string | null;
  random?: '?' | '*' | '#' | null;
  includes?: Array<string> | Set<string> | null;
  listenHandler?: TypeListenHandler | null;
  errorHandler?: TypeErrorHandler | null;
  errorListen?: boolean | null;
  onlyUpdate?: boolean | null;
  errorExit?: boolean | null;
  tryCount?: number | null;
}
type TypeUniquener = (options?: TypeOptions) => string;
type TypeErrorHandler = (options: TypeOptions) => TypeOptions;
type TypeListenHandler = (options: Set<string>) => void;


/**
 * Cacher
 */
const Cacher: Set<string> = new Set()


/**
 * Uniquener
 */
const Uniquener: TypeUniquener = (options = {}) => {
  const includes = options.includes
  const errorExit = options.errorExit
  const onlyUpdate = options.onlyUpdate
  const errorListen = options.errorListen
  const errorHandler = options.errorHandler
  const listenHandler = options.listenHandler || ((_: Set<string>) => {})
  const regenerateExit = errorExit === true || typeof errorHandler !== 'function'

  let radix = options.radix || 16
  let random = options.random || '?'
  let format = options.format || null
  let tryCount = options.tryCount || 10

  if (onlyUpdate === true) {
    try {
      includes instanceof Array && includes.forEach(key => typeof key === 'string' && Cacher.add(key))
      includes instanceof Set && includes.forEach(key => typeof key === 'string' && Cacher.add(key))
      listenHandler(new Set(Cacher))
      return ''
    } catch {
      throw new Error('[Options.listenHandler] is Call Error')
    }
  }

  if (![10, 16, 36].includes(radix)) {
    radix = 16
  }

  if (!['?', '*', '#'].includes(random)) {
    random = '?'
  }

  if (String(format) !== format) {
    format = '????????-????-[1-5]???-[8-b]???-????????????'
    format = format.replace(/\?/g, random)
  }

  if (includes instanceof Array) {
    try {
      includes.forEach(key => typeof key === 'string' && Cacher.add(key))
      listenHandler(new Set(Cacher))
    } catch {
      throw new Error('[Options.listenHandler] is Call Error')
    }
  }

  if (includes instanceof Set) {
    try {
      includes.forEach(key => typeof key === 'string' && Cacher.add(key))
      listenHandler(new Set(Cacher))
    } catch {
      throw new Error('[Options.listenHandler] is Call Error')
    }
  }

  let unique = ''
  let regenerate = true
  let errorHandlered = false
  const characters = Array.from({ length: 36 }, (_, key) => key.toString(36))
  const appendCacher = Cacher.add.bind(Cacher)

  while (regenerate && tryCount--) {
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
      .map(v => v === random ? characters[Math.random() * radix | 0] : v)
      .join('')

    if (!Cacher.has(unique)) {
      try {
        regenerate = false
        appendCacher(unique)
        listenHandler(new Set(Cacher))
      } catch {
        throw new Error('[Options.listenHandler] is Call Error')
      }
    }
  }

  if (regenerate && regenerateExit) {
    try {
      errorListen === true && listenHandler(new Set(Cacher))
    } catch {
      throw new Error('[Options.listenHandler] is Call Error')
    }

    throw new Error('[Uniquener.Cacher] is Range Error')
  }

  if (regenerate && !regenerateExit) {
    try {
      const newOptions = errorHandler(options)
      const overOptions = { errorExit: true }

      errorHandlered = true

      return Uniquener({
        ...options,
        ...newOptions,
        ...overOptions
      })
    } catch {}

    try {
      errorListen === true && !errorHandlered && listenHandler(new Set(Cacher))
    } catch {
      throw new Error('[Options.listenHandler] is Call Error')
    }

    throw new Error(!errorHandlered ? '[Options.errorHandler] is Call Error' : '[Uniquener.Cacher] is Range Error')
  }

  return unique
}

export default Uniquener
