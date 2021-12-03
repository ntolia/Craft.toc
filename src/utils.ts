import { CraftBlock, CraftTextBlock, CraftTextRun } from "@craftdocs/craft-extension-api";

export const SupportedTextStyle = ['title', 'subtitle', 'heading', 'strong', 'card', 'page'];

export async function getAllBlocks(): Promise<CraftBlock[]> {
  const currentDocument = await getCurrentPage();
  return subBlocks(currentDocument);
}

export async function getCurrentPage() {
  return (await craft.dataApi.getCurrentPage()).data as CraftTextBlock;
}

export function subBlocks(block: CraftBlock): CraftBlock[] {
  if (block.type === 'textBlock') {
    return block.subblocks;
  } else {
    return [];
  }
}

export function textContent(block: CraftBlock) {
  if (block.type !== 'textBlock') {
    return "";
  } else {
    return stringFromRuns(block.content);
  }
}

export function stringFromRuns(runs: CraftTextRun[]): string {
  return runs.reduce((s, run) => s + run.text, "");
}
