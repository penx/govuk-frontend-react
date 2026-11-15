import { Body, Feedback } from '../../src';
import { attributes, className, html, optional, type Options } from './helpers';

export default function feedback(options: Options) {
  return (
    <Feedback.Composite className={className(options)} {...attributes(options.attributes)}>
      <Feedback.Title {...optional('headingLevel', (options.headingLevel as 2) || undefined)}>
        {options.titleHtml ? html(options.titleHtml) : (options.titleText as string)}
      </Feedback.Title>
      {options.html || options.text ? (
        <Feedback.Body>
          {options.html ? html(options.html) : <Body>{String(options.text)}</Body>}
        </Feedback.Body>
      ) : null}
    </Feedback.Composite>
  );
}
