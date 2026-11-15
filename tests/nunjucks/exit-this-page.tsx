import { ExitThisPage } from '../../src';
import { attributes, className, content, optional, type Options } from './helpers';

export default function exitThisPage(options: Options) {
  const text = (key: string) => optional(key, (options[key] as string) || undefined);
  return (
    <ExitThisPage.Root
      {...optional('id', (options.id as string) || undefined)}
      {...text('activatedText')}
      {...text('timedOutText')}
      {...text('pressTwoMoreTimesText')}
      {...text('pressOneMoreTimeText')}
      className={className(options)}
      {...attributes(options.attributes)}
    >
      <ExitThisPage.Button href={(options.redirectUrl as string) || undefined}>
        {content(options)}
      </ExitThisPage.Button>
    </ExitThisPage.Root>
  );
}
