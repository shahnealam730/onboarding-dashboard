import { useState } from "react";
import {
  BadgeCheck,
  Building2,
  CheckCircle2,
  FileCheck2,
  FileText,
  Pencil,
  ShieldCheck,
  UserRound,
  AlertCircle,
} from "lucide-react";
import SectionCard from "../components/SectionCard";

function ReviewRow({ label, value }) {
  return (
    <div className="review-row">
      <span>{label}</span>
      <strong>{value || <em>Not provided</em>}</strong>
    </div>
  );
}

export default function ReviewSubmit({
  form,
  documents,
  goToStep,
  onSubmit,
  onStartNewApplication,
}) {
  const [accepted, setAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const uploaded = Object.values(documents).filter(Boolean).length;

  const validateApplication = () => {
    // Step 1: Basic details
    const basicFields = [
      form.fullName,
      form.designation,
      form.workEmail,
      form.phone,
    ];

    if (basicFields.some((value) => !String(value || "").trim())) {
      goToStep(0);
      setSubmitError(
        "Please complete all required Basic Details before submitting.",
      );
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(form.workEmail.trim())) {
      goToStep(0);
      setSubmitError("Please enter a valid work email address.");
      return false;
    }

    // Step 2: Company details
    const companyFields = [
      form.businessName,
      form.businessType,
      form.registrationNumber,
      form.panNumber,
      form.gstNumber,
      form.address,
      form.city,
      form.state,
      form.pincode,
      form.bankName,
      form.accountName,
    ];

    if (companyFields.some((value) => !String(value || "").trim())) {
      goToStep(1);
      setSubmitError(
        "Please complete all required Company Details before submitting.",
      );
      return false;
    }

    // Step 3: All required documents
    const requiredDocuments = ["pan", "registration", "gst", "bank"];

    const missingDocument = requiredDocuments.some((id) => !documents[id]);

    if (missingDocument) {
      goToStep(2);
      setSubmitError(
        "Please upload all four required documents before submitting.",
      );
      return false;
    }

    // Final step: Consent
    if (!accepted) {
      setSubmitError(
        "Please confirm the declaration before submitting your application.",
      );
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    setSubmitError("");

    if (!validateApplication()) {
      return;
    }

    onSubmit();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="success-state">
        <div className="success-art">
          <div className="success-art-ring">
            <CheckCircle2 size={44} />
          </div>
          <span className="success-spark success-spark--one">✦</span>
          <span className="success-spark success-spark--two">✧</span>
        </div>

        <div className="success-kicker">
          <span />
          APPLICATION RECEIVED
        </div>

        <h2>That’s a great first step.</h2>

        <p>
          Your onboarding details have been validated in this demo. In a live
          product, this is where your application reference and next steps would
          appear.
        </p>

        <div className="reference-card">
          <span>APPLICATION REFERENCE</span>
          <strong>BB-{new Date().getFullYear()}-DEMO01</strong>
          <BadgeCheck size={19} />
        </div>

        <button
          type="button"
          className="button button--primary"
          onClick={() => {
            setSubmitted(false);
            setAccepted(false);
            setSubmitError("");

            if (onStartNewApplication) {
              onStartNewApplication();
            } else {
              goToStep(0);
            }
          }}
        >
          Back to application
        </button>

        <span className="success-footnote">
          <ShieldCheck size={14} />
          Demo state only — no information was sent to BillBring.
        </span>
      </div>
    );
  }

  return (
    <div className="page-content">
      <div className="review-intro">
        <div className="review-intro-icon">
          <ShieldCheck size={21} />
        </div>
        <div>
          <strong>One last check before you submit</strong>
          <p>
            Make sure the information below matches your official documents.
          </p>
        </div>
      </div>

      {submitError && (
        <div
          role="alert"
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "10px",
            padding: "12px 14px",
            marginBottom: "16px",
            border: "1px solid #F3C4C4",
            borderRadius: "8px",
            background: "#FFF5F5",
            color: "#B42318",
            fontSize: "13px",
          }}
        >
          <AlertCircle size={18} />
          <span>{submitError}</span>
        </div>
      )}

      <SectionCard
        icon={UserRound}
        title="Applicant details"
        subtitle="Your contact information"
        className="review-card"
      >
        <button
          type="button"
          className="review-edit"
          onClick={() => goToStep(0)}
        >
          <Pencil size={13} /> Edit
        </button>

        <div className="review-grid">
          <ReviewRow label="Full name" value={form.fullName} />
          <ReviewRow label="Designation" value={form.designation} />
          <ReviewRow label="Work email" value={form.workEmail} />
          <ReviewRow label="Mobile number" value={form.phone} />
        </div>
      </SectionCard>

      <SectionCard
        icon={Building2}
        title="Company details"
        subtitle="Business profile and address"
        className="review-card"
      >
        <button
          type="button"
          className="review-edit"
          onClick={() => goToStep(1)}
        >
          <Pencil size={13} /> Edit
        </button>

        <div className="review-grid">
          <ReviewRow label="Legal business name" value={form.businessName} />
          <ReviewRow label="Business type" value={form.businessType} />
          <ReviewRow
            label="Registration number"
            value={form.registrationNumber}
          />
          <ReviewRow label="Website" value={form.website} />
          <ReviewRow label="Business PAN" value={form.panNumber} />
          <ReviewRow label="GSTIN" value={form.gstNumber} />
          <ReviewRow
            label="Registered address"
            value={[form.address, form.city, form.state, form.pincode]
              .filter(Boolean)
              .join(", ")}
          />
          <ReviewRow
            label="Settlement bank"
            value={[form.bankName, form.accountName]
              .filter(Boolean)
              .join(" · ")}
          />
        </div>
      </SectionCard>

      <SectionCard
        icon={FileCheck2}
        title="Documents"
        subtitle={`${uploaded} file${uploaded === 1 ? "" : "s"} attached`}
        className="review-card"
      >
        <button
          type="button"
          className="review-edit"
          onClick={() => goToStep(2)}
        >
          <Pencil size={13} /> Edit
        </button>

        <div className="review-document-list">
          {["pan", "registration", "gst", "bank"].map((id) => (
            <div
              key={id}
              className={`review-document ${
                documents[id] ? "review-document--ready" : ""
              }`}
            >
              <FileText size={16} />

              <span>
                {documents[id]?.name ||
                  {
                    pan: "Business PAN card",
                    registration: "Business registration proof",
                    gst: "GST certificate",
                    bank: "Cancelled cheque / bank proof",
                  }[id]}
              </span>

              {documents[id] ? (
                <CheckCircle2 size={16} />
              ) : (
                <span className="review-missing">Not added</span>
              )}
            </div>
          ))}
        </div>
      </SectionCard>

      <label className="consent-row">
        <input
          type="checkbox"
          checked={accepted}
          onChange={(event) => {
            setAccepted(event.target.checked);
            setSubmitError("");
          }}
        />

        <span className="custom-checkbox">
          <CheckCircle2 size={15} />
        </span>

        <span>
          I confirm that the information provided is accurate and that I am
          authorised to submit this application on behalf of the business.
        </span>
      </label>

      <div className="form-actions review-actions">
        <button
          type="button"
          className="button button--secondary"
          onClick={() => goToStep(2)}
        >
          Back
        </button>

        <button
          type="button"
          className="button button--primary"
          disabled={!accepted}
          onClick={handleSubmit}
        >
          Submit application <BadgeCheck size={16} />
        </button>
      </div>
    </div>
  );
}
