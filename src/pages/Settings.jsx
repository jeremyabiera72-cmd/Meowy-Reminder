import { useRef, useState } from "react";
import Button from "../components/common/Button";
import Card from "../components/common/Card";

import { useAuth } from "../context/AuthContext";

import { useTheme } from "../context/ThemeContext";
import "./pages.css";

export default function Settings() {
    const { user, updateUser } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        name: user?.name || "Yumi Doe",
        username: user?.username || "yumi_doe",
        birthdate: user?.birthdate || "1999-10-31"
    });
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            updateUser({ avatar: ev.target.result });
        };
        reader.readAsDataURL(file);
    };

    const handleSave = () => {
        updateUser(editForm);
        setIsEditing(false);
    };

    return (
        <div className="page">
            <div className="page__header">
                <div>
                    <p className="page__eyebrow">Preferences</p>

                    <h1 className="page__title">Settings</h1>

                    <p className="page__description">Manage your MeowyReminder preferences.</p>
                </div>
            </div>

            <div className="page__stack">
                <Card title="Profile" description="Your personal information.">
                    {isEditing ? (
                        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                <label style={{ fontSize: "12px", color: "#6b7280" }}>Name</label>
                                <input 
                                    style={{ padding: "8px", borderRadius: "6px", border: "1px solid #d1d5db" }}
                                    value={editForm.name} 
                                    onChange={e => setEditForm({...editForm, name: e.target.value})} 
                                />
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                <label style={{ fontSize: "12px", color: "#6b7280" }}>Username</label>
                                <input 
                                    style={{ padding: "8px", borderRadius: "6px", border: "1px solid #d1d5db" }}
                                    value={editForm.username} 
                                    onChange={e => setEditForm({...editForm, username: e.target.value})} 
                                />
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                <label style={{ fontSize: "12px", color: "#6b7280" }}>Birthdate</label>
                                <input 
                                    type="date"
                                    style={{ padding: "8px", borderRadius: "6px", border: "1px solid #d1d5db" }}
                                    value={editForm.birthdate} 
                                    onChange={e => setEditForm({...editForm, birthdate: e.target.value})} 
                                />
                            </div>
                            <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "8px" }}>
                                <Button variant="secondary" onClick={() => setIsEditing(false)}>Cancel</Button>
                                <Button onClick={handleSave}>Save</Button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                                    {/* Clickable avatar */}
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        title="Upload profile photo"
                                        style={{
                                            position: "relative",
                                            width: "64px",
                                            height: "64px",
                                            borderRadius: "50%",
                                            background: "#e5e7eb",
                                            overflow: "hidden",
                                            border: "2px solid #e5e7eb",
                                            cursor: "pointer",
                                            padding: 0,
                                            flexShrink: 0,
                                        }}
                                    >
                                        {user?.avatar ? (
                                            <img
                                                src={user.avatar}
                                                alt="Profile"
                                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                            />
                                        ) : (
                                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                                <circle cx="12" cy="7" r="4"></circle>
                                            </svg>
                                        )}
                                        {/* Camera overlay on hover */}
                                        <div style={{
                                            position: "absolute",
                                            inset: 0,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            background: "rgba(0,0,0,0.35)",
                                            opacity: 0,
                                            transition: "opacity 0.2s",
                                        }}
                                            onMouseEnter={e => e.currentTarget.style.opacity = 1}
                                            onMouseLeave={e => e.currentTarget.style.opacity = 0}
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                                                <circle cx="12" cy="13" r="4"></circle>
                                            </svg>
                                        </div>
                                    </button>

                                    {/* Hidden file input */}
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        style={{ display: "none" }}
                                        onChange={handleImageChange}
                                    />

                                    <div>
                                        <h3 style={{ margin: "0 0 4px", fontSize: "18px" }}>{user?.name || "Yumi Doe"}</h3>
                                        <p style={{ margin: 0, color: "#6b7280", fontSize: "14px" }}>@{user?.username || "yumi_doe"}</p>
                                    </div>
                                </div>
                                <Button variant="secondary" size="small" onClick={() => setIsEditing(true)}>Edit</Button>
                            </div>

                            <div className="settings-row" style={{ borderTop: "1px solid #f3f4f6", paddingTop: "16px" }}>
                                <span>Birthdate</span>
                                <strong>{user?.birthdate || "1999-10-31"}</strong>
                            </div>
                        </>
                    )}
                </Card>



                <Card title="Privacy" description="Your personal tracking data belongs to you.">
                    <p className="page__text">
                        Your cycle, symptom, mood, and journal information should only be accessible through your own
                        account.
                    </p>
                </Card>
            </div>
        </div>
    );
}
