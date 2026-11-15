import { normaliseHtml } from './normalise-html';

describe('normaliseHtml', () => {
  test('ignores formatting whitespace and attribute order', () => {
    expect(normaliseHtml('<div class="b a" id="x">\n  <span>Hi</span>\n</div>')).toBe(
      normaliseHtml('<div id="x" class="a b"><span>Hi</span></div>'),
    );
  });

  test('keeps meaningful whitespace between inline content', () => {
    expect(normaliseHtml('<p><span>Error:</span> Message</p>')).not.toBe(
      normaliseHtml('<p><span>Error:</span>Message</p>'),
    );
  });

  test('keeps whitespace between inline elements', () => {
    expect(normaliseHtml('<a><span>Start</span> <svg></svg></a>')).not.toBe(
      normaliseHtml('<a><span>Start</span><svg></svg></a>'),
    );
  });

  test('ignores whitespace next to block elements', () => {
    expect(normaliseHtml('<fieldset>\n  <legend>A</legend>\n  <div>B</div>\n</fieldset>')).toBe(
      normaliseHtml('<fieldset><legend>A</legend><div>B</div></fieldset>'),
    );
  });

  test('ignores whitespace between SVG shapes', () => {
    expect(normaliseHtml('<svg><g>\n  <circle/>\n  <path/>\n</g></svg>')).toBe(
      normaliseHtml('<svg><g><circle></circle><path></path></g></svg>'),
    );
    expect(normaliseHtml('<span><svg></svg> <span>Licence</span></span>')).not.toBe(
      normaliseHtml('<span><svg></svg><span>Licence</span></span>'),
    );
  });

  test('ignores formatting in inline styles', () => {
    expect(normaliseHtml('<p style="white-space: nowrap;"></p>')).toBe(
      normaliseHtml('<p style="white-space:nowrap"></p>'),
    );
    expect(normaliseHtml('<p style="color: red"></p>')).not.toBe(
      normaliseHtml('<p style="color: blue"></p>'),
    );
  });

  test('detects attribute, element and text differences', () => {
    const base = normaliseHtml('<a href="/" role="button">Go</a>');
    expect(normaliseHtml('<a href="/">Go</a>')).not.toBe(base);
    expect(normaliseHtml('<button href="/" role="button">Go</button>')).not.toBe(base);
    expect(normaliseHtml('<a href="/" role="button">Stop</a>')).not.toBe(base);
    expect(normaliseHtml('<a href="/" role="button">Go</a>')).toBe(base);
  });

  test('compares decoded entities', () => {
    expect(normaliseHtml('<p>&lt;b&gt; &amp;</p>')).toBe(
      normaliseHtml('<p>&#x3C;b&#x3E; &#38;</p>'),
    );
  });
});
