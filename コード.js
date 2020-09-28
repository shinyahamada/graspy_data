function myFunction() {
    const positionList = {
        // row, column 
        'Graspy_全体定例用(週)': [2,1],
        'Graspy_KPIログ(月)': [1,3]
    };

    const alpPositionList = {
        // row, column 
        'Graspy_全体定例用(週)': 'A2',
        'Graspy_KPIログ(月)': 'C1'
    };
    
    const sheet = SpreadsheetApp.getActiveSheet();
    const sheetName = sheet.getName();
    const activeCell = sheet.getActiveCell();

    // シート名が一致するか
    if (!existsSheetName(positionList, sheetName)) {
        return false;
    }

    // セレクトボックス用のセルかどうか
    if (!isSelectCell(activeCell, positionList[sheetName])) {
        return false;
    }

    // 選択したい日付を取得
    const targetDate = activeCell.getValue();
    console.log(targetDate);

    // 日付一覧から一致するセル情報を取得
    const targetColumnIndex = findColumnIndex(sheet, targetDate, positionList[sheetName][0]);
    const targetRowIndex = positionList[sheetName][0];
    const targetCell = sheet.getRange(targetRowIndex, targetColumnIndex).getValue();

    // 対象をアクティブ化
    targetCell.activete();

}

function isSelectCell(activeCell, selectPosition) {
    const activePosition = [activeCell.getRow(), activeCell.getColumn()];

    if (activePosition.toString() === selectPosition.toString()) {
        return true;
    }

    return false;

}

function findColumnIndex(sheet, val, row) {
    const lastColumn = sheet.getLastColumn();
    const targetRowValues = sheet.getRange(row, lastColumn).getValues();

    targetRowValues.forEach(v, index => {
        if (v[0] == val) {
            return index
        }
    });
}

function existsSheetName(positionList, sheetName) {
    const keys = Object.keys(positionList);
    if (keys.indexOf(sheetName)) {
        return true;
    }

    return false;
}
