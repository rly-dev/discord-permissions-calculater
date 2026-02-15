// ─── 1. PERMISSION DATA ─────────────────────────────
const PERMISSIONS = [
  { flag: 1n << 0n, name: 'CREATE_INSTANT_INVITE', label: 'Create Invite', description: 'Allows creating invite links to the server. Safe for most bots.', category: 'general', danger: 'safe' },
  { flag: 1n << 1n, name: 'KICK_MEMBERS', label: 'Kick Members', description: 'Can remove members from the server, but they can rejoin with a new invite.', category: 'membership', danger: 'high' },
  { flag: 1n << 2n, name: 'BAN_MEMBERS', label: 'Ban Members', description: 'Can ban members and remove their access to the server entirely.', category: 'membership', danger: 'critical' },
  { flag: 1n << 3n, name: 'ADMINISTRATOR', label: 'Administrator', description: 'Grants every permission and bypasses all channel overrides. The nuclear option. Never assign to a bot unless it truly needs full server control.', category: 'advanced', danger: 'critical' },
  { flag: 1n << 4n, name: 'MANAGE_CHANNELS', label: 'Manage Channels', description: 'Can create, edit, and delete channels, including permission overwrites.', category: 'general', danger: 'high' },
  { flag: 1n << 5n, name: 'MANAGE_GUILD', label: 'Manage Server', description: 'Can update core server settings like name, region options, and system behavior.', category: 'general', danger: 'high' },
  { flag: 1n << 6n, name: 'ADD_REACTIONS', label: 'Add Reactions', description: 'Lets the bot add emoji reactions to messages.', category: 'text', danger: 'safe' },
  { flag: 1n << 7n, name: 'VIEW_AUDIT_LOG', label: 'View Audit Log', description: 'Can read moderation and management action history from the server audit log.', category: 'general', danger: 'moderate' },
  { flag: 1n << 8n, name: 'PRIORITY_SPEAKER', label: 'Priority Speaker', description: 'Gives voice priority so the user is easier to hear over others in voice channels.', category: 'voice', danger: 'moderate' },
  { flag: 1n << 9n, name: 'STREAM', label: 'Video (Stream)', description: 'Allows streaming screen or video in voice channels where streaming is enabled.', category: 'voice', danger: 'safe' },
  { flag: 1n << 10n, name: 'VIEW_CHANNEL', label: 'View Channels', description: 'Lets the bot see channels and read metadata for channels it can access.', category: 'general', danger: 'safe' },
  { flag: 1n << 11n, name: 'SEND_MESSAGES', label: 'Send Messages', description: 'Lets the bot post text messages in channels it can access. Required for almost every bot.', category: 'text', danger: 'safe' },
  { flag: 1n << 12n, name: 'SEND_TTS_MESSAGES', label: 'Send TTS Messages', description: 'Allows sending text-to-speech messages that may trigger TTS playback for users.', category: 'text', danger: 'moderate' },
  { flag: 1n << 13n, name: 'MANAGE_MESSAGES', label: 'Manage Messages', description: 'Can delete messages from others and pin or unpin messages in text channels.', category: 'text', danger: 'high' },
  { flag: 1n << 14n, name: 'EMBED_LINKS', label: 'Embed Links', description: 'Allows rich embeds for URLs in messages, useful for previews and bot output.', category: 'text', danger: 'safe' },
  { flag: 1n << 15n, name: 'ATTACH_FILES', label: 'Attach Files', description: 'Lets the bot upload files and images in channels where it can send messages.', category: 'text', danger: 'safe' },
  { flag: 1n << 16n, name: 'READ_MESSAGE_HISTORY', label: 'Read Message History', description: 'Allows reading older channel messages, needed for many command and logging flows.', category: 'text', danger: 'safe' },
  { flag: 1n << 17n, name: 'MENTION_EVERYONE', label: 'Mention @everyone', description: 'Can ping @everyone and @here in any channel. Extremely spammy if misused.', category: 'text', danger: 'critical' },
  { flag: 1n << 18n, name: 'USE_EXTERNAL_EMOJIS', label: 'Use External Emojis', description: 'Allows using emojis from other servers where the bot has access.', category: 'text', danger: 'safe' },
  { flag: 1n << 19n, name: 'VIEW_GUILD_INSIGHTS', label: 'View Server Insights', description: 'Can view server analytics and growth insights if insights are enabled.', category: 'general', danger: 'moderate' },
  { flag: 1n << 20n, name: 'CONNECT', label: 'Connect', description: 'Allows joining voice channels. Required for voice and music bots.', category: 'voice', danger: 'safe' },
  { flag: 1n << 21n, name: 'SPEAK', label: 'Speak', description: 'Allows transmitting audio in voice channels after connecting.', category: 'voice', danger: 'safe' },
  { flag: 1n << 22n, name: 'MUTE_MEMBERS', label: 'Mute Members', description: 'Can server-mute members in voice channels. Has no effect unless CONNECT is also granted.', category: 'voice', danger: 'high' },
  { flag: 1n << 23n, name: 'DEAFEN_MEMBERS', label: 'Deafen Members', description: 'Can server-deafen members in voice channels. Has no effect unless CONNECT is also granted.', category: 'voice', danger: 'high' },
  { flag: 1n << 24n, name: 'MOVE_MEMBERS', label: 'Move Members', description: 'Can drag users between voice channels. Has no effect unless CONNECT is also granted.', category: 'voice', danger: 'high' },
  { flag: 1n << 25n, name: 'USE_VAD', label: 'Use VAD', description: 'Allows using voice activity detection instead of push-to-talk. Required for most voice bots.', category: 'voice', danger: 'safe' },
  { flag: 1n << 26n, name: 'CHANGE_NICKNAME', label: 'Change Nickname', description: 'Can change its own nickname in the server.', category: 'general', danger: 'safe' },
  { flag: 1n << 27n, name: 'MANAGE_NICKNAMES', label: 'Manage Nicknames', description: 'Can change nicknames of other members, subject to role hierarchy.', category: 'general', danger: 'moderate' },
  { flag: 1n << 28n, name: 'MANAGE_ROLES', label: 'Manage Roles', description: "Can create, edit, and delete roles below the bot's top role. High risk: can grant powers to other users.", category: 'general', danger: 'critical' },
  { flag: 1n << 29n, name: 'MANAGE_WEBHOOKS', label: 'Manage Webhooks', description: 'Can create, edit, and delete webhooks. Webhooks can post as any name/avatar, so treat this as moderate risk.', category: 'general', danger: 'high' },
  { flag: 1n << 30n, name: 'MANAGE_GUILD_EXPRESSIONS', label: 'Manage Emojis & Stickers', description: 'Can edit and delete server emojis, stickers, and related expressions.', category: 'general', danger: 'moderate' },
  { flag: 1n << 31n, name: 'USE_APPLICATION_COMMANDS', label: 'Use Application Commands', description: 'Allows slash commands and context commands in channels where visible.', category: 'text', danger: 'safe' },
  { flag: 1n << 32n, name: 'REQUEST_TO_SPEAK', label: 'Request to Speak', description: 'Allows requesting speaking privileges in stage channels.', category: 'stage', danger: 'safe' },
  { flag: 1n << 33n, name: 'MANAGE_EVENTS', label: 'Manage Events', description: 'Can create, edit, and delete scheduled events across the server.', category: 'membership', danger: 'moderate' },
  { flag: 1n << 34n, name: 'MANAGE_THREADS', label: 'Manage Threads', description: 'Can archive, delete, and manage threads created by other users.', category: 'text', danger: 'moderate' },
  { flag: 1n << 35n, name: 'CREATE_PUBLIC_THREADS', label: 'Create Public Threads', description: 'Allows creating threads that are visible to all users with channel access.', category: 'text', danger: 'safe' },
  { flag: 1n << 36n, name: 'CREATE_PRIVATE_THREADS', label: 'Create Private Threads', description: 'Allows creating invite-only private threads in supported channels.', category: 'text', danger: 'safe' },
  { flag: 1n << 37n, name: 'USE_EXTERNAL_STICKERS', label: 'Use External Stickers', description: 'Allows sending stickers from other servers in messages.', category: 'text', danger: 'safe' },
  { flag: 1n << 38n, name: 'SEND_MESSAGES_IN_THREADS', label: 'Send Messages in Threads', description: 'Allows posting replies inside thread channels.', category: 'text', danger: 'safe' },
  { flag: 1n << 39n, name: 'USE_EMBEDDED_ACTIVITIES', label: 'Use Embedded Activities', description: 'Allows launching Discord Activities in voice channels.', category: 'advanced', danger: 'moderate' },
  { flag: 1n << 40n, name: 'MODERATE_MEMBERS', label: 'Moderate Members (Timeout)', description: 'Can timeout members, preventing them from messaging or joining voice for a set duration.', category: 'membership', danger: 'high' },
  { flag: 1n << 41n, name: 'VIEW_CREATOR_MONETIZATION', label: 'View Creator Monetization Analytics', description: 'Can view monetization analytics and creator-related server metrics.', category: 'advanced', danger: 'moderate' },
  { flag: 1n << 42n, name: 'USE_SOUNDBOARD', label: 'Use Soundboard', description: 'Allows triggering soundboard clips in voice channels.', category: 'voice', danger: 'safe' },
  { flag: 1n << 43n, name: 'CREATE_GUILD_EXPRESSIONS', label: 'Create Guild Expressions', description: 'Allows creating new emojis, stickers, and soundboard expressions in the server.', category: 'advanced', danger: 'moderate' },
  { flag: 1n << 44n, name: 'CREATE_EVENTS', label: 'Create Events', description: 'Allows creating scheduled events without full event management privileges.', category: 'membership', danger: 'safe' },
  { flag: 1n << 45n, name: 'USE_EXTERNAL_SOUNDS', label: 'Use External Sounds', description: 'Allows using soundboard sounds imported from external servers.', category: 'voice', danger: 'safe' },
  { flag: 1n << 46n, name: 'SEND_VOICE_MESSAGES', label: 'Send Voice Messages', description: 'Allows sending voice message clips in text channels.', category: 'text', danger: 'safe' },
  { flag: 1n << 47n, name: 'USE_CLYDE_AI', label: 'Use Clyde AI', description: 'Allows using Clyde AI features where Discord still provides them.', category: 'advanced', danger: 'moderate' },
  { flag: 1n << 48n, name: 'SET_VOICE_CHANNEL_STATUS', label: 'Set Voice Channel Status', description: 'Allows setting or updating voice channel status text.', category: 'voice', danger: 'safe' },
  { flag: 1n << 49n, name: 'SEND_POLLS', label: 'Send Polls', description: 'Allows creating poll messages in supported channels.', category: 'text', danger: 'safe' },
  { flag: 1n << 50n, name: 'USE_EXTERNAL_APPS', label: 'Use External Apps', description: 'Allows using app integrations from outside the current server context.', category: 'text', danger: 'moderate' },
];

const CATEGORIES = [
  { id: 'general', title: 'General Server' },
  { id: 'membership', title: 'Membership' },
  { id: 'text', title: 'Text Channels' },
  { id: 'voice', title: 'Voice Channels' },
  { id: 'stage', title: 'Stage Channels' },
  { id: 'advanced', title: 'Advanced' },
];

const BUILTIN_PRESETS = [
  { name: 'Read Only', permissions: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'] },
  { name: 'Moderation Bot', permissions: ['VIEW_CHANNEL', 'KICK_MEMBERS', 'BAN_MEMBERS', 'MODERATE_MEMBERS', 'MANAGE_MESSAGES', 'READ_MESSAGE_HISTORY', 'SEND_MESSAGES'] },
  { name: 'Music Bot', permissions: ['VIEW_CHANNEL', 'CONNECT', 'SPEAK', 'USE_VAD', 'EMBED_LINKS'] },
  { name: 'Utility Bot', permissions: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'ADD_REACTIONS', 'USE_APPLICATION_COMMANDS', 'READ_MESSAGE_HISTORY', 'USE_EXTERNAL_EMOJIS'] },
  { name: 'Logging Bot', permissions: ['VIEW_CHANNEL', 'VIEW_AUDIT_LOG', 'READ_MESSAGE_HISTORY', 'SEND_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES'] },
  { name: 'Community Manager', permissions: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'MANAGE_EVENTS', 'CREATE_EVENTS', 'MANAGE_NICKNAMES', 'CREATE_INSTANT_INVITE', 'EMBED_LINKS'] },
  { name: 'Announcement Bot', permissions: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'MENTION_EVERYONE', 'EMBED_LINKS', 'ATTACH_FILES', 'MANAGE_MESSAGES'] },
  { name: 'Full Admin ⚠️', permissions: ['ADMINISTRATOR'] },
];

// ─── 2. STATE ────────────────────────────────────────
const PERMISSION_MAP = Object.fromEntries(PERMISSIONS.map((p) => [p.name, p]));
const HIGH_RISK_NAMES = new Set(['BAN_MEMBERS', 'MANAGE_ROLES', 'MANAGE_GUILD', 'MANAGE_WEBHOOKS']);
const DANGEROUS_LEVELS = new Set(['high', 'critical']);

let selected = new Set();
let clientId = '';
let guildId = '';
let scopeMode = 'bot+commands';
let searchQuery = '';
let filterMode = 'all';
let customPresets = [];
let activeExportTab = 'djs';
let previousBitfield = 0n;
const collapsedCategories = new Set();
const dismissedWarnings = new Set();
let qrCodeInstance = null;

const els = {};

// ─── 3. RENDER ───────────────────────────────────────
function renderGrid() {
  const grid = els.permissionGrid;
  grid.innerHTML = '';

  const adminOn = selected.has('ADMINISTRATOR');
  let visibleCount = 0;
  let cardIndex = 0;

  for (const category of CATEGORIES) {
    const visiblePermissions = PERMISSIONS.filter((p) => p.category === category.id && matchesFilter(p));
    if (!visiblePermissions.length) continue;

    const section = document.createElement('section');
    section.className = 'category';
    if (collapsedCategories.has(category.id)) section.classList.add('collapsed');

    const head = document.createElement('button');
    head.type = 'button';
    head.className = 'category-head';
    head.innerHTML = `<span>${collapsedCategories.has(category.id) ? '▸' : '▾'} ${category.title}</span><span class="category-count">${visiblePermissions.length}</span>`;
    head.addEventListener('click', () => {
      if (collapsedCategories.has(category.id)) {
        collapsedCategories.delete(category.id);
      } else {
        collapsedCategories.add(category.id);
      }
      renderGrid();
    });

    const body = document.createElement('div');
    body.className = 'category-body';

    for (const permission of visiblePermissions) {
      visibleCount += 1;
      cardIndex += 1;
      const isSelected = selected.has(permission.name);
      const dangerClass = `danger-${permission.danger}`;
      const card = document.createElement('article');
      card.className = `perm-card ${dangerClass}`;
      if (isSelected) card.classList.add('selected');
      if (adminOn && permission.name !== 'ADMINISTRATOR') card.classList.add('dimmed');
      card.style.animationDelay = `${Math.min(cardIndex * 0.012, 0.35)}s`;

      const dangerLabel = permission.danger === 'high' ? 'Dangerous' : permission.danger[0].toUpperCase() + permission.danger.slice(1);
      card.innerHTML = `
        <div class="card-top">
          <span class="perm-name">${permission.name}</span>
          <span class="badge badge-${permission.danger}">${dangerLabel}</span>
        </div>
        <div class="card-mid">
          <strong>${permission.label}</strong>
          <div class="toggle-switch" aria-hidden="true"></div>
        </div>
        <p class="card-desc">${permission.description}</p>
        ${selected.has(permission.name) && HIGH_RISK_NAMES.has(permission.name) ? '<span class="high-risk-tag">High Risk</span>' : ''}
      `;
      card.addEventListener('click', () => togglePermission(permission.name));
      body.appendChild(card);
    }

    section.appendChild(head);
    section.appendChild(body);
    grid.appendChild(section);
  }

  if (!visibleCount) {
    const empty = document.createElement('div');
    empty.className = 'panel';
    empty.textContent = 'No permissions match the current search/filter.';
    grid.appendChild(empty);
  }

  els.resultCount.textContent = `Showing ${visibleCount} of ${PERMISSIONS.length} permissions`;
}

function renderBitfield() {
  const bitfield = computeBitfield();
  animateBigInt(els.decimalValue, previousBitfield, bitfield);
  els.hexValue.textContent = `0x${bitfield.toString(16)}`;
  els.binaryValue.textContent = toBinaryChunked(bitfield);
  els.selectedCount.textContent = `${selected.size} permission${selected.size === 1 ? '' : 's'} selected`;
  previousBitfield = bitfield;
}

function renderInviteLink() {
  const params = new URLSearchParams();
  params.set('client_id', clientId.trim());

  const scope = scopeMode === 'bot+commands' ? 'bot applications.commands' : scopeMode === 'commands' ? 'applications.commands' : 'bot';
  params.set('scope', scope);

  if (scope.includes('bot')) {
    params.set('permissions', computeBitfield().toString(10));
  }

  if (guildId.trim()) {
    params.set('guild_id', guildId.trim());
    params.set('disable_guild_select', 'true');
  }

  const url = `https://discord.com/oauth2/authorize?${params.toString()}`;
  els.inviteUrl.textContent = url;
  els.inviteUrl.dataset.value = url;

  if (typeof QRCode !== 'undefined') {
    if (!qrCodeInstance) {
      qrCodeInstance = new QRCode(els.qrCode, {
        text: url,
        width: 120,
        height: 120,
        colorDark: '#e6edf3',
        colorLight: '#0d1117',
      });
    } else {
      qrCodeInstance.makeCode(url);
    }
  }
}

function renderWarnings() {
  const activeWarnings = [];

  if (selected.has('ADMINISTRATOR')) {
    activeWarnings.push({ id: 'admin', level: 'critical', text: 'Administrator grants ALL permissions. All other toggles are redundant.' });
  }
  if (selected.has('MENTION_EVERYONE')) {
    activeWarnings.push({ id: 'mention_all', level: 'high', text: 'Can ping @everyone and @here. Use with care.' });
  }
  if (selected.has('MOVE_MEMBERS') && !selected.has('CONNECT')) {
    activeWarnings.push({ id: 'move_requires_connect', level: 'moderate', text: 'MOVE_MEMBERS requires CONNECT to have any effect.' });
  }
  if ((selected.has('MUTE_MEMBERS') || selected.has('DEAFEN_MEMBERS')) && !selected.has('CONNECT')) {
    activeWarnings.push({ id: 'mute_deafen_requires_connect', level: 'moderate', text: 'MUTE_MEMBERS / DEAFEN_MEMBERS require CONNECT to have any effect.' });
  }

  const activeIds = new Set(activeWarnings.map((w) => w.id));
  for (const id of [...dismissedWarnings]) {
    if (!activeIds.has(id)) dismissedWarnings.delete(id);
  }

  els.warnings.innerHTML = '';
  for (const warning of activeWarnings) {
    if (dismissedWarnings.has(warning.id)) continue;
    const row = document.createElement('div');
    row.className = `warning warning-${warning.level}`;
    row.innerHTML = `<span>${warning.text}</span><button class="warning-close" aria-label="Dismiss">✕</button>`;
    row.querySelector('.warning-close').addEventListener('click', () => {
      dismissedWarnings.add(warning.id);
      renderWarnings();
    });
    els.warnings.appendChild(row);
  }
}

function renderPresets() {
  els.builtinPresets.innerHTML = '';
  for (const preset of BUILTIN_PRESETS) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn preset-btn';
    btn.textContent = preset.name;
    btn.addEventListener('click', () => applyPreset(preset.permissions));
    els.builtinPresets.appendChild(btn);
  }

  els.customPresets.innerHTML = '';
  for (const preset of customPresets) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn ghost preset-btn';
    btn.innerHTML = `<span>${preset.name}</span>`;
    btn.addEventListener('click', () => applyPreset(preset.permissions));

    const del = document.createElement('button');
    del.type = 'button';
    del.className = 'delete-preset';
    del.textContent = '✕';
    del.title = 'Delete preset';
    del.addEventListener('click', (event) => {
      event.stopPropagation();
      deleteCustomPreset(preset.name);
    });

    btn.appendChild(del);
    els.customPresets.appendChild(btn);
  }
}

function renderExport() {
  const selectedOrdered = PERMISSIONS.filter((p) => selected.has(p.name));
  const bitfield = computeBitfield().toString(10);
  const codeByTab = {
    djs: buildDiscordJsSnippet(selectedOrdered, bitfield),
    dpy: buildDiscordPySnippet(selectedOrdered, bitfield),
    jda: buildJdaSnippet(selectedOrdered, bitfield),
    raw: bitfield,
  };

  els.exportCode.textContent = codeByTab[activeExportTab];

  document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.tab === activeExportTab);
  });
}

function renderAll() {
  renderGrid();
  renderBitfield();
  renderInviteLink();
  renderWarnings();
  renderExport();
  updateHash();
}

// ─── 4. BIGINT UTILS ─────────────────────────────────
function computeBitfield() {
  let bits = 0n;
  selected.forEach((name) => {
    bits |= PERMISSION_MAP[name].flag;
  });
  return bits;
}

function decodeBitfield(bigintValue) {
  const next = new Set();
  for (const permission of PERMISSIONS) {
    if ((bigintValue & permission.flag) === permission.flag) {
      next.add(permission.name);
    }
  }
  return next;
}

function toBinaryChunked(n) {
  const raw = n.toString(2) || '0';
  const padded = raw.padStart(Math.ceil(raw.length / 8) * 8 || 8, '0');
  return padded.replace(/(.{8})/g, '$1 ').trim();
}

function animateBigInt(el, from, to) {
  if (from === to) {
    el.textContent = to.toString(10);
    return;
  }

  const steps = 14n;
  const diff = to - from;
  let frame = 0n;

  function tick() {
    frame += 1n;
    if (frame >= steps) {
      el.textContent = to.toString(10);
      return;
    }
    const current = from + (diff * frame) / steps;
    el.textContent = current.toString(10);
    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

// ─── 5. EVENT HANDLERS ───────────────────────────────
function togglePermission(name) {
  if (!PERMISSION_MAP[name]) return;
  if (selected.has(name)) {
    selected.delete(name);
  } else {
    selected.add(name);
  }
  renderAll();
}

function applyPreset(names) {
  selected = new Set(names.filter((name) => PERMISSION_MAP[name]));
  showToast(`Applied preset: ${selected.size} permissions`);
  renderAll();
}

function handleDecode(input) {
  const value = input.trim();
  if (!value) {
    els.decodeError.textContent = 'Enter a decimal bitfield or hex value starting with 0x.';
    return;
  }

  try {
    const parsed = BigInt(value);
    if (parsed < 0n) {
      throw new Error('negative_not_allowed');
    }
    selected = decodeBitfield(parsed);
    els.decodeError.textContent = '';
    renderAll();
    showToast(`Decoded ${selected.size} permissions`);
  } catch (_err) {
    els.decodeError.textContent = 'Invalid bitfield. Use a valid decimal number or 0x-prefixed hexadecimal value.';
  }
}

function handleSearch(query) {
  searchQuery = query.trim().toLowerCase();
  renderGrid();
}

function matchesFilter(permission) {
  const queryOk = !searchQuery || `${permission.name} ${permission.label} ${permission.description}`.toLowerCase().includes(searchQuery);
  if (!queryOk) return false;

  if (filterMode === 'selected') return selected.has(permission.name);
  if (filterMode === 'dangerous') return DANGEROUS_LEVELS.has(permission.danger);
  return true;
}

// ─── 6. STORAGE ──────────────────────────────────────
function loadCustomPresets() {
  try {
    const raw = localStorage.getItem('dcalc_presets');
    customPresets = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(customPresets)) customPresets = [];
  } catch (_err) {
    customPresets = [];
  }
}

function saveCustomPreset(name, perms) {
  const cleanedName = name.trim();
  if (!cleanedName) return;

  const existingIndex = customPresets.findIndex((p) => p.name.toLowerCase() === cleanedName.toLowerCase());
  const payload = { name: cleanedName, permissions: [...new Set(perms)].filter((perm) => PERMISSION_MAP[perm]) };

  if (existingIndex >= 0) {
    customPresets[existingIndex] = payload;
  } else {
    customPresets.push(payload);
  }

  localStorage.setItem('dcalc_presets', JSON.stringify(customPresets));
  renderPresets();
}

function deleteCustomPreset(name) {
  customPresets = customPresets.filter((preset) => preset.name !== name);
  localStorage.setItem('dcalc_presets', JSON.stringify(customPresets));
  renderPresets();
}

// ─── 7. URL HASH ─────────────────────────────────────
function updateHash() {
  const params = new URLSearchParams();
  params.set('p', computeBitfield().toString(10));
  if (clientId.trim()) params.set('cid', clientId.trim());
  if (guildId.trim()) params.set('gid', guildId.trim());
  if (scopeMode !== 'bot+commands') params.set('sc', scopeMode);
  window.location.hash = params.toString();
}

function restoreFromHash() {
  const hash = window.location.hash.replace(/^#/, '');
  if (!hash) return;

  const params = new URLSearchParams(hash);
  const p = params.get('p');
  const cid = params.get('cid');
  const gid = params.get('gid');
  const sc = params.get('sc');

  if (p) {
    try {
      selected = decodeBitfield(BigInt(p));
    } catch (_err) {
      selected = new Set();
    }
  }
  if (cid) clientId = cid;
  if (gid) guildId = gid;
  if (sc && ['bot', 'bot+commands', 'commands'].includes(sc)) scopeMode = sc;
}

// ─── 8. CLIPBOARD ────────────────────────────────────
async function copyToClipboard(text, btn) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (_err) {
    const fallback = document.createElement('textarea');
    fallback.value = text;
    document.body.appendChild(fallback);
    fallback.select();
    document.execCommand('copy');
    fallback.remove();
  }

  if (btn) {
    const old = btn.textContent;
    btn.textContent = 'Copied! ✓';
    setTimeout(() => {
      btn.textContent = old;
    }, 1500);
  }
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add('show');
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => {
    els.toast.classList.remove('show');
  }, 1500);
}

// ─── 9. INIT ─────────────────────────────────────────
function initElements() {
  els.permissionGrid = document.getElementById('permissionGrid');
  els.searchInput = document.getElementById('searchInput');
  els.resultCount = document.getElementById('resultCount');
  els.decodeInput = document.getElementById('decodeInput');
  els.decodeBtn = document.getElementById('decodeBtn');
  els.decodeError = document.getElementById('decodeError');
  els.decimalValue = document.getElementById('decimalValue');
  els.hexValue = document.getElementById('hexValue');
  els.binaryValue = document.getElementById('binaryValue');
  els.selectedCount = document.getElementById('selectedCount');
  els.selectAllBtn = document.getElementById('selectAllBtn');
  els.clearAllBtn = document.getElementById('clearAllBtn');
  els.clientIdInput = document.getElementById('clientIdInput');
  els.guildIdInput = document.getElementById('guildIdInput');
  els.scopeSelect = document.getElementById('scopeSelect');
  els.inviteUrl = document.getElementById('inviteUrl');
  els.copyInviteBtn = document.getElementById('copyInviteBtn');
  els.openInviteBtn = document.getElementById('openInviteBtn');
  els.copyShareBtn = document.getElementById('copyShareBtn');
  els.qrCode = document.getElementById('qrCode');
  els.builtinPresets = document.getElementById('builtinPresets');
  els.customPresets = document.getElementById('customPresets');
  els.savePresetBtn = document.getElementById('savePresetBtn');
  els.warnings = document.getElementById('warnings');
  els.exportToggle = document.getElementById('exportToggle');
  els.exportContent = document.getElementById('exportContent');
  els.exportCode = document.getElementById('exportCode');
  els.copyExportBtn = document.getElementById('copyExportBtn');
  els.toast = document.getElementById('toast');
  els.resetFilterBtn = document.getElementById('resetFilterBtn');
}

function bindEvents() {
  els.searchInput.addEventListener('input', (event) => {
    handleSearch(event.target.value);
  });

  els.decodeBtn.addEventListener('click', () => handleDecode(els.decodeInput.value));
  els.decodeInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') handleDecode(els.decodeInput.value);
  });

  els.selectAllBtn.addEventListener('click', () => {
    selected = new Set(PERMISSIONS.map((p) => p.name));
    renderAll();
  });

  els.clearAllBtn.addEventListener('click', () => {
    selected = new Set();
    renderAll();
  });

  document.querySelectorAll('[data-copy-target]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.copyTarget;
      if (target === 'decimal') copyToClipboard(computeBitfield().toString(10), btn);
      if (target === 'hex') copyToClipboard(`0x${computeBitfield().toString(16)}`, btn);
      if (target === 'binary') copyToClipboard(toBinaryChunked(computeBitfield()), btn);
    });
  });

  els.clientIdInput.addEventListener('input', (event) => {
    clientId = event.target.value;
    renderAll();
  });

  els.guildIdInput.addEventListener('input', (event) => {
    guildId = event.target.value;
    renderAll();
  });

  els.scopeSelect.addEventListener('change', (event) => {
    scopeMode = event.target.value;
    renderAll();
  });

  els.copyInviteBtn.addEventListener('click', () => {
    copyToClipboard(els.inviteUrl.dataset.value || '', els.copyInviteBtn);
  });

  els.openInviteBtn.addEventListener('click', () => {
    const url = els.inviteUrl.dataset.value || '';
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  });

  els.copyShareBtn.addEventListener('click', () => {
    copyToClipboard(window.location.href, els.copyShareBtn);
  });

  els.savePresetBtn.addEventListener('click', () => {
    const name = window.prompt('Preset name');
    if (!name) return;
    saveCustomPreset(name, [...selected]);
    showToast(`Saved preset: ${name.trim()}`);
  });

  document.querySelectorAll('.chip[data-filter]').forEach((chip) => {
    chip.addEventListener('click', () => {
      filterMode = chip.dataset.filter;
      document.querySelectorAll('.chip[data-filter]').forEach((node) => node.classList.remove('active'));
      chip.classList.add('active');
      renderGrid();
    });
  });

  els.resetFilterBtn.addEventListener('click', () => {
    searchQuery = '';
    filterMode = 'all';
    els.searchInput.value = '';
    document.querySelectorAll('.chip[data-filter]').forEach((node) => {
      node.classList.toggle('active', node.dataset.filter === 'all');
    });
    renderGrid();
  });

  els.exportToggle.addEventListener('click', () => {
    const expanded = els.exportToggle.getAttribute('aria-expanded') === 'true';
    els.exportToggle.setAttribute('aria-expanded', String(!expanded));
    els.exportContent.classList.toggle('collapsed', expanded);
  });

  document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      activeExportTab = btn.dataset.tab;
      renderExport();
    });
  });

  els.copyExportBtn.addEventListener('click', () => {
    copyToClipboard(els.exportCode.textContent || '', els.copyExportBtn);
  });
}

function buildDiscordJsSnippet(selectedOrdered, bitfield) {
  const lines = selectedOrdered.map((perm) => `  PermissionFlagsBits.${toPascalCase(perm.name)},`);
  return `const { PermissionFlagsBits, PermissionsBitField } = require('discord.js');\n\nconst permissions = new PermissionsBitField([\n${lines.join('\n')}\n]);\n// Bitfield value: ${bitfield}n`;
}

function buildDiscordPySnippet(selectedOrdered, bitfield) {
  if (!selectedOrdered.length) {
    return `import discord\n\npermissions = discord.Permissions()\n# Bitfield value: ${bitfield}`;
  }
  const lines = selectedOrdered.map((perm) => `    ${perm.name.toLowerCase()}=True,`);
  return `import discord\n\npermissions = discord.Permissions(\n${lines.join('\n')}\n)\n# Bitfield value: ${bitfield}`;
}

function buildJdaSnippet(selectedOrdered, bitfield) {
  if (!selectedOrdered.length) {
    return `EnumSet<Permission> permissions = EnumSet.noneOf(Permission.class);\n// Bitfield value: ${bitfield}`;
  }
  const lines = selectedOrdered.map((perm) => `    Permission.${perm.name},`);
  return `EnumSet<Permission> permissions = EnumSet.of(\n${lines.join('\n')}\n);\n// Bitfield value: ${bitfield}`;
}

function toPascalCase(name) {
  return name
    .toLowerCase()
    .split('_')
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join('');
}

function init() {
  initElements();
  restoreFromHash();
  loadCustomPresets();

  els.clientIdInput.value = clientId;
  els.guildIdInput.value = guildId;
  els.scopeSelect.value = scopeMode;

  bindEvents();
  renderPresets();
  renderAll();
}

document.addEventListener('DOMContentLoaded', init);
