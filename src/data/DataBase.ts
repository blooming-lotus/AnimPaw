import { Mascot } from "./mascot";

export abstract class DataBase {
    public abstract add(mascot: Mascot): void;
    public abstract addLast(mascot: Mascot): void;
    public abstract getLastMascot(): Mascot | null;
}
