import type { AWS } from '@serverless/typescript';

import tag from '@functions/tag';

// Environment config
const STAGE = process.env.STAGE || 'dev';
const AWS_REGION = process.env.AWS_REGION as any || 'ap-southeast-2';
const SERVICE_NAME = `core-lambdas-${STAGE}`;

const serverlessConfiguration: AWS = {
  service: SERVICE_NAME,
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline'],
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
