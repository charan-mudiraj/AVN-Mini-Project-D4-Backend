// Results Details in JSON format:

type Semester = "1-1" | "1-2" | "2-1" | "2-2" | "3-1" | "3-2" | "4-1" | "4-2";

type SubjectCode = string;

interface SubjectResult {
  subject_code: string;
  subject_name: string;
  subject_internal: string;
  subject_external: string;
  subject_total: string;
  subject_grade: string;
  subject_credits: string;
}

export type Result = {
  Details: {
    NAME: string;
    Roll_No: string;
    COLLEGE_CODE: string;
    FATHER_NAME: string;
  };
  Results: {
    [semester in Semester]?: {
      [key: string]: SubjectResult;
    } & { total: number; credits: number; CGPA: string };
  } & { Total: string };
};

// How I want to convert and store the JSON result data into the SQL tables:

/**
 * Table 1 - All Students Results
 *
 * | htno | all_semesters_result_table_pointer | total |
 *
 * Table 2 - Semester Results
 *
 * | htno | semester_code | subjects_results_table_pointer | total | credits | CGPA |
 *
 * Table 3 - Subject Results
 *
 * | htno | semester_code | subject_code | subject_name | subject_internal | subject_external | subject_total | subject_grade | subject_credits |
 *
 *
 * Primary Keys:
 *      - Table 1: htno
 *      - Table 2: htno
 *      - Table 3: htno
 *
 * Foreign Keys:
 *     - Table 2: htno -> Table 1: htno
 *     - Table 3: htno, semester_code -> Table 2: htno, semester_code
 */
