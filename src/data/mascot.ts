export type MascotData = {
    last_mascot: string | null,
    mascots: Mascot[]
}

export class Mascot {
    readonly name: string;
    readonly file_path: string;
    readonly size: Size;
    constructor(name: string, file_path: string, size: Size) {
        this.name = name;
        this.file_path = file_path;
        this.size = size;
    }
}

type Size = {
    width: number,
    height: number,
}