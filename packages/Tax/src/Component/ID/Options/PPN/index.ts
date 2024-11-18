import {OptionsPPN} from "../../../../Interfaces/ID";
import PTKP from "../../Rules";
import PercentPPN from "../../Rules/PercentPPN";
import config from "@dkaframework/database/src/MariaDB/Config";

class PPN {
    get selectedRate(): any {
        return this._selectedRate;
    }

    set selectedRate(value: any) {
        this._selectedRate = value;
    }
    get selectedPTKP(): any {
        return this._selectedPTKP;
    }

    set selectedPTKP(value: any) {
        this._selectedPTKP = value;
    }
    get isMarriage(): boolean {
        return this._isMarriage;
    }

    set isMarriage(value: boolean) {
        this._isMarriage = value;
    }
    get dependents(): number {
        return this._dependents;
    }

    set dependents(value: number) {
        this._dependents = value;
    }
    get isMixed(): boolean {
        return this._isMixed;
    }

    set isMixed(value: boolean) {
        this._isMixed = value;
    }

    private _isMarriage: boolean = false;
    private _dependents: number = 0;
    private _isMixed : boolean = false;
    private _selectedPTKP : any = {};
    private _selectedRate : any = {};

    constructor(config: OptionsPPN) {
        this.isMarriage = config.isMarriage;
        if (config.isMarriage) {
            this.isMixed = config.isMixed;
        }
        this.dependents = config.dependents;

        this.selectedPTKP = PTKP.find((data) => {
            return data.isMerriage === this.isMarriage && data.mixed === this.isMixed && data.dependents === this.dependents;
        });
    }

    getPacket() {
        return this.selectedPTKP;
    }

    setIncomeMonth(value : number) {
        const GajiPertahun = value * 12;
        this.selectedRate = PercentPPN.find((range) => value >= range.start && value <= range.end);
        const selisih = GajiPertahun - this.selectedPTKP.value;

        const KenaPajak = selisih * Number(this.selectedRate.rate);
        console.log(GajiPertahun, this.selectedRate, selisih, KenaPajak);
    }

}

export default PPN;