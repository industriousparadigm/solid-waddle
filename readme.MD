# Lambda: Alexandria Quick Subscribe

An endpoint to mediate the communication between an AMP form in Lennon's frontend and the corresponding endpoint in Alexandria.

This is necessary because the AMP form [runs into CORS issues](https://amp.dev/documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests) when hitting endpoint with universal ('\*') origins allowed.

![amp cors](https://www.ampproject.org/static/img/docs/CORS_with_Cache.png)
