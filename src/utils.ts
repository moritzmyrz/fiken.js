type Constructor = new (...args: never[]) => object;

export function applyMixins(derivedCtor: Constructor, baseCtors: Constructor[]) {
	baseCtors.forEach((baseCtor) => {
		Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
			const descriptor = Object.getOwnPropertyDescriptor(baseCtor.prototype, name);
			if (!descriptor) {
				return;
			}

			Object.defineProperty(
				derivedCtor.prototype,
				name,
				descriptor
			);
		});
	});
}
