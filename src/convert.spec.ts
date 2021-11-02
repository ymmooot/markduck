import { h } from 'vue-demi';
import convert from './convert';

type CreateElement = typeof h

test('convert', () => {
  const markdown = `
# title

plain text.

## sub title

- list1
- list2 with ![image](https://example.com/hoge.jpg)
- list3
`;

  const mockH: CreateElement = jest.fn().mockImplementation((...args) => args);
  const vnodes = convert(mockH, markdown, {});

  expect(vnodes).toEqual([
    'div',
    {},
    [
      ['h1', {}, ['title']],
      '\n',
      ['p', {}, ['plain text.']],
      '\n',
      ['h2', {}, ['sub title']],
      '\n',
      [
        'ul',
        {},
        [
          '\n',
          ['li', {}, ['list1']],
          '\n',
          ['li', {}, ['list2 with ', ['img', { alt: 'image', src: 'https://example.com/hoge.jpg' }, undefined]]],
          '\n',
          ['li', {}, ['list3']],
          '\n',
        ],
      ],
    ],
  ]);
});
