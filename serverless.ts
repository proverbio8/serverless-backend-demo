import type { AWS } from '@serverless/typescript';
import tag from '@functions/tag';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AWS_REGION = process.env.AWS_REGION as any || 'ap-southeast-2';

const serverlessConfiguration: AWS = {service: 'core-lambdas',
  frameworkVersion: '3', plugins: ['serverless-esbuild', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    region: AWS_REGION,
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    role: process.env.AWS_ROLE
  },
  // import the function via paths
  functions: { tag },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node18',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
