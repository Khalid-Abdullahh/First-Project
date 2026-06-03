"use client";

import { useState } from "react";

const STEPS = ["Personal Info", "Experience", "Education", "Skills", "Generate"];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  github: "",
  summary: "",
  jobTitle: "",
  experiences: [{ company: "", role: "", duration: "", description: "" }],
  education: [{ institution: "", degree: "", year: "" }],
  skills: "",
};

function StepIndicator({ current }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 36 }}>
      {STEPS.map((s, i) => (
        <div key={s} style={{ display: "flex", alignItems: "center", flex: i < STEPS.length - 1 ? 1 : "none" }}>
          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            background: i < current ? "#00e5a0" : i === current ? "#fff" : "transparent",
            border: i === current ? "2px solid #fff" : i < current ? "2px solid #00e5a0" : "2px solid #3a3a4a",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: i < current ? "#0a0a14" : i === current ? "#0a0a14" : "#3a3a4a",
            fontFamily: "'DM Mono', monospace", fontSize: 12, fontWeight: 700,
            transition: "all 0.3s", flexShrink: 0,
            boxShadow: i === current ? "0 0 20px rgba(255,255,255,0.3)" : "none"
          }}>
            {i < current ? "✓" : i + 1}
          </div>
          {i < STEPS.length - 1 && (
            <div style={{ flex: 1, height: 2, background: i < current ? "#00e5a0" : "#1e1e2e", transition: "all 0.3s", margin: "0 4px" }} />
          )}
        </div>
      ))}
    </div>
  );
}

function Input({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#00e5a0", marginBottom: 6, letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%", background: "#12121e", border: "1px solid #2a2a3e",
          borderRadius: 8, padding: "10px 14px", color: "#e8e8f0",
          fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14,
          outline: "none", boxSizing: "border-box",
          transition: "border-color 0.2s",
        }}
        onFocus={e => e.target.style.borderColor = "#00e5a0"}
        onBlur={e => e.target.style.borderColor = "#2a2a3e"}
      />
    </div>
  );
}

function Textarea({ label, value, onChange, placeholder, rows = 3 }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#00e5a0", marginBottom: 6, letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        style={{
          width: "100%", background: "#12121e", border: "1px solid #2a2a3e",
          borderRadius: 8, padding: "10px 14px", color: "#e8e8f0",
          fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14,
          outline: "none", boxSizing: "border-box", resize: "vertical",
          transition: "border-color 0.2s",
        }}
        onFocus={e => e.target.style.borderColor = "#00e5a0"}
        onBlur={e => e.target.style.borderColor = "#2a2a3e"}
      />
    </div>
  );
}

function CVPreview({ cv }) {
  return (
    <div style={{
      background: "#fff", color: "#111", borderRadius: 12, padding: "40px 36px",
      fontFamily: "'Plus Jakarta Sans', sans-serif", maxHeight: "80vh",
      overflowY: "auto", boxShadow: "0 0 60px rgba(0,229,160,0.1)"
    }}>
      {/* Header */}
      <div style={{ borderBottom: "3px solid #0a0a14", paddingBottom: 20, marginBottom: 20 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: "#0a0a14", letterSpacing: "-0.02em" }}>{cv.name || "Your Name"}</h1>
        <p style={{ margin: "4px 0 12px", fontSize: 15, color: "#555", fontWeight: 600 }}>{cv.jobTitle || "Job Title"}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 16px", fontSize: 12, color: "#444" }}>
          {cv.email && <span>📧 {cv.email}</span>}
          {cv.phone && <span>📞 {cv.phone}</span>}
          {cv.location && <span>📍 {cv.location}</span>}
          {cv.linkedin && <span>🔗 {cv.linkedin}</span>}
          {cv.github && <span>💻 {cv.github}</span>}
        </div>
      </div>

      {/* Summary */}
      {cv.summary && (
        <div style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#0a0a14", margin: "0 0 8px", borderLeft: "3px solid #00e5a0", paddingLeft: 10 }}>Professional Summary</h2>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: "#333" }}>{cv.summary}</p>
        </div>
      )}

      {/* Experience */}
      {cv.experiences?.some(e => e.company) && (
        <div style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#0a0a14", margin: "0 0 12px", borderLeft: "3px solid #00e5a0", paddingLeft: 10 }}>Experience</h2>
          {cv.experiences.filter(e => e.company).map((exp, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <strong style={{ fontSize: 14 }}>{exp.role}</strong>
                <span style={{ fontSize: 11, color: "#777" }}>{exp.duration}</span>
              </div>
              <p style={{ margin: "2px 0 4px", fontSize: 12, color: "#555", fontWeight: 600 }}>{exp.company}</p>
              <p style={{ margin: 0, fontSize: 12, color: "#444", lineHeight: 1.6 }}>{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {cv.education?.some(e => e.institution) && (
        <div style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#0a0a14", margin: "0 0 12px", borderLeft: "3px solid #00e5a0", paddingLeft: 10 }}>Education</h2>
          {cv.education.filter(e => e.institution).map((edu, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong style={{ fontSize: 14 }}>{edu.degree}</strong>
                <span style={{ fontSize: 11, color: "#777" }}>{edu.year}</span>
              </div>
              <p style={{ margin: 0, fontSize: 12, color: "#555" }}>{edu.institution}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {cv.skills && (
        <div>
          <h2 style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#0a0a14", margin: "0 0 10px", borderLeft: "3px solid #00e5a0", paddingLeft: 10 }}>Skills</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {cv.skills.split(",").map((s, i) => (
              <span key={i} style={{ background: "#f0fdf8", border: "1px solid #00e5a0", borderRadius: 4, padding: "3px 10px", fontSize: 12, color: "#0a6644" }}>{s.trim()}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function CVBuilder() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [generatedCV, setGeneratedCV] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState("");

  const update = (field, val) => setForm(f => ({ ...f, [field]: val }));
  const updateExp = (i, field, val) => {
    const exps = [...form.experiences];
    exps[i][field] = val;
    setForm(f => ({ ...f, experiences: exps }));
  };
  const updateEdu = (i, field, val) => {
    const edu = [...form.education];
    edu[i][field] = val;
    setForm(f => ({ ...f, education: edu }));
  };

  const generateCV = async () => {
    setLoading(true);
    setError("");
    try {
      const prompt = `You are a professional CV writer. Based on the following information, generate a polished, ATS-friendly CV. Enhance the summary, improve bullet points in experience, and make it compelling. Return a JSON object with these exact fields: name, email, phone, location, linkedin, github, jobTitle, summary (enhanced professional summary), experiences (array of {company, role, duration, description} with improved description), education (array of {institution, degree, year}), skills (comma-separated string).

User Data:
${JSON.stringify(form, null, 2)}

Return ONLY valid JSON, no markdown, no explanation.`;

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }]
        })
      });

      const data = await response.json();
      const text = data.content?.map(c => c.text || "").join("") || "";
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setGeneratedCV(parsed);
    } catch (err) {
      setError("Failed to generate CV. Please check your inputs and try again.");
      setGeneratedCV(form);
    }
    setLoading(false);
  };

  const btnStyle = (primary = true) => ({
    padding: "11px 24px", borderRadius: 8, border: "none", cursor: "pointer",
    fontFamily: "'DM Mono', monospace", fontSize: 13, fontWeight: 700,
    background: primary ? "#00e5a0" : "transparent",
    color: primary ? "#0a0a14" : "#666",
    border: primary ? "none" : "1px solid #2a2a3e",
    transition: "all 0.2s",
    letterSpacing: "0.05em"
  });

  return (
    <div style={{
      minHeight: "100vh", background: "#0a0a14",
      backgroundImage: "radial-gradient(ellipse at 20% 20%, rgba(0,229,160,0.04) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(100,80,255,0.04) 0%, transparent 60%)",
      display: "flex", flexDirection: "column", alignItems: "center",
      padding: "40px 20px", fontFamily: "'Plus Jakarta Sans', sans-serif",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#12121e", border: "1px solid #2a2a3e", borderRadius: 20, padding: "4px 14px", marginBottom: 16 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#00e5a0", display: "inline-block", boxShadow: "0 0 8px #00e5a0" }} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#00e5a0", letterSpacing: "0.1em" }}>AI-POWERED</span>
        </div>
        <h1 style={{ margin: 0, fontSize: 36, fontWeight: 800, color: "#e8e8f0", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
          CV Builder
        </h1>
        <p style={{ margin: "10px 0 0", color: "#5a5a7a", fontSize: 14 }}>Build an ATS-friendly resume powered by Claude AI</p>
      </div>

      <div style={{ width: "100%", maxWidth: 720 }}>
        <StepIndicator current={step} />

        <div style={{ background: "#0e0e1c", border: "1px solid #1e1e2e", borderRadius: 16, padding: "32px 28px", marginBottom: 20 }}>

          {/* Step 0: Personal Info */}
          {step === 0 && (
            <div>
              <h2 style={{ margin: "0 0 24px", color: "#e8e8f0", fontSize: 20, fontWeight: 700 }}>Personal Information</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
                <Input label="Full Name" value={form.name} onChange={v => update("name", v)} placeholder="John Doe" />
                <Input label="Job Title" value={form.jobTitle} onChange={v => update("jobTitle", v)} placeholder="Full Stack Developer" />
                <Input label="Email" value={form.email} onChange={v => update("email", v)} placeholder="john@email.com" />
                <Input label="Phone" value={form.phone} onChange={v => update("phone", v)} placeholder="+880 1XXX XXXXXX" />
                <Input label="Location" value={form.location} onChange={v => update("location", v)} placeholder="Dhaka, Bangladesh" />
                <Input label="LinkedIn URL" value={form.linkedin} onChange={v => update("linkedin", v)} placeholder="linkedin.com/in/yourname" />
                <Input label="GitHub URL" value={form.github} onChange={v => update("github", v)} placeholder="github.com/yourname" />
              </div>
              <Textarea label="Professional Summary (optional)" value={form.summary} onChange={v => update("summary", v)} placeholder="Brief overview of your experience and goals... AI will enhance this!" rows={3} />
            </div>
          )}

          {/* Step 1: Experience */}
          {step === 1 && (
            <div>
              <h2 style={{ margin: "0 0 24px", color: "#e8e8f0", fontSize: 20, fontWeight: 700 }}>Work Experience</h2>
              {form.experiences.map((exp, i) => (
                <div key={i} style={{ background: "#12121e", border: "1px solid #2a2a3e", borderRadius: 10, padding: "16px", marginBottom: 16 }}>
                  <p style={{ margin: "0 0 14px", fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#5a5a7a" }}>EXPERIENCE #{i + 1}</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
                    <Input label="Company" value={exp.company} onChange={v => updateExp(i, "company", v)} placeholder="Google" />
                    <Input label="Role" value={exp.role} onChange={v => updateExp(i, "role", v)} placeholder="Frontend Developer" />
                  </div>
                  <Input label="Duration" value={exp.duration} onChange={v => updateExp(i, "duration", v)} placeholder="Jan 2023 – Present" />
                  <Textarea label="Description (AI will enhance)" value={exp.description} onChange={v => updateExp(i, "description", v)} placeholder="Briefly describe what you did..." rows={3} />
                </div>
              ))}
              <button onClick={() => setForm(f => ({ ...f, experiences: [...f.experiences, { company: "", role: "", duration: "", description: "" }] }))}
                style={{ ...btnStyle(false), fontSize: 12, padding: "8px 16px" }}>
                + Add Another
              </button>
            </div>
          )}

          {/* Step 2: Education */}
          {step === 2 && (
            <div>
              <h2 style={{ margin: "0 0 24px", color: "#e8e8f0", fontSize: 20, fontWeight: 700 }}>Education</h2>
              {form.education.map((edu, i) => (
                <div key={i} style={{ background: "#12121e", border: "1px solid #2a2a3e", borderRadius: 10, padding: "16px", marginBottom: 16 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
                    <Input label="Institution" value={edu.institution} onChange={v => updateEdu(i, "institution", v)} placeholder="BUET" />
                    <Input label="Degree" value={edu.degree} onChange={v => updateEdu(i, "degree", v)} placeholder="BSc in CSE" />
                  </div>
                  <Input label="Year" value={edu.year} onChange={v => updateEdu(i, "year", v)} placeholder="2018 – 2022" />
                </div>
              ))}
              <button onClick={() => setForm(f => ({ ...f, education: [...f.education, { institution: "", degree: "", year: "" }] }))}
                style={{ ...btnStyle(false), fontSize: 12, padding: "8px 16px" }}>
                + Add Another
              </button>
            </div>
          )}

          {/* Step 3: Skills */}
          {step === 3 && (
            <div>
              <h2 style={{ margin: "0 0 24px", color: "#e8e8f0", fontSize: 20, fontWeight: 700 }}>Skills</h2>
              <Textarea label="Skills (comma separated)" value={form.skills} onChange={v => update("skills", v)} placeholder="React, Node.js, Python, Figma, AWS, Git..." rows={4} />
              <div style={{ background: "#12121e", border: "1px solid #2a2a3e", borderRadius: 10, padding: 16, marginTop: 8 }}>
                <p style={{ margin: 0, color: "#5a5a7a", fontSize: 13 }}>
                  💡 <strong style={{ color: "#00e5a0" }}>Tip:</strong> Add both technical and soft skills. AI will organize and present them professionally.
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Generate */}
          {step === 4 && (
            <div>
              <h2 style={{ margin: "0 0 8px", color: "#e8e8f0", fontSize: 20, fontWeight: 700 }}>Generate Your CV</h2>
              <p style={{ color: "#5a5a7a", fontSize: 13, margin: "0 0 24px" }}>Claude AI will enhance your content and create a polished, ATS-friendly CV.</p>

              {!generatedCV ? (
                <button
                  onClick={generateCV}
                  disabled={loading}
                  style={{ ...btnStyle(), width: "100%", padding: "14px", fontSize: 14, opacity: loading ? 0.7 : 1, position: "relative" }}
                >
                  {loading ? (
                    <span>✨ Generating your CV...</span>
                  ) : (
                    <span>✨ Generate CV with AI</span>
                  )}
                </button>
              ) : (
                <div>
                  <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
                    <button onClick={() => setShowPreview(!showPreview)} style={btnStyle()}>
                      {showPreview ? "Hide Preview" : "👁 Preview CV"}
                    </button>
                    <button onClick={() => { setGeneratedCV(null); setStep(0); }} style={btnStyle(false)}>
                      Start Over
                    </button>
                  </div>
                  {showPreview && <CVPreview cv={generatedCV} />}
                </div>
              )}

              {error && <p style={{ color: "#ff6b6b", fontSize: 13, marginTop: 12 }}>{error}</p>}

              {loading && (
                <div style={{ marginTop: 20, display: "flex", gap: 8, alignItems: "center" }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{
                      width: 8, height: 8, borderRadius: "50%", background: "#00e5a0",
                      animation: `bounce 1s ${i * 0.2}s infinite`,
                    }} />
                  ))}
                  <style>{`@keyframes bounce { 0%,80%,100%{transform:scale(0)}40%{transform:scale(1)} }`}</style>
                  <span style={{ color: "#5a5a7a", fontSize: 12, marginLeft: 4 }}>AI is crafting your resume...</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button onClick={() => setStep(s => Math.max(0, s - 1))} style={{ ...btnStyle(false), visibility: step === 0 ? "hidden" : "visible" }}>
            ← Back
          </button>
          {step < 4 && (
            <button onClick={() => setStep(s => Math.min(4, s + 1))} style={btnStyle()}>
              Continue →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
