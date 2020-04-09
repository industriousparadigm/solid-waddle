import { Handler } from 'aws-lambda'
import fetch from 'node-fetch'
import 'source-map-support/register'
import { getCorsOrigin, generateToken } from './helpers'

const alexandriaEndpoint =
  'https://staging.telemetry.report/api/v2/subscribers/quick-sign-up'

const mockPayload = {
  verticalID: 38,
  email: 'michaeljordan@gmail.com',
  firstname: 'Michael',
  referrer: {
    medium: 'medium-name',
    pageURL: 'http://page-url.com',
    campaign: 'campaign-name',
    source: 'source-name',
    referrerURL: 'http://google.com',
    internalCTA: 'footer',
    postID: 0,
  },
}

const token = generateToken(mockPayload)

const mockBody = { ...mockPayload, token }

export const quickSignup: Handler = async (request, _context, callback) => {
  // talk to alexandria
  const alexandriaResponse = await fetch(alexandriaEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: mockBody,
  }).then((res) => res.json())

  // send a response
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': getCorsOrigin(request),
    },
    body: JSON.stringify(
      {
        message: "Go Serverless Webpack (TS)! 'quickSignup' endpoint hit!",
        request,
      },
      null,
      2
    ),
    alexandriaResponse: JSON.stringify({ ...alexandriaResponse }, null, 2),
  }

  callback(null, response)
}
