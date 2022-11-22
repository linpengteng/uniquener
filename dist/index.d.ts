/**
 * Type
 */
type TypeOptions = {
    radix?: 10 | 16 | 36;
    format?: string | null;
    random?: '?' | '*' | '#' | null;
    includes?: Array<string> | Set<string> | null;
    listenHandler?: TypeListenHandler | null;
    errorHandler?: TypeErrorHandler | null;
    errorListen?: boolean | null;
    onlyUpdate?: boolean | null;
    errorExit?: boolean | null;
    tryCount?: number | null;
};
type TypeUniquener = (options?: TypeOptions) => string;
type TypeErrorHandler = (options: TypeOptions) => TypeOptions;
type TypeListenHandler = (options: Set<string>) => void;
/**
 * Uniquener
 */
declare const Uniquener: TypeUniquener;

export { Uniquener as default };
