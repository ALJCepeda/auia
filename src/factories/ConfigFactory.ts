import { Dictionary } from "~models";

export class ConfigFactory<K, V> {
  constructor(private dictionary:Dictionary<K, (entry:string) => V>){}
	createFromEntry(entry:any):V {
		if(this.dictionary.entries.has(entry.type) === false) {
			throw new Error(`Invalid type encountered: ${entry.type ? entry.type : '<not-set>'}`);
		} else {
			const handler = this.dictionary.entries.get(entry.type);

			if(this.dictionary.canSet(handler)) {
				return handler(entry);
			} else {
				throw new Error(`Invalid handler encountered for entry: ${JSON.stringify(entry)}`);
			}
		}
	}

	createFromEntries(entries:any[]):V[] {
		return entries.reduce((result, entry) => {
			const model = this.createFromEntry(entry);
			return [ ...result, model ];
		}, []);
	}

  getKeys():K[] {
    return Array.from(this.dictionary.entries.keys());
  }
}
