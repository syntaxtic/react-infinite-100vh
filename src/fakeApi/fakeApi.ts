import fakeData from "./fakeData";

const dataLength = fakeData.length;
const responseLength = 3;

const getResponse = ({ index }: { index: number }) => {
  const startingIndex = index % dataLength;
  const responseData = fakeData.slice(
    startingIndex,
    startingIndex + responseLength,
  );
  if (responseData.length < responseLength) {
    responseData.concat(
      fakeData.slice(0, responseLength - responseData.length),
    );
  }
  return responseData;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fakeApi = async ({ index }: { index: number }) => {
  await sleep(200);
  return getResponse({ index });
};

export default fakeApi;
