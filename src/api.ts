import { ProjectItem } from './types';

export async function fetchItems(url: string): Promise<ProjectItem[]> {
  const response = await fetch(url);
  const infoJsonString = await response.text();
  const { items } = JSON.parse(infoJsonString);
  return items;
}

export async function fetchText(url: string): Promise<string> {
  const response = await fetch(url);
  const text = response.text();
  return text;
}
