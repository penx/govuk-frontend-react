import { PhaseBanner } from '../../src';
import { attributes, className, content, type Options } from './helpers';

export default function phaseBanner(options: Options) {
  const tag = options.tag as Options | undefined;
  return (
    <PhaseBanner.Root className={className(options)} {...attributes(options.attributes)}>
      <PhaseBanner.Content>
        <PhaseBanner.Tag className={className(tag)}>{content(tag)}</PhaseBanner.Tag>{' '}
        <PhaseBanner.Text>{content(options)}</PhaseBanner.Text>
      </PhaseBanner.Content>
    </PhaseBanner.Root>
  );
}
