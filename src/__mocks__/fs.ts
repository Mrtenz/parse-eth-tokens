import { basename } from 'path';

type Callback<T> = (error?: Error, data?: T) => void;

export default {
  readdir(path: string, callback: Callback<string[]>) {
    callback(undefined, ['bar.json', 'baz.json']);
  },

  readFile(path: string, encoding: string, callback: Callback<string>) {
    const file = basename(path);

    // Few different test cases
    let data;
    switch (file) {
      case 'foo.json':
        data = {
          address: '0x0',
          decimals: 18,
          symbol: 'FOO',
          name: 'Foo'
        };
        break;
      case 'bar.json':
        data = {
          address: '0x0000000000000000000000000000000000000000',
          decimals: 18,
          symbol: 'BAR',
          name: 'Bar'
        };
        break;
      case 'baz.json':
        data = {
          address: '0x0000000000000000000000000000000000000001',
          decimals: 18,
          symbol: 'BAZ',
          name: 'Baz'
        };
        break;
      case 'invalid.json':
        return callback(undefined, 'I am invalid JSON');
    }

    callback(undefined, JSON.stringify(data));
  },

  writeFile: jest
    .fn()
    .mockImplementation((path: string, data: string, encoding: string, callback: Callback<void>) =>
      callback()
    ),

  mkdir: jest
    .fn()
    .mockImplementation((path: string, options: any, callback: Callback<void>) => callback()),

  access: jest.fn().mockImplementation((path: string, callback: Callback<void>) => {
    const error = new Error() as NodeJS.ErrnoException;
    error.code = 'ENOENT';

    callback(error);
  })
};
