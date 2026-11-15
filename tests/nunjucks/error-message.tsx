import { ErrorMessageComposite } from '../../src';
import { attributes, className, content, optional, type Options } from './helpers';

export default function errorMessage(options: Options) {
  return (
    <ErrorMessageComposite
      {...optional('id', options.id)}
      className={className(options)}
      {...attributes(options.attributes)}
      {...optional('visuallyHiddenText', options.visuallyHiddenText as string | false | undefined)}
    >
      {content(options)}
    </ErrorMessageComposite>
  );
}
