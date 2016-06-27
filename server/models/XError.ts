export interface IXError {
    type: XErrorType
    message: string
}

export class XError {
    type: XErrorType
    message: string
    
    constructor(type: XErrorType, message: string) {
        this.type = type;
        this.message = message;
    }
    isNoError() { return this.type === XErrorType.NO_ERROR}
    isGeneral() { return this.type === XErrorType.GENERAL}
    isUnAvailable() { return this.type === XErrorType.UNAVAILABLE}
    isUnAuthorized() { return this.type === XErrorType.UNAUTHORIZED}
}

export enum XErrorType {
    NO_ERROR,
    GENERAL,
    UNAVAILABLE,
    UNAUTHORIZED
};