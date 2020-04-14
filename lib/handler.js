import fetch from 'node-fetch';
import 'source-map-support/register';
import { getCorsOrigin, generateToken } from './helpers';
import ;
const alexandriaEndpoint = 'https://staging.telemetry.report/api/v2/subscribers/quick-sign-up';
const payload = {
    verticalID: 39,
    email: 'diogo.costa@flatironschool.com',
    referrer: {
        campaign: 'stylist-website',
        internalCTA: 'newsletter-sign-up-widget',
        medium: 'web',
        pageURL: 'http://localhost/life/cute/war-never-changes/332175',
        referrerURL: '',
        source: 'stylist-amp',
        postID: 332175,
    },
};
export const quickSignup = async (event, _context, callback) => {
    const alexandriaResponse = await fetch(alexandriaEndpoint, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.assign(Object.assign({}, payload), { token: generateToken(payload) })),
    }).then((res) => res.json());
    console.log({
        debug: 'hi',
        alexandriaResponse,
        requestBod: event.body,
    });
    const response = {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': getCorsOrigin(event),
        },
        body: JSON.stringify({
            message: "Go Serverless! 'quickSignup' endpoint hit!",
            alexandriaResponse,
        }, null, 2),
    };
    callback(null, response);
};
//# sourceMappingURL=handler.js.map