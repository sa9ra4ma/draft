export interface TPlayerSummary {
    ID: string;
    背番号: string;
    名前: string;
    守備: string;
    生年月日: string;
    投打: string;
    球団: string;
}

export interface TPitcherData {
    ID: string;
    年度: string;
    試合: string;
    勝利: string;
    敗北: string;
    セーブ: string;
    ホールド: string;
    HP: string;
    完投: string;
    完封勝: string;
    無四球: string;
    打者: string;
    投球回: string;
    被安打: string;
    被本塁打: string;
    与四球: string;
    与死球: string;
    奪三振: string;
    暴投: string;
    ボーク: string;
    失点: string;
    自責点: string;
    防御率: string;
    WHIP: string;
}

export interface TFielderData {
    ID: string;
    試合: string;
    打席数: string;
    打数: string;
    得点: string;
    安打: string;
    二塁打: string;
    三塁打: string;
    本塁打: string;
    塁打: string;
    打点: string;
    盗塁: string;
    盗塁刺: string;
    犠打: string;
    犠飛: string;
    四球: string;
    死球: string;
    三振: string;
    併殺打: string;
    打率: string;
    出塁率: string;
    長打率: string;
    OPS: string;
}
