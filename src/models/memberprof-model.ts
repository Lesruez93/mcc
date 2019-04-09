
export class MemberprofModel {

  constructor(fields: any) {
    for (const f in fields) {
      // @ts-ignore
      this[f] = fields[f];
    }
  }

}

export interface MemberprofModel {
  [prop: string]: any;
}
