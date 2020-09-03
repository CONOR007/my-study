import test from 'ava'
import conorPages from '..'

// TODO: Implement module test
test('<test-title>', t => {
  const err = t.throws(() => conorPages(100), TypeError)
  t.is(err.message, 'Expected a string, got number')

  t.is(conorPages('w'), 'w@zce.me')
  t.is(conorPages('w', { host: 'wedn.net' }), 'w@wedn.net')
})
