import { Result } from "./result_type_in_json";
import fs from "fs";

const allStudentsResults: Result[] = [];

interface Total {
  htno: string;
  total: string;
}

interface SemesterResult {
  htno: string;
  semesterCode: string;
  total: number;
  credits: number;
  CGPA: string;
}

interface SubjectResult {
  htno: string;
  semesterCode: string;
  subjectCode: string;
  subjectName: string;
  subjectInternal: string;
  subjectExternal: string;
  subjectTotal: string;
  subjectGrade: string;
  subjectCredits: string;
}

const main = () => {
  const totals: Total[] = [];
  const semesterResults: SemesterResult[] = [];
  const subjectResults: SubjectResult[] = [];

  for (const result of allStudentsResults) {
    const htno = result.Details.Roll_No;
    const total = result.Results.Total;
    totals.push({ htno, total });
    for (const semester in result.Results) {
      if (semester === "Total") continue;
      const semesterResult = result.Results[semester];
      const semesterCode = semester;
      for (const subjectCode in semesterResult) {
        if (
          subjectCode === "total" ||
          subjectCode === "credits" ||
          subjectCode === "CGPA"
        )
          continue;
        const subjectResult = semesterResult[subjectCode];
        const subjectName = subjectResult.subject_name;
        const subjectInternal = subjectResult.subject_internal;
        const subjectExternal = subjectResult.subject_external;
        const subjectTotal = subjectResult.subject_total;
        const subjectGrade = subjectResult.subject_grade;
        const subjectCredits = subjectResult.subject_credits;
        subjectResults.push({
          htno,
          semesterCode,
          subjectCode,
          subjectName,
          subjectInternal,
          subjectExternal,
          subjectTotal,
          subjectGrade,
          subjectCredits,
        });
      }
      const total = semesterResult.total;
      const credits = semesterResult.credits;
      const CGPA = semesterResult.CGPA;
      semesterResults.push({ htno, semesterCode, total, credits, CGPA });
    }
  }

  fs.writeFileSync(
    "result_in_flat_json.js",
    `const totals=${totals};\nconst semesterResults=${semesterResults};\nconst subjectResults=${subjectResults};`,
    "utf-8"
  );
};

main();
