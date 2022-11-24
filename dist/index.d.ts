/**
 * Type
 */
type TypeOptions = {
    radix?: 10 | 16 | 36;
    format?: string | null;
    random?: '?' | '*' | '#' | null;
    usedUniques?: Array<string> | Set<string> | null;
    listenCacherHandler?: TypeListenCacherHandler | null;
    reduplicateHandler?: TypeReduplicateHandler | null;
    throwErrorHandler?: TypeThrowErrorHandler | null;
    reduplicateExit?: boolean | null;
    onlyUpdate?: boolean | null;
    tryCount?: number | null;
};
type TypeUniquener = (options?: TypeOptions) => string;
type TypeListenCacherHandler = (options: Set<string>) => void;
type TypeReduplicateHandler = (options: TypeOptions) => TypeOptions;
type TypeThrowErrorHandler = (options: Set<string>) => void;
/**
 * Uniquener
 */
declare const Uniquener: TypeUniquener;

export { Uniquener as default };
