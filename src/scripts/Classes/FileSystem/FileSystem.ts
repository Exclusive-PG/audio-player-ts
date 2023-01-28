import { fs, path } from "../../../scripts/requiredLib/requiredLib";

export default class FileSystem {
	private static paths = {
		images: path.resolve(path.join("data", "playlists", "playlists.json")),
		logs: path.resolve(path.join("data", "logs")),
	};
	public static createJSONData(data: any, pathFile: string) {
		fs.mkdirSync(path.dirname(pathFile), { recursive: true }, (err: Error) => {
			if (err) throw err;
		});

		try {
			fs.writeFileSync(path.resolve(pathFile), JSON.stringify(data));
		} catch (e) {
			console.log((e as Error).message);
		}
	}

	public static createDirectory(pathDir: string) {
		if (!fs.existsSync(pathDir)) {
			fs.mkdirSync(pathDir, { recursive: true });
		}
	}
	public static copyData(srcDir: string, destDir: string) {
		try {
			fs.copyFileSync(srcDir, destDir);
		} catch (err) {
			console.error(err);
		}
	}
	public static importAll(r: any) {
		return r.keys().map(r);
	}
	public static loadData(pathToFile: string, ext: string = ".json") {
		let _loadData;
		if (fs.existsSync(pathToFile) && path.extname(pathToFile) === ext) {
			_loadData = JSON.parse(fs.readFileSync(pathToFile, { encoding: "utf-8" }));
		}
		return _loadData;
	}
	static get PATHS() {
		return this.paths;
	}
}
