export interface CareerTrackItem {
  id: string;
  title: string;
  category: 'Portfolio Blueprint' | 'Technical Screening' | 'System Design' | 'Behavioral Leadership';
  salaryBenchmark: string;
  description: string;
  keyCompetencies: string[];
  deliverableTemplate: string;
  rubric: string[];
}

export interface InterviewQuestion {
  id: string;
  role: string;
  question: string;
  context: string;
  evaluatorLookout: string[];
  sampleModelAnswer: string;
}

export const CAREER_BLUEPRINTS: CareerTrackItem[] = [
  {
    id: 'bp_health_data_pipeline',
    title: 'Production Health Data Pipeline & Cold-Chain Telemetry',
    category: 'Portfolio Blueprint',
    salaryBenchmark: '$115,000 - $145,000 / yr (Data Engineer / Systems Architect)',
    description: 'Transform raw epidemiological logs into a robust automated warehouse pipeline. Architect idempotent daily ingestion, data sanitization, schema migration, and alerting.',
    keyCompetencies: [
      'Idempotent ingestion pipelines with SQLite / Postgres',
      'Data sanitization with Python and pandas',
      'Cold-chain anomaly threshold detection (> 8.0°C alerts)',
      'Automated schema rollback tests'
    ],
    deliverableTemplate: `# Production Health Telemetry Warehouse Ingestion\n# Blueprint by Kabo Merapelo Onamile\n\nimport sqlite3\nimport datetime\n\ndef run_pipeline(source_logs, target_db_conn):\n    """Ingests, deduplicates, and classifies telemetry payloads."""\n    cleaned = []\n    for entry in source_logs:\n        if entry.get("temp_celsius") is not None:\n            status = "NORMAL"\n            if entry["temp_celsius"] < 2.0 or entry["temp_celsius"] > 8.0:\n                status = "BREACH"\n            cleaned.append((\n                entry["facility_id"],\n                entry["temp_celsius"],\n                status,\n                datetime.datetime.utcnow().isoformat()\n            ))\n    \n    cursor = target_db_conn.cursor()\n    cursor.executemany(\n        "INSERT INTO coldchain_telemetry (facility_id, temp_celsius, status, logged_at) VALUES (?, ?, ?, ?)",\n        cleaned\n    )\n    target_db_conn.commit()\n    return len(cleaned)\n`,
    rubric: [
      'Defense against missing attributes with defensive dictionary access',
      'Parameterized SQL execution preventing injection attacks',
      'Accurate classification of temperature threshold breaches'
    ]
  },
  {
    id: 'bp_distributed_system_design',
    title: 'High-Concurrency Vaccine Registry System Design',
    category: 'System Design',
    salaryBenchmark: '$135,000 - $180,000 / yr (Staff Software Engineer)',
    description: 'Design the end-to-end distributed architecture for a national clinical campaign registering 50,000 simultaneous vaccine doses per minute across offline clinics.',
    keyCompetencies: [
      'Offline-first synchronization with IndexedDB and CRDTs',
      'Distributed idempotency keys on payment / registration events',
      'Read-heavy database replication with read-replicas and caching',
      'Disaster recovery and zero-data-loss log streaming'
    ],
    deliverableTemplate: `Architecture Specification: Offline-First Campaign Registry\n1. Edge Layer: ServiceWorker + PWA client-side SQLite wasm for zero-network clinic offline entry.\n2. Sync Protocol: Event-sourced ledger with Lamport timestamps and client-generated UUID idempotency keys.\n3. Gateway: API gateway routing sync batches with rate-limiting and JWT token authentication.\n4. Database: Primary-replica PostgreSQL cluster with write-ahead log (WAL) shipping to S3.\n5. Cache: Redis cluster for instantaneous national quota and target population lookups.`,
    rubric: [
      'Explicit handling of intermittent network connectivity at edge clinics',
      'Resolution of concurrent update conflicts via deterministic ordering',
      'Data sovereignty and cryptographic audit logs'
    ]
  }
];

export const TECHNICAL_INTERVIEWS: InterviewQuestion[] = [
  {
    id: 'int_1',
    role: 'Senior Data Engineer / Full-Stack Engineer',
    question: 'How do you prevent SQL injection vulnerabilities and what happens at the database driver level during prepared statements?',
    context: 'Assesses depth of knowledge regarding database drivers, query compilation, and application security.',
    evaluatorLookout: [
      'Explains separation of query AST parsing from literal data parameter binding',
      'Mentions pre-compiled execution plans in relational engines (Postgres, SQLite)',
      'Identifies why simple string sanitization or regex filtering is inferior to parameterized queries'
    ],
    sampleModelAnswer: 'Prepared statements separate the query structure from the data payloads. When a database engine receives a prepared statement (e.g. SELECT * FROM users WHERE id = ?), the SQL parser compiles and optimizes the Abstract Syntax Tree (AST) into an execution plan first. When values are subsequently supplied, they are treated strictly as literal scalar values rather than executable SQL grammar, making injection syntactically impossible.'
  },
  {
    id: 'int_2',
    role: 'Systems Architect / Lead Developer',
    question: 'Explain the difference between optimistic and pessimistic locking in database transactions, and when you would choose each.',
    context: 'Evaluates architectural judgment under high concurrency environments.',
    evaluatorLookout: [
      'Clear definition of pessimistic locks (e.g. SELECT FOR UPDATE, blocking read/writes)',
      'Clear definition of optimistic locks (version columns, check-and-set at commit)',
      'Trade-off assessment: low contention favors optimistic locking, high collision risks favor pessimistic locking'
    ],
    sampleModelAnswer: 'Pessimistic locking assumes conflicts are frequent and locks database rows immediately upon access, blocking concurrent transactions until committed. Optimistic locking assumes conflicts are rare; records are read with a version number without blocking, and at commit time, the update verifies the version has not incremented. Optimistic locking provides superior throughput in low-contention systems, while pessimistic locking is preferred in high-contention inventory reservation environments.'
  }
];
