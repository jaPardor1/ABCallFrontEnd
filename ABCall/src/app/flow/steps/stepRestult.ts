export enum StepType {
    VALIDATION = "Validation",
    DIAGNOSTIC = "Diagnostic",
    RESOLUTION = "Resolution",
    ESCALATION = "Escalation",
    CLOSURE = "Closure"
}

export interface FlowStepResultDTO {
    id: number;
    description: string;
    type: StepType; 
    flow_id: number;
}