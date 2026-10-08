export interface CapstoneStage {
  id: string;
  stageNumber: number;
  title: string;
  scenario: string;
  starterCode: string;
  solutionCriteria: string[];
  expectedKeywords: string[];
}

export interface TrackCapstone {
  trackId: string;
  title: string;
  credentialLevel: string;
  fieldScenario: string;
  stages: CapstoneStage[];
}

export const CAPSTONES: TrackCapstone[] = [
  {
    trackId: 'python',
    title: 'Epidemiological Coverage & Discrepancy Pipeline',
    credentialLevel: 'Master Capstone · Python',
    fieldScenario: 'Based on genuine primary health campaign monitoring across 30 facilities. You must ingest clinical logs, calculate target denominators, identify underperforming facilities (< 80% coverage), and produce an automated redeployment summary dictionary.',
    stages: [
      {
        id: 'py_cap_1',
        stageNumber: 1,
        title: 'Phase 1: Ingestion & Indicator Calculation',
        scenario: 'Define a function calculate_metrics(target, doses) that returns a dictionary with "coverage_pct" rounded to 1 decimal place and "status". Status must be "Optimal" if >= 95.0, "Moderate" if >= 80.0, and "Priority Action" otherwise.',
        starterCode: '# Build calculate_metrics(target, doses)\ndef calculate_metrics(target, doses):\n    # Write logic here\n    pass\n\n# Test with 1500 target, 1280 doses\nresult = calculate_metrics(1500, 1280)\nprint(result)',
        solutionCriteria: [
          'Function calculate_metrics exists and takes two parameters',
          'Calculates (doses / target) * 100 with 1 decimal float precision',
          'Correctly categorizes "Optimal", "Moderate", and "Priority Action"'
        ],
        expectedKeywords: ['def calculate_metrics', 'return', 'coverage_pct', 'status']
      },
      {
        id: 'py_cap_2',
        stageNumber: 2,
        title: 'Phase 2: District Facility Batch Audit',
        scenario: 'Filter a batch list of facility dictionaries and extract only the names of facilities flagged for "Priority Action" redeployment.',
        starterCode: 'facilities = [\n  {"name": "Molepolole Main", "target": 1500, "doses": 1280},\n  {"name": "Thamaga Primary", "target": 800, "doses": 620},\n  {"name": "Lentsweletau", "target": 450, "doses": 280}\n]\n\npriority_list = []\nfor f in facilities:\n    cov = (f["doses"] / f["target"]) * 100\n    if cov < 80.0:\n        priority_list.append(f["name"])\n\nprint("Redeployment Required:", priority_list)',
        solutionCriteria: [
          'Calculates coverage for each dictionary entry',
          'Identifies facilities with coverage below 80.0%',
          'Appends underperforming facility names to priority_list'
        ],
        expectedKeywords: ['priority_list', 'append', 'for', 'if']
      }
    ]
  },
  {
    trackId: 'sql',
    title: 'Relational Multi-Tier Campaign Reporting Pipeline',
    credentialLevel: 'Master Capstone · SQL',
    fieldScenario: 'Audit multi-source district health registries against inventory dispatches using CTEs, aggregate groups, and window function rankings to find supply gaps.',
    stages: [
      {
        id: 'sql_cap_1',
        stageNumber: 1,
        title: 'Phase 1: Common Table Expression Coverage Summary',
        scenario: 'Write a CTE named FacilityCoverage that computes the coverage percentage per clinic, then query the top 3 highest volume sites.',
        starterCode: 'WITH FacilityCoverage AS (\n  SELECT facility_name, district, doses_administered,\n         ROUND((CAST(doses_administered AS REAL) / target_pop) * 100, 1) AS coverage_rate\n  FROM clinics\n)\nSELECT facility_name, coverage_rate\nFROM FacilityCoverage\nORDER BY coverage_rate DESC\nLIMIT 3;',
        solutionCriteria: [
          'Uses WITH FacilityCoverage AS (...) CTE syntax',
          'Computes coverage_rate using CAST and ROUND',
          'Orders by coverage_rate descending with LIMIT 3'
        ],
        expectedKeywords: ['WITH', 'FacilityCoverage', 'AS', 'SELECT', 'ORDER BY']
      }
    ]
  }
];
