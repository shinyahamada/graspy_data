/**
 * metabase と通信を行うクラス
 */

export default class Metabase {

    // セッションURL
    sessionUrl: string;

    // セッションID
    sessionId: string;

    // ユーザ名
    username: string;

    // password
    password: string;

    // 情報取得API叩く際の設定
    headers: Object;
    postOptions: Object;
    baseApiUrl: String;

    constructor() {
        this.sessionUrl = PropertiesService.getScriptProperties().getProperty('SESSION_URL');
        this.baseApiUrl = PropertiesService.getScriptProperties().getProperty('API_URL');
        this.username = PropertiesService.getScriptProperties().getProperty('USER_NAME');
        this.password = PropertiesService.getScriptProperties().getProperty('METABASE_PASS');
        this.sessionId = this.startSession();
        this.setApiCallInfo();
    }

    /**
     * カード情報取得のAPIを叩く
     */
    getCardInfo(cardId: Number): Object[] {
        try {
            const endpoint = `${this.baseApiUrl}/card/${cardId}/query/json`;
            const res: any = UrlFetchApp.fetch(endpoint, this.postOptions);
            const content = JSON.parse(res);

            return content;
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * API叩くのに必要な情報をセット
     */
    setApiCallInfo() {
        this.headers = {
            "Content-Type": "application/json",
            "X-Metabase-Session": this.sessionId,
        };

        this.postOptions = {
            "method": "POST",
            "headers": this.headers,
            "muteHttpExceptions": true,
        };
    }

    /**
     * セッションを開始しID保持
     */
    startSession(): string {
        
        const headers: Object = {
            "Content-Type": "application/json",
        };

        const payload: Object = {
            "username": this.username,
            "password": this.password,
        };

        const options: Object = {
            "methods": "POST",
            "headers": headers,
            "payload": JSON.stringify(payload),
            "muteHttpExceptions": true,
        };

        // response => { "id" : "***************" }
        const res: any = UrlFetchApp.fetch(this.sessionUrl, options);
        const content = JSON.parse(res);

        return content.id;
    }

    /**
     * セッションIDを返す
     */
    getSessionId(): string {
        return this.sessionId;
    }
} 