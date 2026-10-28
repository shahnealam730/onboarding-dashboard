import { useRef, useState } from "react";
import { FileText, UploadCloud, X, FileCheck2, ShieldCheck, Eye, Info } from "lucide-react";
import SectionCard from "../components/SectionCard";

const documentTypes = [
  { id: "pan", title: "Business PAN card", subtitle: "PAN card issued to your business", required: true, accept: ".pdf,.jpg,.jpeg,.png" },
  { id: "registration", title: "Business registration proof", subtitle: "Certificate of incorporation, LLP deed, etc.", required: true, accept: ".pdf,.jpg,.jpeg,.png" },
  { id: "gst", title: "GST certificate", subtitle: "GST registration certificate, if applicable", required: false, accept: ".pdf,.jpg,.jpeg,.png" },
  { id: "bank", title: "Cancelled cheque / bank proof", subtitle: "A document showing account name and number", required: false, accept: ".pdf,.jpg,.jpeg,.png" },
];

export default function Documents({ documents, setDocuments, errors }) {
  const inputRefs = useRef({});
  const [preview, setPreview] = useState(null);
  const addFile = (id, file) => {
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      alert("Please choose a file smaller than 10 MB.");
      return;
    }
    setDocuments((prev) => ({ ...prev, [id]: { file, name: file.name, size: file.size, type: file.type, url: URL.createObjectURL(file) } }));
  };
  const removeFile = (id) => {
    if (documents[id]?.url) URL.revokeObjectURL(documents[id].url);
    setDocuments((prev) => { const next = { ...prev }; delete next[id]; return next; });
  };
  const prettySize = (size) => size < 1024 * 1024 ? `${Math.max(1, Math.round(size / 1024))} KB` : `${(size / (1024 * 1024)).toFixed(1)} MB`;
  return (
    <div className="page-content">
      <SectionCard icon={FileCheck2} title="Verification documents" subtitle="Upload clear, readable copies. PDF, JPG and PNG files up to 10 MB are accepted.">
        <div className="document-list">
          {documentTypes.map((doc, index) => {
            const file = documents[doc.id];
            return (
              <div className={`document-row ${file ? "document-row--uploaded" : ""}`} key={doc.id}>
                <div className="document-type-icon"><FileText size={20} /></div>
                <div className="document-info">
                  <div className="document-title-line"><strong>{doc.title}</strong>{doc.required ? <span className="required-tag">Required</span> : <span className="optional-tag">Optional</span>}</div>
                  <p>{doc.subtitle}</p>
                  {file && <div className="uploaded-file"><span className="file-status-dot" />{file.name}<span>·</span>{prettySize(file.size)}</div>}
                  {!file && errors.documents && doc.required && <span className="field-error">Please upload this document to continue.</span>}
                </div>
                <input ref={(el) => inputRefs.current[doc.id] = el} type="file" accept={doc.accept} className="visually-hidden" onChange={(e) => addFile(doc.id, e.target.files?.[0])} />
                {file ? (
                  <div className="file-actions">
                    <button className="file-action-button" onClick={() => setPreview(file)} title="Preview file"><Eye size={16} /><span>Preview</span></button>
                    <button className="file-remove-button" onClick={() => removeFile(doc.id)} title="Remove file"><X size={16} /></button>
                  </div>
                ) : (
                  <button className="upload-button" onClick={() => inputRefs.current[doc.id]?.click()}><UploadCloud size={16} /> Upload file</button>
                )}
              </div>
            );
          })}
        </div>
      </SectionCard>
      <div className="upload-guidance">
        <div className="guidance-icon"><ShieldCheck size={18} /></div>
        <div><strong>A quick note on document safety</strong><p>Only upload documents that belong to your business. Your files are shown in this demo locally and are not sent to a server.</p></div>
      </div>
      <div className="document-foot"><Info size={14} /> Please make sure names and registration details are visible in each uploaded document.</div>

      {preview && (
        <div className="modal-backdrop" role="presentation" onClick={() => setPreview(null)}>
          <div className="preview-modal" role="dialog" aria-modal="true" aria-label="Document preview" onClick={(e) => e.stopPropagation()}>
            <div className="preview-modal-header"><div><strong>Document preview</strong><span>{preview.name}</span></div><button className="icon-button" onClick={() => setPreview(null)}><X size={18} /></button></div>
            <div className="preview-modal-content">
              {preview.type?.startsWith("image/") ? <img src={preview.url} alt={preview.name} /> : preview.type === "application/pdf" ? <iframe title={preview.name} src={preview.url} /> : <div className="preview-unavailable"><FileText size={38} /><p>Preview is not available for this file type.</p><span>{preview.name}</span></div>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}