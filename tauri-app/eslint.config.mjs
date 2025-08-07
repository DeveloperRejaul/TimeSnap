import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    rules:{
      'no-console': ["error"],
      indent: ["error", 2],
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          'prefer': 'type-imports',
          'disallowTypeAnnotations': false,
        },
      ],
    }
  }
);