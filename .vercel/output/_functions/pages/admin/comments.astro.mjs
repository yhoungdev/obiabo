import '../../chunks/page-ssr_75tYeORR.mjs';
import { c as createComponent, r as renderTemplate, a as renderHead } from '../../chunks/astro/server_XTC3fnMi.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                                       */
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Comments = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(['<html lang="en" data-astro-cid-3j3cdvlv> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Admin - Comments</title>', `</head> <body data-astro-cid-3j3cdvlv> <div id="app" data-astro-cid-3j3cdvlv> <!-- Login form shown initially --> <div id="login-section" class="login-form" data-astro-cid-3j3cdvlv> <h2 data-astro-cid-3j3cdvlv>Admin Login</h2> <input type="password" id="admin-secret" placeholder="Enter admin secret" data-astro-cid-3j3cdvlv> <button onclick="login()" data-astro-cid-3j3cdvlv>Login</button> <p id="login-error" style="color: #ef4444; margin-top: 1rem; display: none;" data-astro-cid-3j3cdvlv></p> </div> <!-- Admin panel (hidden initially) --> <div id="admin-section" style="display: none;" data-astro-cid-3j3cdvlv> <h1 data-astro-cid-3j3cdvlv>Comment Management</h1> <div class="stats" data-astro-cid-3j3cdvlv> <div class="stat" data-astro-cid-3j3cdvlv> <div class="stat-value" id="total-count" data-astro-cid-3j3cdvlv>0</div> <div class="stat-label" data-astro-cid-3j3cdvlv>Total</div> </div> <div class="stat" data-astro-cid-3j3cdvlv> <div class="stat-value" id="pending-count" data-astro-cid-3j3cdvlv>0</div> <div class="stat-label" data-astro-cid-3j3cdvlv>Pending</div> </div> <div class="stat" data-astro-cid-3j3cdvlv> <div class="stat-value" id="approved-count" data-astro-cid-3j3cdvlv>0</div> <div class="stat-label" data-astro-cid-3j3cdvlv>Approved</div> </div> </div> <div class="filter-tabs" data-astro-cid-3j3cdvlv> <button class="filter-tab active" onclick="setFilter('all')" data-astro-cid-3j3cdvlv>All</button> <button class="filter-tab" onclick="setFilter('pending')" data-astro-cid-3j3cdvlv>Pending</button> <button class="filter-tab" onclick="setFilter('approved')" data-astro-cid-3j3cdvlv>Approved</button> </div> <div id="comments-list" data-astro-cid-3j3cdvlv> <div class="loading" data-astro-cid-3j3cdvlv>Loading comments...</div> </div> </div> </div> <script>
    let adminSecret = '';
    let allComments = [];
    let currentFilter = 'all';

    function login() {
      const secretInput = document.getElementById('admin-secret');
      adminSecret = secretInput.value;
      
      if (!adminSecret) {
        showLoginError('Please enter the admin secret');
        return;
      }
      
      // Test the credentials by fetching comments
      fetchComments()
        .then(() => {
          document.getElementById('login-section').style.display = 'none';
          document.getElementById('admin-section').style.display = 'block';
        })
        .catch(err => {
          showLoginError('Invalid admin secret');
        });
    }

    function showLoginError(msg) {
      const errorEl = document.getElementById('login-error');
      errorEl.textContent = msg;
      errorEl.style.display = 'block';
    }

    async function fetchComments() {
      const response = await fetch('/api/admin/comments', {
        headers: {
          'Authorization': \`Bearer \${adminSecret}\`
        }
      });
      
      if (!response.ok) {
        throw new Error('Unauthorized');
      }
      
      const data = await response.json();
      allComments = data.comments || [];
      updateStats();
      renderComments();
    }

    function updateStats() {
      const total = allComments.length;
      const approved = allComments.filter(c => c.approved).length;
      const pending = total - approved;
      
      document.getElementById('total-count').textContent = total;
      document.getElementById('pending-count').textContent = pending;
      document.getElementById('approved-count').textContent = approved;
    }

    function setFilter(filter) {
      currentFilter = filter;
      document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.toggle('active', tab.textContent.toLowerCase() === filter);
      });
      renderComments();
    }

    function renderComments() {
      const container = document.getElementById('comments-list');
      
      let filtered = allComments;
      if (currentFilter === 'pending') {
        filtered = allComments.filter(c => !c.approved);
      } else if (currentFilter === 'approved') {
        filtered = allComments.filter(c => c.approved);
      }
      
      if (filtered.length === 0) {
        container.innerHTML = '<div class="empty">No comments found</div>';
        return;
      }
      
      container.innerHTML = filtered.map(comment => \`
        <div class="comment-card \${comment.approved ? 'approved' : 'pending'}">
          <div class="comment-header">
            <div>
              <div class="comment-name">\${escapeHtml(comment.name)}</div>
              \${comment.email ? \`<div class="comment-email">\${escapeHtml(comment.email)}</div>\` : ''}
            </div>
            <span class="status-badge \${comment.approved ? 'approved' : 'pending'}">
              \${comment.approved ? 'Approved' : 'Pending'}
            </span>
          </div>
          <div class="comment-post">Post: \${escapeHtml(comment.postId)}</div>
          <div class="comment-content">\${escapeHtml(comment.content)}</div>
          <div class="comment-meta">\${new Date(comment.createdAt).toLocaleString()}</div>
          <div class="actions">
            \${!comment.approved ? \`
              <button class="btn btn-approve" onclick="approveComment('\${comment.id}')">
                Approve
              </button>
            \` : \`
              <button class="btn btn-reject" onclick="rejectComment('\${comment.id}')">
                Unapprove
              </button>
            \`}
            <button class="btn btn-delete" onclick="deleteComment('\${comment.id}')">
              Delete
            </button>
          </div>
        </div>
      \`).join('');
    }

    function escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }

    async function approveComment(commentId) {
      try {
        const response = await fetch('/api/admin/comments', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': \`Bearer \${adminSecret}\`
          },
          body: JSON.stringify({ commentId, approved: true })
        });
        
        if (response.ok) {
          await fetchComments();
        }
      } catch (error) {
        console.error('Failed to approve comment:', error);
      }
    }

    async function rejectComment(commentId) {
      try {
        const response = await fetch('/api/admin/comments', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': \`Bearer \${adminSecret}\`
          },
          body: JSON.stringify({ commentId, approved: false })
        });
        
        if (response.ok) {
          await fetchComments();
        }
      } catch (error) {
        console.error('Failed to reject comment:', error);
      }
    }

    async function deleteComment(commentId) {
      if (!confirm('Are you sure you want to delete this comment?')) {
        return;
      }
      
      try {
        const response = await fetch('/api/admin/comments', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': \`Bearer \${adminSecret}\`
          },
          body: JSON.stringify({ commentId })
        });
        
        if (response.ok) {
          await fetchComments();
        }
      } catch (error) {
        console.error('Failed to delete comment:', error);
      }
    }

    // Allow Enter key to login
    document.getElementById('admin-secret').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        login();
      }
    });
  <\/script> </body> </html>`], ['<html lang="en" data-astro-cid-3j3cdvlv> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Admin - Comments</title>', `</head> <body data-astro-cid-3j3cdvlv> <div id="app" data-astro-cid-3j3cdvlv> <!-- Login form shown initially --> <div id="login-section" class="login-form" data-astro-cid-3j3cdvlv> <h2 data-astro-cid-3j3cdvlv>Admin Login</h2> <input type="password" id="admin-secret" placeholder="Enter admin secret" data-astro-cid-3j3cdvlv> <button onclick="login()" data-astro-cid-3j3cdvlv>Login</button> <p id="login-error" style="color: #ef4444; margin-top: 1rem; display: none;" data-astro-cid-3j3cdvlv></p> </div> <!-- Admin panel (hidden initially) --> <div id="admin-section" style="display: none;" data-astro-cid-3j3cdvlv> <h1 data-astro-cid-3j3cdvlv>Comment Management</h1> <div class="stats" data-astro-cid-3j3cdvlv> <div class="stat" data-astro-cid-3j3cdvlv> <div class="stat-value" id="total-count" data-astro-cid-3j3cdvlv>0</div> <div class="stat-label" data-astro-cid-3j3cdvlv>Total</div> </div> <div class="stat" data-astro-cid-3j3cdvlv> <div class="stat-value" id="pending-count" data-astro-cid-3j3cdvlv>0</div> <div class="stat-label" data-astro-cid-3j3cdvlv>Pending</div> </div> <div class="stat" data-astro-cid-3j3cdvlv> <div class="stat-value" id="approved-count" data-astro-cid-3j3cdvlv>0</div> <div class="stat-label" data-astro-cid-3j3cdvlv>Approved</div> </div> </div> <div class="filter-tabs" data-astro-cid-3j3cdvlv> <button class="filter-tab active" onclick="setFilter('all')" data-astro-cid-3j3cdvlv>All</button> <button class="filter-tab" onclick="setFilter('pending')" data-astro-cid-3j3cdvlv>Pending</button> <button class="filter-tab" onclick="setFilter('approved')" data-astro-cid-3j3cdvlv>Approved</button> </div> <div id="comments-list" data-astro-cid-3j3cdvlv> <div class="loading" data-astro-cid-3j3cdvlv>Loading comments...</div> </div> </div> </div> <script>
    let adminSecret = '';
    let allComments = [];
    let currentFilter = 'all';

    function login() {
      const secretInput = document.getElementById('admin-secret');
      adminSecret = secretInput.value;
      
      if (!adminSecret) {
        showLoginError('Please enter the admin secret');
        return;
      }
      
      // Test the credentials by fetching comments
      fetchComments()
        .then(() => {
          document.getElementById('login-section').style.display = 'none';
          document.getElementById('admin-section').style.display = 'block';
        })
        .catch(err => {
          showLoginError('Invalid admin secret');
        });
    }

    function showLoginError(msg) {
      const errorEl = document.getElementById('login-error');
      errorEl.textContent = msg;
      errorEl.style.display = 'block';
    }

    async function fetchComments() {
      const response = await fetch('/api/admin/comments', {
        headers: {
          'Authorization': \\\`Bearer \\\${adminSecret}\\\`
        }
      });
      
      if (!response.ok) {
        throw new Error('Unauthorized');
      }
      
      const data = await response.json();
      allComments = data.comments || [];
      updateStats();
      renderComments();
    }

    function updateStats() {
      const total = allComments.length;
      const approved = allComments.filter(c => c.approved).length;
      const pending = total - approved;
      
      document.getElementById('total-count').textContent = total;
      document.getElementById('pending-count').textContent = pending;
      document.getElementById('approved-count').textContent = approved;
    }

    function setFilter(filter) {
      currentFilter = filter;
      document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.toggle('active', tab.textContent.toLowerCase() === filter);
      });
      renderComments();
    }

    function renderComments() {
      const container = document.getElementById('comments-list');
      
      let filtered = allComments;
      if (currentFilter === 'pending') {
        filtered = allComments.filter(c => !c.approved);
      } else if (currentFilter === 'approved') {
        filtered = allComments.filter(c => c.approved);
      }
      
      if (filtered.length === 0) {
        container.innerHTML = '<div class="empty">No comments found</div>';
        return;
      }
      
      container.innerHTML = filtered.map(comment => \\\`
        <div class="comment-card \\\${comment.approved ? 'approved' : 'pending'}">
          <div class="comment-header">
            <div>
              <div class="comment-name">\\\${escapeHtml(comment.name)}</div>
              \\\${comment.email ? \\\`<div class="comment-email">\\\${escapeHtml(comment.email)}</div>\\\` : ''}
            </div>
            <span class="status-badge \\\${comment.approved ? 'approved' : 'pending'}">
              \\\${comment.approved ? 'Approved' : 'Pending'}
            </span>
          </div>
          <div class="comment-post">Post: \\\${escapeHtml(comment.postId)}</div>
          <div class="comment-content">\\\${escapeHtml(comment.content)}</div>
          <div class="comment-meta">\\\${new Date(comment.createdAt).toLocaleString()}</div>
          <div class="actions">
            \\\${!comment.approved ? \\\`
              <button class="btn btn-approve" onclick="approveComment('\\\${comment.id}')">
                Approve
              </button>
            \\\` : \\\`
              <button class="btn btn-reject" onclick="rejectComment('\\\${comment.id}')">
                Unapprove
              </button>
            \\\`}
            <button class="btn btn-delete" onclick="deleteComment('\\\${comment.id}')">
              Delete
            </button>
          </div>
        </div>
      \\\`).join('');
    }

    function escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }

    async function approveComment(commentId) {
      try {
        const response = await fetch('/api/admin/comments', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': \\\`Bearer \\\${adminSecret}\\\`
          },
          body: JSON.stringify({ commentId, approved: true })
        });
        
        if (response.ok) {
          await fetchComments();
        }
      } catch (error) {
        console.error('Failed to approve comment:', error);
      }
    }

    async function rejectComment(commentId) {
      try {
        const response = await fetch('/api/admin/comments', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': \\\`Bearer \\\${adminSecret}\\\`
          },
          body: JSON.stringify({ commentId, approved: false })
        });
        
        if (response.ok) {
          await fetchComments();
        }
      } catch (error) {
        console.error('Failed to reject comment:', error);
      }
    }

    async function deleteComment(commentId) {
      if (!confirm('Are you sure you want to delete this comment?')) {
        return;
      }
      
      try {
        const response = await fetch('/api/admin/comments', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': \\\`Bearer \\\${adminSecret}\\\`
          },
          body: JSON.stringify({ commentId })
        });
        
        if (response.ok) {
          await fetchComments();
        }
      } catch (error) {
        console.error('Failed to delete comment:', error);
      }
    }

    // Allow Enter key to login
    document.getElementById('admin-secret').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        login();
      }
    });
  <\/script> </body> </html>`])), renderHead());
}, "/Users/obiabo/Desktop/Container/personal/obiabo/src/pages/admin/comments.astro", void 0);

const $$file = "/Users/obiabo/Desktop/Container/personal/obiabo/src/pages/admin/comments.astro";
const $$url = "/admin/comments";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Comments,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
