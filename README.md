# Shinfly Experts Circle (Embedded)

Routes:
- `/experts` public landing + library
- `/experts/articles/[slug]` public article page
- `/experts/vet` vet onboarding + review studio
- `/experts/editor` editor pipeline (requires Firebase custom claim `editor: true`)

## 1) Configure env
Copy `.env.local.example` to `.env.local` and fill your Firebase values.

## 2) Install + run
```bash
npm install
npm run dev
```

## 3) Firebase setup
- Enable **Firestore**
- Enable **Authentication** providers:
  - Anonymous (for public/vet)
  - Google (for editor)
- Deploy Firestore rules from `firestore/firestore.rules`

## 4) Make an editor
Use a service account and set claims:

```bash
export FIREBASE_SERVICE_ACCOUNT_JSON=/absolute/path/serviceAccount.json
npm run set-claims -- --uid <UID> --editor true
```

## 5) Seed sample content (optional)
```bash
export FIREBASE_SERVICE_ACCOUNT_JSON=/absolute/path/serviceAccount.json
npm run seed
```
