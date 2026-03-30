import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CaseStudyCardProps {
  problem: string;
  architectureDecisions: string[];
  outcome: {
    metrics: { label: string; value: string }[];
    summary: string;
  };
}

const tabs = ["Problem", "Architecture", "Outcome"] as const;
type Tab = (typeof tabs)[number];

export default function CaseStudyCard({
  problem,
  architectureDecisions,
  outcome,
}: Readonly<CaseStudyCardProps>) {
  const [activeTab, setActiveTab] = useState<Tab>("Problem");

  return (
    <div
      style={{
        border: "1px solid var(--clr-border)",
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        background: "var(--clr-surface)",
      }}
    >
      <div
        role="tablist"
        aria-label="Case study details"
        style={{
          display: "flex",
          borderBottom: "1px solid var(--clr-border)",
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={activeTab === tab}
            aria-controls={`panel-${tab}`}
            onClick={() => setActiveTab(tab)}
            style={{
              flex: 1,
              padding: "0.75rem 1rem",
              background: activeTab === tab ? "var(--clr-accent)" : "transparent",
              color: activeTab === tab ? "var(--clr-bg)" : "var(--clr-text-muted)",
              border: "none",
              cursor: "pointer",
              fontSize: "0.8rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontFamily: "inherit",
              transition: "background 0.2s, color 0.2s",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div style={{ padding: "1.5rem", minHeight: "180px", position: "relative" }}>
        <AnimatePresence mode="wait">
          {activeTab === "Problem" && (
            <motion.div
              key="problem"
              id="panel-Problem"
              role="tabpanel"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <p style={{ color: "var(--clr-text-muted)", lineHeight: 1.7, fontSize: "0.95rem" }}>
                {problem}
              </p>
            </motion.div>
          )}

          {activeTab === "Architecture" && (
            <motion.div
              key="architecture"
              id="panel-Architecture"
              role="tabpanel"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {architectureDecisions.map((decision, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      gap: "0.75rem",
                      alignItems: "flex-start",
                      color: "var(--clr-text-muted)",
                      fontSize: "0.9rem",
                      lineHeight: 1.6,
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "var(--clr-accent)",
                        flexShrink: 0,
                        marginTop: "0.5rem",
                      }}
                    />
                    {decision}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {activeTab === "Outcome" && (
            <motion.div
              key="outcome"
              id="panel-Outcome"
              role="tabpanel"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                  gap: "1.5rem",
                  marginBottom: "1rem",
                }}
              >
                {outcome.metrics.map((metric, i) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                    <span
                      style={{
                        fontSize: "clamp(1.5rem, 3vw, 2rem)",
                        fontWeight: 900,
                        color: "var(--clr-accent-text)",
                        lineHeight: 1,
                      }}
                    >
                      {metric.value}
                    </span>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "var(--clr-text-muted)",
                      }}
                    >
                      {metric.label}
                    </span>
                  </div>
                ))}
              </div>
              <p style={{ color: "var(--clr-text-muted)", lineHeight: 1.6, fontSize: "0.9rem" }}>
                {outcome.summary}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
