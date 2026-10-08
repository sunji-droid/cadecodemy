import { Track } from '../../../types';

export const rTrack: Track = {
  id: 'r',
  title: 'R & Statistical Computing',
  badge: 'R',
  description: 'Statistical analysis and reproducible reporting: vectors, data frames, dplyr transformations, and ggplot2 figures.',
  accentColor: '#38BDF8',
  iconName: 'BarChart',
  lessons: [
    {
      id: 'r_01',
      trackId: 'r',
      order: 1,
      stageNumber: 1,
      title: 'Vectors and the Combine Function c()',
      objective: 'Create atomic vectors to hold numeric observations.',
      explanation: 'In R, vectors are the basic building block. The combine function c() groups individual numbers into a 1D vector sequence.',
      codeSnippet: 'doses <- c(1280, 620, 410, 1690)\nprint(doses)',
      exercises: [
        {
          id: 'r_ex_01',
          instruction: 'Create a vector of exam scores: c(85, 92, 78) and print it.',
          initialCode: 'scores <- c(85, 92, 78)\nprint(scores)',
          solutionCode: 'scores <- c(85, 92, 78)\nprint(scores)',
          hints: ['Use scores <- c(85, 92, 78)', 'Call print(scores)']
        }
      ],
      quiz: [
        {
          id: 'r_q_01',
          question: 'What is the standard assignment operator in idiomatic R code?',
          options: ['=', '<-', ':=', '->'],
          correctIndex: 1,
          explanation: 'The left-pointing arrow (<-) is standard R convention for object assignment.'
        },
        {
          id: 'r_q_02',
          question: 'Are R vectors 0-indexed or 1-indexed?',
          options: ['0-indexed', '1-indexed', 'Indifferent', 'Negative-indexed'],
          correctIndex: 1,
          explanation: 'R indexing starts at 1, unlike Python or JavaScript which start at 0.'
        },
        {
          id: 'r_q_03',
          question: 'What function returns basic summary statistics of a numeric vector in R?',
          options: ['stats()', 'summary()', 'describe()', 'overview()'],
          correctIndex: 1,
          explanation: 'summary() provides min, 1st quartile, median, mean, 3rd quartile, and max.'
        }
      ],
      whyItMatters: 'Epidemiological incidence numbers and survey samples are analyzed using vectorized operations in R.',
      estimatedMinutes: 5
    },
    {
      id: 'r_02',
      trackId: 'r',
      order: 2,
      stageNumber: 1,
      title: 'Data Frames and Column Indexing ($)',
      objective: 'Structure tabular health indicators in 2-dimensional data frames.',
      explanation: 'Data frames arrange heterogeneous columns into tabular structures. Columns are accessed by name using the dollar sign ($) operator.',
      codeSnippet: 'clinics_df <- data.frame(\n  facility = c("Molepolole", "Thamaga", "Lentsweletau"),\n  target = c(1500, 800, 450)\n)\nprint(clinics_df$facility)',
      exercises: [
        {
          id: 'r_ex_02',
          instruction: 'Extract the target column from clinics_df and print it.',
          initialCode: 'clinics_df <- data.frame(facility = c("Thamaga", "Kopong"), target = c(800, 920))\nprint(clinics_df$target)',
          solutionCode: 'clinics_df <- data.frame(facility = c("Thamaga", "Kopong"), target = c(800, 920))\nprint(clinics_df$target)',
          hints: ['Use clinics_df$target', 'Call print()']
        }
      ],
      quiz: [
        {
          id: 'r_q_04',
          question: 'How do you extract a column named "doses" from a data frame named df in R?',
          options: ['df[doses]', 'df.doses', 'df$doses', 'df->doses'],
          correctIndex: 2,
          explanation: 'The dollar operator (df$column) selects columns by name as vectors.'
        },
        {
          id: 'r_q_05',
          question: 'What does the str() function do in R?',
          options: ['Converts an object to a string', 'Displays the compact internal structure and datatypes of an object', 'Finds string patterns', 'Strips whitespace'],
          correctIndex: 1,
          explanation: 'str() reveals the structure, dimensions, and column classes of data frames.'
        },
        {
          id: 'r_q_06',
          question: 'Can different columns in an R data frame hold different data types?',
          options: ['Yes, each column can have a distinct class (e.g. numeric, character, factor)', 'No, all cells in a data frame must share the same type', 'Only in tibbles', 'Only with numbers'],
          correctIndex: 0,
          explanation: 'Data frames are lists of equal-length vectors, allowing each column to have its own data type.'
        }
      ],
      whyItMatters: 'Epidemiological case records and clinic registries import directly into R data frames for statistical modeling.',
      estimatedMinutes: 6
    },
    {
      id: 'r_03',
      trackId: 'r',
      order: 3,
      stageNumber: 2,
      title: 'Tidy Data and Transformations: dplyr Workflows',
      objective: 'Filter rows and compute new calculated columns using the pipe operator.',
      explanation: 'The tidyverse philosophy uses piped verbs to clean and transform datasets. Common verbs include filter() for rows and mutate() for creating new columns.',
      codeSnippet: '# Piped transformation flow\ndoses <- c(1280, 620, 410, 1690)\nmean_doses <- mean(doses)\nprint(mean_doses)',
      exercises: [
        {
          id: 'r_ex_03',
          instruction: 'Compute the mean of scores <- c(80, 90, 70) and print it.',
          initialCode: 'scores <- c(80, 90, 70)\nprint(mean(scores))',
          solutionCode: 'scores <- c(80, 90, 70)\nprint(mean(scores))',
          hints: ['Call mean(scores)', 'Print the result']
        }
      ],
      quiz: [
        {
          id: 'r_q_07',
          question: 'Which dplyr verb creates new columns or modifies existing ones?',
          options: ['select()', 'filter()', 'mutate()', 'arrange()'],
          correctIndex: 2,
          explanation: 'mutate() calculates and appends new columns while preserving existing rows.'
        },
        {
          id: 'r_q_08',
          question: 'What does the native pipe operator (|>) do in modern R (4.1+)?',
          options: ['Passes the left-hand expression as the first argument to the right-hand function', 'Performs a bitwise OR', 'Creates a vector', 'Sorts values'],
          correctIndex: 0,
          explanation: 'The pipe (|>) passes left-side results forward into right-side functions.'
        },
        {
          id: 'r_q_09',
          question: 'Which function groups data for grouped summaries in dplyr?',
          options: ['group_by()', 'aggregate()', 'split()', 'cluster()'],
          correctIndex: 0,
          explanation: 'group_by() prepares data frames for grouped summaries like summarize(mean = mean(x)).'
        }
      ],
      whyItMatters: 'Transforming raw district records into publication-ready coverage tables requires clean piped transformations.',
      estimatedMinutes: 8
    },
    {
      id: 'r_04',
      trackId: 'r',
      order: 4,
      stageNumber: 2,
      title: 'Statistical Visualisation: The Grammar of Graphics',
      objective: 'Construct visual distributions using aesthetics and geometric layers.',
      explanation: 'ggplot2 maps dataset variables to visual marks (geometries) like points, bars, and lines through aesthetic mappings (aes). Layers are composed using the plus (+) operator.',
      codeSnippet: '# Scatter aesthetic concept\nx <- c(1, 2, 3, 4)\ny <- c(10, 25, 30, 45)\nsummary(y)',
      exercises: [
        {
          id: 'r_ex_04',
          instruction: 'Examine summary statistics of y with summary(y).',
          initialCode: 'y <- c(10, 25, 30, 45)\nsummary(y)',
          solutionCode: 'y <- c(10, 25, 30, 45)\nsummary(y)',
          hints: ['Run summary(y)']
        }
      ],
      quiz: [
        {
          id: 'r_q_10',
          question: 'What operator combines layers in ggplot2?',
          options: ['The plus sign (+)', 'The pipe operator (%>%)', 'The comma (,)', 'The arrow (<-)'],
          correctIndex: 0,
          explanation: 'ggplot2 uses the plus sign (+) to append geometric layers, scales, and themes to a plot object.'
        },
        {
          id: 'r_q_11',
          question: 'Which aesthetic maps a numeric variable to horizontal position?',
          options: ['y', 'x', 'color', 'size'],
          correctIndex: 1,
          explanation: 'aes(x = ...) assigns variables to the horizontal axis.'
        },
        {
          id: 'r_q_12',
          question: 'What geometric layer creates a histogram in ggplot2?',
          options: ['geom_bar()', 'geom_histogram()', 'geom_dist()', 'geom_density_rect()'],
          correctIndex: 1,
          explanation: 'geom_histogram() bins continuous data into frequency bars.'
        }
      ],
      whyItMatters: 'Producing publication-grade epidemic curves and district coverage distributions requires ggplot2.',
      estimatedMinutes: 8
    },
    {
      id: 'r_05',
      trackId: 'r',
      order: 5,
      stageNumber: 3,
      title: 'Hypothesis Testing: t-tests and Chi-Square',
      objective: 'Evaluate differences between group means with statistical significance tests.',
      explanation: 'Inferential statistics test whether observed group differences could have occurred by chance under the null hypothesis. t.test() evaluates numeric group means, while chisq.test() evaluates categorical frequency tables.',
      codeSnippet: 'group_a <- c(82, 85, 90, 88)\ngroup_b <- c(70, 75, 72, 78)\n# Two-sample comparison\nmean(group_a) - mean(group_b)',
      exercises: [
        {
          id: 'r_ex_05',
          instruction: 'Compute the difference between mean(group_a) and mean(group_b).',
          initialCode: 'group_a <- c(82, 85, 90, 88)\ngroup_b <- c(70, 75, 72, 78)\nprint(mean(group_a) - mean(group_b))',
          solutionCode: 'group_a <- c(82, 85, 90, 88)\ngroup_b <- c(70, 75, 72, 78)\nprint(mean(group_a) - mean(group_b))',
          hints: ['Subtract mean(group_b) from mean(group_a)', 'Print the result']
        }
      ],
      quiz: [
        {
          id: 'r_q_13',
          question: 'What does a p-value less than 0.05 traditionally indicate in hypothesis testing?',
          options: ['The null hypothesis is proven true', 'Statistically significant evidence against the null hypothesis at the 5% level', 'The sample has zero measurement error', 'The data is completely normal'],
          correctIndex: 1,
          explanation: 'A p-value below alpha provides empirical evidence against the null hypothesis assumption.'
        },
        {
          id: 'r_q_14',
          question: 'Which test evaluates independence between two categorical variables in R?',
          options: ['t.test()', 'chisq.test()', 'cor.test()', 'var.test()'],
          correctIndex: 1,
          explanation: 'chisq.test() performs chi-squared contingency table tests of independence.'
        },
        {
          id: 'r_q_15',
          question: 'What function fits linear regression models in R?',
          options: ['linear()', 'regress()', 'lm()', 'fit()'],
          correctIndex: 2,
          explanation: 'lm(y ~ x, data = df) fits ordinary least squares linear regression models in R.'
        }
      ],
      whyItMatters: 'Evaluating whether a supplementary immunisation campaign achieved significant coverage improvements over baseline requires inferential hypothesis testing.',
      estimatedMinutes: 9
    }
  ]
};
