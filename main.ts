
/**
 * メインの処理を書くファイル
 */
import SelectDate from "./SelectDate";
import Metabase from "./Metabase";

function showSelectedDate() {

    const sheet = SpreadsheetApp.getActiveSheet();
    const activeCell = sheet.getActiveCell();

    const selectDate = new SelectDate(sheet);

    if (!selectDate.existsSheetName()) {
        return false;
    }

    if (!selectDate.isSelectCell(activeCell)) {
        return false;
    }

    // 選択したい日付を取得
    const targetDate = activeCell.getValue();

    // 対象をアクティブ化
    selectDate.activeTargetColumn(targetDate);
}


function updateGraspyDataSheet() {
    
    // データを取ってくる

    // 
}

function getWeeklyData() {

}

function getMonthlyBasicData(): any {

    const monthlyCardId: any = PropertiesService.getScriptProperties().getProperty('MONTHLY_CARD_ID');
    const metabase = new Metabase();
    return metabase.getCardInfo(monthlyCardId);
}

function getMonthlyRecruitData(): any {
    const recruitCardId: any = PropertiesService.getScriptProperties().getProperty('MONTHLY_ANALYTICS_ID');
    const metabase = new Metabase();
    return metabase.getCardInfo(recruitCardId);
}

function getMonthlyAnalyticsData(): any {
    const monthlyAnalyticsCardId: any = PropertiesService.getScriptProperties().getProperty('MONTHLY_ANALYTICS_ID');
    const metabase = new Metabase();
    return metabase.getCardInfo(monthlyAnalyticsCardId);
}


