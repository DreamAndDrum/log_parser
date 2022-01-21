export interface Parser {
  parseErrors(inputPath: string, outputPath: string): boolean;
}
