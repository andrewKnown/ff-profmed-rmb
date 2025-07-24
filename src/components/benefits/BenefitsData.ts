
import { BenefitCategory, PlanBenefits } from "./PlanSelectionSection";

// Plan data based on Profmed Schedule of Benefits 2025
export const plans: PlanBenefits[] = [
  {
    name: "ProPinnacle",
    monthlyContribution: "R5,850",
    tier: "premium",
    benefits: {
      hospital: { covered: true, details: "Unlimited private hospital cover at any hospital of choice" },
      chronic: { covered: true, details: "Comprehensive cover for 67 chronic conditions including comprehensive HIV benefits" },
      dayToDay: { covered: true, details: "Comprehensive savings and Above Threshold Benefits with high annual limits" },
      maternity: { covered: true, details: "Comprehensive maternity benefits with additional support services and post-natal care" },
      specialists: { covered: true, details: "In-hospital specialist cover up to 300% of scheme rate" },
      optical: { covered: true, details: "Comprehensive optical benefits with higher annual limits" },
      dental: { covered: true, details: "Comprehensive dental coverage including specialised procedures like orthodontics" }
    },
    suitableFor: ["Medical specialists", "Senior professionals", "Families with extensive healthcare needs"],
    recommendedFor: ['doctors', 'specialists', 'surgeons', 'consultants', 'executives']
  },
  {
    name: "ProPinnacle Savvy",
    monthlyContribution: "R5,250",
    tier: "premium",
    benefits: {
      hospital: { covered: true, details: "Unlimited hospital cover within the ProPinnacle Savvy Hospital Network" },
      chronic: { covered: true, details: "Comprehensive cover for 67 chronic conditions including comprehensive HIV benefits" },
      dayToDay: { covered: true, details: "Comprehensive savings and Above Threshold Benefits through the Designated Service Provider network" },
      maternity: { covered: true, details: "Comprehensive maternity benefits through network providers including confinements" },
      specialists: { covered: true, details: "In-hospital specialist cover up to 300% of scheme rate within network" },
      optical: { covered: true, details: "Comprehensive optical benefits through network providers" },
      dental: { covered: true, details: "Comprehensive dental coverage through network providers" }
    },
    suitableFor: ["Medical specialists seeking network benefits", "Senior professionals who want cost savings", "Network-conscious families"],
    recommendedFor: ['doctors', 'specialists', 'consultants']
  },
  {
    name: "ProSecure",
    monthlyContribution: "R1,780",
    tier: "basic",
    benefits: {
      hospital: { covered: true, details: "Cover at any private hospital up to an annual limit of R165,000 per beneficiary" },
      chronic: { covered: "partial", details: "Medicine cover for 27 Prescribed Minimum Benefit conditions" },
      dayToDay: { covered: false, details: "No day-to-day benefits included" },
      maternity: { covered: "partial", details: "Cover for pregnancy scans and antenatal consultations" },
      specialists: { covered: "partial", details: "In-hospital specialist cover up to 100% of scheme rate" },
      optical: { covered: false, details: "No optical benefits" },
      dental: { covered: false, details: "No dental benefits" }
    },
    suitableFor: ["Young healthy individuals", "Budget-conscious professionals", "Hospital cover priority"],
    recommendedFor: ['interns', 'graduates', 'junior professionals', 'freelancers']
  },
  {
    name: "ProSecure Plus",
    monthlyContribution: "R2,100",
    tier: "basic",
    benefits: {
      hospital: { covered: true, details: "Cover at any private hospital up to an annual limit of R165,000 per beneficiary" },
      chronic: { covered: "partial", details: "Medicine cover for 27 Prescribed Minimum Benefit conditions" },
      dayToDay: { covered: "partial", details: "Medical savings account for day-to-day expenses and additional benefits" },
      maternity: { covered: "partial", details: "Cover for pregnancy scans, antenatal consultations and confinement" },
      specialists: { covered: "partial", details: "In-hospital specialist cover up to 100% of scheme rate" },
      optical: { covered: "partial", details: "Basic optical benefits through savings account" },
      dental: { covered: "partial", details: "Basic dental coverage through savings account" }
    },
    suitableFor: ["Entry-level professionals", "Young families", "Budget-conscious individuals"],
    recommendedFor: ['interns', 'graduates', 'junior professionals']
  },
  {
    name: "ProActive",
    monthlyContribution: "R2,600",
    tier: "standard",
    benefits: {
      hospital: { covered: true, details: "Comprehensive cover at any private hospital" },
      chronic: { covered: true, details: "Coverage for 48 chronic conditions including HIV benefit" },
      dayToDay: { covered: "partial", details: "Medical savings account for day-to-day medical expenses" },
      maternity: { covered: true, details: "Comprehensive maternity benefits including antenatal visits and scans" },
      specialists: { covered: "partial", details: "In-hospital specialist cover up to 200% of scheme rate" },
      optical: { covered: true, details: "Examinations, frames and lenses covered from savings" },
      dental: { covered: true, details: "Basic and specialised dentistry from savings" }
    },
    suitableFor: ["Young professionals", "Families", "Regular healthcare users"],
    recommendedFor: ['architects', 'engineers', 'designers', 'project managers']
  },
  {
    name: "ProActive Plus",
    monthlyContribution: "R3,100",
    tier: "standard",
    benefits: {
      hospital: { covered: true, details: "Comprehensive cover at any private hospital" },
      chronic: { covered: true, details: "Enhanced coverage for 48 chronic conditions including HIV benefit" },
      dayToDay: { covered: true, details: "Enhanced medical savings account with higher limits and Above Threshold Benefits" },
      maternity: { covered: true, details: "Comprehensive maternity benefits with additional support and consultation coverage" },
      specialists: { covered: true, details: "In-hospital specialist cover up to 200% with additional out-of-hospital cover" },
      optical: { covered: true, details: "Enhanced optical benefits with higher limits for frames and lenses" },
      dental: { covered: true, details: "Comprehensive dentistry coverage with enhanced benefits" }
    },
    suitableFor: ["Established professionals", "Growing families", "Active lifestyle individuals"],
    recommendedFor: ['architects', 'engineers', 'academics', 'attorneys']
  },
  {
    name: "ProSelect",
    monthlyContribution: "R2,250",
    tier: "standard",
    benefits: {
      hospital: { covered: true, details: "Comprehensive hospital cover at any private hospital" },
      chronic: { covered: true, details: "Coverage for 35 chronic conditions including HIV benefit" },
      dayToDay: { covered: "partial", details: "Medical savings account for day-to-day medical expenses" },
      maternity: { covered: true, details: "Standard maternity benefits including antenatal visits" },
      specialists: { covered: "partial", details: "In-hospital specialist cover up to 150% of scheme rate" },
      optical: { covered: "partial", details: "Standard optical benefits through savings" },
      dental: { covered: "partial", details: "Standard dental coverage through savings" }
    },
    suitableFor: ["Mid-career professionals", "Those wanting flexibility", "Growing families"],
    recommendedFor: ['attorneys', 'lawyers', 'accountants', 'consultants']
  },
  {
    name: "ProSelect Plus",
    monthlyContribution: "R2,800",
    tier: "standard",
    benefits: {
      hospital: { covered: true, details: "Enhanced hospital cover at any private hospital" },
      chronic: { covered: true, details: "Coverage for 35 chronic conditions with higher limits" },
      dayToDay: { covered: true, details: "Enhanced medical savings account with Above Threshold Benefits" },
      maternity: { covered: true, details: "Enhanced maternity benefits with additional cover for confinement" },
      specialists: { covered: true, details: "In-hospital specialist cover up to 200% with additional out-of-hospital cover" },
      optical: { covered: true, details: "Enhanced optical benefits with higher limits for examinations and eyewear" },
      dental: { covered: true, details: "Enhanced dental coverage with extended benefits for specialized procedures" }
    },
    suitableFor: ["Established professionals", "Families needing flexibility", "Individuals with specific healthcare needs"],
    recommendedFor: ['attorneys', 'accountants', 'consultants', 'academics']
  }
];
