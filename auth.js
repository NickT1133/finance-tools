// auth.js — auth modal UI + sign up / sign in / sign out
// Import this as a module in every page: <script type="module" src="auth.js"></script>

import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// ── Inject modal HTML ─────────────────────────────────────────────────────────
const modalHTML = `
<div id="auth-overlay" style="display:none;position:fixed;inset:0;z-index:999;background:rgba(0,0,0,0.35);display:none;align-items:center;justify-content:center;">
  <div id="auth-modal" style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:2rem;width:100%;max-width:380px;margin:1rem;box-shadow:0 8px 32px rgba(0,0,0,0.12);">

    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;">
      <h2 id="auth-title" style="font-family:var(--font-display);font-size:22px;font-weight:400;letter-spacing:-0.02em;color:var(--text);">Sign in</h2>
      <button onclick="closeAuthModal()" style="background:none;border:none;cursor:pointer;font-size:20px;color:var(--text-3);line-height:1;padding:4px;">✕</button>
    </div>

    <div id="auth-error" style="display:none;background:var(--red-lt);color:var(--red);font-size:13px;padding:10px 12px;border-radius:var(--radius);margin-bottom:1rem;"></div>
    <div id="auth-success" style="display:none;background:var(--green-lt);color:var(--green);font-size:13px;padding:10px 12px;border-radius:var(--radius);margin-bottom:1rem;"></div>

    <div id="name-field" style="display:none;margin-bottom:1rem;">
      <label style="font-size:12px;font-weight:500;color:var(--text-2);display:block;margin-bottom:5px;">Name</label>
      <input id="auth-name" type="text" placeholder="Your name" style="width:100%;height:38px;padding:0 10px;background:var(--bg);border:1px solid var(--border);border-radius:var(--radius);font-family:var(--font-body);font-size:14px;color:var(--text);outline:none;box-sizing:border-box;">
    </div>

    <div style="margin-bottom:1rem;">
      <label style="font-size:12px;font-weight:500;color:var(--text-2);display:block;margin-bottom:5px;">Email</label>
      <input id="auth-email" type="email" placeholder="you@example.com" style="width:100%;height:38px;padding:0 10px;background:var(--bg);border:1px solid var(--border);border-radius:var(--radius);font-family:var(--font-body);font-size:14px;color:var(--text);outline:none;box-sizing:border-box;">
    </div>

    <div style="margin-bottom:1.5rem;">
      <label style="font-size:12px;font-weight:500;color:var(--text-2);display:block;margin-bottom:5px;">Password</label>
      <input id="auth-password" type="password" placeholder="••••••••" style="width:100%;height:38px;padding:0 10px;background:var(--bg);border:1px solid var(--border);border-radius:var(--radius);font-family:var(--font-body);font-size:14px;color:var(--text);outline:none;box-sizing:border-box;">
      <div id="password-hint" style="font-size:11px;color:var(--text-3);margin-top:4px;display:none;">At least 6 characters</div>
    </div>

    <button id="auth-submit-btn" onclick="submitAuth()" style="width:100%;height:40px;background:var(--accent);color:#fff;border:none;border-radius:var(--radius);font-family:var(--font-body);font-size:14px;font-weight:500;cursor:pointer;transition:opacity 0.15s;">
      Sign in
    </button>

    <div style="text-align:center;margin-top:1rem;font-size:13px;color:var(--text-3);">
      <span id="auth-switch-text">Don't have an account?</span>
      <button id="auth-switch-btn" onclick="toggleAuthMode()" style="background:none;border:none;color:var(--accent);cursor:pointer;font-size:13px;padding:0 4px;font-family:var(--font-body);">Create one</button>
    </div>

  </div>
</div>
`;

document.body.insertAdjacentHTML('beforeend', modalHTML);

// ── Modal state ───────────────────────────────────────────────────────────────
let mode = 'signin'; // 'signin' | 'signup'

window.openAuthModal = function(startMode = 'signin') {
  mode = startMode;
  updateModalUI();
  const overlay = document.getElementById('auth-overlay');
  overlay.style.display = 'flex';
  clearAuthMessages();
  setTimeout(() => document.getElementById('auth-email').focus(), 50);
};

window.closeAuthModal = function() {
  document.getElementById('auth-overlay').style.display = 'none';
  clearAuthMessages();
};

window.toggleAuthMode = function() {
  mode = mode === 'signin' ? 'signup' : 'signin';
  updateModalUI();
  clearAuthMessages();
};

function updateModalUI() {
  const isSignup = mode === 'signup';
  document.getElementById('auth-title').textContent      = isSignup ? 'Create account' : 'Sign in';
  document.getElementById('auth-submit-btn').textContent = isSignup ? 'Create account' : 'Sign in';
  document.getElementById('auth-switch-text').textContent= isSignup ? 'Already have an account?' : "Don't have an account?";
  document.getElementById('auth-switch-btn').textContent = isSignup ? 'Sign in' : 'Create one';
  document.getElementById('name-field').style.display    = isSignup ? '' : 'none';
  document.getElementById('password-hint').style.display = isSignup ? '' : 'none';
}

function clearAuthMessages() {
  const err = document.getElementById('auth-error');
  const suc = document.getElementById('auth-success');
  err.style.display = 'none';
  suc.style.display = 'none';
  err.textContent = '';
  suc.textContent = '';
}

function showError(msg) {
  const el = document.getElementById('auth-error');
  el.textContent = msg;
  el.style.display = '';
}

function showSuccess(msg) {
  const el = document.getElementById('auth-success');
  el.textContent = msg;
  el.style.display = '';
}

// ── Submit ────────────────────────────────────────────────────────────────────
window.submitAuth = async function() {
  clearAuthMessages();
  const email    = document.getElementById('auth-email').value.trim();
  const password = document.getElementById('auth-password').value;
  const name     = document.getElementById('auth-name').value.trim();
  const btn      = document.getElementById('auth-submit-btn');

  if (!email || !password) { showError('Please enter your email and password.'); return; }
  if (mode === 'signup' && password.length < 6) { showError('Password must be at least 6 characters.'); return; }

  btn.disabled = true;
  btn.textContent = mode === 'signup' ? 'Creating account…' : 'Signing in…';

  try {
    if (mode === 'signup') {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (name) await updateProfile(cred.user, { displayName: name });
      showSuccess('Account created! Welcome.');
      setTimeout(closeAuthModal, 1000);
    } else {
      await signInWithEmailAndPassword(auth, email, password);
      showSuccess('Signed in!');
      setTimeout(closeAuthModal, 800);
    }
  } catch (err) {
    const messages = {
      'auth/email-already-in-use':   'An account with this email already exists.',
      'auth/invalid-email':          'Please enter a valid email address.',
      'auth/wrong-password':         'Incorrect password. Please try again.',
      'auth/user-not-found':         'No account found with this email.',
      'auth/invalid-credential':     'Incorrect email or password.',
      'auth/too-many-requests':      'Too many attempts. Please wait a moment and try again.',
      'auth/weak-password':          'Password must be at least 6 characters.',
    };
    showError(messages[err.code] || 'Something went wrong. Please try again.');
    btn.disabled = false;
    btn.textContent = mode === 'signup' ? 'Create account' : 'Sign in';
  }
};

// allow Enter key to submit
document.getElementById('auth-overlay').addEventListener('keydown', e => {
  if (e.key === 'Enter') window.submitAuth();
});

// close on overlay click
document.getElementById('auth-overlay').addEventListener('click', e => {
  if (e.target.id === 'auth-overlay') window.closeAuthModal();
});

// ── Auth state observer — updates nav & exposes current user ──────────────────
export function onUser(callback) {
  onAuthStateChanged(auth, callback);
}

window.signOutUser = async function() {
  await signOut(auth);
};

onAuthStateChanged(auth, user => {
  // update nav auth button
  const btn  = document.getElementById('nav-auth-btn');
  const info = document.getElementById('nav-user-info');
  if (!btn) return;

  if (user) {
    const label = user.displayName || user.email.split('@')[0];
    info.textContent = label;
    info.style.display = '';
    btn.textContent = 'Sign out';
    btn.onclick = () => window.signOutUser();
  } else {
    info.style.display = 'none';
    btn.textContent = 'Sign in';
    btn.onclick = () => window.openAuthModal('signin');
  }
});
