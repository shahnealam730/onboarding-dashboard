import { Building2, MapPin, Landmark, Globe2 } from "lucide-react";
import FormField from "../components/FormField";
import SectionCard from "../components/SectionCard";

export default function CompanyDetails({ form, updateField, errors }) {
  const field = (name, required = false) => ({
    name,
    value: form[name],
    onChange: updateField,
    error: errors[name],
    required,
  });
  return (
    <div className="page-content">
      <SectionCard
        icon={Building2}
        title="Business profile"
        subtitle="Share your registered business information."
      >
        <div className="form-grid">
          <FormField
            {...field("businessName", true)}
            label="Legal business name"
            placeholder="As mentioned on your registration"
          />
          <FormField {...field("businessType", true)} label="Business type">
            <select
              id="businessType"
              name="businessType"
              value={form.businessType}
              onChange={updateField}
              aria-invalid={!!errors.businessType}
            >
              <option value="">Select business type</option>
              <option>Private Limited Company</option>
              <option>Limited Liability Partnership (LLP)</option>
              <option>Partnership Firm</option>
              <option>Sole Proprietorship</option>
              <option>Public Limited Company</option>
              <option>Other</option>
            </select>
          </FormField>
          <FormField
            {...field("registrationNumber")}
            label="Registration number"
            placeholder="CIN / LLPIN / other"
          />
          <FormField
            {...field("website")}
            label="Business website"
            placeholder="https://yourcompany.com"
            hint="Optional, if you have one."
          />
          <FormField
            {...field("panNumber")}
            label="Business PAN"
            placeholder="ABCDE1234F"
          />
          <FormField
            {...field("gstNumber")}
            label="GSTIN"
            placeholder="22AAAAA0000A1Z5"
          />
        </div>
      </SectionCard>
      <SectionCard
        icon={MapPin}
        title="Registered address"
        subtitle="Use the address shown on your official business documents."
      >
        <div className="form-grid">
          <FormField
            {...field("address", true)}
            label="Address line"
            placeholder="Building, street, area"
          />
          <FormField
            {...field("city", true)}
            label="City"
            placeholder="Enter city"
          />
          <FormField
            {...field("state", true)}
            label="State / Union Territory"
            placeholder="Enter state"
          />
          <FormField
            {...field("pincode", true)}
            label="PIN code"
            placeholder="6-digit PIN code"
          />
        </div>
      </SectionCard>
      <SectionCard
        icon={Landmark}
        title="Settlement account"
        subtitle="Optional for now — you can add these details later if needed."
      >
        <div className="form-grid">
          <FormField
            {...field("accountName")}
            label="Account holder name"
            placeholder="Name as per bank records"
          />
          <FormField
            {...field("bankName")}
            label="Bank name"
            placeholder="e.g. HDFC Bank"
          />
          <FormField
            {...field("accountNumber")}
            label="Account number"
            placeholder="Enter account number"
          />
          <FormField
            {...field("ifsc")}
            label="IFSC code"
            placeholder="e.g. HDFC0001234"
          />
        </div>
      </SectionCard>
      <div className="privacy-footnote">
        <Globe2 size={13} /> You can review all details before submitting your
        application.
      </div>
    </div>
  );
}
