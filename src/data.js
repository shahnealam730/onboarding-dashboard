export const steps = [
  {
    id: 0,
    title: "Basic details",
    short: "Basic details",
    description: "Tell us who we’ll be working with.",
  },
  {
    id: 1,
    title: "Company details",
    short: "Company details",
    description: "A few details about your business.",
  },
  {
    id: 2,
    title: "Documents",
    short: "Documents",
    description: "Help us verify your business.",
  },
  {
    id: 3,
    title: "Review & submit",
    short: "Review & submit",
    description: "Check everything before sending it over.",
  },
];

export const initialForm = {
  fullName: "",
  workEmail: "",
  phone: "",
  designation: "",
  businessName: "",
  businessType: "",
  website: "",
  registrationNumber: "",
  panNumber: "",
  gstNumber: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  accountName: "",
  bankName: "",
  accountNumber: "",
  ifsc: "",
};

export const requiredByStep = {
  0: ["fullName", "workEmail", "phone", "designation"],
  1: ["businessName", "businessType", "address", "city", "state", "pincode"],
  2: [],
};
