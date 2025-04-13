export interface FieldGroup {
  id: number;
  name: string;
  description?: string;
  type: 'default' | 'created' | 'copied';
}
