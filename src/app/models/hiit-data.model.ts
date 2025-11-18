export interface Exercise {
  id: string;
  name: string;
  instruction: string;
  defaultDuration?: number;
  imageUrl?: string;
  videoUrl?: string;
}

export type BlockType = 'exercise' | 'pause';

export interface Block {
  id: string;
  type: BlockType;
  duration: number; // in seconds
  exerciseId?: string; // if type is exercise
  // Overrides or specific instance data
  name?: string;
  instruction?: string;
}

export interface Plan {
  id: string;
  name: string;
  blocks: Block[];
  totalDuration?: number; // calculated
}
