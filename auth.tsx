"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getClientAuth } from "@/lib/firebaseClient";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInAnonymously,
  signInWithPopup,
  signOut,
  type User
} from "firebase/auth";

type AuthCtx = {
  user: User | null;
  loading: boolean;
  isEditor: boolean;
  signInGoogle: () => Promise<void>;
  signOutAll: () => Promise<void>;
};

const Ctx = createContext<AuthCtx | null>(null);

export function useShinflyAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useShinflyAuth must be used within ShinflyAuthProvider");
  return v;
}

async function postJson(url: string, body: any) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json().catch(() => ({}));
}

export function ShinflyAuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useMemo(() => getClientAuth(), []);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditor, setIsEditor] = useState(false);

  // Always ensure some auth (anonymous) for vet/profile ownership + feedback attribution
  useEffect(() => {
    let unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      setLoading(false);

      if (!u) {
        await signInAnonymously(auth);
        return;
      }

      // Claims
      const token = await u.getIdTokenResult(true);
      setIsEditor(Boolean(token.claims.editor));

      // If user is editor-capable, establish a session cookie for middleware-protected routes
      // (This is harmless for non-editors; API will reject if no claim.)
      if (u.providerData.some((p) => p.providerId === "google.com")) {
        const idToken = await u.getIdToken();
        try {
          await postJson("/api/sessionLogin", { idToken });
        } catch {
          // ignore; user just won't be able to access /experts/editor
        }
      }
    });

    return () => unsub();
  }, [auth]);

  const signInGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(auth, provider);
    const idToken = await cred.user.getIdToken();
    await postJson("/api/sessionLogin", { idToken });
    const token = await cred.user.getIdTokenResult(true);
    setIsEditor(Boolean(token.claims.editor));
  };

  const signOutAll = async () => {
    try {
      await postJson("/api/sessionLogout", {});
    } catch {
      // ignore
    }
    await signOut(auth);
  };

  const value: AuthCtx = { user, loading, isEditor, signInGoogle, signOutAll };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
