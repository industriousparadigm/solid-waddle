import SHA1 from 'crypto-js/sha1';
import encodeUtf8 from 'crypto-js/enc-utf8';
import encodeBase64 from 'crypto-js/enc-base64';
const generateToken = (payload) => {
    const identifier = 'TelemetryPayload';
    let stringOfPayloadValues = '';
    for (let key in payload) {
        if (typeof payload[key] === 'object') {
            stringOfPayloadValues += Object.values(payload[key]).join('');
        }
        else {
            stringOfPayloadValues += payload[key];
        }
    }
    const hash = SHA1(`${stringOfPayloadValues}${identifier}`);
    const wordArray = encodeUtf8.parse(`${hash}|${new Date().getTime()}`);
    return encodeBase64.stringify(wordArray);
};
const getCorsOrigin = (req) => {
    var _a, _b;
    const allowedOrigins = [
        'http://localhost:3000',
        'https://www.stylist.co.uk',
        'https://staging.stylist.co.uk',
        'https://stylist-preprod.herokuapp.com',
        'https://www.stylist.co.uk',
        'https://www-stylist-co-uk.cdn.ampproject.org',
        'https://cdn.ampproject.org',
        'https://bing-amp.com',
    ];
    const publisherOrigin = 'https://www.stylist.co.uk';
    const sourceOrigin = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.origin;
    return allowedOrigins.indexOf(sourceOrigin) !== -1
        ? sourceOrigin
        : publisherOrigin || ((_b = req === null || req === void 0 ? void 0 : req.headers) === null || _b === void 0 ? void 0 : _b.origin);
};
const getPostId = (path) => {
    const regex = /\/.+?\/.+?\/(\d+)$/;
    const match = regex.exec(path);
    const postId = match ? parseInt(match[match.length - 1], 10) : 0;
    return postId;
};
export { getCorsOrigin, generateToken, getPostId };
//# sourceMappingURL=helpers.js.map