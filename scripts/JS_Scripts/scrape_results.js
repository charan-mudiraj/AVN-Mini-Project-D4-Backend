import fs from "fs";

const allResults = [];

const htnoPrefix = "215U1A67";
const start = 1;
const end = 64;

const getResult = async (htno) => {
  try {
    const res = await fetch(
      `https://jntuhresults.up.railway.app/api/academicresult?htno=${htno}`
    );
    const data = await res.json();
    console.log(`fetched ${htno} result with name ${data.Details.NAME}`);
    return data;
  } catch (err) {
    console.log(`error fetching ${htno} result`);
    return null;
  }
};

const getAllResults = async () => {
  const start = 1;
};

const main = async () => {
  for (let i = start; i <= end; i++) {
    const htno = htnoPrefix + i.toString().padStart(2, "0");
    const result = await getResult(htno);
    if (result) {
      allResults.push(result);
    }
  }
  fs.writeFileSync("result.json", JSON.stringify(allResults), "utf-8");
};

main();
