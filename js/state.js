/**
 * CASEVAULT State Management & Realistic SIH Demo Dataset
 * Upgraded with AI Investigation & Evidence Intelligence Data:
 * - 12 Interconnected forensic documents with extracted entities & AI summaries
 * - Cryptographic duplicate & near-duplicate demonstration pairs
 * - Simulated tamper demonstration records
 * - Entity Graph (People, Evidence, Locations, Events, Documents, Organizations)
 * - Chronological Investigation Timeline events
 * - Universal Multi-Entity Search engine
 */

export const State = {
  // Current active session
  currentUser: {
    id: 'USR-7701',
    name: 'Inspector Vikram Malhotra',
    email: 'v.malhotra@casevault.gov.in',
    role: 'Investigator',
    department: 'Cyber Crime Investigation Unit',
    clearance: 'Level 4 (Secret)',
    badgeId: 'IN-CYBER-8842',
    avatar: 'VM',
    isAuthenticated: true,
    lastLogin: '2026-09-19 09:14:22 IST'
  },

  // Role definitions & Permission Matrix
  roles: [
    'Administrator',
    'Investigator',
    'Legal Officer',
    'Forensic Analyst',
    'Reviewer',
    'Viewer'
  ],

  permissionMatrix: {
    'Administrator': { view: true, upload: true, modify: true, delete: true, download: true, share: true, verify: true, manageUsers: true },
    'Investigator': { view: true, upload: true, modify: true, delete: false, download: true, share: true, verify: true, manageUsers: false },
    'Forensic Analyst': { view: true, upload: true, modify: false, delete: false, download: true, share: false, verify: true, manageUsers: false },
    'Legal Officer': { view: true, upload: false, modify: false, delete: false, download: true, share: true, verify: true, manageUsers: false },
    'Reviewer': { view: true, upload: false, modify: false, delete: false, download: false, share: false, verify: true, manageUsers: false },
    'Viewer': { view: true, upload: false, modify: false, delete: false, download: false, share: false, verify: false, manageUsers: false }
  },

  // Directory of personnel
  users: [
    {
      id: 'USR-7701',
      name: 'Inspector Vikram Malhotra',
      email: 'v.malhotra@casevault.gov.in',
      role: 'Investigator',
      department: 'Cyber Crime Investigation Unit',
      clearance: 'Level 4 (Secret)',
      status: 'Active',
      lastLogin: '10 minutes ago'
    },
    {
      id: 'USR-8820',
      name: 'Dr. Rajesh Sharma',
      email: 'r.sharma@forensics.gov.in',
      role: 'Forensic Analyst',
      department: 'Central Digital Forensics Lab',
      clearance: 'Level 5 (Top Secret)',
      status: 'Active',
      lastLogin: '14 minutes ago'
    },
    {
      id: 'USR-9904',
      name: 'Amitav Roy',
      email: 'a.roy@casevault.gov.in',
      role: 'Administrator',
      department: 'Directorate of Information Security',
      clearance: 'Level 5 (Top Secret)',
      status: 'Active',
      lastLogin: '2 hours ago'
    },
    {
      id: 'USR-4412',
      name: 'Adv. Ananya Deshmukh',
      email: 'a.deshmukh@prosecution.gov.in',
      role: 'Legal Officer',
      department: 'Office of the Special Public Prosecutor',
      clearance: 'Level 3 (Confidential)',
      status: 'Active',
      lastLogin: '1 hour ago'
    },
    {
      id: 'USR-3309',
      name: 'Priya Sen',
      email: 'p.sen@judiciary.gov.in',
      role: 'Reviewer',
      department: 'Judicial Review & Oversight Directorate',
      clearance: 'Level 2 (Internal)',
      status: 'Active',
      lastLogin: 'Yesterday'
    },
    {
      id: 'USR-1105',
      name: 'Rahul Varma',
      email: 'r.varma@casevault.gov.in',
      role: 'Viewer',
      department: 'Legal Compliance Cell',
      clearance: 'Level 1 (Public)',
      status: 'Active',
      lastLogin: '3 days ago'
    }
  ],

  // Active Cases
  cases: [
    {
      id: 'CASE-2026-0142',
      name: 'Financial Fraud & Offshore Shell Laundering',
      type: 'Financial Fraud Investigation',
      department: 'Economic Offenses Wing',
      leadInvestigator: 'Inspector Vikram Malhotra',
      priority: 'Critical',
      status: 'Active',
      createdDate: '2026-08-12',
      documentCount: 7,
      evidenceCount: 14,
      lastActivity: '2 hours ago',
      description: 'Comprehensive investigation into illegal multi-jurisdictional shell entity transactions totaling ₹342 Crores through forged bank authorizations and offshore hawala conduits.'
    },
    {
      id: 'CASE-2026-0187',
      name: 'State Grid Ransomware & SCADA Intrusion',
      type: 'Cyber Crime Investigation',
      department: 'Cyber Defense Cell',
      leadInvestigator: 'Dr. Rajesh Sharma',
      priority: 'Critical',
      status: 'Active',
      createdDate: '2026-08-28',
      documentCount: 3,
      evidenceCount: 9,
      lastActivity: '35 mins ago',
      description: 'Forensic extraction of malicious payloads and lateral movement telemetry targeting regional power distribution network servers.'
    },
    {
      id: 'CASE-2026-0214',
      name: 'Revenue Land Title Counterfeiting Syndicate',
      type: 'Document Forgery Investigation',
      department: 'Anti-Corruption Bureau',
      leadInvestigator: 'Inspector Vikram Malhotra',
      priority: 'High',
      status: 'Under Review',
      createdDate: '2026-09-02',
      documentCount: 2,
      evidenceCount: 18,
      lastActivity: '1 day ago',
      description: 'Digital analysis of counterfeit revenue stamps, altered cadastral survey maps, and falsified tehsildar digital signatures.'
    },
    {
      id: 'CASE-2026-0251',
      name: 'Inter-Agency Digital Evidence Review',
      type: 'Digital Evidence Review',
      department: 'Special Investigation Team (SIT)',
      leadInvestigator: 'Adv. Ananya Deshmukh',
      priority: 'Medium',
      status: 'Closed',
      createdDate: '2026-07-19',
      documentCount: 2,
      evidenceCount: 11,
      lastActivity: '5 days ago',
      description: 'Court-ordered multi-agency synthesis and digital verification of cellular tower dumps and encrypted messaging archives.'
    }
  ],

  // 12 Comprehensive Forensic & Legal Documents
  documents: [
    {
      id: 'DOC-88910',
      name: 'FIR_2026_0142_First_Information_Report_Signed.pdf',
      caseId: 'CASE-2026-0142',
      caseName: 'Financial Fraud & Offshore Shell Laundering',
      department: 'Economic Offenses Wing',
      docType: 'FIR / Formal Complaint',
      fileSize: '4.2 MB',
      uploadDate: '2026-08-12 09:42:10',
      uploadedBy: 'Inspector Vikram Malhotra',
      classification: 'Restricted Evidence',
      hashStatus: 'MATCHED',
      sha256: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
      digitalSignatureStatus: 'VERIFIED',
      signatureId: 'SIG-ECDSA-P256-8F4A992C',
      signer: 'Superintendent of Police (Cyber Crime)',
      integrityScore: '100%',
      lastVerified: '2026-09-17 19:30:12',
      authorizedRoles: ['Administrator', 'Investigator', 'Legal Officer', 'Forensic Analyst'],
      contentSnippet: 'FIRST INFORMATION REPORT (Under Section 154 Cr.P.C.)\nDistrict: New Delhi Central | Police Station: Cyber Crime & EOW\nComplainant: Director of Financial Intelligence Unit\nAllegations: Non-existent vendor invoices routed through offshore intermediary accounts in Seychelles and Dubai. Forged banking credentials and unauthorized cryptographic token transfers by suspect Ravi Kumar and courier Arun Singh at DLF Cyber City.',
      aiSummary: 'Originating complaint initiating the ₹342 Cr fraud inquiry against Ravi Kumar and Arun Singh for shell transfers routed from DLF Cyber City.',
      entities: {
        people: ['Ravi Kumar', 'Arun Singh', 'Inspector Vikram Malhotra'],
        locations: ['New Delhi Central', 'DLF Cyber City', 'Seychelles', 'Dubai'],
        organizations: ['Financial Intelligence Unit', 'Cyber Crime & EOW', 'Apex Horizon Global FZE'],
        dates: ['2026-08-12'],
        events: ['FIR Filing', 'Offshore Fund Routing Initiation'],
        keywords: ['PMLA', 'Sec 154 CrPC', 'Shell Entity', 'Wire Transfer', 'Cryptographic Token']
      }
    },
    {
      id: 'DOC-88911',
      name: 'Forensic_Disk_Image_EnCase_E01_Verification_Report.pdf',
      caseId: 'CASE-2026-0187',
      caseName: 'State Grid Ransomware & SCADA Intrusion',
      department: 'Cyber Defense Cell',
      docType: 'Forensic Lab Report',
      fileSize: '18.6 MB',
      uploadDate: '2026-08-28 08:21:05',
      uploadedBy: 'Dr. Rajesh Sharma',
      classification: 'Restricted Evidence',
      hashStatus: 'MATCHED',
      sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      digitalSignatureStatus: 'VERIFIED',
      signatureId: 'SIG-ECDSA-P256-42B100EE',
      signer: 'Dr. Rajesh Sharma (Chief Forensic Examiner)',
      integrityScore: '100%',
      lastVerified: '2026-09-17 21:05:40',
      authorizedRoles: ['Administrator', 'Investigator', 'Forensic Analyst'],
      contentSnippet: 'CENTRAL DIGITAL FORENSICS EXAMINATION REPORT\nEvidence Seizure Tag #CR-2026-0187-E01\nTarget: Industrial Control Server (SCADA Gateway #4, Northern Grid Substation 14)\nPhysical Acquisition: Hardware Write-Blocker Tableau T8u.\nCalculated SHA-256 Digest: e3b0c442... | Bitstream integrity confirmed bit-for-bit. Malicious beaconing detected connecting to C2 node 194.165.16.88.',
      aiSummary: 'Digital bitstream acquisition of SCADA Gateway #4 proving unauthorized DarkSpectre ransomware implants and external C2 communication.',
      entities: {
        people: ['Dr. Rajesh Sharma', 'Neha Gupta'],
        locations: ['Northern Grid Substation 14', 'Central Forensics Lab'],
        organizations: ['Cyber Defense Cell', 'CERT-In'],
        dates: ['2026-08-28'],
        events: ['Bitstream Acquisition', 'SCADA Gateway Triage'],
        keywords: ['SCADA', 'Tableau T8u', 'E01 Bitstream', 'DarkSpectre', 'APT-29']
      }
    },
    {
      id: 'DOC-88912',
      name: 'High_Court_Writ_Order_Freezing_Assets_Annexure_B.pdf',
      caseId: 'CASE-2026-0142',
      caseName: 'Financial Fraud & Offshore Shell Laundering',
      department: 'Office of the Special Public Prosecutor',
      docType: 'Court Order',
      fileSize: '2.1 MB',
      uploadDate: '2026-08-16 14:15:30',
      uploadedBy: 'Adv. Ananya Deshmukh',
      classification: 'Highly Confidential',
      hashStatus: 'MATCHED',
      sha256: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
      digitalSignatureStatus: 'VERIFIED',
      signatureId: 'SIG-RSA-4096-7C12AA89',
      signer: 'Registrar General, High Court of Judicature',
      integrityScore: '100%',
      lastVerified: '2026-09-17 11:20:00',
      authorizedRoles: ['Administrator', 'Investigator', 'Legal Officer', 'Reviewer'],
      contentSnippet: 'IN THE HIGH COURT OF JUDICATURE AT NEW DELHI\nCRIMINAL MISCELLANEOUS JURISDICTION | ORDER ON PETITION NO. 4410/2026\nOrdered that respondent accounts registered under Ravi Kumar, Apex Horizon Global FZE, and Sterling Intermediaries Ltd, along with cold storage vaults at Nariman Point Mumbai, remain frozen under Sec 102 CrPC pending cyber forensic investigation.',
      aiSummary: 'Judicial restraint order freezing banking accounts, offshore credit facilities, and cryptocurrency vaults belonging to Ravi Kumar and corporate affiliates.',
      entities: {
        people: ['Ravi Kumar', 'Adv. Ananya Deshmukh'],
        locations: ['New Delhi High Court', 'Nariman Point Mumbai'],
        organizations: ['High Court of Judicature', 'Apex Horizon Global FZE', 'Sterling Intermediaries Ltd'],
        dates: ['2026-08-16'],
        events: ['Judicial Asset Freeze Order'],
        keywords: ['Sec 102 CrPC', 'Cold Storage Vault', 'Cryptocurrency Freeze', 'PMLA']
      }
    },
    {
      id: 'DOC-88913',
      name: 'Witness_Deposition_Confidential_Informant_Alpha.pdf',
      caseId: 'CASE-2026-0142',
      caseName: 'Financial Fraud & Offshore Shell Laundering',
      department: 'Anti-Corruption Bureau',
      docType: 'Witness Deposition',
      fileSize: '1.4 MB',
      uploadDate: '2026-08-15 17:34:12',
      uploadedBy: 'Inspector Vikram Malhotra',
      classification: 'Highly Confidential',
      hashStatus: 'MATCHED',
      sha256: 'a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e',
      digitalSignatureStatus: 'VERIFIED',
      signatureId: 'SIG-ECDSA-P256-9933D10A',
      signer: 'Metropolitan Magistrate (Court Room 4)',
      integrityScore: '100%',
      lastVerified: '2026-09-16 16:45:10',
      authorizedRoles: ['Administrator', 'Investigator', 'Legal Officer'],
      contentSnippet: 'DEPOSITION RECORDED IN CAMERA PURSUANT TO WITNESS PROTECTION DIRECTIVE\nStatement under Section 164 of the Criminal Procedure Code.\nSubject provides physical receipt evidence of illicit shell contracts signed at Penthouse B-4, DLF Cyber City Gurugram. Subject explicitly witnessed Ravi Kumar handing cash parcels and crypto ledger keys to courier Arun Singh for onward transit to Old Cantonment print shops.',
      aiSummary: 'Confidential eyewitness deposition establishing direct meetings between Ravi Kumar and Arun Singh at DLF Cyber City with ledger transfers.',
      entities: {
        people: ['Ravi Kumar', 'Arun Singh', 'Metropolitan Magistrate'],
        locations: ['DLF Cyber City', 'Old Cantonment', 'Gurugram'],
        organizations: ['Metropolitan Court 4', 'Cyber Crime Cell'],
        dates: ['2026-08-15'],
        events: ['In-Camera Deposition', 'Cash & Hardware Handover'],
        keywords: ['Sec 164 CrPC', 'Witness Protection', 'Penthouse B-4', 'Hardware Key']
      }
    },
    {
      id: 'DOC-88914',
      name: 'PCAP_Network_Exfiltration_Packet_Analysis_Log.pcap',
      caseId: 'CASE-2026-0187',
      caseName: 'State Grid Ransomware & SCADA Intrusion',
      department: 'Cyber Defense Cell',
      docType: 'Forensic PCAP / Telemetry',
      fileSize: '48.2 MB',
      uploadDate: '2026-08-28 06:12:44',
      uploadedBy: 'Dr. Rajesh Sharma',
      classification: 'Restricted Evidence',
      hashStatus: 'MATCHED',
      sha256: '2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae',
      digitalSignatureStatus: 'VERIFIED',
      signatureId: 'SIG-ECDSA-P256-CC221088',
      signer: 'Dr. Rajesh Sharma (Chief Forensic Examiner)',
      integrityScore: '100%',
      lastVerified: '2026-09-17 18:00:10',
      authorizedRoles: ['Administrator', 'Investigator', 'Forensic Analyst'],
      contentSnippet: 'PACKET CAPTURE & PROTOCOL ANALYSIS (TLS Handshake Interception)\nC2 Server: 194.165.16.88:8443\nThreat Actor Signature: APT-29 / DarkSpectre SCADA Exploit Kit\nExtracted payload: staged beaconing via port 443 over DNS tunneling. Exfiltration of grid relay switching telemetry initiated from IP 10.99.1.4.',
      aiSummary: 'Network packet capture confirming DNS-tunneled data exfiltration to foreign command-and-control server 194.165.16.88.',
      entities: {
        people: ['Dr. Rajesh Sharma'],
        locations: ['Northern Grid Substation 14'],
        organizations: ['Cyber Defense Cell'],
        dates: ['2026-08-28'],
        events: ['DNS Tunneling Exfiltration'],
        keywords: ['PCAP', 'TLS Handshake', 'C2 Server', 'DNS Tunneling', 'Port 8443']
      }
    },
    {
      id: 'DOC-88915',
      name: 'Subpoena_Notice_Telecom_CDR_TowerDump_Production.pdf',
      caseId: 'CASE-2026-0142',
      caseName: 'Financial Fraud & Offshore Shell Laundering',
      department: 'Special Investigation Team (SIT)',
      docType: 'Subpoena / Section 91 Notice',
      fileSize: '890 KB',
      uploadDate: '2026-08-14 11:05:22',
      uploadedBy: 'Adv. Ananya Deshmukh',
      classification: 'Confidential',
      hashStatus: 'MATCHED',
      sha256: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',
      digitalSignatureStatus: 'VERIFIED',
      signatureId: 'SIG-RSA-2048-5511A990',
      signer: 'Special Public Prosecutor Deshmukh',
      integrityScore: '100%',
      lastVerified: '2026-09-15 09:12:00',
      authorizedRoles: ['Administrator', 'Investigator', 'Legal Officer', 'Reviewer'],
      contentSnippet: 'NOTICE UNDER SECTION 91 CODE OF CRIMINAL PROCEDURE\nTo: Nodal Officers of Licensed Telecom Service Providers\nRequirement: Provide bit-verified raw Call Detail Records (CDR) and cell site sector azimuths for target mobile number +91-98101-44210 registered to Ravi Kumar, covering sector DLF-CYBER-SECT-4 between 01-Aug-2026 and 14-Aug-2026.',
      aiSummary: 'Statutory Section 91 CrPC notice commanding cellular tower dump production linking Ravi Kumar to DLF Cyber City.',
      entities: {
        people: ['Ravi Kumar', 'Adv. Ananya Deshmukh'],
        locations: ['DLF Cyber City', 'Gurugram'],
        organizations: ['Special Investigation Team', 'Bharti Telecom Nodal Office'],
        dates: ['2026-08-14'],
        events: ['Section 91 Summons Issuance'],
        keywords: ['Sec 91 CrPC', 'CDR', 'Tower Dump', 'IMSI', 'Sector Azimuth']
      }
    },

    // 7. Seized Phone Extraction Report
    {
      id: 'DOC-88916',
      name: 'Mobile_Extraction_Cellebrite_iPhone_Ravi_Kumar.pdf',
      caseId: 'CASE-2026-0142',
      caseName: 'Financial Fraud & Offshore Shell Laundering',
      department: 'Central Digital Forensics Lab',
      docType: 'Forensic Lab Report',
      fileSize: '14.8 MB',
      uploadDate: '2026-08-18 16:20:00',
      uploadedBy: 'Dr. Rajesh Sharma',
      classification: 'Restricted Evidence',
      hashStatus: 'MATCHED',
      sha256: '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945',
      digitalSignatureStatus: 'VERIFIED',
      signatureId: 'SIG-ECDSA-P256-42B100FE',
      signer: 'Dr. Rajesh Sharma (Chief Forensic Examiner)',
      integrityScore: '100%',
      lastVerified: '2026-09-18 10:15:30',
      authorizedRoles: ['Administrator', 'Investigator', 'Forensic Analyst'],
      contentSnippet: 'CELLEBRITE UFED PHYSICAL EXTRACTION REPORT\nDevice: Apple iPhone 15 Pro (IMEI: 354892019482104)\nOwner: Ravi Kumar | Seizure Tag #EVD-2026-082\nRecovered Artifacts: Signal encrypted chats with contact "Arun Hawala Delhi", coordinating ₹18 Cr hawala transit to Victoria Port SEZ Seychelles. Encrypted seed phrase backup recovered from hidden photo vault.',
      aiSummary: 'Forensic mobile extraction uncovering Signal chats between Ravi Kumar and Arun Singh coordinating ₹18 Cr transit to Seychelles.',
      entities: {
        people: ['Ravi Kumar', 'Arun Singh', 'Dr. Rajesh Sharma'],
        locations: ['DLF Cyber City', 'Victoria Port SEZ', 'Seychelles'],
        organizations: ['Central Digital Forensics Lab', 'Apex Horizon Global FZE'],
        dates: ['2026-08-18'],
        events: ['Physical Mobile Extraction', 'Encrypted Chat Recovery'],
        keywords: ['Cellebrite UFED', 'iPhone 15 Pro', 'Signal Chat', 'Hawala', 'Seed Phrase']
      }
    },

    // 8. SWIFT Wire Transfer Notice (Base for Tamper Detection Demo)
    {
      id: 'DOC-88917',
      name: 'Swift_Wire_Transfer_Seychelles_Offshore.pdf',
      caseId: 'CASE-2026-0142',
      caseName: 'Financial Fraud & Offshore Shell Laundering',
      department: 'Economic Offenses Wing',
      docType: 'Financial Record / Wire Audit',
      fileSize: '1.8 MB',
      uploadDate: '2026-08-19 11:45:00',
      uploadedBy: 'Inspector Vikram Malhotra',
      classification: 'Restricted Evidence',
      hashStatus: 'MATCHED', // Live status in verifier
      sha256: '7b28a9134ef0364c781190bcda12456e7890abcd12345678ef90123456789abc',
      digitalSignatureStatus: 'VERIFIED',
      signatureId: 'SIG-RSA-4096-9922EE01',
      signer: 'Reserve Bank of India Authorized Exchange Control',
      integrityScore: '100%',
      lastVerified: '2026-09-19 08:30:00',
      isTamperDemoTarget: true,
      tamperedSha256: '7b28f9134ef0364c781190bcda12456c7890abcd12345678ef90123456789a99',
      authorizedRoles: ['Administrator', 'Investigator', 'Legal Officer', 'Forensic Analyst'],
      contentSnippet: 'S.W.I.F.T. MT103 SINGLE CUSTOMER CREDIT TRANSFER CONFIRMATION\nSender Correspondent: State Bank of India Commercial Branch, Nariman Point Mumbai\nBeneficiary Institution: First Offshore Trust Bank, Victoria Port SEZ, Seychelles\nBeneficiary Customer: Apex Horizon Global FZE (Acct: SY-994102-USD)\nAmount: USD 24,500,000.00 (Equivalent INR 204.8 Crores)\nOrdering Customer: Ravi Kumar, Managing Trustee.',
      aiSummary: 'Primary wire transfer documentation recording USD 24.5M outbound transaction to Seychelles account SY-994102-USD.',
      entities: {
        people: ['Ravi Kumar'],
        locations: ['Nariman Point Mumbai', 'Victoria Port SEZ', 'Seychelles'],
        organizations: ['State Bank of India', 'First Offshore Trust Bank', 'Apex Horizon Global FZE'],
        dates: ['2026-08-19'],
        events: ['SWIFT Wire Transfer MT103'],
        keywords: ['SWIFT MT103', 'USD 24.5M', 'Offshore Trust', 'Seychelles SEZ']
      }
    },

    // 9. Exact Duplicate Evidence Demonstration Document
    {
      id: 'DOC-88918',
      name: 'FIR_2026_0142_Duplicate_Copy.pdf',
      caseId: 'CASE-2026-0142',
      caseName: 'Financial Fraud & Offshore Shell Laundering',
      department: 'Economic Offenses Wing',
      docType: 'FIR / Formal Complaint',
      fileSize: '4.2 MB',
      uploadDate: '2026-09-18 14:10:00',
      uploadedBy: 'Sub-Inspector R. Verma',
      classification: 'Restricted Evidence',
      hashStatus: 'MATCHED',
      sha256: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', // Identical to DOC-88910
      isDuplicate: true,
      duplicateOfId: 'DOC-88910',
      duplicateSimilarity: 100,
      digitalSignatureStatus: 'VERIFIED',
      signatureId: 'SIG-ECDSA-P256-8F4A992C',
      signer: 'Superintendent of Police (Cyber Crime)',
      integrityScore: '100%',
      lastVerified: '2026-09-18 14:10:00',
      authorizedRoles: ['Administrator', 'Investigator', 'Legal Officer'],
      contentSnippet: 'FIRST INFORMATION REPORT (Under Section 154 Cr.P.C.)\nDistrict: New Delhi Central | Police Station: Cyber Crime & EOW\nComplainant: Director of Financial Intelligence Unit\nAllegations: Non-existent vendor invoices routed through offshore intermediary accounts in Seychelles and Dubai. Forged banking credentials and unauthorized cryptographic token transfers by suspect Ravi Kumar and courier Arun Singh at DLF Cyber City.',
      aiSummary: 'Duplicate copy of First Information Report identical in byte payload to DOC-88910, uploaded by secondary intake officer.',
      entities: {
        people: ['Ravi Kumar', 'Arun Singh'],
        locations: ['New Delhi Central', 'DLF Cyber City'],
        organizations: ['Financial Intelligence Unit', 'Cyber Crime & EOW'],
        dates: ['2026-08-12'],
        events: ['Duplicate Intake'],
        keywords: ['Duplicate Record', 'Sec 154 CrPC']
      }
    },

    // 10. Near-Duplicate Evidence Demonstration Document (Content Overlap)
    {
      id: 'DOC-88919',
      name: 'Swift_Wire_Transfer_Seychelles_Offshore_Amended.pdf',
      caseId: 'CASE-2026-0142',
      caseName: 'Financial Fraud & Offshore Shell Laundering',
      department: 'Economic Offenses Wing',
      docType: 'Financial Record / Wire Audit',
      fileSize: '1.9 MB',
      uploadDate: '2026-09-18 15:30:00',
      uploadedBy: 'Adv. Ananya Deshmukh',
      classification: 'Restricted Evidence',
      hashStatus: 'MATCHED',
      sha256: 'a12b34c56d78e90f1234567890abcdef1234567890abcdef1234567890abcdef',
      isNearDuplicate: true,
      nearDuplicateOfId: 'DOC-88917',
      duplicateSimilarity: 88,
      digitalSignatureStatus: 'VERIFIED',
      signatureId: 'SIG-RSA-4096-9922EE02',
      signer: 'Reserve Bank of India Authorized Exchange Control',
      integrityScore: '100%',
      lastVerified: '2026-09-18 15:30:00',
      authorizedRoles: ['Administrator', 'Investigator', 'Legal Officer'],
      contentSnippet: 'S.W.I.F.T. MT103 SINGLE CUSTOMER CREDIT TRANSFER CONFIRMATION [AMENDED COPY]\nSender Correspondent: State Bank of India Commercial Branch, Nariman Point Mumbai\nBeneficiary Institution: First Offshore Trust Bank, Victoria Port SEZ, Seychelles\nBeneficiary Customer: Apex Horizon Global FZE (Acct: SY-994102-USD)\nAmount: USD 24,500,000.00 (Equivalent INR 204.8 Crores)\nOrdering Customer: Ravi Kumar, Managing Trustee.\nNotations: Addendum clause 4 appended regarding correspondent clearance fee.',
      aiSummary: 'Amended copy of SWIFT MT103 wire transfer containing 88% textual similarity with DOC-88917 with supplemental clause.',
      entities: {
        people: ['Ravi Kumar'],
        locations: ['Nariman Point Mumbai', 'Victoria Port SEZ', 'Seychelles'],
        organizations: ['State Bank of India', 'First Offshore Trust Bank', 'Apex Horizon Global FZE'],
        dates: ['2026-08-19'],
        events: ['Amended SWIFT Production'],
        keywords: ['Near-Duplicate', 'SWIFT MT103', 'Addendum']
      }
    },

    // 11. Land Title Forgery Syndicate Forensic Seal Analysis
    {
      id: 'DOC-88920',
      name: 'Spectral_Imaging_Counterfeit_Tehsildar_Stamps.pdf',
      caseId: 'CASE-2026-0214',
      caseName: 'Revenue Land Title Counterfeiting Syndicate',
      department: 'Anti-Corruption Bureau',
      docType: 'Forensic Lab Report',
      fileSize: '8.4 MB',
      uploadDate: '2026-09-05 14:00:00',
      uploadedBy: 'Dr. Rajesh Sharma',
      classification: 'Highly Confidential',
      hashStatus: 'MATCHED',
      sha256: '9988aabbccddeeff00112233445566778899aabbccddeeff0011223344556677',
      digitalSignatureStatus: 'VERIFIED',
      signatureId: 'SIG-ECDSA-P256-AC881100',
      signer: 'Dr. Rajesh Sharma (Chief Forensic Examiner)',
      integrityScore: '100%',
      lastVerified: '2026-09-17 12:00:00',
      authorizedRoles: ['Administrator', 'Investigator', 'Forensic Analyst'],
      contentSnippet: 'MULTI-SPECTRAL FORENSIC DOCUMENT ANALYSIS REPORT\nExhibit Item #ACB-2026-0214-E01\nExamined Material: Purported 1984 Cadastral Survey Land Title Grant & Tehsildar Seal.\nFindings: Raman spectroscopy indicates modern polyvinyl plasticizers in sealing ink formulated post-2018. Chemical composition disproves 1984 historical authenticity. Physical impression matches seized clandestine die press #EVD-2026-099.',
      aiSummary: 'Spectroscopic analysis proving revenue land title seals were created with modern inks fabricated post-2018, confirming syndicate forgery.',
      entities: {
        people: ['Dr. Rajesh Sharma', 'Alok Verma'],
        locations: ['Old Cantonment', 'District Revenue Record Room'],
        organizations: ['Anti-Corruption Bureau', 'Central Forensics Lab'],
        dates: ['2026-09-05'],
        events: ['Raman Spectroscopy Analysis', 'Counterfeit Stamp Identification'],
        keywords: ['Spectroscopy', 'Counterfeit Stamp', 'Polyvinyl Plasticizers', 'Tehsildar Seal']
      }
    },

    // 12. SCADA Intrusion Threat Actor Attribution Memo
    {
      id: 'DOC-88921',
      name: 'Threat_Intelligence_Attribution_DarkSpectre_Group.pdf',
      caseId: 'CASE-2026-0187',
      caseName: 'State Grid Ransomware & SCADA Intrusion',
      department: 'Cyber Defense Cell',
      docType: 'Forensic Intelligence Brief',
      fileSize: '5.6 MB',
      uploadDate: '2026-09-01 10:15:00',
      uploadedBy: 'Dr. Rajesh Sharma',
      classification: 'Restricted Evidence',
      hashStatus: 'MATCHED',
      sha256: '3344556677889900aabbccddeeff11223344556677889900aabbccddeeff1122',
      digitalSignatureStatus: 'VERIFIED',
      signatureId: 'SIG-ECDSA-P256-42B100FF',
      signer: 'Cyber Defense Operations Lead',
      integrityScore: '100%',
      lastVerified: '2026-09-17 14:20:00',
      authorizedRoles: ['Administrator', 'Investigator', 'Forensic Analyst'],
      contentSnippet: 'CYBER DEFENSE INTELLIGENCE ASSESSMENT\nThreat Actor: DarkSpectre (APT-29 Associated Threat Group)\nTactics, Techniques & Procedures (TTPs): MITRE ATT&CK T1059 (Command & Scripting Interpreter), T1071 (Application Layer Protocol over DNS), T1486 (Data Encrypted for Impact).\nAttribution: Hardcoded encryption key schedule matches threat campaigns observed targeting regional energy grids.',
      aiSummary: 'Threat intelligence dossier mapping the SCADA ransomware attack to APT-29 / DarkSpectre through MITRE ATT&CK TTP analysis.',
      entities: {
        people: ['Dr. Rajesh Sharma'],
        locations: ['Northern Grid Substation 14'],
        organizations: ['Cyber Defense Cell', 'CERT-In'],
        dates: ['2026-09-01'],
        events: ['Threat Actor Attribution'],
        keywords: ['MITRE ATT&CK', 'APT-29', 'DarkSpectre', 'Ransomware', 'SCADA']
      }
    }
  ],

  // Comprehensive Entity Knowledge Base for Evidence Intelligence
  entities: {
    people: [
      {
        id: 'ENT-P-01',
        name: 'Ravi Kumar',
        role: 'Primary Suspect / Shell Director',
        caseId: 'CASE-2026-0142',
        status: 'Under Active Surveillance',
        notes: 'Managing Trustee of Apex Horizon Global FZE; signatory on offshore accounts in Seychelles & Dubai.',
        phone: '+91-98101-44210',
        email: 'r.kumar@apexhorizon.ae',
        documents: ['DOC-88910', 'DOC-88912', 'DOC-88913', 'DOC-88915', 'DOC-88916', 'DOC-88917', 'DOC-88918', 'DOC-88919'],
        locations: ['DLF Cyber City', 'Nariman Point Mumbai', 'Victoria Port SEZ'],
        associatedEvidence: ['EVD-2026-081', 'EVD-2026-082']
      },
      {
        id: 'ENT-P-02',
        name: 'Arun Singh',
        role: 'Suspected Hawala Courier & Intermediary',
        caseId: 'CASE-2026-0142',
        status: 'Arrest Warrant Issued',
        notes: 'Facilitated physical movement of cash parcels and encrypted hardware tokens between Gurugram and Old Cantonment.',
        phone: '+91-98112-99014',
        email: 'arun.courier@protonmail.com',
        documents: ['DOC-88910', 'DOC-88913', 'DOC-88916', 'DOC-88918'],
        locations: ['DLF Cyber City', 'Old Cantonment'],
        associatedEvidence: ['EVD-2026-083']
      },
      {
        id: 'ENT-P-03',
        name: 'Inspector Vikram Malhotra',
        role: 'Lead Investigating Officer',
        caseId: 'CASE-2026-0142',
        status: 'Active Duty',
        notes: 'Cyber Crime Investigation Unit officer heading financial fraud operations.',
        badge: 'IN-CYBER-8842',
        documents: ['DOC-88910', 'DOC-88913', 'DOC-88917'],
        locations: ['New Delhi Central', 'DLF Cyber City']
      },
      {
        id: 'ENT-P-04',
        name: 'Dr. Rajesh Sharma',
        role: 'Chief Forensic Examiner',
        caseId: 'CASE-2026-0187',
        status: 'Active Duty',
        notes: 'Central Digital Forensics Lab director specializing in hardware write-blocking and SCADA reverse engineering.',
        documents: ['DOC-88911', 'DOC-88914', 'DOC-88916', 'DOC-88920', 'DOC-88921'],
        locations: ['Central Forensics Lab', 'Northern Grid Substation 14']
      },
      {
        id: 'ENT-P-05',
        name: 'Adv. Ananya Deshmukh',
        role: 'Special Public Prosecutor',
        caseId: 'CASE-2026-0142',
        status: 'Active Duty',
        notes: 'Appointed legal counsel for economic offenses prosecution and asset restraint proceedings.',
        documents: ['DOC-88912', 'DOC-88915', 'DOC-88919'],
        locations: ['New Delhi High Court']
      },
      {
        id: 'ENT-P-06',
        name: 'Alok Verma',
        role: 'Syndicate Print Shop Operator',
        caseId: 'CASE-2026-0214',
        status: 'Detained in Judicial Custody',
        notes: 'Clandestine seal maker operating out of Old Cantonment workshop.',
        documents: ['DOC-88920'],
        locations: ['Old Cantonment'],
        associatedEvidence: ['EVD-2026-099']
      }
    ],

    locations: [
      {
        id: 'ENT-L-01',
        name: 'DLF Cyber City',
        type: 'Suspect Office / Operational Base',
        caseId: 'CASE-2026-0142',
        address: 'Penthouse B-4, Building 10, DLF Cyber City, Gurugram, Haryana',
        notes: 'Primary staging site for shell entity documentation and suspect meetings.',
        coordinates: '28.4950° N, 77.0895° E',
        documents: ['DOC-88910', 'DOC-88913', 'DOC-88915', 'DOC-88916'],
        relatedEntities: ['Ravi Kumar', 'Arun Singh', 'EVD-2026-081']
      },
      {
        id: 'ENT-L-02',
        name: 'Nariman Point Mumbai',
        type: 'Commercial Banking Center',
        caseId: 'CASE-2026-0142',
        address: 'Express Towers, Nariman Point, Mumbai, Maharashtra',
        notes: 'Location of correspondent bank branch handling offshore telegraphic transfers.',
        coordinates: '18.9256° N, 72.8242° E',
        documents: ['DOC-88912', 'DOC-88917', 'DOC-88919'],
        relatedEntities: ['Ravi Kumar', 'State Bank of India']
      },
      {
        id: 'ENT-L-03',
        name: 'Victoria Port SEZ (Seychelles)',
        type: 'Offshore Financial Jurisdiction',
        caseId: 'CASE-2026-0142',
        address: 'Eden Island International Financial Centre, Victoria, Mahé, Seychelles',
        notes: 'Destination jurisdiction for ₹204.8 Cr wire transfers to shell account SY-994102.',
        coordinates: '4.6191° S, 55.4513° E',
        documents: ['DOC-88910', 'DOC-88916', 'DOC-88917', 'DOC-88919'],
        relatedEntities: ['Ravi Kumar', 'Apex Horizon Global FZE']
      },
      {
        id: 'ENT-L-04',
        name: 'Old Cantonment',
        type: 'Clandestine Production Workshop',
        caseId: 'CASE-2026-0214',
        address: 'Sadar Bazar Lane 4, Old Cantonment Area, Delhi',
        notes: 'Site where counterfeit revenue seals and forged cadastral survey maps were stamped.',
        coordinates: '28.6012° N, 77.1350° E',
        documents: ['DOC-88913', 'DOC-88920'],
        relatedEntities: ['Arun Singh', 'Alok Verma', 'EVD-2026-099']
      },
      {
        id: 'ENT-L-05',
        name: 'Northern Grid Substation 14',
        type: 'Critical Infrastructure Site',
        caseId: 'CASE-2026-0187',
        address: 'Regional Load Despatch Centre, Northern Power Grid',
        notes: 'SCADA gateway infected with DarkSpectre ransomware payload.',
        coordinates: '28.5355° N, 77.2410° E',
        documents: ['DOC-88911', 'DOC-88914', 'DOC-88921'],
        relatedEntities: ['Dr. Rajesh Sharma', 'EVD-2026-094']
      }
    ],

    organizations: [
      {
        id: 'ENT-O-01',
        name: 'Apex Horizon Global FZE',
        type: 'Foreign Shell Entity',
        jurisdiction: 'Ras Al Khaimah / Seychelles',
        notes: 'Front company with zero physical operations used to receive ₹204.8 Cr offshore funds.',
        documents: ['DOC-88910', 'DOC-88912', 'DOC-88916', 'DOC-88917']
      },
      {
        id: 'ENT-O-02',
        name: 'Sterling Intermediaries Ltd',
        type: 'Hawala Clearing Agent',
        jurisdiction: 'Dubai, UAE',
        notes: 'Intermediary entity facilitating cryptocurrency and fiat netting.',
        documents: ['DOC-88910', 'DOC-88912']
      },
      {
        id: 'ENT-O-03',
        name: 'Central Digital Forensics Lab',
        type: 'Government Forensics Laboratory',
        jurisdiction: 'New Delhi, India',
        notes: 'Accredited forensic facility conducting bitstream validation and signature verification.',
        documents: ['DOC-88911', 'DOC-88914', 'DOC-88916', 'DOC-88920']
      }
    ]
  },

  // Chronological Investigation Timeline Events
  timelineEvents: [
    {
      id: 'EVT-01',
      date: '2026-08-12',
      time: '09:30 IST',
      title: 'Formal FIR Registered under Sec 154 CrPC',
      caseId: 'CASE-2026-0142',
      description: 'First Information Report lodged by Financial Intelligence Unit citing ₹342 Cr diversion.',
      relatedPerson: 'Ravi Kumar',
      relatedLocation: 'New Delhi Central',
      relatedEvidence: 'EVD-2026-081',
      sourceDocId: 'DOC-88910',
      sourceDocName: 'FIR_2026_0142_First_Information_Report_Signed.pdf',
      category: 'Legal Action'
    },
    {
      id: 'EVT-02',
      date: '2026-08-14',
      time: '10:30 IST',
      title: 'Physical Evidence Seizure at DLF Cyber City',
      caseId: 'CASE-2026-0142',
      description: 'Inspector Malhotra seizes 2TB NVMe drive and mobile terminal from Penthouse B-4 under search memo.',
      relatedPerson: 'Ravi Kumar',
      relatedLocation: 'DLF Cyber City',
      relatedEvidence: 'EVD-2026-081',
      sourceDocId: 'DOC-88910',
      sourceDocName: 'FIR_2026_0142_First_Information_Report_Signed.pdf',
      category: 'Evidence Seizure'
    },
    {
      id: 'EVT-03',
      date: '2026-08-14',
      time: '14:00 IST',
      title: 'Cellular Tower Subpoena Served to Telecom Nodal Officer',
      caseId: 'CASE-2026-0142',
      description: 'Section 91 notice issued demanding raw BTS sector azimuth logs for DLF Cyber City.',
      relatedPerson: 'Ravi Kumar',
      relatedLocation: 'DLF Cyber City',
      relatedEvidence: 'EVD-2026-082',
      sourceDocId: 'DOC-88915',
      sourceDocName: 'Subpoena_Notice_Telecom_CDR_TowerDump_Production.pdf',
      category: 'Subpoena'
    },
    {
      id: 'EVT-04',
      date: '2026-08-15',
      time: '17:34 IST',
      title: 'Confidential Eyewitness Deposition Recorded in Camera',
      caseId: 'CASE-2026-0142',
      description: 'Informant Alpha provides sworn testimony detailing cash and crypto key exchange with Arun Singh.',
      relatedPerson: 'Arun Singh',
      relatedLocation: 'Old Cantonment',
      relatedEvidence: 'EVD-2026-083',
      sourceDocId: 'DOC-88913',
      sourceDocName: 'Witness_Deposition_Confidential_Informant_Alpha.pdf',
      category: 'Deposition'
    },
    {
      id: 'EVT-05',
      date: '2026-08-16',
      time: '14:15 IST',
      title: 'High Court Asset Freeze Order Promulgated',
      caseId: 'CASE-2026-0142',
      description: 'High Court grants emergency injunction freezing domestic accounts and offshore trust credit lines.',
      relatedPerson: 'Ravi Kumar',
      relatedLocation: 'Nariman Point Mumbai',
      relatedEvidence: 'EVD-2026-081',
      sourceDocId: 'DOC-88912',
      sourceDocName: 'High_Court_Writ_Order_Freezing_Assets_Annexure_B.pdf',
      category: 'Judicial Order'
    },
    {
      id: 'EVT-06',
      date: '2026-08-18',
      time: '16:20 IST',
      title: 'Cellebrite Extraction Recovers Signal Chat Logs',
      caseId: 'CASE-2026-0142',
      description: 'Dr. Sharma extracts encrypted communications between Ravi Kumar and Arun Singh directing hawala drops.',
      relatedPerson: 'Ravi Kumar',
      relatedLocation: 'DLF Cyber City',
      relatedEvidence: 'EVD-2026-082',
      sourceDocId: 'DOC-88916',
      sourceDocName: 'Mobile_Extraction_Cellebrite_iPhone_Ravi_Kumar.pdf',
      category: 'Forensic Lab'
    },
    {
      id: 'EVT-07',
      date: '2026-08-19',
      time: '11:45 IST',
      title: 'USD 24.5M SWIFT Wire Transfer Discovered',
      caseId: 'CASE-2026-0142',
      description: 'SWIFT MT103 confirmation acquired tracing telegraphic funds to Victoria Port SEZ, Seychelles.',
      relatedPerson: 'Ravi Kumar',
      relatedLocation: 'Victoria Port SEZ',
      relatedEvidence: 'EVD-2026-081',
      sourceDocId: 'DOC-88917',
      sourceDocName: 'Swift_Wire_Transfer_Seychelles_Offshore.pdf',
      category: 'Financial Record'
    },
    {
      id: 'EVT-08',
      date: '2026-08-28',
      time: '04:12 IST',
      title: 'SCADA Intrusion & Write-Blocker Bitstream Acquisition',
      caseId: 'CASE-2026-0187',
      description: 'Live RAM dump acquired from Substation 14 during active DarkSpectre ransomware beaconing.',
      relatedPerson: 'Dr. Rajesh Sharma',
      relatedLocation: 'Northern Grid Substation 14',
      relatedEvidence: 'EVD-2026-094',
      sourceDocId: 'DOC-88911',
      sourceDocName: 'Forensic_Disk_Image_EnCase_E01_Verification_Report.pdf',
      category: 'Cyber Triage'
    },
    {
      id: 'EVT-09',
      date: '2026-09-05',
      time: '14:00 IST',
      title: 'Multi-Spectral Spectroscopy Identifies Forged Revenue Stamp',
      caseId: 'CASE-2026-0214',
      description: 'Raman spectroscopy proves synthetic polyvinyl inks used in land title were manufactured post-2018.',
      relatedPerson: 'Alok Verma',
      relatedLocation: 'Old Cantonment',
      relatedEvidence: 'EVD-2026-099',
      sourceDocId: 'DOC-88920',
      sourceDocName: 'Spectral_Imaging_Counterfeit_Tehsildar_Stamps.pdf',
      category: 'Forensic Lab'
    }
  ],

  // Evidence Vault Items with full Chain of Custody
  evidenceItems: [
    {
      evidenceId: 'EVD-2026-081',
      name: 'SanDisk 2TB NVMe M.2 Drive (Seized from suspect desk)',
      type: 'Physical Digital Media',
      caseId: 'CASE-2026-0142',
      caseName: 'Financial Fraud & Offshore Shell Laundering',
      collectedBy: 'Inspector Vikram Malhotra',
      collectionDate: '2026-08-14 10:30 IST',
      seizureLocation: 'Penthouse B-4, DLF Cyber City, Gurugram',
      currentHolder: 'Dr. Rajesh Sharma (Central Forensic Lab)',
      integrityStatus: 'SEALED_VERIFIED',
      originalSha256: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
      physicalTag: 'EOW-DELHI-SEAL-9941-B',
      chainOfCustody: [
        {
          step: 'Collected',
          title: 'Physical Evidence Seizure',
          officer: 'Inspector Vikram Malhotra (Badge: IN-CYBER-8842)',
          timestamp: '2026-08-14 10:30 IST',
          location: 'DLF Cyber City, Gurugram',
          terminalIp: 'Field Mobile Unit #2 (10.14.0.12)',
          action: 'Item placed in anti-static Faraday bag and tamper-evident seal applied.',
          hashRef: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
        },
        {
          step: 'Uploaded & Sealed',
          title: 'Intake at Secure Digital Vault',
          officer: 'Sub-Inspector R. Verma (Intake Custodian)',
          timestamp: '2026-08-14 14:15 IST',
          location: 'Cyber Crime Police Station Evidence Locker',
          terminalIp: 'Station Terminal #1 (10.14.0.4)',
          action: 'Physical seal inspected intact. Chain of custody ledger updated and cryptographic intake barcode registered.',
          hashRef: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
        },
        {
          step: 'Hash Generated',
          title: 'Bitstream Image SHA-256 Hashed',
          officer: 'Dr. Rajesh Sharma (Chief Forensic Examiner)',
          timestamp: '2026-08-15 09:40 IST',
          location: 'Central Digital Forensics Lab - Chamber 3',
          terminalIp: 'Forensic Workstation #4 (10.14.8.10)',
          action: 'Raw bitstream image (E01) generated using write-blocking controller. Master SHA-256 digest calculated and signed.',
          hashRef: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
        }
      ]
    },
    {
      evidenceId: 'EVD-2026-082',
      name: 'Apple iPhone 15 Pro (IMEI: 354892019482104)',
      type: 'Mobile Cellular Device',
      caseId: 'CASE-2026-0142',
      caseName: 'Financial Fraud & Offshore Shell Laundering',
      collectedBy: 'Inspector Vikram Malhotra',
      collectionDate: '2026-08-14 10:45 IST',
      seizureLocation: 'DLF Cyber City, Gurugram',
      currentHolder: 'Central Digital Forensics Lab',
      integrityStatus: 'SEALED_VERIFIED',
      originalSha256: '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945',
      physicalTag: 'EOW-DELHI-SEAL-9942-M',
      chainOfCustody: [
        {
          step: 'Collected',
          title: 'Mobile Terminal Seizure',
          officer: 'Inspector Vikram Malhotra',
          timestamp: '2026-08-14 10:45 IST',
          location: 'DLF Cyber City',
          terminalIp: '10.14.0.12',
          action: 'Radio isolation in RF shielding pouch. Power preserved.',
          hashRef: '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945'
        }
      ]
    },
    {
      evidenceId: 'EVD-2026-094',
      name: 'SCADA Router Firmware Dump & Core Memory Image',
      type: 'Electronic Memory Dump',
      caseId: 'CASE-2026-0187',
      caseName: 'State Grid Ransomware & SCADA Intrusion',
      collectedBy: 'Dr. Rajesh Sharma',
      collectionDate: '2026-08-28 04:12 IST',
      seizureLocation: 'Substation Control Center 14, Northern Grid',
      currentHolder: 'Cyber Defense Cell',
      integrityStatus: 'SEALED_VERIFIED',
      originalSha256: '2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae',
      physicalTag: 'CERT-IN-SCADA-0187-A',
      chainOfCustody: [
        {
          step: 'Collected',
          title: 'Live RAM Acquisition',
          officer: 'Dr. Rajesh Sharma',
          timestamp: '2026-08-28 04:12 IST',
          location: 'Northern Grid Control Room',
          terminalIp: 'Forensic Field Lap Rig (10.99.1.4)',
          action: 'Volatile RAM acquired via LiME kernel module before system power shutdown.',
          hashRef: '2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae'
        }
      ]
    },
    {
      evidenceId: 'EVD-2026-099',
      name: 'Counterfeit Brass Tehsildar Seal & Die Press',
      type: 'Physical Forgery Instrument',
      caseId: 'CASE-2026-0214',
      caseName: 'Revenue Land Title Counterfeiting Syndicate',
      collectedBy: 'Inspector Vikram Malhotra',
      collectionDate: '2026-09-03 16:30 IST',
      seizureLocation: 'Old Cantonment Print Shop',
      currentHolder: 'Anti-Corruption Bureau Evidence Vault',
      integrityStatus: 'SEALED_VERIFIED',
      originalSha256: '9988aabbccddeeff00112233445566778899aabbccddeeff0011223344556677',
      physicalTag: 'ACB-DELHI-SEAL-0214-P',
      chainOfCustody: [
        {
          step: 'Collected',
          title: 'Physical Forgery Die Seizure',
          officer: 'Inspector Vikram Malhotra',
          timestamp: '2026-09-03 16:30 IST',
          location: 'Old Cantonment',
          terminalIp: '10.14.0.12',
          action: 'Clandestine die press seized and sealed with lead security tag.',
          hashRef: '9988aabbccddeeff00112233445566778899aabbccddeeff0011223344556677'
        }
      ]
    }
  ],

  // Forensic Audit Trail
  auditLogs: [
    {
      id: 'AUD-99190',
      timestamp: '2026-09-19 10:15:20',
      user: 'Inspector Vikram Malhotra',
      role: 'Investigator',
      action: 'AI_ASSISTANT_QUERY',
      document: 'Case Intelligence Index',
      docId: 'CASE-2026-0142',
      caseId: 'CASE-2026-0142',
      ipAddress: '10.14.0.12',
      status: 'SUCCESS',
      details: 'AI Query executed: "What evidence connects Ravi to Location A?" Citations generated.'
    },
    {
      id: 'AUD-99189',
      timestamp: '2026-09-19 09:50:11',
      user: 'Dr. Rajesh Sharma',
      role: 'Forensic Analyst',
      action: 'DUPLICATE_SCAN',
      document: 'Vault Repository',
      docId: 'ALL',
      caseId: 'CASE-2026-0142',
      ipAddress: '10.14.8.10',
      status: 'SUCCESS',
      details: 'Automated duplicate scan: Exact match detected between DOC-88918 and DOC-88910 (100% hash parity).'
    },
    {
      id: 'AUD-99188',
      timestamp: '2026-09-19 08:30:00',
      user: 'Inspector Vikram Malhotra',
      role: 'Investigator',
      action: 'INTEGRITY_VERIFY',
      document: 'Swift_Wire_Transfer_Seychelles_Offshore.pdf',
      docId: 'DOC-88917',
      caseId: 'CASE-2026-0142',
      ipAddress: '10.14.0.12',
      status: 'SUCCESS',
      details: 'Cryptographic SHA-256 integrity match verified (100% bitwise parity).'
    },
    {
      id: 'AUD-99182',
      timestamp: '2026-09-17 21:48:15',
      user: 'Inspector Vikram Malhotra',
      role: 'Investigator',
      action: 'VIEW',
      document: 'FIR_2026_0142_First_Information_Report_Signed.pdf',
      docId: 'DOC-88910',
      caseId: 'CASE-2026-0142',
      ipAddress: '10.14.0.12',
      status: 'SUCCESS',
      details: 'Document preview opened. Ephemeral access token authorized.'
    },
    {
      id: 'AUD-99181',
      timestamp: '2026-09-17 21:05:40',
      user: 'Dr. Rajesh Sharma',
      role: 'Forensic Analyst',
      action: 'VERIFY',
      document: 'Forensic_Disk_Image_EnCase_E01_Verification_Report.pdf',
      docId: 'DOC-88911',
      caseId: 'CASE-2026-0187',
      ipAddress: '10.14.8.10',
      status: 'SUCCESS',
      details: 'Cryptographic SHA-256 integrity match verified (100% match). Digital signature valid.'
    },
    {
      id: 'AUD-99175',
      timestamp: '2026-09-17 09:42:10',
      user: 'Inspector Vikram Malhotra',
      role: 'Investigator',
      action: 'UPLOAD',
      document: 'FIR_2026_0142_First_Information_Report_Signed.pdf',
      docId: 'DOC-88910',
      caseId: 'CASE-2026-0142',
      ipAddress: '10.14.0.12',
      status: 'SUCCESS',
      details: 'Encrypted with AES-256-GCM. SHA-256 hash anchored to audit registry.'
    }
  ],

  // Security Status & Health
  securityStatus: {
    systemHealth: 'SYSTEM_SECURE',
    encryptionStatus: 'Active (AES-256-GCM / FIPS 140-2 Validated)',
    authentication: 'Protected (Strict MFA / Hardware Tokens Enforced)',
    accessControl: 'Enabled (RBAC Strict Clearance Policy)',
    documentIntegrity: '99.98%',
    lastSecurityScan: '10 minutes ago',
    lastBackup: '12 minutes ago',
    activeSessions: 6,
    threatAlertsCount: 0,
    tamperIncidentsLogged: 0
  },

  // Notifications
  notifications: [
    {
      id: 'NOTIF-1',
      type: 'VERIFICATION',
      title: 'Digital Signature Authenticated',
      message: 'Forensic Lab Report DOC-88911 signed and verified with National PKI CA.',
      time: '18 minutes ago',
      unread: true,
      link: 'documents'
    },
    {
      id: 'NOTIF-2',
      type: 'AI_INSIGHT',
      title: 'New AI Evidence Correlation Detected',
      message: 'AI Assistant linked Ravi Kumar to 3 evidentiary exhibits at DLF Cyber City.',
      time: '45 minutes ago',
      unread: true,
      link: 'assistant'
    },
    {
      id: 'NOTIF-3',
      type: 'DUPLICATE',
      title: 'Duplicate Evidence Item Flagged',
      message: 'DOC-88918 flagged as exact cryptographic duplicate of DOC-88910.',
      time: '1 hour ago',
      unread: true,
      link: 'duplicates'
    },
    {
      id: 'NOTIF-4',
      type: 'SECURITY',
      title: 'Routine Integrity Scan Complete',
      message: 'All legal artifacts scanned across distributed storage. 0 unauthorized modifications detected.',
      time: '2 hours ago',
      unread: false,
      link: 'security'
    }
  ],

  // Helper Methods for AI & Entity Relationship Extraction
  getCaseEntities(caseId) {
    const people = this.entities.people.filter(p => p.caseId === caseId || !p.caseId);
    const locations = this.entities.locations.filter(l => l.caseId === caseId || !l.caseId);
    const orgs = this.entities.organizations;
    return { people, locations, organizations: orgs };
  },

  /**
   * Generates Graph Nodes and Links for the Evidence Relationship Map
   */
  getRelationshipGraph(caseId = 'CASE-2026-0142') {
    const nodes = [];
    const links = [];

    // Filter relevant records
    const people = this.entities.people.filter(p => !caseId || p.caseId === caseId);
    const locations = this.entities.locations.filter(l => !caseId || l.caseId === caseId);
    const evidence = this.evidenceItems.filter(e => !caseId || e.caseId === caseId);
    const docs = this.documents.filter(d => !caseId || d.caseId === caseId);
    const events = this.timelineEvents.filter(ev => !caseId || ev.caseId === caseId);
    const orgs = this.entities.organizations;

    // 1. Add Person Nodes
    people.forEach(p => {
      nodes.push({ id: p.id, label: p.name, category: 'PERSON', role: p.role, data: p });
    });

    // 2. Add Evidence Nodes
    evidence.forEach(e => {
      nodes.push({ id: e.evidenceId, label: e.name.split('(')[0].trim(), category: 'EVIDENCE', type: e.type, data: e });
    });

    // 3. Add Location Nodes
    locations.forEach(l => {
      nodes.push({ id: l.id, label: l.name, category: 'LOCATION', type: l.type, data: l });
    });

    // 4. Add Event Nodes
    events.slice(0, 5).forEach(ev => {
      nodes.push({ id: ev.id, label: ev.title.substring(0, 22) + '...', category: 'EVENT', date: ev.date, data: ev });
    });

    // 5. Add Document Nodes
    docs.slice(0, 6).forEach(d => {
      nodes.push({ id: d.id, label: d.name.substring(0, 20) + '...', category: 'DOCUMENT', docType: d.docType, data: d });
    });

    // 6. Add Organization Nodes
    orgs.slice(0, 2).forEach(o => {
      nodes.push({ id: o.id, label: o.name, category: 'ORGANIZATION', type: o.type, data: o });
    });

    // Connect Entities via Relationship Edges
    // Person -> Evidence
    links.push({ source: 'ENT-P-01', target: 'EVD-2026-081', label: 'associated with' });
    links.push({ source: 'ENT-P-01', target: 'EVD-2026-082', label: 'possesses device' });
    links.push({ source: 'ENT-P-02', target: 'EVD-2026-081', label: 'transferred' });

    // Person -> Location
    links.push({ source: 'ENT-P-01', target: 'ENT-L-01', label: 'present at' });
    links.push({ source: 'ENT-P-01', target: 'ENT-L-02', label: 'bank branch' });
    links.push({ source: 'ENT-P-02', target: 'ENT-L-01', label: 'met at' });
    links.push({ source: 'ENT-P-02', target: 'ENT-L-04', label: 'procured stamps' });

    // Evidence -> Document
    links.push({ source: 'EVD-2026-081', target: 'DOC-88910', label: 'referenced in' });
    links.push({ source: 'EVD-2026-082', target: 'DOC-88916', label: 'extracted in' });
    links.push({ source: 'DOC-88917', target: 'ENT-O-01', label: 'transferred to' });
    links.push({ source: 'ENT-P-01', target: 'ENT-O-01', label: 'directs' });

    // Location -> Event
    links.push({ source: 'ENT-L-01', target: 'EVT-02', label: 'site of' });
    links.push({ source: 'ENT-L-01', target: 'EVT-03', label: 'tower coverage' });
    links.push({ source: 'EVT-01', target: 'DOC-88910', label: 'anchored in' });
    links.push({ source: 'EVT-04', target: 'DOC-88913', label: 'recorded in' });

    return { nodes, links };
  },

  /**
   * Universal Multi-Entity Search across Documents, People, Evidence, Locations, Events, and Case IDs
   */
  searchAllEntities(query) {
    if (!query || !query.trim()) return null;
    const q = query.trim().toLowerCase();

    const matchedCases = this.cases.filter(c => c.id.toLowerCase().includes(q) || c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q));
    const matchedDocs = this.documents.filter(d => d.name.toLowerCase().includes(q) || d.id.toLowerCase().includes(q) || (d.contentSnippet && d.contentSnippet.toLowerCase().includes(q)) || d.sha256.toLowerCase().includes(q));
    const matchedPeople = this.entities.people.filter(p => p.name.toLowerCase().includes(q) || p.role.toLowerCase().includes(q) || (p.notes && p.notes.toLowerCase().includes(q)));
    const matchedLocations = this.entities.locations.filter(l => l.name.toLowerCase().includes(q) || l.type.toLowerCase().includes(q) || l.address.toLowerCase().includes(q));
    const matchedEvidence = this.evidenceItems.filter(e => e.name.toLowerCase().includes(q) || e.evidenceId.toLowerCase().includes(q) || e.seizureLocation.toLowerCase().includes(q));
    const matchedEvents = this.timelineEvents.filter(ev => ev.title.toLowerCase().includes(q) || ev.description.toLowerCase().includes(q) || ev.relatedPerson.toLowerCase().includes(q));

    const totalCount = matchedCases.length + matchedDocs.length + matchedPeople.length + matchedLocations.length + matchedEvidence.length + matchedEvents.length;

    return {
      query,
      totalCount,
      cases: matchedCases,
      documents: matchedDocs,
      people: matchedPeople,
      locations: matchedLocations,
      evidence: matchedEvidence,
      events: matchedEvents
    };
  },

  // Helper State Modifiers
  addAuditLog(entry) {
    const logItem = {
      id: `AUD-${Math.floor(10000 + Math.random() * 90000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: this.currentUser.name,
      role: this.currentUser.role,
      ipAddress: '10.14.0.12',
      status: 'SUCCESS',
      ...entry
    };
    this.auditLogs.unshift(logItem);
    return logItem;
  },

  addDocument(doc) {
    this.documents.unshift(doc);
    this.addAuditLog({
      action: 'UPLOAD',
      document: doc.name,
      docId: doc.id,
      caseId: doc.caseId,
      details: `Document uploaded. Classification: ${doc.classification}. SHA-256: ${doc.sha256.substring(0, 16)}...`
    });
    this.notifications.unshift({
      id: `NOTIF-${Date.now()}`,
      type: 'UPLOAD',
      title: 'Secure Document Uploaded',
      message: `${doc.name} assigned to ${doc.caseId}`,
      time: 'Just now',
      unread: true,
      link: 'documents'
    });
  },

  switchUserRole(roleName) {
    const matchedUser = this.users.find(u => u.role === roleName) || this.users[0];
    this.currentUser = {
      ...matchedUser,
      avatar: matchedUser.name.split(' ').map(n => n[0]).join('').substring(0, 2),
      isAuthenticated: true
    };
    this.addAuditLog({
      action: 'LOGIN',
      document: 'N/A',
      docId: '-',
      caseId: '-',
      details: `Role switched to ${roleName} (${matchedUser.name}).`
    });
  }
};
