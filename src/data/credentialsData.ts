import { GeneratedCredential, AuthUser } from '../types';

export const PRESET_CREDENTIALS: GeneratedCredential[] = [
  {
    user: {
      id: 'usr_tope_ceo',
      name: 'Tope Balogun',
      email: 'tope.balogun@keahospitality.ng',
      role: 'CEO',
      roleTitle: 'Chief Executive Officer & Managing Director',
      department: 'Executive Governance & Capital Allocations',
      initials: 'TB',
      avatarColor: '#92C842',
      assignedRegion: 'All',
      securityClearance: 'Level 5 (Unrestricted)',
      lastLogin: '2026-09-21 07:15 WAT'
    },
    passwordText: 'KEA-Executive-2026!',
    description: 'Full unconstrained executive command across VSR allocations, field POS telemetry, funding approvals, and head office staffing.',
    badge: 'CEO / Level 5 Clearance'
  },
  {
    user: {
      id: 'usr_adebayo_ops',
      name: 'Adebayo Adeleke',
      email: 'adebayo.ops@keahospitality.ng',
      role: 'OPS_DIRECTOR',
      roleTitle: 'VP of Field Merchandising & Operations',
      department: 'Field Operations & VSR Telemetry Control',
      initials: 'AA',
      avatarColor: '#22d3ee',
      assignedRegion: 'All',
      securityClearance: 'Level 4 (Regional Ops)',
      lastLogin: '2026-09-21 06:45 WAT'
    },
    passwordText: 'Ops-VSR-Lagos#2026',
    description: 'Operational lead governing 78 field merchandisers, 1,420 POS terminals, heartbeat monitors, and shift compliance audits.',
    badge: 'Operations Command'
  },
  {
    user: {
      id: 'usr_chidinma_hr',
      name: 'Chidinma Okonkwo',
      email: 'chidinma.hr@keahospitality.ng',
      role: 'AUDIT_LEAD',
      roleTitle: 'Head of People & Organizational Governance',
      department: 'Human Resources, Recruitment & Audit',
      initials: 'CO',
      avatarColor: '#c084fc',
      assignedRegion: 'All',
      securityClearance: 'Level 3 (Audit & HR)',
      lastLogin: '2026-09-20 18:30 WAT'
    },
    passwordText: 'KEA-People-Audit$26',
    description: 'Governs Head Office staffing requisitions, candidate vetting, staff archival ledger, and compliance reviews.',
    badge: 'People & HR Governance'
  },
  {
    user: {
      id: 'usr_folashade_lagos',
      name: 'Folashade Alabi',
      email: 'folashade.alabi@keahospitality.ng',
      role: 'REGIONAL_SUPERVISOR',
      roleTitle: 'Southwest Regional Operations Supervisor',
      department: 'Lagos & Trade Fair Hub Terminal Command',
      initials: 'FA',
      avatarColor: '#F17F31',
      assignedRegion: 'Lagos',
      securityClearance: 'Level 4 (Regional Ops)',
      lastLogin: '2026-09-21 06:58 WAT'
    },
    passwordText: 'Hub-Lagos-Lead*2026',
    description: 'Field supervisor commanding the Lagos Hub (38 field merchandisers, 680 active retail POS terminals across Ikeja, Alaba, Trade Fair).',
    badge: 'Lagos Hub Supervisor'
  }
];

export const PRESET_VSR_CREDENTIALS: GeneratedCredential[] = [
  {
    user: {
      id: 'usr_vsr_ruth_eze',
      name: 'Ruth Eze',
      email: 'ruth.eze@keahospitality.ng',
      role: 'VSR',
      roleTitle: 'Senior Van Sales Representative',
      department: 'Field Sales & Merchandising - Lagos Island',
      initials: 'RE',
      avatarColor: '#10b981',
      assignedRegion: 'Lagos',
      securityClearance: 'Level 1 (Field Rep)',
      lastLogin: '2026-09-28 07:12 WAT',
      staffCode: 'KEA-VSR-041',
      platform: 'vsr',
      sessionMeta: {
        signedInAt: '2026-09-28T07:12:00Z',
        timezone: 'Africa/Lagos',
        hub: 'Lagos Island Core'
      }
    },
    passwordText: 'VSR-Lagos-2026!',
    description: 'Senior VSR covering Mile 2 - Eko Atlantic corridor. 14 daily outlets, active POS float, insured.',
    badge: 'Senior VSR (Lagos Island)'
  },
  {
    user: {
      id: 'usr_vsr_folashade_field',
      name: 'Folashade Alabi',
      email: 'folashade.field@keahospitality.ng',
      role: 'VSR',
      roleTitle: 'Van Sales Lead (Trade Fair)',
      department: 'Field Merchandising & POS Sales',
      initials: 'FA',
      avatarColor: '#f59e0b',
      assignedRegion: 'Lagos',
      securityClearance: 'Level 1 (Field Rep)',
      lastLogin: '2026-09-28 07:45 WAT',
      staffCode: 'KEA-VSR-042',
      platform: 'vsr',
      sessionMeta: {
        signedInAt: '2026-09-28T07:45:00Z',
        timezone: 'Africa/Lagos',
        hub: 'Trade Fair Corridor'
      }
    },
    passwordText: 'VSR-Field-2026!',
    description: 'VSR covering Trade Fair corridor. Outstanding micro-loan balance: ₦80,000.',
    badge: 'VSR Lead (Trade Fair)'
  },
  {
    user: {
      id: 'usr_vsr_akinfolarin',
      name: 'Akinfolarin Dada',
      email: 'akin.dada@keahospitality.ng',
      role: 'VSR',
      roleTitle: 'Regional Van Sales Rep',
      department: 'Field Merchandising - Oyo Hub',
      initials: 'AD',
      avatarColor: '#0284c7',
      assignedRegion: 'Ibadan',
      securityClearance: 'Level 1 (Field Rep)',
      lastLogin: '2026-09-28 07:20 WAT',
      staffCode: 'KEA-VSR-043',
      platform: 'vsr',
      sessionMeta: {
        signedInAt: '2026-09-28T07:20:00Z',
        timezone: 'Africa/Lagos',
        hub: 'Bodija Cluster'
      }
    },
    passwordText: 'VSR-Ibadan-2026!',
    description: 'Oyo Cluster VSR covering Bodija - Mokola route. 18 outlets visited.',
    badge: 'VSR (Ibadan Hub)'
  },
  {
    user: {
      id: 'usr_vsr_emeka_nwosu',
      name: 'Emeka Nwosu',
      email: 'emeka.nwosu@keahospitality.ng',
      role: 'VSR',
      roleTitle: 'Van Sales Representative',
      department: 'Field Merchandising - Ogun Hub',
      initials: 'EN',
      avatarColor: '#8b5cf6',
      assignedRegion: 'Ogun',
      securityClearance: 'Level 1 (Field Rep)',
      lastLogin: '2026-09-28 07:30 WAT',
      staffCode: 'KEA-VSR-044',
      platform: 'vsr',
      sessionMeta: {
        signedInAt: '2026-09-28T07:30:00Z',
        timezone: 'Africa/Lagos',
        hub: 'Abeokuta Trade'
      }
    },
    passwordText: 'VSR-Ogun-2026!',
    description: 'Ogun Hub VSR covering Abeokuta - Sagamu corridor. 11 outlets visited.',
    badge: 'VSR (Ogun Hub)'
  }
];

export function verifyCredentials(emailInput: string, passwordInput: string): AuthUser | null {
  const normalizedEmail = emailInput.trim().toLowerCase();
  const trimmedPassword = passwordInput.trim();

  // Super Admin shortcuts & standard aliases
  if (
    (normalizedEmail === 'tope@keahospitality.com' ||
      normalizedEmail === 'admin@keahospitality.com' ||
      normalizedEmail === 'tope.balogun@keahospitality.ng' ||
      normalizedEmail === 'admin@kea.com' ||
      normalizedEmail === 'admin') &&
    (trimmedPassword === 'admin123' ||
      trimmedPassword === 'admin' ||
      trimmedPassword === 'KEA-Executive-2026!' ||
      trimmedPassword === 'password')
  ) {
    return PRESET_CREDENTIALS[0].user;
  }

  // VSR demo shortcut
  if (
    (normalizedEmail === 'vsr@keahospitality.ng' ||
      normalizedEmail === 'vsr@kea.com' ||
      normalizedEmail === 'vsr') &&
    (trimmedPassword === 'vsr123' ||
      trimmedPassword === 'vsr' ||
      trimmedPassword === 'password' ||
      trimmedPassword === 'admin123' ||
      trimmedPassword === 'admin')
  ) {
    return PRESET_VSR_CREDENTIALS[0].user;
  }

  // Check Admin Presets
  const foundAdmin = PRESET_CREDENTIALS.find(
    (c) =>
      c.user.email.toLowerCase() === normalizedEmail &&
      (c.passwordText === trimmedPassword || trimmedPassword === 'admin123' || trimmedPassword === 'admin')
  );
  if (foundAdmin) return foundAdmin.user;

  // Check VSR Presets (by email or staff code)
  const foundVsr = PRESET_VSR_CREDENTIALS.find(
    (c) =>
      (c.user.email.toLowerCase() === normalizedEmail ||
        c.user.staffCode?.toLowerCase() === normalizedEmail) &&
      (c.passwordText === trimmedPassword ||
        trimmedPassword === 'vsr123' ||
        trimmedPassword === 'vsr' ||
        trimmedPassword === 'admin123' ||
        trimmedPassword === 'admin' ||
        trimmedPassword === 'password')
  );
  if (foundVsr) return foundVsr.user;

  return null;
}

export function generateCustomAuditorCredential(hubScope: 'All' | 'Lagos' | 'Ibadan' | 'Ogun' | 'Benin' = 'All'): GeneratedCredential {
  const randomPin = Math.floor(1000 + Math.random() * 9000);
  const idSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();

  const user: AuthUser = {
    id: `usr_auditor_${idSuffix.toLowerCase()}`,
    name: `Field Auditor ${idSuffix}`,
    email: `auditor.${idSuffix.toLowerCase()}@keahospitality.ng`,
    role: 'AUDIT_LEAD',
    roleTitle: `Independent ${hubScope === 'All' ? 'National' : hubScope} Shift Auditor`,
    department: 'External Compliance & POS Quality Inspection',
    initials: `A${idSuffix[0]}`,
    avatarColor: '#eab308',
    assignedRegion: hubScope,
    securityClearance: 'Level 3 (Audit & HR)',
    lastLogin: 'Just generated (WAT)'
  };

  return {
    user,
    passwordText: `Audit-Pass#${randomPin}`,
    description: `Temporary on-demand inspection credential with read-only audit logging for ${hubScope} territory.`,
    badge: 'On-Demand Auditor'
  };
}
