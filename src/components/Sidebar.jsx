import { BadgeCheck, ChevronRight, CircleHelp, FileCheck2, LayoutDashboard, LifeBuoy, ShieldCheck, UserRound, Building2, FileText } from "lucide-react";

const icons = [UserRound, Building2, FileText, FileCheck2];

export default function Sidebar({ activeStep, setActiveStep, completedSteps, mobileOpen, setMobileOpen }) {
  return (
    <>
      {mobileOpen && <button className="mobile-scrim" aria-label="Close navigation" onClick={() => setMobileOpen(false)} />}
      <aside className={`sidebar ${mobileOpen ? "sidebar--open" : ""}`}>
        <div className="brand-lockup">
          <img src="/billbring-home.svg" alt="BillBring" className="brand-logo" />
          <span className="brand-caption">MERCHANT PORTAL</span>
        </div>

        <div className="workspace-switcher">
          <div className="workspace-avatar">BB</div>
          <div className="workspace-copy">
            <strong>Merchant workspace</strong>
            <span>Onboarding application</span>
          </div>
          <ChevronRight size={15} className="workspace-chevron" />
        </div>

        <div className="sidebar-label">YOUR APPLICATION</div>
        <nav className="step-nav" aria-label="Onboarding steps">
          {["Basic details", "Company details", "Documents", "Review & submit"].map((label, index) => {
            const Icon = icons[index];
            const done = completedSteps.includes(index);
            const active = activeStep === index;
            return (
              <button
                key={label}
                className={`nav-step ${active ? "nav-step--active" : ""} ${done ? "nav-step--done" : ""}`}
                onClick={() => { setActiveStep(index); setMobileOpen(false); }}
              >
                <span className="nav-step-icon">{done ? <BadgeCheck size={17} /> : <Icon size={17} />}</span>
                <span className="nav-step-label">{label}</span>
                {done && <span className="nav-step-check">Done</span>}
                {active && <span className="active-indicator" />}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-progress">
          <div className="progress-head">
            <span>Application progress</span>
            <strong>{Math.round((completedSteps.length / 4) * 100)}%</strong>
          </div>
          <div className="progress-track"><span style={{ width: `${(completedSteps.length / 4) * 100}%` }} /></div>
          <p>{completedSteps.length === 4 ? "You're all set." : `${4 - completedSteps.length} ${4 - completedSteps.length === 1 ? "step" : "steps"} left to complete`}</p>
        </div>

        <div className="sidebar-bottom">
          <div className="security-note">
            <span className="security-icon"><ShieldCheck size={17} /></span>
            <div><strong>Your data is secure</strong><p>Encrypted and handled with care.</p></div>
          </div>
          <button className="help-link" onClick={() => window.location.href = "mailto:support@billbring.com"}>
            <span className="help-icon"><LifeBuoy size={17} /></span>
            <span>Need help?</span>
            <CircleHelp size={15} className="help-question" />
          </button>
          <div className="sidebar-footer"><span className="footer-dot" /> Secure onboarding <span>·</span> v1.0</div>
        </div>
      </aside>
    </>
  );
}