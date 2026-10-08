import { Track } from '../../../types';

export const bashTrack: Track = {
  id: 'bash',
  title: 'Bash & Command-Line Operations',
  badge: 'Bash',
  description: 'Operate the terminal shell: files, streams, pipes, grep, sed, and automated pipeline scripts.',
  accentColor: '#34D399',
  iconName: 'Terminal',
  lessons: [
    {
      id: 'bash_01',
      trackId: 'bash',
      order: 1,
      stageNumber: 1,
      title: 'Directory Navigation: pwd and ls',
      objective: 'Inspect your working location and list directory contents.',
      explanation: 'The shell command pwd prints the absolute path of your current directory. ls outputs the files and folders located inside.',
      codeSnippet: 'pwd\nls',
      exercises: [
        {
          id: 'bash_ex_01',
          instruction: 'Run pwd to output the current working directory.',
          initialCode: 'pwd',
          solutionCode: 'pwd',
          hints: ['Type pwd', 'Press Run']
        }
      ],
      quiz: [
        {
          id: 'bash_q_01',
          question: 'What does "pwd" stand for in Unix shells?',
          options: ['Print working directory', 'Password setup', 'Process window daemon', 'Path with defaults'],
          correctIndex: 0,
          explanation: 'pwd prints the working directory path to stdout.'
        },
        {
          id: 'bash_q_02',
          question: 'Which flag with ls shows hidden dotfiles?',
          options: ['-h', '-a', '-l', '-all'],
          correctIndex: 1,
          explanation: 'ls -a reveals all entries, including filenames starting with a period.'
        },
        {
          id: 'bash_q_03',
          question: 'What special symbol represents the parent directory in Unix paths?',
          options: ['.', '..', '~', '/'],
          correctIndex: 1,
          explanation: 'Two dots (..) refers to the parent directory.'
        }
      ],
      whyItMatters: 'System scripts run on Linux servers; knowing your current path prevents overwriting system files.',
      estimatedMinutes: 4
    },
    {
      id: 'bash_02',
      trackId: 'bash',
      order: 2,
      stageNumber: 1,
      title: 'Reading Files and Inspection: cat and head',
      objective: 'Examine raw text logs and CSV data streams from the command line.',
      explanation: 'cat outputs the entire contents of a file to standard output. head displays the first ten lines, helpful for quick inspection of large tables.',
      codeSnippet: 'cat /home/learner/welcome.txt',
      exercises: [
        {
          id: 'bash_ex_02',
          instruction: 'Display the welcome note using cat welcome.txt.',
          initialCode: 'cat welcome.txt',
          solutionCode: 'cat welcome.txt',
          hints: ['Run cat welcome.txt']
        }
      ],
      quiz: [
        {
          id: 'bash_q_04',
          question: 'Which command prints only the last lines of a log file?',
          options: ['end', 'bottom', 'tail', 'back'],
          correctIndex: 2,
          explanation: 'tail prints the final lines of a file (default 10).'
        },
        {
          id: 'bash_q_05',
          question: 'What does the pipe operator (|) do in Bash?',
          options: ['Runs commands in parallel', 'Passes standard output of one command into standard input of another', 'Creates a backup file', 'Separates variables'],
          correctIndex: 1,
          explanation: 'The pipe (|) connects the output stream of the left process to the input stream of the right process.'
        },
        {
          id: 'bash_q_06',
          question: 'What command searches for pattern lines inside text files?',
          options: ['find', 'grep', 'locate', 'scan'],
          correctIndex: 1,
          explanation: 'grep scans files for lines matching regular expressions or literal strings.'
        }
      ],
      whyItMatters: 'Inspecting server logs and verifying pipeline output without opening heavy desktop editors saves critical time.',
      estimatedMinutes: 5
    },
    {
      id: 'bash_03',
      trackId: 'bash',
      order: 3,
      stageNumber: 2,
      title: 'Output Redirection and Pipes (> and |)',
      objective: 'Direct output streams into files and chain commands together.',
      explanation: 'By default, shell commands write to standard output. The single angle bracket (>) redirects output into a file, overwriting existing contents. The double bracket (>>) appends output.',
      codeSnippet: 'echo "Campaign Log: Day 1 Complete" > /home/learner/summary.txt\ncat /home/learner/summary.txt',
      exercises: [
        {
          id: 'bash_ex_03',
          instruction: 'Echo "Molepolole Clinic" and verify the output.',
          initialCode: 'echo "Molepolole Clinic"',
          solutionCode: 'echo "Molepolole Clinic"',
          hints: ['Run echo "Molepolole Clinic"']
        }
      ],
      quiz: [
        {
          id: 'bash_q_07',
          question: 'What is the difference between > and >> in Bash?',
          options: ['> overwrites the file; >> appends to the end of the file', '> appends; >> overwrites', '> is for input; >> is for output', 'There is no difference'],
          correctIndex: 0,
          explanation: '> creates or truncates the target file, while >> preserves existing lines and appends to the bottom.'
        },
        {
          id: 'bash_q_08',
          question: 'Where does standard error (stderr) go by default in Bash?',
          options: ['To a temporary file', 'To the terminal display alongside stdout', 'It is discarded silently', 'To /dev/null'],
          correctIndex: 1,
          explanation: 'Unless redirected via 2>, standard error outputs straight to the terminal screen.'
        },
        {
          id: 'bash_q_09',
          question: 'How do you discard all output completely in Unix?',
          options: ['redirect to /dev/null', 'use the delete keyword', 'redirect to /bin/trash', 'pipe to clear'],
          correctIndex: 0,
          explanation: 'Directing streams to /dev/null discards written bytes.'
        }
      ],
      whyItMatters: 'Automated nightly cron jobs pipe clinic report tables into dated log files for audit tracking.',
      estimatedMinutes: 6
    },
    {
      id: 'bash_04',
      trackId: 'bash',
      order: 4,
      stageNumber: 2,
      title: 'Pattern Filtering with grep and wc',
      objective: 'Filter matching lines from datasets and count record rows.',
      explanation: 'grep searches input for lines matching patterns. wc -l counts the number of lines, providing quick row counts for data validation.',
      codeSnippet: 'cat /home/learner/data/survey.csv',
      exercises: [
        {
          id: 'bash_ex_04',
          instruction: 'Inspect the survey records with cat /home/learner/data/survey.csv.',
          initialCode: 'cat /home/learner/data/survey.csv',
          solutionCode: 'cat /home/learner/data/survey.csv',
          hints: ['Run cat /home/learner/data/survey.csv']
        }
      ],
      quiz: [
        {
          id: 'bash_q_10',
          question: 'Which flag makes grep case-insensitive?',
          options: ['-i', '-c', '-v', '-s'],
          correctIndex: 0,
          explanation: 'The -i flag matches text regardless of lowercase or uppercase differences.'
        },
        {
          id: 'bash_q_11',
          question: 'What does grep -v do?',
          options: ['Shows verbose debugging', 'Inverts the match, returning lines that do NOT match the pattern', 'Validates syntax', 'Prints the grep version'],
          correctIndex: 1,
          explanation: 'Inverted matching (-v) excludes rows containing the pattern, useful for dropping headers.'
        },
        {
          id: 'bash_q_12',
          question: 'What does wc -l report?',
          options: ['Word count', 'Line count', 'Character count', 'Longest line length'],
          correctIndex: 1,
          explanation: 'wc -l counts newline characters to calculate the line count.'
        }
      ],
      whyItMatters: 'Command-line counting quickly validates whether exported CSV row counts match expected DHIS2 register totals.',
      estimatedMinutes: 6
    },
    {
      id: 'bash_05',
      trackId: 'bash',
      order: 5,
      stageNumber: 3,
      title: 'Bash Scripting: Variables, Arguments, and Loops',
      objective: 'Write reproducible shell scripts with command-line arguments.',
      explanation: 'Shell scripts automate routine terminal operations. Arguments are accessed using $1, $2, etc., and variables are assigned without spaces around the equals sign.',
      codeSnippet: 'cat /home/learner/scripts/backup.sh',
      exercises: [
        {
          id: 'bash_ex_05',
          instruction: 'Inspect the backup script using cat /home/learner/scripts/backup.sh.',
          initialCode: 'cat /home/learner/scripts/backup.sh',
          solutionCode: 'cat /home/learner/scripts/backup.sh',
          hints: ['Run cat /home/learner/scripts/backup.sh']
        }
      ],
      quiz: [
        {
          id: 'bash_q_13',
          question: 'What is the shebang line placed at the very top of a Bash script?',
          options: ['#!/bin/bash', '// bash', '/* bash */', '#start bash'],
          correctIndex: 0,
          explanation: '#!/bin/bash informs the Unix kernel which interpreter to invoke.'
        },
        {
          id: 'bash_q_14',
          question: 'Can you have spaces around the equals sign when assigning variables in Bash?',
          options: ['Yes', 'No, spaces cause a command-not-found error', 'Only for strings', 'Only in zsh'],
          correctIndex: 1,
          explanation: 'Bash treats tokens preceding spaces as commands; variable assignment must be name=value.'
        },
        {
          id: 'bash_q_15',
          question: 'Which variable represents the exit code of the most recently executed command in Bash?',
          options: ['$0', '$?', '$$', '$!'],
          correctIndex: 1,
          explanation: '$? stores the numeric return code (0 indicates success; non-zero indicates failure).'
        }
      ],
      whyItMatters: 'Automated CI/CD pipelines and backup routines run as executable bash scripts with error-code checks.',
      estimatedMinutes: 7
    }
  ]
};
