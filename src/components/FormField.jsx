export default function FormField({ label, name, value, onChange, error, required = false, hint, type = "text", placeholder, children, ...props }) {
  return (
    <div className={`form-field ${error ? "form-field--error" : ""}`}>
      <label htmlFor={name}>{label}{required && <span className="required-mark"> *</span>}</label>
      {children || <input id={name} name={name} type={type} value={value ?? ""} onChange={onChange} placeholder={placeholder || `Enter ${label.toLowerCase()}`} aria-invalid={!!error} {...props} />}
      {error ? <span className="field-error">{error}</span> : hint ? <span className="field-hint">{hint}</span> : null}
    </div>
  );
}