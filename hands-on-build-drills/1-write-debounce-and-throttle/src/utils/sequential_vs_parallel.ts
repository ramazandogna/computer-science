const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

//Sequental
const task1 = async (): Promise<string> => {
  await delay(1000);
  return "task 1 tamamlandı";
};

const task2 = async (): Promise<string> => {
  await delay(1500);
  return "task 1 tamamlandı";
};

const task3 = async (): Promise<string> => {
  await delay(2000);
  return "task 1 tamamlandı";
};

async function runSequental() {
  console.log("Sıralı süre");
  console.time("Sıralı süre");

  const r1 = await task1();
  const r2 = await task2();
  const r3 = await task3();

  console.log("r1:", r1, "r2:", r2, "r3:", r3);
  console.timeEnd("Sıralı süre");
}

//Promise All
async function runParallel() {
  console.time("Paralel süre");

  const results = await Promise.all([task1(), task2(), task3()]);

  console.log(results);
  console.timeEnd("Paralel süre");
}
export async function sequentalAndParallel() {
  console.log("-----Test Başlıyor-----");
  await runSequental();
  console.log(" /n----");
  await runParallel();
}
