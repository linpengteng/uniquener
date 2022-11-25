type TypeUniquenerOptions = {
    radix?: 10 | 16 | 26 | 36;
    format?: string | null;
    random?: '?' | '*' | '#' | null;
    algorithm?: 'Math.random' | 'crypto.getRandomValues' | null;
    usedUniques?: Array<string> | Set<string> | null;
    listenCacherHandler?: TypeListenCacherHandler | null;
    reduplicateHandler?: TypeReduplicateHandler | null;
    throwErrorHandler?: TypeThrowErrorHandler | null;
    reduplicateExit?: boolean | null;
    onlyUpdate?: boolean | null;
    tryCount?: number | null;
};
type TypeCacherOptions = Set<string>;
type TypeListenCacherHandler = (options: TypeCacherOptions) => void;
type TypeReduplicateHandler = (options: TypeUniquenerOptions) => TypeUniquenerOptions;
type TypeThrowErrorHandler = (options: TypeCacherOptions) => void;
type TypeUniquener = (options?: TypeUniquenerOptions) => string;
/**
 * Uniquener
 */
declare const Uniquener: TypeUniquener;

export { Uniquener as default };
