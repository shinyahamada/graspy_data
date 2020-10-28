/**
 * 選択された期間のセル(列)をアクティブ化するクラス
 */
export default class SelectDate {

    positionList: Object = {
        'Graspy_全体定例用(週)': [2,1],
        'Graspy_KPIログ(月)': [1,3]
    };

    sheet;

    constructor(sheet) {
        this.sheet = sheet;
    }

    pickAlp(notation): String {
        const n = notation;
        return n.replace(/\d/, '');
    }

    // イベントが日付変更用セルかどうか
    isSelectCell(activeCell): Boolean {
        const activePosition = [activeCell.getRow(), activeCell.getColumn()];
        const selectPosition = this.positionList[this.getSheetName()];

        if (activePosition.toString() === selectPosition.toString()) {
            return true;
        }

        return false;
    }

    activeTargetColumn(targetDate): void {
        const targetColumnIndex = this.getColumnNum(targetDate);
        const targetRowIndex = this.positionList[this.getSheetName()][0];
        const targetCell = this.sheet.getRange(targetRowIndex, targetColumnIndex);
        const targetNotation = targetCell.getA1Notation();
        const targetAlp = this.pickAlp(targetNotation);
        const start = targetAlp + String(1);
        const end = targetAlp + String(30);
        const targetColumnArea = this.sheet.getRange(start + ':' + end);
        
        // 対象をアクティブ化
        targetColumnArea.activate();
    }

    // シート全体での「A*」の 「*」 の部分を取得
    getColumnNum(targetDate): Number {
        return this.findColumnIndex(targetDate) + this.positionList[this.getSheetName()][1] + 1;
    }

    // 各シートの日付ゾーンから最後までを配列として、対象日程のindexを取得する
    findColumnIndex(val): Number {
        const lastColumn = this.sheet.getLastColumn();
        // 第二引数は日付ゾーンにindexとして至らせるために +1 している
        const targetRowValues = this.sheet.getRange(this.positionList[this.getSheetName()][0], this.positionList[this.getSheetName()][1]+1, 1, lastColumn).getValues();
        let index;
    
        for (let i = 0; i < targetRowValues[0].length; i++) {
            if (String(targetRowValues[0][i]) == String(val)) {
                index = i; // forのindex指定してる分と、そもそも配列としてindex取ってる文と
            }
        }
    
        return index;
    }
    
    // シート名が対象かどうか判定
    existsSheetName() {
        const sheetName = this.getSheetName();
        const keys = Object.keys(this.positionList);
        if (keys.indexOf(sheetName) != -1) {
            return true;
        }
        return false;
    }

    // シートの名前を取得
    getSheetName(): string {
        return this.sheet.getName();
    }
}

