import { action, makeAutoObservable, observable } from 'mobx';
import HistoricalContextApi from '@api/timeline/historicalcontext.api';
import { HistoricalContext } from '@models/timeline/chronology.model';

export default class HistoricalContextStore {
    public historicalContextArray = new Array<HistoricalContext>();

    public constructor() {
        makeAutoObservable(this, {
            historicalContextArray: observable,
            fetchHistoricalContextAll: action,
            addItemToArray: action,

        });
    }

    public fetchHistoricalContextAll = async () => {
        HistoricalContextApi.getAll()
            .then((value) => {
                this.historicalContextArray = value as HistoricalContext[];
            }).catch((error) => {});
    };

    public addItemToArray = (item: HistoricalContext) => {
        this.historicalContextArray.push(item);
    };
}
