import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const configPaths = {
  components: 'src/components',
};
export default function getExamples(componentName) {
  const file = fs.readFileSync(
    path.join(configPaths.components, componentName, `${componentName}.yaml`),
    'utf8',
  );

  const docs = yaml.safeLoad(file);

  const examples = {};

  for (const example of docs.examples) {
    examples[example.name] = example.data;
  }

  return examples;
}
