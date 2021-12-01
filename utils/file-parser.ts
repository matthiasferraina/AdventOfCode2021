import { join, fromFileUrl } from "../deps.ts";

export async function parseFileAsArray(
  absolutePath: string,
  relativePath: string
): Promise<Array<string>> {
  const pathToFileToRead = getAbsoluteFilePath(absolutePath, relativePath);

  const decoder = new TextDecoder("utf-8");
  const data = await Deno.readFile(pathToFileToRead);
  const strData = decoder.decode(data);

  if (!strData) {
    return [];
  }

  return strData.split("\n");
}

export function getAbsoluteFilePath(absoluteUrl: string, relativePath: string) {
  const absolutePath = fromFileUrl(absoluteUrl);
  const pathToFileToRead = join(absolutePath, "..", relativePath);
  return pathToFileToRead;
}
