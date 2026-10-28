import { ArrowLeft, ArrowRight, Save } from "lucide-react";

export default function FormActions({
  onBack,
  onContinue,
  onSave,
  isFirst = false,
  continueLabel = "Save & continue",
}) {
  return (
    <div className="form-actions">
      <div className="actions-left">
        {!isFirst && (
          <button className="button button--secondary" onClick={onBack}>
            <ArrowLeft size={16} /> Back
          </button>
        )}
        <button className="save-draft-button" onClick={onSave}>
          <Save size={15} /> Save draft
        </button>
      </div>
      <button className="button button--primary" onClick={onContinue}>
        {continueLabel}
        <ArrowRight size={16} />
      </button>
    </div>
  );
}
