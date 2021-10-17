export type Config =
  | {
      save: true | number
      directory: string
      name: string
    }
  | {
      save: false
    }

export default class Store<T extends Record<string, unknown>> {
  constructor(config: Config)

  public get<U extends keyof T>(key: U): Promise<T[U]>
  public getSync<U extends keyof T>(key: U): T[U]

  public set<U extends keyof T>(key: U, value: T[U]): Promise<void>
  public setSync<U extends keyof T>(key: U, value: T[U]): void

  public update<U extends keyof T>(key: U, value: T[U]): Promise<void>
  public updateSync<U extends keyof T>(key: U, value: T[U]): void

  public delete<U extends keyof T>(key: U): Promise<void>
  public deleteSync<U extends keyof T>(key: U): void

  public list<U extends keyof T>(): Promise<U[]>
  public listSync<U extends keyof T>(): U[]
}
