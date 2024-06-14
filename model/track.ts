import type {Artist} from "~/model/artist";
import type {Album} from "~/model/album";


export interface Track {
    id: string;
    name: string;
    artists: Artist[];
    album: Album;
}
