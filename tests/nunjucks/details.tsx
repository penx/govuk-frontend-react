import { Details } from '../../src';
import { attributes, className, content, html, optional, type Options } from './helpers';

export default function details(options: Options) {
  return (
    <Details.Root
      {...optional('id', options.id)}
      className={className(options)}
      {...attributes(options.attributes)}
      open={Boolean(options.open)}
    >
      <Details.Summary>
        <Details.SummaryText>
          {options.summaryHtml ? html(options.summaryHtml) : (options.summaryText as string)}
        </Details.SummaryText>
      </Details.Summary>
      <Details.Text>{content(options)}</Details.Text>
    </Details.Root>
  );
}
