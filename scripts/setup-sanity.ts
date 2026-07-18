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
   NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
   SANITY_API_READ_TOKEN=<viewer-token-for-draft-preview>
   SANITY_API_WRITE_TOKEN=<editor-token-for-seeding-and-form-submissions>
   SANITY_PREVIEW_SECRET=<random-preview-secret>

4. Webhook (production):
   URL: https://cps.com/api/revalidate
   Method: POST
   Header: Authorization: Bearer <SANITY_REVALIDATE_SECRET>

5. Seed all bilingual documents:
   npm run seed:sanity

6. Verify Studio and draft preview:
   npm run studio
   /api/draft?secret=<SANITY_PREVIEW_SECRET>&slug=/en
`);
