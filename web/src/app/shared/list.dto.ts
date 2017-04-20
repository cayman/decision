/**
 * Created by rustem on 08.02.17.
 */
export class ListDTO<T> {
    count: number;
    offset: number;
    limit: number;
    items: T[] = new Array(0);
    size() {
        return this.items ? this.items.length : 0;
    }
    empty(){
        return !this.items || this.items.length===0;
    }
}