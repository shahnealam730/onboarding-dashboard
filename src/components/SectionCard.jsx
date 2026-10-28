export default function SectionCard({ icon: Icon, title, subtitle, children, className = "" }) {
  return (
    <section className={`section-card ${className}`}>
      <div className="section-card-heading">
        <div className="section-card-icon"><Icon size={18} strokeWidth={1.8} /></div>
        <div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>
      </div>
      <div className="section-card-body">{children}</div>
    </section>
  );
}