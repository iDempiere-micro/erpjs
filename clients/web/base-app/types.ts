export interface FeatureRegistration {
    name: string;
    uriSegment: string;
}

export interface AppRegistration {
    name: string;
    uri: string;
    oldId?: string;
    newId?: string;
    featureName: string;
}

export interface App {
    podiumRegisteredClient: any;
    registration: AppRegistration;
}

export interface Feature extends FeatureRegistration {
    apps?: App[];
}
