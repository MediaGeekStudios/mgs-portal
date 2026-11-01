# MGS Portal

This is the internal dashboard I built for Media Geek Studios. It's where I keep track of clients, support tickets and invoices for the websites I build and maintain.

It's live at [portal.mediageekstudios.com](https://portal.mediageekstudios.com), but it is gated by a login page.

## What it does

Right now it allows for:

- adding, editing and deleting tickets, each with a status and a priority
- managing client records, and starting a new ticket from a client's info card
- viewing the "Invoices" page (read-only for now)
  - creating & editing invoices is on the roadmap, and I'm looking at PayPal APIs

Everything is behind a Supabase login, including the API routes. The layout also works on a phone: the sidebar turns into a row of links along the top, and the forms stack.

## Built with

Next.js 16 (App Router), React 19 and TypeScript, styled with Tailwind and shadcn/ui. The data lives in Postgres on Supabase, which also handles sign-in. The dashboard is hosted on Vercel.

A few notes if you're reading the code:

- `src/proxy.ts` checks the session on every request. In Next.js 16 middleware was renamed to proxy, which threw me for a loop at first
- The pages in `src/app/(dashboard)/` query Postgres directly with `pg` as server components
- Creating, updating and deleting go through the route handlers in `src/app/api/`
- `local_schema.sql` has the table definitions, with no data in it

## Running it locally

<i>You'll need Node 20+ and either a Supabase project or a local one running through Supabase CLI (`supabase start`). Either way, connection details go in a `.env.local` file.</i>

```bash
git clone https://github.com/MediaGeekStudios/mgs-portal.git
cd mgs-portal
npm install
```

Run `local_schema.sql` in the Supabase SQL editor to create the tables. Then add a user under Authentication → Users, and turn off public sign-ups so nobody else can create an account.

Create a `.env.local` file with your own values:

```bash
DATABASE_URL=postgresql://postgres.<project-ref>:<password>@<region>.pooler.supabase.com:5432/postgres
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

Then start it up and sign in at http://localhost:3000:

```bash
npm run dev
```

## Deploying

Vercel deploys `main` to production, and every other branch gets a preview link. New work starts on a branch off `main`, goes into `test` for a look on the preview, and then gets merged into `main`.

On Vercel, set the same three variables for both Production and Preview. Use Supabase's transaction pooler (port 6543) for `DATABASE_URL`, because serverless functions don't get along with the direct connection.

## Roadmap Items

- invoice creation and editing
  - PayPal API integration
  - analyze bi-directional data updates
- the settings and profile pages
- a separate test database, so the preview site isn't using real data
- some actual tests
