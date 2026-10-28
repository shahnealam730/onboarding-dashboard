
import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  CircleHelp,
  Clock3,
  LockKeyhole,
  Sparkles,
} from "lucide-react";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import StepHeader from "./components/StepHeader";
import FormActions from "./components/FormActions";
import BasicDetails from "./pages/BasicDetails";
import CompanyDetails from "./pages/CompanyDetails";
import Documents from "./pages/Documents";
import ReviewSubmit from "./pages/ReviewSubmit";
import { initialForm, requiredByStep, steps } from "./data";

const STORAGE_KEY = "billbring-onboarding-v2";

function readSaved() {
  try {
    const saved = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "{}"
    );

    return {
      form: { ...initialForm, ...(saved.form || {}) },
      activeStep: Number.isInteger(saved.activeStep)
        ? saved.activeStep
        : 0,
      completedSteps: Array.isArray(saved.completedSteps)
        ? saved.completedSteps
        : [],
    };
  } catch {
    return {
      form: { ...initialForm },
      activeStep: 0,
      completedSteps: [],
    };
  }
}

export default function App() {
  const saved = useMemo(readSaved, []);

  const [activeStep, setActiveStep] = useState(saved.activeStep);
  const [form, setForm] = useState(saved.form);
  const [documents, setDocuments] = useState({});
  const [completedSteps, setCompletedSteps] = useState(
    saved.completedSteps
  );
  const [errors, setErrors] = useState({});
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toast, setToast] = useState("");

  // Save current draft automatically.
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ form, activeStep, completedSteps })
      );
    } catch (error) {
      console.error("Unable to save onboarding draft:", error);
    }
  }, [form, activeStep, completedSteps]);

  // Automatically hide toast messages.
  useEffect(() => {
    if (!toast) return;

    const timeout = window.setTimeout(() => setToast(""), 2800);

    return () => window.clearTimeout(timeout);
  }, [toast]);

  const updateField = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateStep = (stepIndex) => {
    const nextErrors = {};

    (requiredByStep[stepIndex] || []).forEach((name) => {
      if (!String(form[name] || "").trim()) {
        nextErrors[name] = "This field is required.";
      }
    });

    if (
      stepIndex === 0 &&
      form.workEmail &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.workEmail)
    ) {
      nextErrors.workEmail = "Enter a valid email address.";
    }

    if (
      stepIndex === 0 &&
      form.phone &&
      form.phone.replace(/\D/g, "").length < 10
    ) {
      nextErrors.phone = "Enter a valid phone number.";
    }

    if (
      stepIndex === 1 &&
      form.pincode &&
      !/^\d{6}$/.test(form.pincode)
    ) {
      nextErrors.pincode = "Enter a valid 6-digit PIN code.";
    }

    if (
      stepIndex === 2 &&
      (!documents.pan || !documents.registration)
    ) {
      nextErrors.documents = "Upload the required documents.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const goToStep = (index) => {
    const safeIndex = Math.max(0, Math.min(index, steps.length - 1));

    setActiveStep(safeIndex);
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleContinue = () => {
    if (!validateStep(activeStep)) {
      setToast("Please check the highlighted fields.");
      return;
    }

    setCompletedSteps((prev) =>
      prev.includes(activeStep) ? prev : [...prev, activeStep]
    );

    goToStep(Math.min(activeStep + 1, steps.length - 1));
  };

  const saveDraft = () => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ form, activeStep, completedSteps })
      );

      setToast("Your progress has been saved on this device.");
    } catch (error) {
      console.error("Unable to save onboarding draft:", error);
      setToast("Unable to save your draft. Please try again.");
    }
  };

  // Demo submission: this does not send data to a backend.
  const submitDemo = () => {
    setCompletedSteps([0, 1, 2, 3]);

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Unable to clear saved draft:", error);
    }
  };

  // Start a fresh application from the confirmation screen.
  const startNewApplication = () => {
    const emptyForm = { ...initialForm };

    setForm(emptyForm);
    setDocuments({});
    setErrors({});
    setCompletedSteps([]);
    setActiveStep(0);
    setToast("");

    try {
      // Store a fresh, empty draft so old values are not restored.
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          form: emptyForm,
          activeStep: 0,
          completedSteps: [],
        })
      );
    } catch (error) {
      console.error("Unable to reset saved draft:", error);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <BasicDetails
            form={form}
            updateField={updateField}
            errors={errors}
          />
        );

      case 1:
        return (
          <CompanyDetails
            form={form}
            updateField={updateField}
            errors={errors}
          />
        );

      case 2:
        return (
          <Documents
            documents={documents}
            setDocuments={setDocuments}
            errors={errors}
          />
        );

      default:
        return (
          <ReviewSubmit
            form={form}
            documents={documents}
            goToStep={goToStep}
            onSubmit={submitDemo}
            onStartNewApplication={startNewApplication}
          />
        );
    }
  };

  return (
    <div className="app-shell">
      <Sidebar
        activeStep={activeStep}
        setActiveStep={goToStep}
        completedSteps={completedSteps}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <main className="main-shell">
        <Topbar
          onMenuClick={() => setMobileOpen(true)}
          stepNumber={activeStep + 1}
        />

        <div className="workspace">
          <div className="welcome-strip">
            <div className="welcome-mark">
              <Sparkles size={16} />
            </div>

            <p>
              <strong>Welcome to BillBring onboarding</strong>
              <span>
                Complete these details to get your merchant account moving.
              </span>
            </p>

            <div className="welcome-meta">
              <Clock3 size={14} />
              Takes about 5–7 min
            </div>
          </div>

          <StepHeader
            step={steps[activeStep]}
            activeStep={activeStep}
            completedSteps={completedSteps}
          />

          {renderStep()}

          {activeStep < 3 && (
            <FormActions
              onBack={() => goToStep(activeStep - 1)}
              onContinue={handleContinue}
              onSave={saveDraft}
              isFirst={activeStep === 0}
            />
          )}

          <footer className="main-footer">
            <span>
              © {new Date().getFullYear()} BillBring Payment Solutions
            </span>

            <div>
              <span>
                <LockKeyhole size={12} />
                Secure onboarding
              </span>

              <a href="mailto:support@billbring.com">
                <CircleHelp size={12} />
                Help &amp; support
              </a>
            </div>
          </footer>
        </div>
      </main>

      {toast && (
        <div className="toast-message">
          <CheckCircle2 size={17} />
          {toast}
        </div>
      )}
    </div>
  );
}
