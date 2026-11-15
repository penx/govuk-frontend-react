import type { Meta } from '@storybook/react-vite';
import fixtures from 'govuk-frontend/dist/govuk/components/task-list/fixtures.json';
import { fixturesStory } from '../../../.storybook/fixtures';
import nunjucks from '../../../tests/nunjucks/task-list';
import { Tag } from '../tag';
import * as TaskList from '.';

export default { title: 'Task list', component: TaskList.Root } satisfies Meta<
  typeof TaskList.Root
>;

export const Default = {
  render: () => (
    <TaskList.Root>
      <TaskList.Item withLink>
        <TaskList.NameAndHint>
          <TaskList.Link href="#" aria-describedby="directors-status">
            Company directors
          </TaskList.Link>
        </TaskList.NameAndHint>
        <TaskList.Status id="directors-status">Completed</TaskList.Status>
      </TaskList.Item>
      <TaskList.Item withLink>
        <TaskList.NameAndHint>
          <TaskList.Link href="#" aria-describedby="details-status">
            Registered company details
          </TaskList.Link>
        </TaskList.NameAndHint>
        <TaskList.Status id="details-status">
          <Tag colour="blue">Incomplete</Tag>
        </TaskList.Status>
      </TaskList.Item>
      <TaskList.Item>
        <TaskList.NameAndHint>
          <div>Submit</div>
        </TaskList.NameAndHint>
        <TaskList.Status id="submit-status" cannotStartYet>
          Cannot start yet
        </TaskList.Status>
      </TaskList.Item>
    </TaskList.Root>
  ),
};

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
