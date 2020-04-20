let cp = require('./main');

cp.log('Hello');

cp.log(1);

cp.log({a: 'b'});

cp.info('i');

cp.warn('w', 'WARRRRRRRNNNNNNNN');

cp.group('g1');

cp.group('g2');

cp.error('hi');

cp.ungroup();

cp.group('g3');

cp.ungroup();

cp.catch(new Error('e'));

cp.ungroup()

cp.group('Catched errors');

cp.uncatch();

cp.ungroup();

cp.table([1, 2, 12]);

//cp.info(cp.read('test> '));

//cp.print('\n');

cp.print('hello');

cp.log('');

cp.indent();
cp.print('indented')

/* THROWS */

// cp.fatal(new Error('f'));