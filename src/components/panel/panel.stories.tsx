import type { Meta } from '@storybook/react-vite';
import fixtures from 'govuk-frontend/dist/govuk/components/panel/fixtures.json';
import { fixturesStory } from '../../../.storybook/fixtures';
import nunjucks from '../../../tests/nunjucks/panel';
import * as Button from '../button';
import { Body } from '../../core/body';
import { Link } from '../../core/link';
import { ButtonGroup } from '../../objects/button-group';
import * as Panel from '.';

export default { title: 'Panel', component: Panel.Root } satisfies Meta<typeof Panel.Root>;

export const Default = {
  render: () => (
    <Panel.Root>
      <Panel.Title>Application complete</Panel.Title>
      <Panel.Body>
        Your reference number
        <br />
        <strong>HDJ2123F</strong>
      </Panel.Body>
    </Panel.Root>
  ),
};

export const Interruption = {
  render: () => (
    <Panel.Composite
      variant="interruption"
      title="Is your age correct?"
      actions={
        <ButtonGroup>
          <Button.Root variant="inverse" type="button" href="#">
            Yes, this is correct
          </Button.Root>{' '}
          <Link variant="inverse" href="#">
            No, change my age
          </Link>
        </ButtonGroup>
      }
    >
      <Body>
        You entered your age as <strong>109</strong>.
      </Body>
    </Panel.Composite>
  ),
};

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
