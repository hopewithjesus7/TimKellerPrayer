import psalmsData from './psalms.json';

export interface Psalm {
  chapter: number;
  text: string;
}

export const psalms: Psalm[] = psalmsData.map((p: any) => ({
  chapter: p.id,
  text: p.content
}));
