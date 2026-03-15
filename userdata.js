// userdata.js — save and load calculator inputs per user in Firestore
// Usage in any calculator page:
//   import { saveInputs, loadInputs } from "./userdata.js";
//   await saveInputs("403b", { salary: 75000, contribPct: 6, ... });
//   const saved = await loadInputs("403b");  // returns object or null

import { db, auth } from "./firebase.js";
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// ── Save inputs for a named calculator ───────────────────────────────────────
// toolId: string like "403b", "mortgage", "auto-loan", "budget"
// data:   plain object of input values to persist
export async function saveInputs(toolId, data) {
  const user = auth.currentUser;
  if (!user) return; // not signed in — silently skip

  try {
    await setDoc(
      doc(db, "users", user.uid, "tools", toolId),
      { ...data, updatedAt: serverTimestamp() },
      { merge: true }
    );
  } catch (e) {
    console.warn("saveInputs failed:", e);
  }
}

// ── Load saved inputs for a named calculator ──────────────────────────────────
// Returns the saved data object, or null if nothing saved yet
export async function loadInputs(toolId) {
  const user = auth.currentUser;
  if (!user) return null;

  try {
    const snap = await getDoc(doc(db, "users", user.uid, "tools", toolId));
    return snap.exists() ? snap.data() : null;
  } catch (e) {
    console.warn("loadInputs failed:", e);
    return null;
  }
}

// ── Wait for auth to be ready, then load ─────────────────────────────────────
// Use this on page load so you don't try to load before Firebase resolves the session.
// callback receives the saved data object (or null)
export function loadWhenReady(toolId, callback) {
  onAuthStateChanged(auth, async user => {
    if (user) {
      const data = await loadInputs(toolId);
      callback(data);
    } else {
      callback(null);
    }
  });
}

// ── Show/hide a "saved" indicator in the nav area ─────────────────────────────
let saveTimer;
export function flashSaved() {
  let indicator = document.getElementById('save-indicator');
  if (!indicator) {
    indicator = document.createElement('span');
    indicator.id = 'save-indicator';
    indicator.style.cssText = 'font-size:12px;color:var(--green);opacity:0;transition:opacity 0.3s;margin-right:8px;font-family:var(--font-mono);';
    indicator.textContent = '✓ Saved';
    const btn = document.getElementById('nav-auth-btn');
    if (btn) btn.parentElement.insertBefore(indicator, btn);
  }
  indicator.style.opacity = '1';
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => { indicator.style.opacity = '0'; }, 2000);
}
