/**
 * 月次データシートを更新するクラス
 */
export default class MonthlySheet {
    sheet: any;
    // シート上での表記の値を入れれば良い
    rowNumArr: Number[] = [2, 5, 6, 18, 19, 21, 22, 25, 26];
    startRowNum: Number = 2;
    targetRowRange: Number = 30;

    constructor() {
        this.sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Graspy_KPIログ(月)');
    }

    // 変更を適用していく
    updateCells(monthlyData: Object): void {
        const targetRange = this.getTagetRange();
        const values = targetRange.getValues();

        console.log(monthlyData);
        console.log(values);
    }

    // 変更適用範囲を取得
    getTagetRange(): any {
        const targetColNum = this.getTagetDateColNum();
        return this.sheet.getRange(this.startRowNum, targetColNum, this.targetRowRange);
    }

    // 日付のシート上のカラム数字を取得
    getTagetDateColNum(): Number {
        // シートの範囲取得
        const lastCol = this.sheet.getLastColumn();
        const dateArr = this.sheet.getRange(1, lastCol);

        console.log(lastCol);

        // 先月取得
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() -1);

        console.log(lastMonth);

        const monthIndex = dateArr.indexOf(lastMonth);
        console.log(monthIndex); // 配列のindexだからシート上では +1 して使う

        return monthIndex + 1;
        
    }

    // 行数字を配列で扱えるように戻す(getValues対策)
    getArrIndexNums(): Number[] {
        // スタートする行の上にいくつ行があるのか
        const overRowNum: Number = Number(this.startRowNum) - 1;

        // rowNumArrはrowの値だから配列のindexとして使うならそれぞれ-1する必要がある
        const indexNumArr: Number[] = this.rowNumArr.map(rowNum => {
            return Number(rowNum) - Number(overRowNum) - 1;
        })

        return indexNumArr;
    }




}