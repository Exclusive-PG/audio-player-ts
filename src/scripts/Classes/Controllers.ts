export default class Controllers {
	public addController(btn: HTMLElement, callback: Function, key: string = null) {
		if (btn !== null) {
			btn.addEventListener("click", () => {
				console.log(callback);
				console.log("click");
				try {
					callback();
				} catch (e) {
					console.log((e as Error).message);
				}
			});
		}
		if (key !== null) {
			window.addEventListener("keyup", (e) => {
				if (e.key.trim() === key) {
					callback();
				}
			});
		}
	}
}
