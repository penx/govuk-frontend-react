import { ErrorSummary } from '../../src';
import { attributes, className, html, optional, type Options } from './helpers';

type Item = Options & { href?: string };

export default function errorSummary(options: Options) {
  const errorList = (options.errorList as Item[] | undefined) ?? [];
  const description = options.descriptionHtml
    ? html(options.descriptionHtml)
    : (options.descriptionText as string | undefined);
  return (
    <ErrorSummary.RootComposite
      {...optional('disableAutoFocus', options.disableAutoFocus as boolean | undefined)}
      className={className(options)}
      {...attributes(options.attributes)}
    >
      <ErrorSummary.Title>
        {options.titleHtml ? html(options.titleHtml) : (options.titleText as string)}
      </ErrorSummary.Title>
      <ErrorSummary.Body>
        {description ? <ErrorSummary.Description>{description}</ErrorSummary.Description> : null}
        {errorList.length ? (
          <ErrorSummary.List>
            {errorList.map((item, index) => {
              const text = item.html ? html(item.html) : (item.text as string);
              return (
                <ErrorSummary.ListItem key={index}>
                  {item.href ? (
                    <a href={item.href} {...attributes(item.attributes)}>
                      {text}
                    </a>
                  ) : (
                    text
                  )}
                </ErrorSummary.ListItem>
              );
            })}
          </ErrorSummary.List>
        ) : null}
      </ErrorSummary.Body>
    </ErrorSummary.RootComposite>
  );
}
