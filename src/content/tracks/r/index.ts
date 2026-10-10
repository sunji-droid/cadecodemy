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
      explanation: 'In R, vectors are the core building block. The combine function c() groups individual numbers into a 1D vector sequence. The standard assignment operator is <-.',
      codeSnippet: 'doses <- c(1280, 620, 410, 1690)\nprint(doses)',
      exercises: [
        {
          id: 'r_ex_01',
          instruction: 'Create a numeric vector named scores with the values 85, 92, and 78 using c(85, 92, 78). Print the scores vector.',
          initialCode: '# 1. Create scores <- c(85, 92, 78)\n# 2. Print scores\n',
          solutionCode: 'scores <- c(85, 92, 78)\nprint(scores)',
          hints: ['Write scores <- c(85, 92, 78)', 'Call print(scores)']
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
      explanation: 'Data frames arrange columns into tabular structures. Columns are accessed by name using the dollar sign ($) operator.',
      codeSnippet: 'clinics_df <- data.frame(\n  facility = c("Molepolole", "Thamaga"),\n  target = c(1500, 800)\n)\nprint(clinics_df$facility)',
      exercises: [
        {
          id: 'r_ex_02',
          instruction: 'Extract the target column from clinics_df using the $ operator (clinics_df$target) and print it.',
          initialCode: 'clinics_df <- data.frame(facility = c("Thamaga", "Kopong"), target = c(800, 920))\n# Extract and print the target column from clinics_df\n',
          solutionCode: 'clinics_df <- data.frame(facility = c("Thamaga", "Kopong"), target = c(800, 920))\nprint(clinics_df$target)',
          hints: ['Use clinics_df$target', 'Call print(clinics_df$target)']
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
      explanation: 'The tidyverse philosophy uses functions to clean and transform datasets. Functions like mean() calculate central tendencies across vectors.',
      codeSnippet: 'doses <- c(1280, 620, 410, 1690)\navg_doses <- mean(doses)\nprint(avg_doses)',
      exercises: [
        {
          id: 'r_ex_03',
          instruction: 'Compute the arithmetic mean of the scores vector using mean(scores) and print the result.',
          initialCode: 'scores <- c(80, 90, 70)\n# Calculate the mean of scores and print it\n',
          solutionCode: 'scores <- c(80, 90, 70)\nprint(mean(scores))',
          hints: ['Write mean(scores)', 'Wrap in print(...)']
        }
      ],
      quiz: [
        {
          id: 'r_q_07',
          question: 'Which dplyr verb creates new columns or modifies existing ones?',
          options: ['select()', 'filter()', 'mutate()', 'arrange()'],
          correctIndex: 2,
          explanation: 'mutate() computes new variables while preserving existing data columns.'
        },
        {
          id: 'r_q_08',
          question: 'What does the native R pipe operator (|>) or magrittr pipe (%>%) accomplish?',
          options: ['Executes SQL code', 'Passes the left-hand expression as the first argument to the right-hand function', 'Calculates standard deviation', 'Deletes empty rows'],
          correctIndex: 1,
          explanation: 'The pipe operator feeds the output of the preceding expression forward as the next function argument.'
        },
        {
          id: 'r_q_09',
          question: 'Which verb subsets rows based on condition logic in dplyr?',
          options: ['slice()', 'filter()', 'extract()', 'pick()'],
          correctIndex: 1,
          explanation: 'filter() retains rows where the specified condition evaluates to TRUE.'
        }
      ],
      whyItMatters: 'Transforming raw demographic data into standardized health metrics is the core role of statistical analysts.',
      estimatedMinutes: 8
    },
    {
      id: 'r_04',
      trackId: 'r',
      order: 4,
      stageNumber: 3,
      title: 'Data Visualization Grammar: ggplot2 Concepts',
      objective: 'Map variables to visual aesthetics (aes) and geometric layers (geoms).',
      explanation: 'ggplot2 implements Leland Wilkinson\'s Grammar of Graphics. Plots are built in layers by specifying data, mapping aesthetics (aes), and adding geometric shapes (geom_point, geom_bar).',
      codeSnippet: '# Basic layer grammar\n# ggplot(df, aes(x = target, y = reached)) + geom_point()\nsummary_stat <- c(min = 10, mean = 45, max = 80)\nprint(summary_stat)',
      exercises: [
        {
          id: 'r_ex_04',
          instruction: 'Create a named vector summary_stat with elements min = 10, mean = 45, and max = 80. Print summary_stat.',
          initialCode: '# Define summary_stat <- c(min = 10, mean = 45, max = 80) and print it\n',
          solutionCode: 'summary_stat <- c(min = 10, mean = 45, max = 80)\nprint(summary_stat)',
          hints: ['Use c(min = 10, mean = 45, max = 80)', 'Print the vector']
        }
      ],
      quiz: [
        {
          id: 'r_q_10',
          question: 'In ggplot2, what function defines aesthetic mappings such as coordinates and color channels?',
          options: ['map()', 'aes()', 'geom()', 'theme()'],
          correctIndex: 1,
          explanation: 'aes() links dataset variables to visual properties like x, y, fill, and color.'
        },
        {
          id: 'r_q_11',
          question: 'What operator is used to add new layers together in a ggplot2 expression?',
          options: ['%>%\', \'|>', '+', '&'],
          correctIndex: 2,
          explanation: 'ggplot2 uses the plus sign (+) to chain geometric and thematic layers onto the base canvas.'
        },
        {
          id: 'r_q_12',
          question: 'Which geometric layer creates a scatter plot of continuous variables?',
          options: ['geom_bar()', 'geom_point()', 'geom_line()', 'geom_hist()'],
          correctIndex: 1,
          explanation: 'geom_point() renders two-dimensional Cartesian points representing paired observations.'
        }
      ],
      whyItMatters: 'Epidemiological curves, coverage choropleths, and disease trend charts in WHO SITREPs rely on ggplot2 aesthetics.',
      estimatedMinutes: 9
    },
    {
      id: 'r_05',
      trackId: 'r',
      order: 5,
      stageNumber: 4,
      title: 'Statistical Testing & Linear Models (lm)',
      objective: 'Fit linear regression models and interpret coefficients.',
      explanation: 'Linear regression models the relationship between predictor variables and an outcome. In R, formula syntax uses the tilde operator: y ~ x.',
      codeSnippet: 'x <- c(1, 2, 3, 4, 5)\ny <- c(2, 4, 6, 8, 10)\nmodel <- lm(y ~ x)\nprint(coef(model))',
      exercises: [
        {
          id: 'r_ex_05',
          instruction: 'Create vectors x <- c(1, 2, 3) and y <- c(2, 4, 6). Fit a linear model using lm(y ~ x) and print coef(model).',
          initialCode: 'x <- c(1, 2, 3)\ny <- c(2, 4, 6)\n# Fit linear model y ~ x and print coef(model)\n',
          solutionCode: 'x <- c(1, 2, 3)\ny <- c(2, 4, 6)\nmodel <- lm(y ~ x)\nprint(coef(model))',
          hints: ['Write model <- lm(y ~ x)', 'Call print(coef(model))']
        }
      ],
      quiz: [
        {
          id: 'r_q_13',
          question: 'What does the tilde (~) symbolize in R modeling formulas?',
          options: ['Multiplication', '"Is modeled by" (dependent ~ independent)', 'Approximately equal to', 'Division'],
          correctIndex: 1,
          explanation: 'The tilde separates the dependent response variable from independent explanatory predictors.'
        },
        {
          id: 'r_q_14',
          question: 'What function displays R-squared, standard errors, and p-values of a fitted model?',
          options: ['summary(model)', 'coef(model)', 'residuals(model)', 'anova(model)'],
          correctIndex: 0,
          explanation: 'summary() produces comprehensive regression diagnostics including R² and parameter p-values.'
        },
        {
          id: 'r_q_15',
          question: 'What is a p-value threshold conventionally indicating statistical significance in epidemiological studies?',
          options: ['p < 0.50', 'p < 0.05', 'p > 0.95', 'p = 1.00'],
          correctIndex: 1,
          explanation: 'A threshold of p < 0.05 is commonly used to reject the null hypothesis.'
        }
      ],
      whyItMatters: 'Determining whether an intervention produced statistically significant decreases in disease incidence requires hypothesis testing.',
      estimatedMinutes: 10
    }
  ]
};
