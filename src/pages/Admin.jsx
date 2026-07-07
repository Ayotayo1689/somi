import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { api, clearAdminToken, getAdminToken, setAdminToken } from "../lib/api";
import { defaultContent } from "../data/defaultContent";

const pageSlugs = ["home", "services", "about", "clients", "contact"];
const portfolioTabs = [
  { key: "portfolio:video", title: "Video Portfolio", type: "video" },
  { key: "portfolio:photo", title: "Photo Portfolio", type: "photo" },
];
const collectionNames = ["services", "clients", "stats"];
const lockedFieldNames = new Set(["path", "buttonUrl", "linkUrl", "url"]);
const allowedUrlFields = new Set(["image", "thumbnail", "videoUrl", "embedUrl", "instagramUrl", "facebookUrl", "tiktokUrl", "twitterUrl", "xUrl", "youtubeUrl", "linkedinUrl", "socialUrl"]);
const colorPattern = /^(#(?:[0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})|rgba?\(.+\)|hsla?\(.+\))$/i;
const colorFieldNames = new Set([
  "palm",
  "flower",
  "sail",
  "serenade",
  "ink",
  "paper",
  "muted",
  "onDark",
  "subtleText",
  "softText",
  "line",
  "danger",
]);
const shadowFieldNames = new Set(["shadow", "shadowSoft"]);

function cloneValue(value) {
  return JSON.parse(JSON.stringify(value || {}));
}

function canEditField(key) {
  const lowerKey = String(key).toLowerCase();
  if (allowedUrlFields.has(key)) return true;
  if (lowerKey.includes("email")) return true;
  if (lockedFieldNames.has(key)) return false;
  if (lowerKey.endsWith("url")) return false;
  return true;
}

function labelFromKey(key) {
  return String(key)
    .replace(/([A-Z])/g, " $1")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function mergeAdminContent(content) {
  return {
    ...defaultContent,
    ...content,
    siteSettings: {
      ...defaultContent.siteSettings,
      ...(content?.siteSettings || {}),
      theme: {
        ...defaultContent.siteSettings.theme,
        ...(content?.siteSettings?.theme || {}),
      },
    },
  };
}

function normalizeHexColor(value) {
  const color = String(value || "").trim();
  if (/^#[0-9a-f]{6}$/i.test(color)) return color;
  if (/^#[0-9a-f]{3}$/i.test(color)) {
    return `#${color.slice(1).split("").map((letter) => `${letter}${letter}`).join("")}`;
  }
  return defaultContent.siteSettings.theme.ink;
}

function isColorField(name, value) {
  return colorFieldNames.has(String(name)) || colorPattern.test(String(value || ""));
}

function toHexChannel(value) {
  const number = Math.max(0, Math.min(255, Number(value) || 0));
  return Math.round(number).toString(16).padStart(2, "0");
}

function parseColorValue(value) {
  const color = String(value || "").trim();
  const hexMatch = color.match(/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i);
  if (hexMatch) return { hex: normalizeHexColor(color), format: "hex" };

  const rgbMatch = color.match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)$/i);
  if (!rgbMatch) return null;

  return {
    hex: `#${toHexChannel(rgbMatch[1])}${toHexChannel(rgbMatch[2])}${toHexChannel(rgbMatch[3])}`,
    alpha: rgbMatch[4],
    format: rgbMatch[4] === undefined ? "rgb" : "rgba",
  };
}

function hexToRgb(hex) {
  const normalized = normalizeHexColor(hex).replace("#", "");
  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
  };
}

function updateColorValue(currentValue, nextHex) {
  const parsed = parseColorValue(currentValue);
  if (!parsed || parsed.format === "hex") return nextHex;
  const { r, g, b } = hexToRgb(nextHex);
  return parsed.format === "rgba" ? `rgba(${r}, ${g}, ${b}, ${parsed.alpha ?? 1})` : `rgb(${r}, ${g}, ${b})`;
}

function parseShadowColor(value) {
  const shadow = String(value || "");
  const colorMatch = shadow.match(/rgba?\([^)]+\)|#[0-9a-f]{3,8}/i);
  if (!colorMatch) return null;
  const parsed = parseColorValue(colorMatch[0]);
  if (!parsed) return null;
  return { ...parsed, raw: colorMatch[0] };
}

function updateShadowColor(currentValue, nextHex) {
  const parsed = parseShadowColor(currentValue);
  if (!parsed) return currentValue;
  return String(currentValue).replace(parsed.raw, updateColorValue(parsed.raw, nextHex));
}

function getAtPath(source, path) {
  return path.reduce((current, key) => current?.[key], source);
}

function setAtPath(source, path, value) {
  const next = cloneValue(source);
  let current = next;
  path.slice(0, -1).forEach((key) => {
    current = current[key];
  });
  current[path[path.length - 1]] = value;
  return next;
}

function removeAtPath(source, path) {
  const next = cloneValue(source);
  const parent = getAtPath(next, path.slice(0, -1));
  parent.splice(path[path.length - 1], 1);
  return next;
}

function makeEmptyLike(value) {
  if (Array.isArray(value)) return [];
  if (typeof value === "boolean") return false;
  if (typeof value === "number") return 0;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, makeEmptyLike(item)]));
  }
  return "";
}

function makePortfolioItem(type = "photo", order = 1) {
  return {
    title: "",
    type,
    image: "",
    thumbnail: "",
    videoUrl: "",
    order,
    isActive: true,
  };
}

function FieldEditor({ name, value, path, onChange, onRemove, canRemove, collection, portfolioType }) {
  const fieldId = path.join("-");

  if (Array.isArray(value)) {
    const addItem = () => {
      const template = collection === "portfolio" ? makePortfolioItem(portfolioType || "photo", value.length + 1) : (value[0] ?? "");
      onChange(path, [...value, collection === "portfolio" ? template : makeEmptyLike(template)]);
    };

    return (
      <fieldset className="admin-fieldset">
        <div className="admin-fieldset-header">
          <legend>{labelFromKey(name)}</legend>
          <button type="button" onClick={addItem}>Add</button>
        </div>
        <div className="admin-array">
          {value.map((item, index) => (
            <div className="admin-array-item" key={`${fieldId}-${index}`}>
              <FieldEditor
                name={`${labelFromKey(name)} ${index + 1}`}
                value={item}
                path={[...path, index]}
                onChange={onChange}
                onRemove={() => onChange(path, value.filter((_, itemIndex) => itemIndex !== index))}
                canRemove={value.length > 0}
                collection={collection}
                portfolioType={portfolioType}
              />
              {typeof item !== "object" || item === null ? (
                <button type="button" className="admin-remove" onClick={() => onChange(path, value.filter((_, itemIndex) => itemIndex !== index))}>
                  Remove
                </button>
              ) : null}
            </div>
          ))}
          {!value.length && <p className="admin-empty">No items yet.</p>}
        </div>
      </fieldset>
    );
  }

  if (value && typeof value === "object") {
    const editableValue = { ...value };
    if (collection === "portfolio") {
      if (portfolioType) editableValue.type = portfolioType;
      if (editableValue.type === "video") {
        if (!Object.prototype.hasOwnProperty.call(editableValue, "thumbnail")) editableValue.thumbnail = "";
        if (!Object.prototype.hasOwnProperty.call(editableValue, "videoUrl")) editableValue.videoUrl = "";
      } else if (!Object.prototype.hasOwnProperty.call(editableValue, "image")) {
        editableValue.image = "";
      }
    }

    const entries = Object.entries(editableValue).filter(([key]) => {
      if (!canEditField(key)) return false;
      if (collection === "portfolio" && portfolioType && key === "type") return false;
      if (collection === "portfolio" && ["thumbnail", "videoUrl"].includes(key) && editableValue.type !== "video") return false;
      if (collection === "portfolio" && key === "image" && editableValue.type === "video") return false;
      return true;
    });

    return (
      <fieldset className="admin-fieldset">
        <div className="admin-fieldset-header">
          <legend>{labelFromKey(name)}</legend>
          {canRemove && (
            <button type="button" className="admin-remove" onClick={onRemove}>
              Remove
            </button>
          )}
        </div>
        <div className="admin-object-grid">
          {entries.map(([key, item]) => (
            <FieldEditor
              key={key}
              name={key}
              value={item}
              path={[...path, key]}
              onChange={onChange}
              collection={collection}
              portfolioType={portfolioType}
            />
          ))}
        </div>
      </fieldset>
    );
  }

  if (typeof value === "boolean") {
    return (
      <label className="admin-check">
        <input type="checkbox" checked={value} onChange={(event) => onChange(path, event.target.checked)} />
        {labelFromKey(name)}
      </label>
    );
  }

  if (typeof value === "number") {
    return (
      <label>
        {labelFromKey(name)}
        <input type="number" value={value} onChange={(event) => onChange(path, Number(event.target.value))} />
      </label>
    );
  }

  const lowerName = String(name).toLowerCase();
  const isLongText = String(value || "").length > 90 || ["description", "message", "quote"].some((word) => lowerName.includes(word));

  if (collection === "portfolio" && name === "type") {
    if (portfolioType) return null;

    return (
      <label>
        Type
        <select value={value || "photo"} onChange={(event) => onChange(path, event.target.value)}>
          <option value="photo">Photo</option>
          <option value="video">Video</option>
        </select>
      </label>
    );
  }

  if (isColorField(name, value)) {
    const colorValue = String(value || "");
    const parsedColor = parseColorValue(colorValue);
    const canUseColorPicker = Boolean(parsedColor);

    return (
      <label>
        {labelFromKey(name)}
        <span className="admin-color-input">
          <span className="admin-color-swatch" style={{ background: colorValue }} aria-hidden="true" />
          {canUseColorPicker && (
            <input
              type="color"
              value={parsedColor.hex}
              onChange={(event) => onChange(path, updateColorValue(colorValue, event.target.value))}
              aria-label={`${labelFromKey(name)} picker`}
            />
          )}
          <input value={value || ""} onChange={(event) => onChange(path, event.target.value)} />
        </span>
      </label>
    );
  }

  if (shadowFieldNames.has(String(name))) {
    const shadowValue = String(value || "");
    const parsedShadow = parseShadowColor(shadowValue);

    return (
      <label>
        {labelFromKey(name)}
        <span className="admin-shadow-input">
          <span className="admin-shadow-preview" style={{ boxShadow: shadowValue }} aria-hidden="true" />
          {parsedShadow && (
            <input
              type="color"
              value={parsedShadow.hex}
              onChange={(event) => onChange(path, updateShadowColor(shadowValue, event.target.value))}
              aria-label={`${labelFromKey(name)} color picker`}
            />
          )}
          <input value={value || ""} onChange={(event) => onChange(path, event.target.value)} />
        </span>
      </label>
    );
  }

  return (
    <label>
      {labelFromKey(name)}
      {isLongText ? (
        <textarea value={value || ""} onChange={(event) => onChange(path, event.target.value)} />
      ) : (
        <input value={value || ""} onChange={(event) => onChange(path, event.target.value)} />
      )}
    </label>
  );
}

function FormEditor({ title, value, onSave, collection, portfolioType }) {
  const [draft, setDraft] = useState(cloneValue(value));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setDraft(cloneValue(value));
  }, [value]);

  const updatePath = (path, nextValue) => {
    if (!path.length) {
      setDraft(nextValue);
      return;
    }
    setDraft((current) => setAtPath(current, path, nextValue));
  };

  const save = async () => {
    setSaving(true);
    try {
      await onSave(draft);
      toast.success(`${title} saved`);
    } catch (error) {
      toast.error(error.message || "Could not save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="admin-panel">
      <div className="admin-panel-header">
        <h2>{title}</h2>
        <button type="button" onClick={save} disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
      <div className="admin-form-editor">
        {Array.isArray(draft) ? (
          <FieldEditor name={title} value={draft} path={[]} onChange={updatePath} collection={collection} portfolioType={portfolioType} />
        ) : (
          Object.entries(draft || {}).filter(([key]) => canEditField(key)).map(([key, item]) => (
            <FieldEditor
              key={key}
              name={key}
              value={item}
              path={[key]}
              onChange={updatePath}
              collection={collection}
              portfolioType={portfolioType}
            />
          ))
        )}
      </div>
    </section>
  );
}

function AdminLogin({ onLogin }) {
  const [form, setForm] = useState({ username: "Ajoke", password: "Simi1234#" });
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await api.login(form);
      setAdminToken(response.token);
      onLogin();
      toast.success("Logged in");
    } catch (error) {
      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-login">
      <form onSubmit={submit}>
        <h1>SOMI Admin</h1>
        <label>
          Username
          <input value={form.username} onChange={(event) => setForm({ ...form, username: event.target.value })} />
        </label>
        <label>
          Password
          <input type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
        </label>
        <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
      </form>
    </main>
  );
}

function MediaManager() {
  const [media, setMedia] = useState([]);
  const [file, setFile] = useState(null);
  const [folder, setFolder] = useState("uploads");

  const loadMedia = async () => {
    try {
      setMedia(await api.listMedia());
    } catch (error) {
      toast.error(error.message || "Could not load media");
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const upload = async (event) => {
    event.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    try {
      await api.uploadMedia(formData);
      setFile(null);
      toast.success("Media uploaded");
      loadMedia();
    } catch (error) {
      toast.error(error.message || "Upload failed");
    }
  };

  return (
    <section className="admin-panel">
      <div className="admin-panel-header">
        <h2>Media</h2>
      </div>
      <form className="admin-upload" onSubmit={upload}>
        <input value={folder} onChange={(event) => setFolder(event.target.value)} placeholder="Folder" />
        <input type="file" accept="image/*,video/*" onChange={(event) => setFile(event.target.files?.[0])} />
        <button type="submit">Upload media</button>
      </form>
      <div className="admin-media-grid">
        {media.map((item) => (
          <article key={item.id}>
            {item.type?.startsWith("image") && <img src={item.url} alt={item.altText || ""} />}
            {item.type?.startsWith("video") && <video src={item.url} muted playsInline preload="metadata" />}
            <input value={item.url} readOnly onFocus={(event) => event.target.select()} />
          </article>
        ))}
      </div>
    </section>
  );
}

function Enquiries() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.listEnquiries().then(setItems).catch(() => setItems([]));
  }, []);

  const formatDate = (value) => {
    if (!value) return "No date";
    const date = value.seconds ? new Date(value.seconds * 1000) : new Date(value);
    if (Number.isNaN(date.getTime())) return "No date";
    return date.toLocaleString();
  };

  return (
    <section className="admin-panel">
      <div className="admin-panel-header">
        <h2>Enquiries</h2>
      </div>
      <div className="admin-enquiries">
        {items.map((item) => (
          <article key={item.id}>
            <strong>{item.name}</strong>
            <small>{formatDate(item.createdAt)}</small>
            <span>{item.email}</span>
            <span>{item.projectType}</span>
            <p>{item.message}</p>
          </article>
        ))}
        {!items.length && <p>No enquiries yet.</p>}
      </div>
    </section>
  );
}

export default function Admin() {
  const [authed, setAuthed] = useState(Boolean(getAdminToken()));
  const [active, setActive] = useState("site-settings");
  const [content, setContent] = useState(defaultContent);
  const [loading, setLoading] = useState(true);

  const tabs = useMemo(
    () => [
      "site-settings",
      ...pageSlugs.map((slug) => `page:${slug}`),
      ...portfolioTabs.map((tab) => tab.key),
      ...collectionNames.map((name) => `collection:${name}`),
      "enquiries",
    ],
    [],
  );

  const load = async () => {
    setLoading(true);
    try {
      setContent(mergeAdminContent(await api.getBootstrap()));
    } catch (error) {
      toast.error(error.message || "Could not load admin data");
      setContent(defaultContent);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authed) load();
  }, [authed]);

  if (!authed) return <AdminLogin onLogin={() => setAuthed(true)} />;

  const logout = () => {
    clearAdminToken();
    setAuthed(false);
  };

  const savePortfolioType = async (type, payload) => {
    if (!Array.isArray(payload)) throw new Error("Portfolio must be an array");

    const existingItems = content.portfolio || [];
    const existingForType = existingItems.filter((item) => item.type === type);
    const payloadIds = new Set(payload.map((item) => item.id).filter(Boolean));

    await Promise.all(
      existingForType
        .filter((item) => item.id && !payloadIds.has(item.id))
        .map((item) => api.remove("portfolio", item.id)),
    );

    await Promise.all(
      payload.map((item, index) => {
        const { id, ...body } = item;
        const typedBody = {
          ...body,
          type,
          order: body.order || index + 1,
        };

        if (type === "photo") {
          delete typedBody.thumbnail;
          delete typedBody.videoUrl;
        } else {
          delete typedBody.image;
        }

        return id ? api.update("portfolio", id, typedBody) : api.create("portfolio", typedBody);
      }),
    );

    await load();
  };

  const renderEditor = () => {
    if (active === "site-settings") {
      return <FormEditor title="Site Settings" value={content.siteSettings} onSave={(payload) => api.updateSettings(payload).then(load)} />;
    }

    if (active === "navigation") {
      return <FormEditor title="Navigation" value={content.navigation} onSave={(payload) => api.updateNavigation(payload).then(load)} />;
    }

    if (active.startsWith("page:")) {
      const slug = active.replace("page:", "");
      return <FormEditor title={`Page: ${slug}`} value={content.pages?.[slug] || {}} onSave={(payload) => api.updatePage(slug, payload).then(load)} />;
    }

    if (active.startsWith("portfolio:")) {
      const tab = portfolioTabs.find((item) => item.key === active);
      const portfolioType = tab?.type || "photo";
      const items = (content.portfolio || []).filter((item) => item.type === portfolioType);

      return (
        <FormEditor
          title={tab?.title || "Portfolio"}
          value={items}
          collection="portfolio"
          portfolioType={portfolioType}
          onSave={(payload) => savePortfolioType(portfolioType, payload)}
        />
      );
    }

    if (active.startsWith("collection:")) {
      const collection = active.replace("collection:", "");
      return (
        <FormEditor
          title={`Collection: ${collection}`}
          value={content[collection] || []}
          collection={collection}
          onSave={async (payload) => {
            if (!Array.isArray(payload)) throw new Error("Collection must be an array");
            await Promise.all(
              payload.map((item) => {
                const { id, ...body } = item;
                return id ? api.update(collection, id, body) : api.create(collection, body);
              }),
            );
            await load();
          }}
        />
      );
    }

    if (active === "enquiries") return <Enquiries />;
    return null;
  };

  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <h1>SOMI Admin</h1>
        <button type="button" onClick={load}>Refresh</button>
        <button type="button" onClick={logout}>Logout</button>
        <nav>
          {tabs.map((tab) => (
            <button className={active === tab ? "is-active" : ""} key={tab} type="button" onClick={() => setActive(tab)}>
              {portfolioTabs.find((item) => item.key === tab)?.title || tab.replace("page:", "Page: ").replace("collection:", "")}
            </button>
          ))}
        </nav>
      </aside>
      <section className="admin-main">
        {loading ? <p>Loading admin...</p> : renderEditor()}
      </section>
    </main>
  );
}
