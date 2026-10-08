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
    }
  ]
};
