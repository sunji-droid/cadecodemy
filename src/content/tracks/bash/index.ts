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
          instruction: 'Type the command that prints your current working directory (pwd) and run it.',
          initialCode: '# Type the command to print your working directory below\n',
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
          instruction: 'Use the cat command to display the contents of the file welcome.txt.',
          initialCode: '# Type the cat command targeting welcome.txt\n',
          solutionCode: 'cat welcome.txt',
          hints: ['Type cat welcome.txt', 'Click Run Code']
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
      codeSnippet: 'echo "Campaign Log: Day 1 Complete" > summary.txt\ncat summary.txt',
      exercises: [
        {
          id: 'bash_ex_03',
          instruction: 'Print the string "Molepolole Clinic" to the terminal using the echo command.',
          initialCode: '# Print "Molepolole Clinic" using echo\n',
          solutionCode: 'echo "Molepolole Clinic"',
          hints: ['Write echo "Molepolole Clinic"', 'Click Run Code']
        }
      ],
      quiz: [
        {
          id: 'bash_q_07',
          question: 'What is the difference between > and >> in Bash?',
          options: ['> overwrites the destination file; >> appends to the end', '>> deletes the file', '> is for folders only', 'They are synonyms'],
          correctIndex: 0,
          explanation: '> replaces existing file contents, while >> appends new lines to the end.'
        },
        {
          id: 'bash_q_08',
          question: 'Where does standard error (stderr) route by default if not redirected?',
          options: ['It is saved to /tmp/err', 'It prints to the terminal console', 'It is discarded silently', 'It halts the CPU'],
          correctIndex: 1,
          explanation: 'stderr defaults to the terminal console screen unless redirected with 2>.'
        },
        {
          id: 'bash_q_09',
          question: 'How do you redirect both stdout and stderr to the same file?',
          options: ['cmd > file 2>&1 or cmd &> file', 'cmd 1+2> file', 'cmd >> file 2', 'cmd |& file'],
          correctIndex: 0,
          explanation: '&> or > file 2>&1 combines standard output and error into one stream.'
        }
      ],
      whyItMatters: 'Cron jobs and pipeline scripts write logs directly to dated files using redirection operators.',
      estimatedMinutes: 7
    },
    {
      id: 'bash_04',
      trackId: 'bash',
      order: 4,
      stageNumber: 3,
      title: 'Pattern Matching with grep',
      objective: 'Search through log files and filter specific facility records.',
      explanation: 'grep scans input line by line and prints lines matching a pattern. Use flags like -i for case-insensitive search and -c to count matching lines.',
      codeSnippet: 'grep "Kweneng" /home/learner/summary.txt',
      exercises: [
        {
          id: 'bash_ex_04',
          instruction: 'Use grep to find lines containing "Molepolole" inside facilities.txt.',
          initialCode: '# Search for "Molepolole" in facilities.txt using grep\n',
          solutionCode: 'grep "Molepolole" facilities.txt',
          hints: ['Write grep "Molepolole" facilities.txt', 'Click Run Code']
        }
      ],
      quiz: [
        {
          id: 'bash_q_10',
          question: 'Which flag makes grep case-insensitive?',
          options: ['-c', '-i', '-v', '-s'],
          correctIndex: 1,
          explanation: '-i ignores upper and lower case distinctions during matching.'
        },
        {
          id: 'bash_q_11',
          question: 'Which grep flag inverts matches (returns lines that do NOT match)?',
          options: ['-v', '-n', '-r', '-x'],
          correctIndex: 0,
          explanation: '-v outputs non-matching lines, useful for removing comments and blanks.'
        },
        {
          id: 'bash_q_12',
          question: 'What does grep -c report?',
          options: ['Byte offset', 'Line count of matching occurrences', 'Colorized output', 'File checksum'],
          correctIndex: 1,
          explanation: '-c prints the total count of lines matching the given pattern.'
        }
      ],
      whyItMatters: 'Finding error codes and specific clinic identifiers in gigabytes of server logs is done in seconds with grep.',
      estimatedMinutes: 8
    },
    {
      id: 'bash_05',
      trackId: 'bash',
      order: 5,
      stageNumber: 4,
      title: 'Automated Scripts and Exit Codes',
      objective: 'Write executable bash scripts with conditionals and check status codes.',
      explanation: 'Every shell command returns an exit status code between 0 and 255. A code of 0 signals success; any non-zero value indicates an error. Check $? to inspect the exit code.',
      codeSnippet: 'echo "Checking database..."\nexit_code=$?\necho "Status: $exit_code"',
      exercises: [
        {
          id: 'bash_ex_05',
          instruction: 'Print the string "Batch Complete" using echo.',
          initialCode: '# Print "Batch Complete" using echo\n',
          solutionCode: 'echo "Batch Complete"',
          hints: ['Write echo "Batch Complete"', 'Click Run Code']
        }
      ],
      quiz: [
        {
          id: 'bash_q_13',
          question: 'What special variable holds the exit status of the most recently executed command?',
          options: ['$0', '$#', '$?', '$$'],
          correctIndex: 2,
          explanation: '$? stores the exit status integer of the previous foreground command.'
        },
        {
          id: 'bash_q_14',
          question: 'What exit code represents successful completion without error in POSIX shells?',
          options: ['1', '0', '-1', '200'],
          correctIndex: 1,
          explanation: 'Exit code 0 indicates clean success in Unix and POSIX operating systems.'
        },
        {
          id: 'bash_q_15',
          question: 'What is the purpose of "set -e" at the top of a bash script?',
          options: ['Echoes every line', 'Exits immediately if any command returns a non-zero error', 'Enables root access', 'Speeds up execution'],
          correctIndex: 1,
          explanation: 'set -e causes the script to abort on the first command failure, preventing cascade bugs.'
        }
      ],
      whyItMatters: 'Continuous integration (CI) workflows like GitHub Actions pass or fail entirely based on the bash exit status 0.',
      estimatedMinutes: 8
    }
  ]
};
