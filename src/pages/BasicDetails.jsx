import { BriefcaseBusiness, Mail, Phone, UserRound } from "lucide-react";
import FormField from "../components/FormField";
import SectionCard from "../components/SectionCard";

export default function BasicDetails({ form, updateField, errors }) {
  const field = (name) => ({
    name,
    value: form[name],
    onChange: updateField,
    error: errors[name],
    required: true,
  });
  return (
    <div className="page-content">
      <SectionCard
        icon={UserRound}
        title="Personal information"
        subtitle="We'll use these details to keep you updated on your application."
      >
        <div className="form-grid">
          <FormField
            {...field("fullName")}
            label="Full name"
            placeholder="e.g. Shahne Alam"
          />
          <FormField
            {...field("designation")}
            label="Your designation"
            placeholder="e.g. Founder, Director"
          />
          <FormField
            {...field("workEmail")}
            label="Work email address"
            type="email"
            placeholder="name@company.com"
            hint="Use an email you can access."
          />
          <FormField
            {...field("phone")}
            label="Mobile number"
            type="tel"
            placeholder="+91 98765 43210"
            hint="Include your country code."
          />
        </div>
      </SectionCard>
      <div className="inline-note">
        <span className="inline-note-mark">
          <Mail size={17} />
        </span>
        <div>
          <strong>What happens next?</strong>
          <p>
            Our onboarding team may contact you on the email and phone number
            provided above.
          </p>
        </div>
      </div>
      <div className="privacy-footnote">
        <Phone size={13} /> Your contact details are only used for onboarding
        and account-related communication.
      </div>
    </div>
  );
}
