function myFunction() {
    const positionList = {
        // row, column 
        'Graspy_全体定例用(週)': [2,1],
        'Graspy_KPIログ(月)': [1,3]
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

    // 日付一覧から一致するセル情報を取得
    const targetColumnIndex = findColumnIndex(sheet, targetDate, positionList[sheetName]);
    const targetColumnNum = targetColumnIndex + positionList[sheetName][1] + 1;
    const targetRowIndex = positionList[sheetName][0];
    const targetCell = sheet.getRange(targetRowIndex, targetColumnNum);
    const targetNotation = targetCell.getA1Notation();
    const targetAlp = pickAlp(targetNotation);
    const start = targetAlp+String(1);
    const end = targetAlp+String(30);
    const targetColumn = sheet.getRange(start+':'+end);

    // 対象をアクティブ化
    targetColumn.activate();
}

function pickAlp(notation) {
    const n = notation;
    return n.replace(/\d/, '');
}

function isSelectCell(activeCell, selectPosition) {
    const activePosition = [activeCell.getRow(), activeCell.getColumn()];

    if (activePosition.toString() === selectPosition.toString()) {
        return true;
    }

    return false;

}

function findColumnIndex(sheet, val, position) {
    const lastColumn = sheet.getLastColumn();
    const targetRowValues = sheet.getRange(position[0], position[1]+1, 1, lastColumn).getValues();
    let index;

    for (let i = 0; i < targetRowValues[0].length; i++) {
        if (String(targetRowValues[0][i]) == String(val)) {
            index = i; // forのindex指定してる分と、そもそも配列としてindex取ってる文と
        }
    }

    return index;
}

function existsSheetName(positionList, sheetName) {
    const keys = Object.keys(positionList);
    if (keys.indexOf(sheetName) != -1) {
        return true;
    }

    return false;
}
