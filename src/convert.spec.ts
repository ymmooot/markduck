import { CreateElement } from 'vue';
import convert from './convert';

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
  const vnodes = convert(mockH, markdown, { components: {}, remarkPlugins: [] });

  expect(vnodes).toEqual([
    [
      'div',
      { attrs: undefined },
      [
        ['h1', { attrs: undefined }, ['title']],
        '\n',
        ['p', { attrs: undefined }, ['plain text.']],
        '\n',
        ['h2', { attrs: undefined }, ['sub title']],
        '\n',
        [
          'ul',
          { attrs: undefined },
          [
            '\n',
            ['li', { attrs: undefined }, ['list1']],
            '\n',
            [
              'li',
              { attrs: undefined },
              ['list2 with ', ['img', { attrs: { alt: 'image', src: 'https://example.com/hoge.jpg' } }, []]],
            ],
            '\n',
            ['li', { attrs: undefined }, ['list3']],
            '\n',
          ],
        ],
      ],
    ],
  ]);
});
