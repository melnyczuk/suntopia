import { InfoJson } from './types';

export async function fetchData(url: string): Promise<InfoJson> {
  const response = await fetch(url);
  const infoJsonString = await response.text();
  return JSON.parse(infoJsonString);
}

export async function fetchText(url: string): Promise<string> {
  const response = await fetch(url);
  const text = response.text();
  return text;
}
