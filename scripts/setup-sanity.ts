import { randomBytes } from "node:crypto";

const secret = randomBytes(32).toString("hex");

console.log(`
CPS — Sanity setup checklist
============================

1. Add to .env.local:

   SANITY_REVALIDATE_SECRET=${secret}

2. Create a Sanity project at https://sanity.io

3. Set in .env.local:
   NEXT_PUBLIC_SANITY_PROJECT_ID=<your-project-id>
   NEXT_PUBLIC_SANITY_DATASET=production

4. Webhook (production):
   URL: https://cps.com/api/revalidate
   Method: POST
   Header: Authorization: Bearer <SANITY_REVALIDATE_SECRET>
`);
