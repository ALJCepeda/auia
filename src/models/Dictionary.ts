export class Dictionary<K, V> {
	entries:Map<K, V> = new Map();

	setKeys(keys:K[], entry:V) {
		keys.forEach(key => {
			this.entries.set(key, entry);
		});
	}

	keysForEntry(entry:V):K[] {
		const keys:K[] = [];
		this.entries.forEach((e, key) => {
			if (e === entry) {
				keys.push(key);
			}
		});

		return keys;
	}

	canSet(entry:any):entry is V {
		return (entry as V) !== undefined;
	}
}
