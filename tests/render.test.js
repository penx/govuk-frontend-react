// import spec from 'govuk-frontend/components/button/template.spec';
// import cheerio from 'cheerio';
import { minify } from 'html-minifier';
import render from './render';
import reference from './reference';

describe('Button', () => {
  it('matches spec', () => {
    expect(
      minify(
        render('button', { text: 'Save and continue' }),
        {
          collapseInlineTagWhitespace: true,
          collapseWhitespace: true,
        },
      ),
    )
      .toEqual(
        minify(
          reference('button', { text: 'Save and continue' }),
          {
            collapseInlineTagWhitespace: true,
            collapseWhitespace: true,
          },
        ),
      );
  });
});
