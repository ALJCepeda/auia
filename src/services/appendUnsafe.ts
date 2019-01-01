export function appendUnsafe<T>(self:T, data:Partial<T>):T {
	for(const key in data) {
		if(data.hasOwnProperty(key) && self.hasOwnProperty(key)) {
			//@ts-ignore
			if(Array.isArray(self[key])) {
				//@ts-ignore
				self[key] = self[key].concat(data[key]);
			} else {
				//@ts-ignore
				self[key] = data[key];
			}
		}
	}
  
	return self;
}
