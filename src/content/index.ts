import { pythonTrack } from './tracks/python';
import { sqlTrack } from './tracks/sql';
import { javascriptTrack } from './tracks/javascript';
import { bashTrack } from './tracks/bash';
import { rTrack } from './tracks/r';
import { Track, SupportingCourse } from '../types';

export const ALL_TRACKS: Track[] = [
  pythonTrack,
  sqlTrack,
  javascriptTrack,
  bashTrack,
  rTrack
];

export const SUPPORTING_COURSES: SupportingCourse[] = [
  {
    id: 'statistics',
    title: 'Statistics for Data Work',
    description: 'Descriptive metrics, distributions, confidence intervals, hypothesis testing, and regression analysis.',
    iconName: 'TrendingUp',
    lessonsCount: 6,
    whyItMatters: 'Sound inference ensures reported coverage rates and intervention effects reflect real population realities rather than random noise.',
    modules: [
      {
        title: 'Central Tendency & Dispersion',
        description: 'Mean, median, mode, variance, and standard deviation calculations on skewed health indicator tables.',
        keyTakeaways: ['Median resists extreme outliers better than the sample mean', 'Variance measures squared deviations from the average']
      },
      {
        title: 'Confidence Intervals & Hypothesis Tests',
        description: 'Constructing 95% confidence intervals and interpreting p-values without claiming absolute certainty.',
        keyTakeaways: ['A p-value measures probability under the null hypothesis', 'Confidence intervals provide operational precision ranges']
      }
    ]
  },
  {
    id: 'data-cleaning',
    title: 'Data Cleaning and Validation',
    description: 'Missing values, deduplication, type coercion, cross-source reconciliation, and data quality audits.',
    iconName: 'Filter',
    lessonsCount: 6,
    whyItMatters: 'Untreated anomalies, missing facility counts, and silent type mismatches produce misleading indicators.',
    modules: [
      {
        title: 'Missingness & Imputation Strategies',
        description: 'Categorizing missing data patterns (MCAR, MAR, MNAR) and applying appropriate documentation.',
        keyTakeaways: ['Never silently drop missing values without documenting loss percentages', 'Explicit validation gates catch corrupted records early']
      },
      {
        title: 'Multi-Source Reconciliation',
        description: 'Matching DHIS2 aggregate registers with electronic client medical logs to identify discrepancies.',
        keyTakeaways: ['Audit logs track source discrepancies', 'Deterministic primary keys prevent duplicate counting']
      }
    ]
  },
  {
    id: 'visualisation',
    title: 'Data Visualisation',
    description: 'Chart selection, perceptual colour theory, dashboard hierarchy, and misleading-chart forensics.',
    iconName: 'BarChart2',
    lessonsCount: 5,
    whyItMatters: 'Decision-makers act on visual charts; misleading scales or illegible palettes lead to poor policy interventions.',
    modules: [
      {
        title: 'Encoding & Perception',
        description: 'Mapping numbers to position, length, area, and color with clear visual hierarchy.',
        keyTakeaways: ['Length and position on a common scale enable the most accurate comparisons', 'Do not truncate the zero baseline on bar charts']
      }
    ]
  },
  {
    id: 'git-github',
    title: 'Git and GitHub',
    description: 'Commits, atomic branching, pull requests, merge conflict resolution, and reproducible documentation.',
    iconName: 'GitBranch',
    lessonsCount: 5,
    whyItMatters: 'Version control guarantees auditability and allows teams to collaborate without overwriting live systems.',
    modules: [
      {
        title: 'Atomic Commits & Branch Workflows',
        description: 'Writing descriptive commit headers and isolating new features in dedicated git branches.',
        keyTakeaways: ['Commits should represent a single logical change', 'Pull requests enable structured peer review']
      }
    ]
  },
  {
    id: 'excel',
    title: 'Excel for Analysis',
    description: 'PivotTables, XLOOKUP, INDEX-MATCH, Power Query concepts, conditional formatting, and KPI dashboards.',
    iconName: 'Sheet',
    lessonsCount: 6,
    whyItMatters: 'Excel remains standard for quick operational audits and district data distribution in health departments.',
    modules: [
      {
        title: 'Advanced Lookups & Dynamic Formulas',
        description: 'Using XLOOKUP and dynamic array formulas to reconcile facility name variations.',
        keyTakeaways: ['XLOOKUP defaults to exact match and does not break on column insertions', 'Array formulas process entire columns simultaneously']
      }
    ]
  },
  {
    id: 'ml-intro',
    title: 'Intro to Machine Learning',
    description: 'Train/test splits, baseline models, overfitting, classification metrics, and responsible model governance.',
    iconName: 'Cpu',
    lessonsCount: 5,
    whyItMatters: 'Predictive models must be evaluated against clear baselines to avoid deploying inaccurate systems into production.',
    modules: [
      {
        title: 'Model Evaluation & Baselines',
        description: 'Understanding precision, recall, F1 score, and ROC curves on imbalanced diagnostic datasets.',
        keyTakeaways: ['Accuracy is misleading on highly skewed datasets', 'Always evaluate on an untouched holdout test set']
      }
    ]
  },
  {
    id: 'ethics',
    title: 'Data Ethics and Privacy',
    description: 'Informed consent, anonymisation, small-cell suppression, algorithmic bias, and responsible health reporting.',
    iconName: 'ShieldAlert',
    lessonsCount: 5,
    whyItMatters: 'Patient privacy and ethical stewardship are legal and moral obligations in health information systems.',
    modules: [
      {
        title: 'De-identification & Small Cell Rules',
        description: 'Applying k-anonymity and cell suppression when cell frequencies fall below 5 in public releases.',
        keyTakeaways: ['Small cell numbers can re-identify rare medical diagnoses', 'Aggregation protects participant identity']
      }
    ]
  },
  {
    id: 'public-health-data',
    title: 'Public Health Data Basics',
    description: 'Health indicators, target denominators, vaccination coverage calculation, DHIS2 workflows, and RDQA assessments.',
    iconName: 'Activity',
    lessonsCount: 6,
    whyItMatters: 'Built from real operational experience in district disease surveillance and Supplementary Immunisation Activities.',
    modules: [
      {
        title: 'Denominators & Campaign Coverage Analytics',
        description: 'Comparing official population censuses against operational target tallies to evaluate vaccination campaigns.',
        keyTakeaways: ['Target population estimates require clear denominator methodology', 'Daily situation reports inform mid-campaign staff redeployment']
      }
    ]
  }
];
