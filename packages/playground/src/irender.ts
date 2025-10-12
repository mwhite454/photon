// Render request interface
export interface IRenderRequest {
    requestId: number;
    javaScript?: string;
    orderedDependencies?: string[];
    dependencyUrls?: { [id: string]: string };
    paramValues?: any[];
    kit?: Photon.IKit;
    fontDir?: string;
}

export interface IRenderResponse {
    requestId: number;
    model?: Photon.IModel;
    html?: string;
    error?: string;
}
