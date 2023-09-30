import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONInvalidRequest, formatJSONSuccessResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import { validateTags } from '@libs/tag';

const validateTag: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  if (!event.body.text) {
    return formatJSONInvalidRequest({
      message: `text field is required`,
    });
  }
  return formatJSONSuccessResponse({
    message: validateTags(event.body.text),
  });
};

export const main = middyfy(validateTag);
