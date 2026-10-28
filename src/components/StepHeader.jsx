import { Check } from "lucide-react";

export default function StepHeader({ step, activeStep, completedSteps }) {
  return (
    <div className="step-header">
      <div className="step-header-top">
        <div className="eyebrow"><span className="eyebrow-line" /> STEP {String(step.id + 1).padStart(2, "0")} OF 04</div>
        <span className="draft-status"><span /> Draft saved locally</span>
      </div>
      <div className="step-heading-row">
        <div>
          <h1>{step.title}</h1>
          <p>{step.description}</p>
        </div>
        <div className="step-count-badge"><span>{String(activeStep + 1).padStart(2, "0")}</span><i />04</div>
      </div>
      <div className="horizontal-steps">
        {["Basic details", "Company details", "Documents", "Review"].map((label, i) => {
          const done = completedSteps.includes(i);
          return (
            <div key={label} className={`horizontal-step ${i === activeStep ? "is-active" : ""} ${done ? "is-done" : ""}`}>
              <span className="horizontal-step-number">{done ? <Check size={13} strokeWidth={3} /> : `0${i + 1}`}</span>
              <span>{label}</span>
              {i < 3 && <span className="horizontal-step-line" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}