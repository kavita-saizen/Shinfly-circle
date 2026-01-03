import { getAdminDb } from "../lib/firebaseAdmin.js";
import { APP_ID, colPath } from "../lib/paths.js";

function now() {
  return new Date();
}

function slugify(s: string) {
  return (s || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function main() {
  const db = getAdminDb();

  const appId = process.env.NEXT_PUBLIC_SHINFLY_APP_ID || APP_ID;

  const articlesCol = db.collection(colPath("articles", appId));
  const profilesCol = db.collection(colPath("profiles", appId));
  const summariesCol = db.collection(colPath("reviewSummaries", appId));

  // Sample approved vet (replace uid after a real vet signs in)
  const sampleVetUid = "SAMPLE_VET_UID_REPLACE";
  await profilesCol.doc(sampleVetUid).set(
    {
      uid: sampleVetUid,
      name: "Dr. Ananya Rao",
      qualifications: "BVSc & AH, MVSc (Avian/Exotics)",
      clinic: "Shinfly Partner Clinic",
      experience: "7",
      photoUrl: "https://images.unsplash.com/photo-1551601651-05f46aefbd68?auto=format&fit=crop&w=512&q=60",
      status: "Approved",
      createdAt: now()
    },
    { merge: true }
  );

  const title = "Parakeet Diet Basics: Safe Seeds, Pellets, and Fresh Foods";
  const slug = slugify(title);

  const aRef = await articlesCol.add({
    title,
    slug,
    author: "Shinfly Editorial",
    content:
      "Parakeets thrive on variety, not just seed.\n\n" +
      "Aim for a balanced foundation with pellets, plus measured seeds, and daily fresh vegetables.\n\n" +
      "Avoid avocado, chocolate, caffeine, alcohol, and any salty/seasoned human foods.\n\n" +
      "Escalate to a vet urgently for: persistent tail bobbing, open-mouth breathing, inability to perch, severe lethargy, seizures, or ongoing vomiting/diarrhea.",
    status: "Published",
    reviewerIds: [sampleVetUid],
    createdAt: now(),
    publishedAt: now()
  });

  await summariesCol.doc(aRef.id).set(
    {
      articleId: aRef.id,
      summary:
        "Reviewed for safety exclusions (avocado/chocolate/caffeine), balanced diet framing, and escalation triggers for respiratory distress and systemic illness.",
      updatedAt: now()
    },
    { merge: true }
  );

  console.log("✅ Seeded sample data");
  console.log("➡️ Replace SAMPLE_VET_UID_REPLACE in scripts/seed.ts with a real vet UID for a realistic demo.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
