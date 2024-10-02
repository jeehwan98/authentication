Basic authentication of implementing token in cookies that was set in the BE (java)
- there was a problem of setting the token in the cookies due to the `use server`.
- if we were to set the token in the cookies in the server client, it would be the FE (NextJS) that is setting the response header, instead of the BE.
- therefore, in order to solve this problem, loginAPICalls was implemented in the loginForm, which uses `use client` server.
