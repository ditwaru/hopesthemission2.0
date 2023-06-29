import { writeFile, readFile, unlink, readdir } from "fs/promises";
import { get } from "https";
import path from "path";
import { ParsedUrlQuery } from "querystring";

type Paths = {
  params: ParsedUrlQuery;
  locale?: string | undefined;
}[];
const writeParamsFile = async (paths: Paths) => {
  await writeFile(`/tmp/tmp.json`, JSON.stringify(paths));
};

const getParamsData = async (): Promise<any> => {
  const tmpFile = `/tmp/tmp.json`;
  const data = await readFile(tmpFile);
  const string = data.toString();
  return JSON.parse(string);
};

const deleteTmpFile = async () => {
  await unlink(`/tmp/tmp.json`);
};

const writeImageFileFromURL = async (imageUrl: string) => {
  await deleteAllAboutImages();
  const file = await new Promise<Buffer>((resolve, reject) => {
    get(imageUrl, (res) => {
      const data: Uint8Array[] = [];
      res
        .on("data", (chunk) => {
          data.push(Buffer.from(chunk, "binary"));
        })
        .on("end", () => {
          resolve(Buffer.concat(data));
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  });
  await writeFile(`./public/about/${imageUrl.split("/about/")[1]}`, file);
};

const deleteAllAboutImages = async () => {
  const directory = "./public/about";
  try {
    const files = await readdir(directory);
    for (const file of files) {
      await unlink(path.join(directory, file));
    }
  } catch (err) {
    // if this errors, it just means the file doesn't exist. Which is good bc we're trying to delete it
    console.log("Files deleted as planned.");
  }
};

const useFiles = () => ({
  writeParamsFile,
  getParamsData,
  deleteTmpFile,
  writeImageFileFromURL,
});

export default useFiles;
