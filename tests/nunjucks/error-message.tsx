import { ErrorMessage, VisuallyHidden } from '../../src';
import { attributes, className, content, optional, type Options } from './helpers';

export default function errorMessage(options: Options) {
  const hidden = options.visuallyHiddenText ?? 'Error';
  return (
    <ErrorMessage
      {...optional('id', options.id)}
      className={className(options)}
      {...attributes(options.attributes)}
    >
      {hidden ? (
        <>
          <VisuallyHidden>{String(hidden)}:</VisuallyHidden> {content(options)}
        </>
      ) : (
        content(options)
      )}
    </ErrorMessage>
  );
}
