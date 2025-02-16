export interface AIModel {
  id: string;
  name: string;
  isSaved: boolean;
  // Add other common model properties here
  description?: string;
  accuracy?: number;
  price?: number;
}

export interface ModelCardProps {
  model: AIModel;
  isSelected?: boolean;
  onSelect$?: () => void;
  showTrending?: boolean;
}
