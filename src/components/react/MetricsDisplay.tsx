import { useEffect, useRef, useState } from "react";
import { motion, useInView, useSpring, useMotionValue } from "framer-motion";

interface Metric {
  label: string;
  value: string;
}

interface MetricsDisplayProps {
  metrics: Metric[];
}

function AnimatedMetric({ label, value }: Metric) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState("0");

  // Parse the numeric part and suffix
  const numericMatch = value.match(/^([+-]?)(\d+(?:\.\d+)?)(.*)/);
  const prefix = numericMatch?.[1] ?? "";
  const targetNum = parseFloat(numericMatch?.[2] ?? "0");
  const suffix = numericMatch?.[3] ?? "";

  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.01,
  });

  useEffect(() => {
    if (isInView) {
      motionVal.set(targetNum);
    }
  }, [isInView, targetNum, motionVal]);

  useEffect(() => {
    const unsubscribe = springVal.on("change", (v) => {
      const isDecimal = targetNum % 1 !== 0;
      const formatted = isDecimal ? v.toFixed(1) : Math.round(v).toString();
      setDisplayValue(`${prefix}${formatted}${suffix}`);
    });
    return unsubscribe;
  }, [springVal, prefix, suffix, targetNum]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.3rem",
      }}
    >
      <span
        style={{
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: 900,
          color: "var(--clr-accent-text)",
          lineHeight: 1,
          fontFamily: "inherit",
        }}
      >
        {displayValue}
      </span>
      <span
        style={{
          fontSize: "0.75rem",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "var(--clr-text-muted)",
        }}
      >
        {label}
      </span>
    </motion.div>
  );
}

export default function MetricsDisplay({ metrics }: MetricsDisplayProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
        gap: "2rem",
        padding: "2rem",
        border: "1px solid var(--clr-border)",
        borderRadius: "var(--radius-md)",
        background: "var(--clr-surface)",
      }}
    >
      {metrics.map((metric, i) => (
        <AnimatedMetric key={i} {...metric} />
      ))}
    </div>
  );
}
