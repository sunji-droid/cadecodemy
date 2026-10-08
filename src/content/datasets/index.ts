export interface SyntheticDataset {
  id: string;
  name: string;
  description: string;
  recordCount: number;
  columns: { name: string; type: string; description: string }[];
  previewRows: Record<string, string | number>[];
}

export const SYNTHETIC_DATASETS: SyntheticDataset[] = [
  {
    id: 'district_clinics',
    name: 'District Health Facilities Register',
    description: 'Operational tracking dataset recording population denominators, immunisation targets, and doses administered across primary facilities in Kweneng District.',
    recordCount: 30,
    columns: [
      { name: 'facility_id', type: 'INTEGER', description: 'Primary numeric facility identifier' },
      { name: 'facility_name', type: 'TEXT', description: 'Official name of the clinic or health post' },
      { name: 'sub_district', type: 'TEXT', description: 'Administrative division (e.g. Molepolole, Thamaga)' },
      { name: 'target_children', type: 'INTEGER', description: 'Target cohort denominator based on catchment census' },
      { name: 'doses_given', type: 'INTEGER', description: 'Validated vaccine doses recorded during campaign SIA' },
      { name: 'reconciled_status', type: 'TEXT', description: 'Cross-verification status against facility registry' }
    ],
    previewRows: [
      { facility_id: 1, facility_name: 'Molepolole Main Clinic', sub_district: 'Central', target_children: 1500, doses_given: 1280, reconciled_status: 'Verified' },
      { facility_id: 2, facility_name: 'Thamaga Primary Clinic', sub_district: 'South', target_children: 800, doses_given: 620, reconciled_status: 'Verified' },
      { facility_id: 3, facility_name: 'Lentsweletau Clinic', sub_district: 'North', target_children: 450, doses_given: 410, reconciled_status: 'Verified' },
      { facility_id: 4, facility_name: 'Mogoditshane Health Post', sub_district: 'East', target_children: 2200, doses_given: 1690, reconciled_status: 'Pending Review' },
      { facility_id: 5, facility_name: 'Kopong Clinic', sub_district: 'East', target_children: 920, doses_given: 885, reconciled_status: 'Verified' }
    ]
  },
  {
    id: 'student_evaluations',
    name: 'Student Technical Assessments',
    description: 'Curated examination table with deliberate data-quality challenges: outliers, casing variance, and null scores designed for data cleaning drills.',
    recordCount: 150,
    columns: [
      { name: 'student_id', type: 'INTEGER', description: 'Unique candidate tracking number' },
      { name: 'track_code', type: 'TEXT', description: 'Curriculum code (PYTHON, SQL, R, JS, BASH)' },
      { name: 'raw_score', type: 'INTEGER', description: 'Assessment score (0-100 scale, with uncleaned negative values)' },
      { name: 'completion_time_sec', type: 'INTEGER', description: 'Elapsed duration in seconds' },
      { name: 'attempt_number', type: 'INTEGER', description: 'Number of attempts prior to passing' }
    ],
    previewRows: [
      { student_id: 1001, track_code: 'PYTHON', raw_score: 94, completion_time_sec: 1420, attempt_number: 1 },
      { student_id: 1002, track_code: 'SQL', raw_score: 88, completion_time_sec: 1105, attempt_number: 1 },
      { student_id: 1003, track_code: 'python', raw_score: 72, completion_time_sec: 1890, attempt_number: 2 },
      { student_id: 1004, track_code: 'R', raw_score: 85, completion_time_sec: 1340, attempt_number: 1 },
      { student_id: 1005, track_code: 'JS', raw_score: -1, completion_time_sec: 320, attempt_number: 3 }
    ]
  },
  {
    id: 'retail_inventory',
    name: 'Hardware & Supply Inventory',
    description: 'Relational transaction log containing order volumes, unit pricing, dates, and warehouse quantities for joins and aggregations.',
    recordCount: 400,
    columns: [
      { name: 'order_id', type: 'INTEGER', description: 'Order invoice identifier' },
      { name: 'item_description', type: 'TEXT', description: 'Commercial product name' },
      { name: 'units_ordered', type: 'INTEGER', description: 'Quantity dispatched' },
      { name: 'unit_price_usd', type: 'REAL', description: 'Price per unit' },
      { name: 'order_date', type: 'TEXT', description: 'ISO 8601 transaction date' }
    ],
    previewRows: [
      { order_id: 501, item_description: 'Mechanical Keyboard (Tenkeyless)', units_ordered: 3, unit_price_usd: 85.00, order_date: '2026-03-01' },
      { order_id: 502, item_description: '4K IPS Monitor 27-inch', units_ordered: 1, unit_price_usd: 340.00, order_date: '2026-03-02' },
      { order_id: 503, item_description: 'Braided USB-C Cable 2m', units_ordered: 10, unit_price_usd: 8.50, order_date: '2026-03-03' },
      { order_id: 504, item_description: 'Ergonomic Vertical Mouse', units_ordered: 2, unit_price_usd: 48.00, order_date: '2026-03-03' }
    ]
  }
];
