declare namespace JSONFile {
  interface JSONFileStatic {
    writeFile: WriteFile;
  }

  interface WriteFile {
    (filename: string, obj: any, callback: Callback): void;
    (
      filename: string,
      obj: any,
      options: JSONFileOptions,
      callback: Callback,
    ): void;
  }

  export interface JSONFileOptions {
    spaces?: number;
  }

  interface Callback {
    (error: Error): void;
  }
}

declare const jsonfile: JSONFile.JSONFileStatic;

declare module 'jsonfile' {
  export = jsonfile;
}