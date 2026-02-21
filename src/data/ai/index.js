// Central Export Point for the V8.2 Offline AI Brain
import { masterEngineProcessor } from './engine';

// The UI Component will only interact with this unified endpoint.
export const matchQueryIntelligently = (userQuery) => {
    return masterEngineProcessor(userQuery);
};
