# Cross-Platform Data Integration for Anonymized Survey Research (API Development)

The project involved several anonymous surveys that needed to be completed on the Qualtrics server. After submitting these surveys, participants were redirected to a third-party server (ASA24) to continue the survey without requiring a login. To enhance security, participants who finished the Qualtrics survey were allowed to redirect to ASA24 only once. Upon completing the survey on ASA24, participants were redirected back to another Gift Card survey on Qualtrics.

My task was to create a unique anonymous user ID and establish a secure handshake between Qualtrics and ASA24. After a participant submitted the Qualtrics survey for the first time, a JWT token was generated and passed to the ASA24 server for authentication. Upon completing the ASA24 survey, participants were redirected back to the Qualtrics server to complete the Gift Card survey. Meanwhile, the anonymous user ID was stored for future data analysis.

I developed an API using ExpressJS and deployed it on Netlify. After submitting the Qualtrics survey, user information was passed to the Netlify server, where the JWT was generated. This JWT was then sent to ASA24. Upon finishing the survey on ASA24, the user was redirected back to the Gift Card survey, where they could enter their username, allowing all surveys to be mapped to that username.

![qualtricsAPI2](https://github.com/user-attachments/assets/4c3b6e3c-90d1-40aa-ad7f-36f27e29adda)
