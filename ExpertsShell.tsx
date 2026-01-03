"use client";

import Link from "next/link";
import { Button, Card, Pill } from "@/components/ui";
import { useShinflyAuth } from "@/components/auth";

export function ExpertsShell({ active }: { active?: "public" | "vet" | "editor" }) {
  const { user, loading, isEditor, signInGoogle, signOutAll } = useShinflyAuth();

  return (
    <div className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-600" />
          <div>
            <div className="text-sm font-bold tracking-tight">Shinfly Experts Circle</div>
            <div className="text-xs text-slate-400">Bridging the gap between clinic and cage</div>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2 flex-wrap">
          <Pill tone="slate">
            UID: {loading ? "…" : user?.uid ? user.uid.slice(0, 8) + "…" : "—"}
          </Pill>

          <div className="hidden md:flex items-center gap-2">
            <Link href="/experts">
              <Button variant={active === "public" ? "primary" : "ghost"}>Public</Button>
            </Link>
            <Link href="/experts/vet">
              <Button variant={active === "vet" ? "primary" : "ghost"}>Vet</Button>
            </Link>
            <Link href="/experts/editor">
              <Button variant={active === "editor" ? "secondary" : "ghost"}>Editor</Button>
            </Link>
          </div>

          <div className="ml-2 flex items-center gap-2">
            {!isEditor ? (
              <Button variant="secondary" onClick={signInGoogle}>
                Sign in (Editor)
              </Button>
            ) : (
              <Pill tone="green">Editor ✓</Pill>
            )}
            <Button variant="ghost" onClick={signOutAll}>
              Sign out
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-3">
        <Card className="p-3">
          <div className="flex flex-col md:flex-row gap-3 md:items-center">
            <div className="flex items-center gap-2 flex-wrap">
              <Pill tone="cyan">Clinical Accent: Cyan</Pill>
              <Pill tone="purple">Editorial Accent: Purple</Pill>
              <Pill tone="slate">Embedded routes: /experts/*</Pill>
            </div>

            <div className="ml-auto text-xs text-slate-400 leading-6">
              Public pages show <span className="text-slate-200">review summaries</span> and <span className="text-slate-200">vet photos</span> (you chose yes).
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
