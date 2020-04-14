import SHA1 from 'crypto-js/sha1'
import encodeUtf8 from 'crypto-js/enc-utf8'
import encodeBase64 from 'crypto-js/enc-base64'

type QuickSubPayload = {
  verticalID: string
  email: string
  referrer: {
    campaign: string
    internalCTA: string
    medium: string
    pageURL: string
    referrerURL: string
    source: string
    postID: string
  }
}

const generateToken = (payload: QuickSubPayload) => {
  const identifier = 'TelemetryPayload'

  let stringOfPayloadValues = ''

  for (let key in payload) {
    if (typeof payload[key] === 'object') {
      stringOfPayloadValues += Object.values(payload[key]).join('')
    } else {
      stringOfPayloadValues += payload[key]
    }
  }
  // Create hash from values and identifier
  const hash = SHA1(`${stringOfPayloadValues}${identifier}`)
  // Convert string to word array
  const wordArray = encodeUtf8.parse(`${hash}|${new Date().getTime()}`)
  // Generate Base64 token from word array
  return encodeBase64.stringify(wordArray)
}

const getCorsOrigin = (req) => {
  /* this function should get the origin and put it into
   * the Access-Control-Allow-Origin header if it exists
   * in the list of allowed origins.
   **/

  const allowedOrigins = [
    'http://localhost:3000',
    'https://www.stylist.co.uk',
    'https://staging.stylist.co.uk',
    'https://stylist-preprod.herokuapp.com',
    'https://www.stylist.co.uk',
    'https://www-stylist-co-uk.cdn.ampproject.org',
    'https://cdn.ampproject.org',
    'https://bing-amp.com',
  ]

  const publisherOrigin = 'https://www.stylist.co.uk'
  const sourceOrigin = req?.headers?.origin

  return allowedOrigins.indexOf(sourceOrigin) !== -1
    ? sourceOrigin
    : publisherOrigin || req?.headers?.origin
}

export { getCorsOrigin, generateToken }
