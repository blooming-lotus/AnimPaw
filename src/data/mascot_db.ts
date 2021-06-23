import { app, remote } from "electron";
import * as path from "path";
import { db_mascot_filename, db_foldername } from "../vars";
import { DataBase } from "./DataBase";
import { Mascot, MascotData } from "./mascot";
import {Low, JSONFile} from 'lowdb';

export const db = new class DB extends DataBase {
    private db_path = path.join((app || remote.app).getPath('userData'), db_foldername, db_mascot_filename)
    private adapter = new JSONFile<MascotData>(this.db_path);
    private db = new Low<MascotData>(this.adapter);

    constructor() {
        super();
    }

    public add(mascot: Mascot): void {
        this.db.data?.mascots.push(mascot);
    }
    public addLast(mascot: Mascot): void {
        this.db.data?.last_mascot 
        && (this.db.data.last_mascot = mascot.name);
    }
    public getLastMascot(): Mascot | null {
        if (this.db.data == null) return null;
        const lastName = this.db.data.last_mascot;
        if (lastName == null) return null;

        const last = this.db.data.mascots.find(x => x.name == lastName)

        return last || null;
    }

}