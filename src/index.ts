import { APIGatewayProxyHandler } from 'aws-lambda'
import fetch from 'node-fetch'
import 'source-map-support/register'
import { getCorsOrigin, generateToken } from './helpers'
import { alexandriaEndpoint } from './config'
import multipart from 'aws-lambda-multipart-parser'

export const ampQuickSignup: APIGatewayProxyHandler = async (event) => {
  // get AMP form data
  const ampFormData = multipart.parse(event, true)
  const { verticalID, email, source, postID, pageURL } = ampFormData

  // build payload
  const payload = {
    verticalID,
    email,
    referrer: {
      campaign: 'stylist-website',
      internalCTA: 'newsletter-sign-up-widget',
      medium: 'web',
      pageURL,
      referrerURL: '',
      source,
      postID,
    },
  }

  // talk to alexandria
  const alexandriaResponse = await fetch(alexandriaEndpoint, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload, token: generateToken(payload) }),
  }).then((res) => res.json())

  // send a response
  return {
    statusCode: alexandriaResponse.status,
    headers: {
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': getCorsOrigin(event),
    },
    body: JSON.stringify(
      {
        message: `Congratulations! 'ampQuickSignup' endpoint hit with a ${alexandriaResponse.status} response`,
        alexandriaResponse,
        ...ampFormData,
      },
      null,
      2
    ),
  }
}
