export type DictionaryIndexer<K, V, I> = (key:K, value:V) => I;
export type DictionaryMatcher<K, V, M> = (key:M, dictionary:Dictionary<K, V>) => V;

export class Dictionary<K, V> {
	public static from<K, V>(values:V[], indexer:(value:V) => K):Dictionary<K, V> {
		const entries = values.map((value:V) => {
			const key = indexer(value);
			return [key, value];
		}) as Array<[K, V]>;
		
		return new Dictionary<K, V>(entries);
	}
	
	private _entries:Map<K, V> = new Map();
	private _indexes?:Dictionary<string, Dictionary<any, V>>;
	private _matchers?:Dictionary<string, DictionaryMatcher<K, V, any>>;
	
	public get indexes():Dictionary<string, Dictionary<any, V>> {
		if(!this._indexes) {
			this._indexes = new Dictionary();
		}
		
		return this._indexes;
	}
	
	public get matchers():Dictionary<string, DictionaryMatcher<K, V, any>> {
		if(!this._matchers) {
			this._matchers = new Dictionary();
		}
		
		return this._matchers;
	}
	
	public get entries():Array<[K, V]> {
		return Array.from(this._entries.entries());
	}
	
	public get values():V[] {
		return Array.from(this._entries.values());
	}
	
	constructor(entries:Array<[K, V]> = [], dictionary?:Dictionary<K, V>) {
		if(dictionary) {
			const dictEntries = dictionary.entries;
			entries = entries.concat(dictEntries);
		}
		
		this._entries = new Map(entries.concat(entries));
	}
	
	get(key:K):V {
		if(!this._entries.has(key)) {
			throw new Error(`Unable to find entry`);
		}
		
		return this._entries.get(key) as V;
	}
	
	createIndex<I>(name:string, indexer:DictionaryIndexer<K, V, I>) {
		const indexed = Array.from(this._entries.entries()).map(([k, v]) => [indexer(k, v), v]) as Array<[I, V]>;
		const indexedDict = new Dictionary<I, V>(indexed);
		this._indexes = new Dictionary([
			[name, indexedDict]
		], this._indexes);
	}
	
	createMatcher<M>(name:string, matcher:DictionaryMatcher<K, V, M>) {
		this._matchers = new Dictionary<string, DictionaryMatcher<K, V, any>>([
			[name, matcher]
		], this._matchers);
	}
	
	byIndex<I>(name:string, key:I):V {
		return this.indexes.get(name).get(key);
	}
	
	byMatcher<M>(name:string, key:M):V {
		const matcher = this.matchers.get(name);
		return matcher(key, this);
	}
}
