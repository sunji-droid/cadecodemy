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
    }
  ]
};
