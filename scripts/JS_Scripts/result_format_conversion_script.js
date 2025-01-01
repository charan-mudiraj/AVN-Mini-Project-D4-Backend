"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var allStudentsResults = require("./result.json");
var main = function () {
  var totals = [];
  var semesterResults = [];
  var subjectResults = [];
  for (
    var _i = 0, allStudentsResults_1 = allStudentsResults;
    _i < allStudentsResults_1.length;
    _i++
  ) {
    var result = allStudentsResults_1[_i];
    var htno = result.Details.Roll_No;
    var total = result.Results.Total;
    totals.push({ htno: htno, total: total });
    for (var semester in result.Results) {
      if (semester === "Total") continue;
      var semesterResult = result.Results[semester];
      var semesterCode = semester;
      for (var subjectCode in semesterResult) {
        if (
          subjectCode === "total" ||
          subjectCode === "credits" ||
          subjectCode === "CGPA"
        )
          continue;
        var subjectResult = semesterResult[subjectCode];
        var subjectName = subjectResult.subject_name;
        var subjectInternal = subjectResult.subject_internal;
        var subjectExternal = subjectResult.subject_external;
        var subjectTotal = subjectResult.subject_total;
        var subjectGrade = subjectResult.subject_grade;
        var subjectCredits = subjectResult.subject_credits;
        subjectResults.push({
          htno: htno,
          semesterCode: semesterCode,
          subjectCode: subjectCode,
          subjectName: subjectName,
          subjectInternal: subjectInternal,
          subjectExternal: subjectExternal,
          subjectTotal: subjectTotal,
          subjectGrade: subjectGrade,
          subjectCredits: subjectCredits,
        });
      }
      var total_1 = semesterResult.total;
      var credits = semesterResult.credits;
      var CGPA = semesterResult.CGPA;
      semesterResults.push({
        htno: htno,
        semesterCode: semesterCode,
        total: total_1,
        credits: credits,
        CGPA: CGPA,
      });
    }
  }
  fs.writeFileSync(
    "result_in_flat_json.js",
    `const totals=${JSON.stringify(
      totals
    )};\nconst semesterResults=${JSON.stringify(
      semesterResults
    )};\nconst subjectResults=${JSON.stringify(subjectResults)};`,
    "utf-8"
  );
};
main();
