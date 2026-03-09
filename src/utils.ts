type Constructor = new (...args: never[]) => object;

export function applyMixins(derivedCtor: Constructor, baseCtors: Constructor[]) {
	baseCtors.forEach((baseCtor) => {
		Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
			Object.defineProperty(
				derivedCtor.prototype,
				name,
				Object.getOwnPropertyDescriptor(baseCtor.prototype, name)
			);
		});
	});
}
