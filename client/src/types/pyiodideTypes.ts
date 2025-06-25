export interface PyodideInstance {
    runPython: (code: string) => any;
    globals: any;
    loadPackage: (packages: string | string[]) => Promise<void>;
}
