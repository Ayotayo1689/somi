import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { api, clearAdminToken, getAdminToken, setAdminToken } from "../lib/api";
import { defaultContent } from "../data/defaultContent";

const pageSlugs = ["home", "services", "about", "photo-portfolio", "video-portfolio", "clients", "contact"];
const collectionNames = ["services", "portfolio", "clients", "stats"];
const lockedFieldNames = new Set(["path", "buttonUrl", "linkUrl", "url"]);
const allowedUrlFields = new Set(["image", "thumbnail", "videoUrl", "embedUrl", "instagramUrl", "facebookUrl", "tiktokUrl", "twitterUrl", "xUrl", "youtubeUrl", "linkedinUrl", "socialUrl"]);

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

function FieldEditor({ name, value, path, onChange, onRemove, canRemove }) {
  const fieldId = path.join("-");

  if (Array.isArray(value)) {
    const addItem = () => {
      const template = value[0] ?? "";
      onChange(path, [...value, makeEmptyLike(template)]);
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
    const entries = Object.entries(value).filter(([key]) => canEditField(key));

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
            <FieldEditor key={key} name={key} value={item} path={[...path, key]} onChange={onChange} />
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

  const isLongText = String(value || "").length > 90 || ["description", "message", "quote"].some((word) => String(name).toLowerCase().includes(word));

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

function FormEditor({ title, value, onSave }) {
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
          <FieldEditor name={title} value={draft} path={[]} onChange={updatePath} />
        ) : (
          Object.entries(draft || {}).filter(([key]) => canEditField(key)).map(([key, item]) => (
            <FieldEditor key={key} name={key} value={item} path={[key]} onChange={updatePath} />
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
        <input type="file" accept="image/*" onChange={(event) => setFile(event.target.files?.[0])} />
        <button type="submit">Upload image</button>
      </form>
      <div className="admin-media-grid">
        {media.map((item) => (
          <article key={item.id}>
            {item.type?.startsWith("image") && <img src={item.url} alt={item.altText || ""} />}
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
      ...collectionNames.map((name) => `collection:${name}`),
      "enquiries",
    ],
    [],
  );

  const load = async () => {
    setLoading(true);
    try {
      setContent(await api.getBootstrap());
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

    if (active.startsWith("collection:")) {
      const collection = active.replace("collection:", "");
      return (
        <FormEditor
          title={`Collection: ${collection}`}
          value={content[collection] || []}
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
              {tab.replace("page:", "Page: ").replace("collection:", "")}
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
