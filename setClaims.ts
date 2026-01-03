import { getAdminAuth } from "../lib/firebaseAdmin.js";

function parseArgs() {
  const args = process.argv.slice(2);
  const out: Record<string, string> = {};
  for (let i = 0; i < args.length; i++) {
    const a = args[i]!;
    if (a.startsWith("--")) {
      out[a.slice(2)] = args[i + 1] || "true";
      i++;
    }
  }
  return out;
}

async function main() {
  const a = parseArgs();
  const uid = a.uid;
  if (!uid) {
    console.error("Usage: npm run set-claims -- --uid <UID> --editor true");
    process.exit(1);
  }

  const editor = (a.editor ?? "true") === "true";
  await getAdminAuth().setCustomUserClaims(uid, { editor });

  console.log(`✅ Set custom claims for ${uid}:`, { editor });
  console.log("Note: user must sign out/in (or refresh token) to pick up claims.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
