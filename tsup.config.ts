import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    button: 'src/components/button/index.tsx',
    'error-message': 'src/components/error-message/index.tsx',
    fieldset: 'src/components/fieldset/index.tsx',
    hint: 'src/components/hint/index.tsx',
    input: 'src/components/input/index.tsx',
    label: 'src/components/label/index.tsx',
    textarea: 'src/components/textarea/index.tsx',
    'form-group': 'src/objects/form-group/index.tsx',
  },
  format: ['esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: ['react', 'react/jsx-runtime', 'govuk-frontend'],
});
