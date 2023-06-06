export type CSVSep = ',' | ';'

export class CsvParser {
  private fileName = ''
  private fileData: Record<string, string[]> = {}
  /**
   * fileName - Имя файла
   * fileData - Данные из csv-файла
   * sep - разделитель
   */
  constructor(fileName: string, fileData: string, sep: CSVSep = ';') {
    this.fileName = fileName
    const splitFileData = fileData.split('\r\n')
    const head = splitFileData[0].split(sep)
    const splitRows = splitFileData.slice(1, -1).map((row) => row.split(sep))

    const result: Record<string, string[]> = {}
    head.forEach((value, index) => {
      result[value] = splitRows.map((it) => it[index])
    })

    this.fileData = result
  }

  public get name(): string {
    return this.fileName
  }

  public get data(): Record<string, string[]> {
    return this.fileData
  }

  public get head(): string[] {
    return Object.keys(this.fileData)
  }

  public get values(): string[][] {
    return Object.values(this.fileData)
  }

  public valuesWithFilter(filterColumns: string[]): any {
    return Object.keys(this.fileData)
      .filter((key) => filterColumns.includes(key))
      .map((key) => this.data[key])
  }
}
