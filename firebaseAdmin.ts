import admin from "firebase-admin";
import fs from "node:fs";

function initAdmin() {
  if (admin.apps.length) return admin.app();

  const p = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!p) throw new Error("Missing env FIREBASE_SERVICE_ACCOUNT_JSON (path to serviceAccount.json)");

  const raw = fs.readFileSync(p, "utf-8");
  const serviceAccount = JSON.parse(raw);

  return admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export function getAdminApp() {
  return initAdmin();
}

export function getAdminAuth() {
  return initAdmin().auth();
}

export function getAdminDb() {
  return initAdmin().firestore();
}
