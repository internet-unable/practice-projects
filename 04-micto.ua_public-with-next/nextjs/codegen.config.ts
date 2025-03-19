import type { CodegenConfig } from '@graphql-codegen/cli'
import 'dotenv/config'
const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_GRAPHQL_API,
  documents: ['src/graphql/*.ts'],
  ignoreNoDocuments: true,
  generates: {
    './src/graphql/generated/types.ts': {
      plugins: ['typescript', 'typescript-operations'],
    }
  }
}

export default config