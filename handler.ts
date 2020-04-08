import { Handler } from 'aws-lambda'
import 'source-map-support/register'

export const quickSignup: Handler = async (event, _context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless Webpack (TS)! 'quickSignup' endpoint hit!",
        input: event,
      },
      null,
      2
    ),
  }

  callback(null, response)
}
