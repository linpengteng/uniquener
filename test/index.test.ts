import Uniquener from '../src/index'


/**
 * Regex
 */
const isMatchRegex = /[a-z0-9]{8}-[a-z0-9]{4}-[1-5][a-z0-9]{3}-[8-b][a-z0-9]{3}-[a-z0-9]{12}/


/**
 * Test Unit
 */
describe('Test Uniquener empty Options: ', () => {
  test('When Options is undefined', () => {
    expect(Uniquener()).toMatch(isMatchRegex)
  })

  test('When Options is empty Object', () => {
    expect(Uniquener({})).toMatch(isMatchRegex)
  })
})


describe('Test Uniquener radix Option: ', () => {
  test('When radix is invalid', () => {
    const options: any = { radix: 4 }
    expect(Uniquener(options)).toMatch(isMatchRegex)
  })

  test('When radix is valid', () => {
    const options: any = { radix: 8 }
    expect(Uniquener(options)).toMatch(/[0-8]{8}-[0-8]{4}-[1-5][0-8]{3}-[8-b][0-8]{3}-[0-8]{12}/)
  })

  test('When radix is 26', () => {
    const options: any = { radix: 26 }
    expect(Uniquener(options)).toMatch(isMatchRegex)
  })
})


describe('Test Uniquener format Option: ', () => {
  test('When format is undefined', () => {
    expect(Uniquener({})).toMatch(isMatchRegex)
  })

  test('When format has region', () => {
    const options: any = { format: '???-[ 1 , 5 , 6 ]??-[a-b]??' }
    expect(Uniquener(options)).toMatch(/[a-z0-9]{3}-[1,5,6][a-z0-9]{2}-[a,b][a-z0-9]{2}/)
  })

  test('When format has time', () => {
    const options: any = { format: '[time:YYYY]-[time:HH:ss:mm]' }
    expect(Uniquener(options)).toMatch(/[0-9]{4}-[0-2][0-9]:[0-5][0-9]:[0-5][0-9]/)
  })
})


describe('Test Uniquener random Option: ', () => {
  test('When random is invalid', () => {
    const options: any = { random: '#' }
    expect(Uniquener(options)).toMatch(isMatchRegex)
  })

  test('When random is valid', () => {
    const options: any = { random: '-' }
    expect(Uniquener(options)).toMatch(isMatchRegex)
  })
})


describe('Test Uniquener algorithm Option: ', () => {
  test('When algorithm is Math.random', () => {
    const options: any = { algorithm: 'Math.random' }
    expect(Uniquener(options)).toMatch(isMatchRegex)
  })

  test('When algorithm is crypto.getRandomValues', () => {
    const options: any = { algorithm: 'crypto.getRandomValues' }
    expect(Uniquener(options)).toMatch(isMatchRegex)
  })
})


describe('Test Uniquener usedUniques Option: ', () => {
  test('When usedUniques is empty Set', () => {
    const options: any = { usedUniques: new Set() }
    expect(Uniquener(options)).toMatch(isMatchRegex)
  })

  test('When usedUniques is empty Array', () => {
    const options: any = { usedUniques: [] }
    expect(Uniquener(options)).toMatch(isMatchRegex)
  })

  test('When usedUniques is not empty Set', () => {
    const options: any = { usedUniques: new Set(['test-set-xxxxxxx']) }
    expect(Uniquener(options)).toMatch(isMatchRegex)
  })

  test('When usedUniques is not empty Array', () => {
    const options: any = { usedUniques: ['test-array-xxxxxxx'] }
    expect(Uniquener(options)).toMatch(isMatchRegex)
  })
})


describe('Test Uniquener listenCacherHandler Option: ', () => {
  test('When listenCacherHandler is Function', () => {
    const options: any = { listenCacherHandler: jest.fn() }
    expect(Uniquener(options)).toMatch(isMatchRegex)
  })

  test('When listenCacherHandler is not Function', () => {
    const options: any = { listenCacherHandler: null }
    expect(Uniquener(options)).toMatch(isMatchRegex)
  })
})


describe('Test Uniquener reduplicateHandler Option: ', () => {
  test('When reduplicateHandler is Function', () => {
    const options: any = { reduplicateHandler: jest.fn() }
    expect(Uniquener(options)).toMatch(isMatchRegex)
  })

  test('When reduplicateHandler is not Function', () => {
    const options: any = { reduplicateHandler: null }
    expect(Uniquener(options)).toMatch(isMatchRegex)
  })
})


describe('Test Uniquener throwErrorHandler Option: ', () => {
  test('When throwErrorHandler is Function', () => {
    const options: any = { throwErrorHandler: jest.fn() }
    expect(Uniquener(options)).toMatch(isMatchRegex)
  })

  test('When throwErrorHandler is not Function', () => {
    const options: any = { throwErrorHandler: null }
    expect(Uniquener(options)).toMatch(isMatchRegex)
  })
})

describe('Test Uniquener reduplicateExit Option: ', () => {
  test('When reduplicateExit is true', () => {
    const options: any = { reduplicateExit: true }
    expect(Uniquener(options)).toMatch(isMatchRegex)
  })

  test('When reduplicateExit is false', () => {
    const options: any = { reduplicateExit: false }
    expect(Uniquener(options)).toMatch(isMatchRegex)
  })
})


describe('Test Uniquener onlyUpdate Option: ', () => {
  test('When onlyUpdate is true And usedUniques is Set', () => {
    const options: any = { onlyUpdate: true, usedUniques: new Set(['test-set-xxxxxxx']) }
    expect(Uniquener(options)).toBe('')
  })

  test('When onlyUpdate is true And usedUniques is Array', () => {
    const options: any = { onlyUpdate: true, usedUniques: ['test-set-xxxxxxx'] }
    expect(Uniquener(options)).toBe('')
  })

  test('When onlyUpdate is false', () => {
    const options: any = { onlyUpdate: false }
    expect(Uniquener(options)).toMatch(isMatchRegex)
  })
})


describe('Test Uniquener tryCount Option: ', () => {
  test('When tryCount is number', () => {
    const options: any = { tryCount: 8 }
    expect(Uniquener(options)).toMatch(isMatchRegex)
  })

  test('When tryCount is not number', () => {
    const options: any = { tryCount: '8' }
    expect(Uniquener(options)).toMatch(isMatchRegex)
  })
})
