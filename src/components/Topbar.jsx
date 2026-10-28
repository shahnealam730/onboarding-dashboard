import { Bell, Menu, ShieldCheck } from "lucide-react";

export default function Topbar({ onMenuClick, stepNumber }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="mobile-menu icon-button" onClick={onMenuClick} aria-label="Open navigation"><Menu size={20} /></button>
        <div className="breadcrumb"><span>Workspace</span><span className="crumb-slash">/</span><strong>Merchant onboarding</strong></div>
      </div>
      <div className="topbar-actions">
        <span className="secure-pill"><ShieldCheck size={14} /> Secure session</span>
        <button className="icon-button notification-button" aria-label="Notifications"><Bell size={18} /><i /></button>
        <div className="user-avatar">SA</div>
        <div className="user-menu"><strong>Shahne Alam</strong><span>Applicant</span></div>
      </div>
    </header>
  );
}