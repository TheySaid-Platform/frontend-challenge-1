
export enum Priority {
    Low = 'low',
    Medium = 'medium',
    High = 'high',
}

export interface Todo {
    id: string;
    title: string;
    completed: boolean;
    category: string;
    priority: Priority;    
}