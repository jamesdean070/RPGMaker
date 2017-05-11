//=============================================================================
// アイテムとスキルの使用効果を拡張するプラグイン
// FTKR_ExItemConfig_Effect.js
// 作成者     : フトコロ
// 作成日     : 2017/04/14
// 最終更新日 : 2017/05/11
// バージョン : v1.1.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_EIE = true;

var FTKR = FTKR || {};
FTKR.EIE = FTKR.EIE || {};

//=============================================================================
/*:
 * @plugindesc v1.1.0 アイテムとスキルの使用効果を拡張するプラグイン
 * @author フトコロ
 *
 * @help
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 本プラグインを実装することで、アイテムやスキルの使用効果を
 * より詳細に設定できます。
 * 
 * 1. 使用効果の対象を変更できます。
 * 
 * 2. 使用効果の効果量にJS計算式が使用できます。
 * 
 * 3. 使用効果が発生させるための有効条件を設定できます。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
 *    ください。
 * 
 * 2. 本プラグインは、FTKR_SkillExpansion.jsと組み合わせて使用できません。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 使用効果の設定
 *-----------------------------------------------------------------------------
 * アイテムおよびスキルのメモ欄に以下のノートタグを追記することで、
 * 使用効果の設定を変更できます。
 * 
 * <EIC 使用効果: x>
 * code
 * </EIC 使用効果>
 *    :使用効果のId x に対して code部で記述した設定を反映します。
 *    :使用効果のIDは、使用効果欄に設定した順番に上から 0, 1,...となります。
 * 
 * 
 * [code に使用できる項目]
 * Target: y
 * 対象: y
 *    :使用効果の対象を、y に変えることができます。
 *    :y に使用できるコードは以下の通りです。
 *    : user - 使用者
 *    : randomFriends - 味方からランダムで1体選択
 *    : randomOpponents - 敵からランダムで1体選択
 * 
 * Value1: eval
 * 内容1: 計算式
 *    :使用効果の内容1を 計算式(eval) で設定した値に変更します。
 *    :内容1は、使用効果で1つめに設定した数値です。
 *    : 例) HP回復の場合、% で設定する値
 * 
 * Value2: eval
 * 内容2: 計算式
 *    :使用効果の内容2を 計算式(eval) で設定した値に変更します。
 *    :内容2は、使用効果で2つめに設定した数値です。
 *    : 例) HP回復の場合、+ で設定する値
 * 
 * Enabled: eval
 * 有効条件: 計算式
 *    :対象の使用効果ID を 計算式(eval) で設定した条件で有効に
 *    :します。設定しない場合は、常に有効です。
 *    :有効になっていない場合は、効果が発生しません。
 * 
 * 
 * [計算式(eval)の値について]
 * 計算式は、ダメージ計算式のように、計算式を入力することで、固定値以外の値を
 * 使用することができます。以下のコードを使用できます。負の値入力可。
 *  a.param  - 使用者のパラメータを参照します。(a.atk で使用者の攻撃力)
 *  b.param  - 対象のパラメータを参照します。(b.def で対象の防御力)
 *  s[x]     - スイッチID x の状態を参照します。
 *  v[x]     - 変数ID x の値を参照します。
 *  iv[x]    - アイテムのセルフ変数ID x の値を参照します。(*1)
 *  result  - スキル・アイテムを使用した結果を参照します。
 *            result.hpDamage でHPダメージ量を取得します。
 * 
 * (*1) セルフ変数を使用する場合は、FTKR_ItemSelfVariables.jsが必要です。
 * 
 * 
 * 設定例）
 * 使用効果の1番目に「HP回復」を追加して、以下のタグを記入することで
 * スイッチID1またはスイッチID2がONの時に、相手に与えたダメージの20%分、
 * 使用者が回復する効果が発生します。
 * 
 * <EIC 使用効果: 0>
 * 対象: user
 * 内容1: 0
 * 内容2: result.hpDamage * 0.2
 * 有効条件: s[1] && s[2]
 * </EIC 使用効果>
 * 
 * 
 *-----------------------------------------------------------------------------
 * 本プラグインのライセンスについて(License)
 *-----------------------------------------------------------------------------
 * 本プラグインはMITライセンスのもとで公開しています。
 * This plugin is released under the MIT License.
 * 
 * Copyright (c) 2017 Futokoro
 * http://opensource.org/licenses/mit-license.php
 * 
 * 
 *-----------------------------------------------------------------------------
 * 変更来歴
 *-----------------------------------------------------------------------------
 * 
 * v1.1.0 - 2017/05/11 : 不具合修正、タグ変更、ヘルプ修正
 * 
 * v1.0.1 - 2017/04/29 : FTKR_ItemSelfVariables の v1.1.0以降に対応
 *    1. ダメージ量の参照用コードを変更。
 * 
 * v1.0.0 - 2017/04/14 : 初版公開
 * 
 *-----------------------------------------------------------------------------
 */
//=============================================================================


//=============================================================================
// プラグイン パラメータ
//=============================================================================
FTKR.EIE.parameters = PluginManager.parameters('FTKR_ExItemConfig_Effect');

//=============================================================================
// 自作関数(グローバル)
//=============================================================================

FTKR.gameData = FTKR.gameData || {
    user   :null,
    target :null,
    item   :null,
    number :0,
};

if (!FTKR.setGameData) {
FTKR.setGameData = function(user, target, item, number) {
    FTKR.gameData = {
        user   :user || null,
        target :target || null,
        item   :item || null,
        number :number || 0
    };
};
}

if (!FTKR.evalFormula) {
FTKR.evalFormula = function(formula) {
    var datas = FTKR.gameData;
    try {
        var s = $gameSwitches._data;
        var v = $gameVariables._data;
        var a = datas.user;
        var b = datas.target;
        var item   = datas.item;
        var number = datas.number;
        if (b) var result = b.result();
        var value = eval(formula);
        if (isNaN(value)) value = 0;
        return value;
    } catch (e) {
        console.error(e);
        return 0;
    }
};
}

//=============================================================================
// 自作関数(ローカル)
//=============================================================================

var readEntrapmentCodeToTextEx = function(obj, codeTitles) {
    regs = convertEntrapmentRegArrayEx('EIC ', codeTitles);
    var notedata = obj.note.split(/[\r\n]+/);
    var setMode = 'none';
    var results = [];

    for (var i = 0; i < notedata.length; i++) {
        var line = notedata[i];
        if (matchRegs(line, regs, 'start')) {
            var data = {
                id:RegExp.$1,
                text:''
            };
            setMode = 'read';
        } else if (matchRegs(line, regs, 'end')) {
            setMode = 'none';
            results.push(data);
        } else if (setMode === 'read') {
            data.text += line + ';';
        }
    }
    return results;
};

var convertRegs = function(metacodes) {
    return metacodes.map(function(metacode){
        return new RegExp(metacode + ':[ ]*(.+)', 'i');
    });
};

var convertEntrapmentRegArrayEx = function(header, codeTitles) {
    return codeTitles.map(function(codeTitle) {
        return {
            start:new RegExp('<' + header + codeTitle + ':[ ]*(.+)>', 'i'),
            end  :new RegExp('<\/' + header + codeTitle + '>', 'i')
        };
    });
};

var matchRegs = function(data, regs, prop) {
    return regs.some(function(reg){
        return prop ? data.match(reg[prop]) : data.match(reg);
    });
};

var matchTexts = function(data, texts, prop) {
    return convertRegs(texts).some(function(reg){
        return prop ? data.match(reg[prop]) : data.match(reg);
    });
};

//=============================================================================
// DataManager
//=============================================================================

FTKR.EIE.DatabaseLoaded = false;
FTKR.EIE.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!FTKR.EIE.DataManager_isDatabaseLoaded.call(this)) return false;
    if (!FTKR.EIE.DatabaseLoaded) {
        this.eicEffectNotetags($dataSkills);
        this.eicEffectNotetags($dataItems);
        FTKR.EIE.DatabaseLoaded = true;
    }
    return true;
};

DataManager.eicEffectNotetags = function(group) {
    for (var n = 1; n < group.length; n++) {
        var obj = group[n];
        this.setEicEffectData(obj);
        var datas = readEntrapmentCodeToTextEx(obj, ['使用効果', 'EFFECT']);
        this.readEicEffectMetaDatas(obj, datas);
    }
};

DataManager.setEicEffectData = function(obj) {
    obj.effects.forEach( function(effect) {
        effect.target = '';
        effect.baseValue1 = effect.value1;
        effect.baseValue2 = effect.value2;
        effect.sepValue1 = '';
        effect.sepValue2 = '';
        effect.enabled = '';
    });
};

DataManager.readEicEffectMetaDatas = function(obj, metaDatas) {
    for (var t = 0; t < metaDatas.length; t++) {
        var dataId = Number(metaDatas[t].id);
        var datas = metaDatas[t].text.split(';');
        for (var i = 0; i < datas.length; i++) {
            var data = datas[i];
            if (matchTexts(data, ['対象', 'TARGET'])) {
                obj.effects[dataId].target = RegExp.$1;
            } else if (matchTexts(data, ['内容1', 'VALUE1'])) {
                obj.effects[dataId].sepValue1 = RegExp.$1;
            } else if (matchTexts(data, ['内容2', 'VALUE2'])) {
                obj.effects[dataId].sepValue2 = RegExp.$1;
            } else if (matchTexts(data, ['有効条件', 'ENABLED'])) {
                obj.effects[dataId].enabled = RegExp.$1;
            }
        }
    }
};
/*
DataManager.eieEffectIdNoteTags = function(group) {
    var note1a = /<(?:EIC_使用効果):[ ]*(\d+)>/i;
    var note1aj = /<(?:EIC_EFFECT):[ ]*(\d+)>/i;
    var note1b = /<\/(?:EIC_使用効果)>/i;
    var note1bj = /<\/(?:EIC_EFFECT)>/i;

    for (var n = 1; n < group.length; n++) {
        var obj = group[n];
        var notedata = obj.note.split(/[\r\n]+/);

        var setMode = 'none';
        obj.eieEffects = [];

        for (var i = 0; i < notedata.length; i++) {
            var line = notedata[i];
            if (line.match(note1a) || line.match(note1aj)) {
                var data = {
                  id:Number(RegExp.$1),
                  text:''
                };
                setMode = 'anydata';
            } else if (note1b.test(line) || note1bj.test(line)) {
                setMode = 'none';
                obj.eieEffects.push(data);
            } else if (setMode === 'anydata') {
                data.text += line + ';';
            }
        }
        this.makeEieData(obj);
        obj.eieEffects = [];
    }
};

DataManager.makeEieData = function(item) {
    this.makeSepEffectsBase(item);
    this.setSepEffects(item);
};

DataManager.makeSepEffectsBase = function(item) {
    item.effects.forEach( function(effect) {
        effect.target = '';
        effect.baseValue1 = effect.value1;
        effect.baseValue2 = effect.value2;
        effect.sepValue1 = '';
        effect.sepValue2 = '';
        effect.enabled = '';
    });
};

DataManager.setSepEffects = function(item) {
    for (var t = 0; t < item.eieEffects.length; t++) {
        var sepdata = item.eieEffects[t];
        if (sepdata) {
            var case1 = /(?:TARGET):[ ]*(.+)/i;
            var case1j = /(?:対象):[ ]*(.+)/i;
            var case2 = /(?:VALUE1):[ ]*(.+)/i;
            var case2j = /(?:内容1):[ ]*(.+)/i;
            var case3 = /(?:VALUE2):[ ]*(.+)/i;
            var case3j = /(?:内容2):[ ]*(.+)/i;
            var case5 = /(?:ENABLED):[ ]*(.+)/i;
            var case5j = /(?:有効条件):[ ]*(.+)/i;

            var datas = sepdata.text.split(';');
            for (var i = 0; i < datas.length; i++) {
                var data = datas[i];
                var dataId = sepdata.id;
                if (data.match(case1) || data.match(case1j)) {
                    item.effects[dataId].target = String(RegExp.$1);
                } else if(data.match(case2) || data.match(case2j)) {
                    item.effects[dataId].sepValue1 = String(RegExp.$1);
                } else if(data.match(case3) || data.match(case3j)) {
                    item.effects[dataId].sepValue2 = String(RegExp.$1);
                } else if(data.match(case5) || data.match(case5j)) {
                    item.effects[dataId].enabled = String(RegExp.$1);
                }
            }
        }
    }
};
*/
//=============================================================================
// BattleManager
//=============================================================================

FTKR.EIE.BattleManager_invokeNormalAction = BattleManager.invokeNormalAction;
BattleManager.invokeNormalAction = function(subject, target) {
    FTKR.EIE.BattleManager_invokeNormalAction.call(this, subject, target);
    var effectTarget = this._action._targetSepEffect;
    if(effectTarget) this._logWindow.displayActionSepResults(subject, effectTarget);
};


//=============================================================================
// Game_Action
//=============================================================================

FTKR.EIE.Game_Action_initialize = Game_Action.prototype.initialize;
Game_Action.prototype.initialize = function(subject, forcing) {
    FTKR.EIE.Game_Action_initialize.call(this, subject, forcing);
    this._target = {};
    this._targetSepEffect = null;
};

FTKR.EIE.Game_Action_applyItemEffect = Game_Action.prototype.applyItemEffect;
Game_Action.prototype.applyItemEffect = function(target, effect) {
    if (effect) {
        target = this.changeTargetEffect(target, effect);
        if (this.evalEffectEnabled(effect, target)) {
            this.setSepEffectValue();
            FTKR.EIE.Game_Action_applyItemEffect.call(this, target, effect);
        }
    }
};

Game_Action.prototype.evalEffectEnabled = function(effect, target) {
    FTKR.setGameData(this.subject(), target, this.item());
    return !effect.enabled ? true: FTKR.evalFormula(effect.enabled);
};

Game_Action.prototype.changeTargetEffect = function(target, effect) {
    this._target = target;
    if (effect.target) {
        switch (effect.target) {
            case 'user':
                this._targetSepEffect = this.subject();
                this._targetSepEffect.result().used = true;
                return this._targetSepEffect;
            case 'randomOpponents':
                this._targetSepEffect = this.changeTargetForRandom(target.isEnemy());
                this._targetSepEffect.result().used = true;
                return this._targetSepEffect;
            case 'randomFriends':
                this._targetSepEffect = this.changeTargetForRandom(!target.isEnemy());
                this._targetSepEffect.result().used = true;
                return this._targetSepEffect;
        }
    }
    return target;
};

Game_Action.prototype.changeTargetForRandom = function(isEnemy) {
    return isEnemy ? $gameTroop.randomTarget() : $gameParty.randomTarget();
};

Game_Action.prototype.setSepEffectValue = function() {
    if(this.item()) {
        FTKR.setGameData(this.subject(), this._target, this.item());
        this.item().effects.forEach(function(effect) {
            effect.value1 = this.setSepEffectValue1(effect);
            effect.value2 = this.setSepEffectValue2(effect);
        }, this);
    }
};

Game_Action.prototype.setSepEffectValue1 = function(effect) {
    return effect.sepValue1 ? FTKR.evalFormula(effect.sepValue1) : effect.baseValue1;
};

Game_Action.prototype.setSepEffectValue2 = function(effect) {
    return effect.sepValue2 ? FTKR.evalFormula(effect.sepValue2) : effect.baseValue2;
};

//=============================================================================
// Window_BattleLog
//=============================================================================

Window_BattleLog.prototype.displayActionSepResults = function(subject, target) {
    if (target.result().used) {
        this.push('pushBaseLine');
        this.displayCritical(target);
        this.push('popupDamage', target);
        this.displayDamage(target);
        this.displayAffectedStatus(target);
        this.displayFailure(target);
        this.push('waitForNewLine');
        this.push('popBaseLine');
    }
};
