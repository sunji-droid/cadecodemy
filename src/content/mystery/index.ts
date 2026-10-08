export interface MysteryLogEntry {
  id: string;
  query: string;
  notes: string;
  timestamp: string;
}

export interface MysteryCase {
  id: string;
  title: string;
  incidentLocation: string;
  incidentDate: string;
  synopsis: string;
  clues: string[];
  tables: {
    name: string;
    description: string;
    columns: string[];
    sampleQuery: string;
  }[];
  solution: {
    culprit: string;
    destinationClinic: string;
    accompliceDriver: string;
  };
}

export const MOLEPOLOLE_MYSTERY: MysteryCase = {
  id: 'coldchain-theft-molepolole',
  title: 'The Great Molepolole Cold-Chain Mystery',
  incidentLocation: 'Molepolole District Central Vaccine Depot',
  incidentDate: '14 August 2024 at 02:15 AM',
  synopsis: 'At 02:15 AM, the remote IoT telemetry alarm at Molepolole Central Vaccine Depot triggered. 500 vials of oral polio vaccine (OPV) were missing from cold room #2. Security cameras caught a suspect fleeing in a refrigerated bakkie (truck). A phone call was intercepted from inside the facility 10 minutes prior to departure. Authorities need your SQL forensics skills to inspect the database, track the call logs, cross-reference gate security badges, identify the culprit, determine the destination clinic where the illegal delivery was diverted, and unmask the accomplice.',
  clues: [
    'Depot security gate logs recorded badge swipes between 01:45 AM and 02:30 AM.',
    'Depot staff registry contains full names, role descriptions, and badge IDs.',
    'Telecommunication tower logs captured phone calls placed from the depot cell tower with duration < 60 seconds around 02:05 AM.',
    'Refrigerated vehicle dispatch manifests show route numbers and destination clinics for all authorized drivers.'
  ],
  tables: [
    {
      name: 'depot_staff',
      description: 'Directory of authorized depot personnel and clinical drivers.',
      columns: ['staff_id', 'full_name', 'role', 'phone_number', 'badge_id'],
      sampleQuery: 'SELECT * FROM depot_staff LIMIT 5;'
    },
    {
      name: 'security_gate_logs',
      description: 'RFID turnstile access entries and vehicle gate departures.',
      columns: ['log_id', 'badge_id', 'event_type', 'timestamp'],
      sampleQuery: 'SELECT * FROM security_gate_logs WHERE event_type = "exit" ORDER BY timestamp;'
    },
    {
      name: 'phone_calls',
      description: 'Cell tower records logged on the depot perimeter mast.',
      columns: ['call_id', 'caller_number', 'receiver_number', 'duration_seconds', 'timestamp'],
      sampleQuery: 'SELECT * FROM phone_calls WHERE duration_seconds < 60;'
    },
    {
      name: 'vehicle_manifests',
      description: 'Bakkie dispatch log detailing vehicle registration and designated drop-offs.',
      columns: ['manifest_id', 'driver_name', 'vehicle_plate', 'destination_clinic', 'cargo'],
      sampleQuery: 'SELECT * FROM vehicle_manifests;'
    }
  ],
  solution: {
    culprit: 'Kgosiemang Tau',
    destinationClinic: 'Thamaga Sub-District Clinic',
    accompliceDriver: 'Mpho Molefe'
  }
};
