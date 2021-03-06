//=============================================================================
// アクターのステータス表示を変更するプラグイン
// FTKR_CustomSimpleActorStatus.js
// 作成者     : フトコロ
// 作成日     : 2017/03/09
// 最終更新日 : 2017/04/15
// バージョン : v1.2.5
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_CSS = true;

var FTKR = FTKR || {};
FTKR.CSS = FTKR.CSS || {};

//=============================================================================
/*:
 * @plugindesc v1.2.5 アクターのステータス表示を変更するプラグイン
 * @author フトコロ
 *
 * @param --Simple status--
 * @default
 * 
 * @param Enabled Simple Status
 * @desc 簡易ステータス画面のレイアウト変更機能を使うか。
 * 0 - 無効, 1 - 有効
 * @default 1
 * 
 * @param Actor Status Text1
 * @desc Text1部に表示するステータスを指定します。
 * 詳細はヘルプ参照
 * @default face
 * 
 * @param Actor Status Text2
 * @desc Text2部に表示するステータスを指定します。
 * 詳細はヘルプ参照
 * @default name,level,state
 * 
 * @param Actor Status Text3
 * @desc Text3部に表示するステータスを指定します。
 * 詳細はヘルプ参照
 * @default class,hp,mp
 * 
 * @param Actor Status Space
 * @desc 各Textの間隔を指定します。
 * @default 0,20,50,0
 * 
 * @param Actor Status Space In Text
 * @desc Text内で複数表示する場合の間隔を指定します。
 * @default 5
 * 
 * @param Actor Status Width Rate
 * @desc Text1~Text3の表示幅の比率を指定します。
 * 詳細はヘルプ参照
 * @default 2,2,3
 *
 * @param Display Face Scale
 * @desc アクターの顔画像を表示スケールを設定します
 * 標準は 4 で、それ以外の場合に画像を拡大縮小します
 * @default 4
 * 
 * @param --Detailed status--
 * @default
 * 
 * @param Enabled Detailed Status
 * @desc 詳細ステータス画面のレイアウト変更機能を使うか。
 * 0 - 無効, 1 - 有効
 * @default 0
 * 
 * @param DS Lines Number
 * @desc 各表示エリアの行数を指定します。
 * 詳細はヘルプ参照
 * @default 1,4,6,2
 * 
 * @param DS Horz Line Color
 * @desc 各表示エリア間の線色を指定します。
 * -1 は非表示
 * @default 0
 * 
 * @param DS Horz Line Thick
 * @desc 各表示エリア間の線幅を指定します。
 * @default 2
 * 
 * @param DS Horz Line Opacity
 * @desc 各表示エリア間の線色の透明度を指定します。
 * @default 48
 * 
 * @param DS Line0 Status
 * @desc Line0部に表示するステータスを指定します。
 * 詳細はヘルプ参照
 * @default name;class;nickname
 * 
 * @param DS Space0
 * @desc 各Textの間隔を指定します。
 * @default 0,20,50,0
 * 
 * @param DS Space In Text0
 * @desc Text内で複数表示する場合の間隔を指定します。
 * @default 5
 * 
 * @param DS Width Rate0
 * @desc Text1~Text3の表示幅の比率を指定します。
 * 詳細はヘルプ参照
 * @default 1,1,1
 *
 * @param DS Line1 Status
 * @desc Line0部に表示するステータスを指定します。
 * 詳細はヘルプ参照
 * @default face;level,state,hp,mp;custom(0),custom(1),custom(2),custom(3)
 * 
 * @param DS Space1
 * @desc 各Textの間隔を指定します。
 * @default 0,20,50,0
 * 
 * @param DS Space In Text1
 * @desc Text内で複数表示する場合の間隔を指定します。
 * @default 5
 * 
 * @param DS Width Rate1
 * @desc Text1~Text3の表示幅の比率を指定します。
 * 詳細はヘルプ参照
 * @default 2,2,3
 *
 * @param DS Line2 Status
 * @desc Line0部に表示するステータスを指定します。
 * 詳細はヘルプ参照
 * @default param(2),param(3),param(4),param(5),param(6),param(7);;equip(0),equip(1),equip(2),equip(3),equip(4)
 * 
 * @param DS Space2
 * @desc 各Textの間隔を指定します。
 * @default 40,100,0,0
 * 
 * @param DS Space In Text2
 * @desc Text内で複数表示する場合の間隔を指定します。
 * @default 5
 * 
 * @param DS Width Rate2
 * @desc Text1~Text3の表示幅の比率を指定します。
 * 詳細はヘルプ参照
 * @default 4,1,5
 *
 * @param DS Line3 Status
 * @desc Line0部に表示するステータスを指定します。
 * 詳細はヘルプ参照
 * @default profile;;
 * 
 * @param DS Space3
 * @desc 各Textの間隔を指定します。
 * @default 0,20,50,0
 * 
 * @param DS Space In Text3
 * @desc Text内で複数表示する場合の間隔を指定します。
 * @default 5
 * 
 * @param DS Width Rate3
 * @desc Text1~Text3の表示幅の比率を指定します。
 * 詳細はヘルプ参照
 * @default 1,0,0
 *
 * @param Display DS Face Scale
 * @desc アクターの顔画像を表示スケールを設定します
 * 標準は 4 で、それ以外の場合に画像を拡大縮小します
 * @default 4
 * 
 * @param --Chara Setting--
 * @default
 * 
 * @param Chara Image Width
 * @desc アクターの歩行キャラの画像幅を設定します
 * デフォルトは48
 * @default 48
 * 
 * @param Chara Image Height
 * @desc アクターの歩行キャラの画像高さを設定します
 * デフォルトは48
 * @default 48
 * 
 * @param --Sv Setting--
 * @default
 * 
 * @param Sv Image Width
 * @desc アクターのSVキャラの画像幅を設定します
 * デフォルトは64
 * @default 64
 * 
 * @param Sv Image Height
 * @desc アクターのSvキャラの画像高さを設定します
 * デフォルトは64
 * @default 64
 * 
 * @param Sv Image Motion
 * @desc Svキャラの標準モーションを設定します
 * @default wait
 * 
 * @param Sv Motion Loop
 * @desc 表示モーションをループさせるか設定します
 * 0 - ループさせない, 1 - ループさせる
 * @default 1
 * 
 * @param Enabled State Motion
 * @desc ステートモーションを有効にするか設定します
 * 0 - 無効, 1 - 有効
 * @default 1
 * 
 * @param --Custom Param 0--
 * @default
 * 
 * @param Custom 0 Display Name
 * @desc Custom(0)の表示名を設定します
 * @default \c[16]現在の経験値
 * 
 * @param Custom 0 References
 * @desc Custom(0)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param --Custom Param 1--
 * @default
 * 
 * @param Custom 1 Display Name
 * @desc Custom(1)の表示名を設定します
 * @default 
 * 
 * @param Custom 1 References
 * @desc Custom(1)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default a.currentExp()
 * 
 * @param --Custom Param 2--
 * @default
 * 
 * @param Custom 2 Display Name
 * @desc Custom(2)の表示名を設定します
 * @default \c[16]次のレベルまで
 * 
 * @param Custom 2 References
 * @desc Custom(2)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param --Custom Param 3--
 * @default
 * 
 * @param Custom 3 Display Name
 * @desc Custom(3)の表示名を設定します
 * @default 
 * 
 * @param Custom 3 References
 * @desc Custom(3)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default a.nextRequiredExp()
 * 
 * @param --Custom Param 4--
 * @default
 * 
 * @param Custom 4 Display Name
 * @desc Custom(4)の表示名を設定します
 * @default 
 * 
 * @param Custom 4 References
 * @desc Custom(4)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param --Custom Param 5--
 * @default
 * 
 * @param Custom 5 Display Name
 * @desc Custom(5)の表示名を設定します
 * @default 
 * 
 * @param Custom 5 References
 * @desc Custom(5)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param --Custom Param 6--
 * @default
 * 
 * @param Custom 6 Display Name
 * @desc Custom(6)の表示名を設定します
 * @default 
 * 
 * @param Custom 6 References
 * @desc Custom(6)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param --Custom Param 7--
 * @default
 * 
 * @param Custom 7 Display Name
 * @desc Custom(7)の表示名を設定します
 * @default 
 * 
 * @param Custom 7 References
 * @desc Custom(7)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param --Custom Param 8--
 * @default
 * 
 * @param Custom 8 Display Name
 * @desc Custom(8)の表示名を設定します
 * @default 
 * 
 * @param Custom 8 References
 * @desc Custom(8)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param --Custom Param 9--
 * @default
 * 
 * @param Custom 9 Display Name
 * @desc Custom(9)の表示名を設定します
 * @default 
 * 
 * @param Custom 9 References
 * @desc Custom(9)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param --Custom Param 10--
 * @default
 * 
 * @param Custom 10 Display Name
 * @desc Custom(10)の表示名を設定します
 * @default 
 * 
 * @param Custom 10 References
 * @desc Custom(10)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param --Custom Param 11--
 * @default
 * 
 * @param Custom 11 Display Name
 * @desc Custom(11)の表示名を設定します
 * @default 
 * 
 * @param Custom 11 References
 * @desc Custom(11)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param --Custom Param 12--
 * @default
 * 
 * @param Custom 12 Display Name
 * @desc Custom(12)の表示名を設定します
 * @default 
 * 
 * @param Custom 12 References
 * @desc Custom(12)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param --Custom Param 13--
 * @default
 * 
 * @param Custom 13 Display Name
 * @desc Custom(13)の表示名を設定します
 * @default 
 * 
 * @param Custom 13 References
 * @desc Custom(13)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param --Custom Param 14--
 * @default
 * 
 * @param Custom 14 Display Name
 * @desc Custom(14)の表示名を設定します
 * @default 
 * 
 * @param Custom 14 References
 * @desc Custom(14)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param --Custom Param 15--
 * @default
 * 
 * @param Custom 15 Display Name
 * @desc Custom(15)の表示名を設定します
 * @default 
 * 
 * @param Custom 15 References
 * @desc Custom(15)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param --Custom Param 16--
 * @default
 * 
 * @param Custom 16 Display Name
 * @desc Custom(16)の表示名を設定します
 * @default 
 * 
 * @param Custom 16 References
 * @desc Custom(16)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param --Custom Param 17--
 * @default
 * 
 * @param Custom 17 Display Name
 * @desc Custom(17)の表示名を設定します
 * @default 
 * 
 * @param Custom 17 References
 * @desc Custom(17)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param --Custom Param 18--
 * @default
 * 
 * @param Custom 18 Display Name
 * @desc Custom(18)の表示名を設定します
 * @default 
 * 
 * @param Custom 18 References
 * @desc Custom(18)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param --Custom Param 19--
 * @default
 * 
 * @param Custom 19 Display Name
 * @desc Custom(19)の表示名を設定します
 * @default 
 * 
 * @param Custom 19 References
 * @desc Custom(19)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param --Gauge Param 0--
 * @default
 * 
 * @param Gauge 0 Display Name
 * @desc Gauge(0)の表示名を設定します
 * @default EXP
 * 
 * @param Gauge 0 Current
 * @desc Gauge(0)の現在値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default a.currentExp()
 * 
 * @param Gauge 0 Max
 * @desc Gauge(0)の最大値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default a.nextLevelExp()
 * 
 * @param Gauge 0 Color1
 * @desc Gauge(0)のゲージの色1を設定します。
 * @default 17
 * 
 * @param Gauge 0 Color2
 * @desc Gauge(0)のゲージの色2を設定します。
 * @default 6
 * 
 * @param --Gauge Param 1--
 * @default
 * 
 * @param Gauge 1 Display Name
 * @desc Gauge(1)の表示名を設定します
 * @default 
 * 
 * @param Gauge 1 Current
 * @desc Gauge(1)の現在値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Gauge 1 Max
 * @desc Gauge(1)の最大値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Gauge 1 Color1
 * @desc Gauge(1)のゲージの色1を設定します。
 * @default 
 * 
 * @param Gauge 1 Color2
 * @desc Gauge(1)のゲージの色2を設定します。
 * @default 
 * 
 * @param --Gauge Param 2--
 * @default
 * 
 * @param Gauge 2 Display Name
 * @desc Gauge(2)の表示名を設定します
 * @default 
 * 
 * @param Gauge 2 Current
 * @desc Gauge(2)の現在値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Gauge 2 Max
 * @desc Gauge(2)の最大値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Gauge 2 Color1
 * @desc Gauge(2)のゲージの色1を設定します。
 * @default 
 * 
 * @param Gauge 2 Color2
 * @desc Gauge(2)のゲージの色2を設定します。
 * @default 
 * 
 * @param --Gauge Param 3--
 * @default
 * 
 * @param Gauge 3 Display Name
 * @desc Gauge(3)の表示名を設定します
 * @default 
 * 
 * @param Gauge 3 Current
 * @desc Gauge(3)の現在値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Gauge 3 Max
 * @desc Gauge(3)の最大値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Gauge 3 Color1
 * @desc Gauge(3)のゲージの色1を設定します。
 * @default 
 * 
 * @param Gauge 3 Color2
 * @desc Gauge(3)のゲージの色2を設定します。
 * @default 
 * 
 * @param --Gauge Param 4--
 * @default
 * 
 * @param Gauge 4 Display Name
 * @desc Gauge(4)の表示名を設定します
 * @default 
 * 
 * @param Gauge 4 Current
 * @desc Gauge(4)の現在値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Gauge 4 Max
 * @desc Gauge(4)の最大値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Gauge 4 Color1
 * @desc Gauge(4)のゲージの色1を設定します。
 * @default 
 * 
 * @param Gauge 4 Color2
 * @desc Gauge(4)のゲージの色2を設定します。
 * @default 
 * 
 * @param --Gauge Param 5--
 * @default
 * 
 * @param Gauge 5 Display Name
 * @desc Gauge(5)の表示名を設定します
 * @default 
 * 
 * @param Gauge 5 Current
 * @desc Gauge(5)の現在値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Gauge 5 Max
 * @desc Gauge(5)の最大値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Gauge 5 Color1
 * @desc Gauge(5)のゲージの色1を設定します。
 * @default 
 * 
 * @param Gauge 5 Color2
 * @desc Gauge(5)のゲージの色2を設定します。
 * @default 
 * 
 * @param --Gauge Param 6--
 * @default
 * 
 * @param Gauge 6 Display Name
 * @desc Gauge(6)の表示名を設定します
 * @default 
 * 
 * @param Gauge 6 Current
 * @desc Gauge(6)の現在値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Gauge 6 Max
 * @desc Gauge(6)の最大値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Gauge 6 Color1
 * @desc Gauge(6)のゲージの色1を設定します。
 * @default 
 * 
 * @param Gauge 6 Color2
 * @desc Gauge(6)のゲージの色2を設定します。
 * @default 
 * 
 * @param --Gauge Param 7--
 * @default
 * 
 * @param Gauge 7 Display Name
 * @desc Gauge(7)の表示名を設定します
 * @default 
 * 
 * @param Gauge 7 Current
 * @desc Gauge(7)の現在値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Gauge 7 Max
 * @desc Gauge(7)の最大値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Gauge 7 Color1
 * @desc Gauge(7)のゲージの色1を設定します。
 * @default 
 * 
 * @param Gauge 7 Color2
 * @desc Gauge(7)のゲージの色2を設定します。
 * @default 
 * 
 * @param --Gauge Param 8--
 * @default
 * 
 * @param Gauge 8 Display Name
 * @desc Gauge(8)の表示名を設定します
 * @default 
 * 
 * @param Gauge 8 Current
 * @desc Gauge(8)の現在値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Gauge 8 Max
 * @desc Gauge(8)の最大値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Gauge 8 Color1
 * @desc Gauge(8)のゲージの色1を設定します。
 * @default 
 * 
 * @param Gauge 8 Color2
 * @desc Gauge(8)のゲージの色2を設定します。
 * @default 
 * 
 * @param --Gauge Param 9--
 * @default
 * 
 * @param Gauge 9 Display Name
 * @desc Gauge(9)の表示名を設定します
 * @default 
 * 
 * @param Gauge 9 Current
 * @desc Gauge(9)の現在値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Gauge 9 Max
 * @desc Gauge(9)の最大値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Gauge 9 Color1
 * @desc Gauge(9)のゲージの色1を設定します。
 * @default 
 * 
 * @param Gauge 9 Color2
 * @desc Gauge(9)のゲージの色2を設定します。
 * @default 
 * 
 * @help
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 本プラグインを実装することで、メニューや、スキル画面で表示するアクターの
 * ステータス表示のレイアウトを変更できます。
 * 
 * v1.1以降、詳細ステータス画面のレイアウトも変更できます。
 * なお、この機能はプラグインパラメータでON/OFFできます。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
 *    ください。
 * 
 * 
 *-----------------------------------------------------------------------------
 * アクターの簡易ステータス表示の設定
 *-----------------------------------------------------------------------------
 * プラグインパラメータの設定により、メニュー画面およびスキル画面で表示する
 * 簡易ステータスの表示レイアウトを変更することができます。
 * 
 * <Enabled Simple Status>
 *    :簡易ステータス画面のレイアウト変更機能を使うか指定します。
 *    :0 - 無効, 1 - 有効
 * 
 * <Actor Status Text1>
 * <Actor Status Text2>
 * <Actor Status Text3>
 *    :ステータスウィンドウは、表示の処理を縦に3分割で分けています。
 *    :Text1~Text3が、それぞれ左側、中央、右側の表示に相当します。
 *    :各パラメータに入力したステータスが、それぞれの部位で表示します。
 *    :
 *    :入力できるパラメータ名は、
 *    :face, chara, sv, name, class, nickname, hp, mp, tp, level, 
 *    :state, state2(x), profile, param(x), custom(x), gauge(x), 
 *    :equip(x), text(x), imageです。
 *    :
 *    :state, state2(x) - 
 *    : アクターが付与されているステートを並べて表示します。
 *    : state は横に、state2(x)は縦にx行 並べます。
 *    :
 *    :profile - 
 *    : アクターのプロフィール文を表示します。
 *    : 制御文字が使用できます。
 *    :
 *    :param(x) -
 *    : x は 0 ~ 7 の値を指定します。
 *    : 指定した x の値に従い、下記のパラメータを表示します。
 *    : 0 - 最大HP、1 - 最大MP、2 - 攻撃力、3 - 防御力、4 - 魔法攻撃、
 *    : 5 - 魔法防御、6 - 敏捷性、7 - 運
 *    : パラメータの名称は、データベースの用語で登録した文字列を使用します。
 *    :
 *    :custom(x) -
 *    : x は 0 ~ 19 の値を指定します。
 *    : プラグインパラメータの Custom Param x で設定したパラメータを表示します。
 *    :
 *    :gauge(x) -
 *    : x は 0 ~ 9 の値を指定します。
 *    : プラグインパラメータの Gauge Param x で設定したパラメータを表示します。
 *    :
 *    :equip(x) -
 *    : x は 装備タイプを指定します。
 *    : 該当する装備タイプの武器・防具のアイコンおよび名前を表示します。
 *    : 装備していない場合は、空欄を表示します。
 *    :
 *    :text(x) -
 *    : 文字列 x を表示します。
 *    : 制御文字が使用できます。
 *    :
 *    :image - 
 *    : アクターのメモ欄で設定した画像を表示します。
 *    :
 *    :カンマ(,)で区切って複数のパラメータを入力した場合は、
 *    :行を変えてそれぞれのパラメータを表示します。
 *    :表示に必要な行数は、 faceが4、charaとsvが2、それ以外が1行です。
 *    :
 *    :角括弧[]を使用することで、複数のステータスを1つの行内に表示する
 *    :ことができます。
 *    :角括弧内では、スラッシュ(/)でパラメータを区切ってください。
 *    :入力例)
 *    : class,[hp/mp],tp
 *    :  - 1行目にクラス名を表示し、2行目にHPとMPを表示、3行目にTPを表示する。
 *    :
 *    :波括弧{}を使用することで、括弧内のステータスをすべての列を使用して
 *    :表示させることができます。
 *    :入力例) Text1に以下を入力
 *    : {name},hp,mp
 *    :  - 1行目すべて(Text1~Text3の表示エリア)を使ってアクター名を表示し
 *    :    2行目と3行目はText1の表示エリア内で表示します。
 * 
 * <Actor Status Space>
 *    :各Textの間隔をカンマ(,)で区切って指定します。単位はpixelです。
 *    :入力例)
 *    : 10,20,30,40
 *    : - 左端からText1までの間隔を10、Text1とText2の間隔を20、
 *    :   Text2とText3の間隔を30、Text3から右端までの間隔を40に設定します。
 * 
 * <Actor Status Space In Text>
 *    :角括弧[]を使用して、複数のステータスを1つのText内に表示した場合の間隔を
 *    :指定します。単位はpixelです。
 * 
 * <Actor Status Width Rate>
 *    :ウィンドウを3分割する場合に、Text1~Text3の表示エリアをどのような比率で
 *    :確保するか設定します。
 *    :それぞれの比率を、カンマ(,)で区切って入力します。
 *    : 0 を入力した部位は、表示しません。
 *    :入力例)
 *    : 1,1,1 - 3等分します。それぞれの表示サイズは同じです。
 *    : 1,1,0 - Text1とText2だけで2等分します。Text3のサイズは 0 になり
 *    :         表示しません。
 *    : 2,1,1 - Text1で全体の半分を使用します。
 *    :         Text2とText3で残りの半分を2等分します。
 * 
 * <Display Face Scale>
 *    :アクターの顔画像を表示スケールを設定します。
 *    :正確には、ウィンドウの行数の何行分で表示するかを設定します。
 *    :標準は 4行 で、それ以外の場合に画像を拡大縮小します。
 *    :
 *    :3以下にすることで、表示に必要な行数を減らすことが出来ます。
 * 
 * 
 *-----------------------------------------------------------------------------
 * アクターの詳細ステータス表示の設定
 *-----------------------------------------------------------------------------
 * プラグインパラメータの設定により、ステータス画面で表示する表示レイアウトを
 * 変更することができます。
 * 
 * <Enabled Detailed Status>
 *    :詳細ステータス画面のレイアウト変更機能を使うか指定します。
 *    :0 - 無効, 1 - 有効
 * 
 * <DS Lines Number>
 *    :詳細ステータスウィンドウは、表示エリアを横に4分割で分けています。
 *    :このパラメータで何行ごとに分割するかを、カンマ(,)で区切って指定します。
 *    :入力例)
 *    : 1,4,6,2
 * 
 * <DS Horz Line Color>
 *    :表示エリア間のラインの線色を設定します。
 *    :-1 はラインが無くなり、表示エリアがその分上にずれます。
 * 
 * <DS Horz Line Thick>
 *    :表示エリア間のラインの線幅を設定します。
 *    :幅を 0 にしても非表示になるだけで、表示エリアはずれません。
 * 
 * <DS Horz Line Opacity>
 *    :表示エリア間のラインの線の透明度を設定します。
 *    :透明度を 0 にしても非表示になるだけで、表示エリアはずれません。
 * 
 * <DS Line0 Status>
 * <DS Line1 Status>
 * <DS Line2 Status>
 * <DS Line3 Status>
 *    :横に4分割した表示エリアをそれぞれLine0 ~ Line3として、
 *    :それぞれのエリアで表示するパラメータを設定します。
 *    :
 *    :セミコロン(;)を使用して、左側、中央、右側の表示内容を区切ります。
 *    :<Actor Status>における、Text1(左側)、Text2(中央)、Text3(右側)に
 *    :相当します。
 *    :
 *    :セミコロン(;)で区切った間の入力方式は、<Actor Status Text*>と同じです。
 *    :入力例)
 *    : name;class;level,hp,mp
 *    : - 左側に name を表示します。
 *    :   中央に class を表示します。
 *    :   右側に level,hp,mp を縦に並べて表示します。
 * 
 * <DS Space0>
 * <DS Space1>
 * <DS Space2>
 * <DS Space3>
 *    :各Lineにおけるのテキストの間隔をカンマ(,)で区切って指定します。
 *    :入力方式は、<Actor Status Space>と同じです。
 * 
 * <DS Space In Text0>
 * <DS Space In Text1>
 * <DS Space In Text2>
 * <DS Space In Text3>
 *    :各Lineにおける、複数のステータスを1つのテキスト内に表示した場合の
 *    :間隔を指定します。
 *    :入力方式は、<Actor Status Space In text>と同じです。
 * 
 * <DS Width Rate0>
 * <DS Width Rate1>
 * <DS Width Rate2>
 * <DS Width Rate3>
 *    :ウィンドウを3分割する場合に、Text1~Text3の表示エリアをどのような比率で
 *    :確保するか設定します。
 *    :入力方式は、<Actor Status Width Rate>と同じです。
 * 
 * <Display DS Face Scale>
 *    :アクターの顔画像を表示スケールを設定します。
 * 
 * 
 *-----------------------------------------------------------------------------
 * キャラクタ画像の設定 [ chara ]
 *-----------------------------------------------------------------------------
 * プラグインパラメータ<Actor Status Text*>にて、'chara'を入力した場合
 * アクターのキャラクタ画像(歩行キャラ)を表示します。
 * キャラクタ画像について、以下のパラメータで設定を変更できます。
 * 
 * <Chara Image Width>
 * <Chara Image Height>
 *    :アクターのキャラクタ画像のサイズを設定します。
 *    :標準では48*48の画像を使用していますが、それ以外のサイズの
 *    :キャラ画像を使用している場合に、設定値を変えてください。
 * 
 * 
 *-----------------------------------------------------------------------------
 * SVキャラクタ画像の設定 [ sv ]
 *-----------------------------------------------------------------------------
 * プラグインパラメータ<Actor Status Text*>にて、'sv'を入力した場合
 * アクターのSVキャラクタ画像(SV戦闘キャラ)を表示します。
 * SVキャラクタ画像について、以下のパラメータで設定を変更できます。
 * 
 * <Sv Image Width>
 * <Sv Image Height>
 *    :アクターのSVキャラクタ画像のサイズを設定します。
 *    :標準では64*64の画像を使用していますが、それ以外のサイズの
 *    :キャラ画像を使用している場合に、設定値を変えてください。
 * 
 * <Sv Image Motion>
 *    :標準で表示するモーションを設定します。
 *    :入力するパラメータ名は、以下から選択できます。
 *    : walk, wait, chant, guard, damage, evade, thrust, swing,
 *    : missile, skill, spell, item, escape, victory, dying,
 *    : abnormal, sleep, dead
 * 
 * <Sv Motion Loop>
 *    :一部のループしないモーションに対して、表示モーションを
 *    :ループさせるか設定します。
 *    :0 - ループさせない, 1 - ループさせる
 * 
 * <Enabled State Motion>
 *    :ステートモーションを有効にするか設定します。
 *    :0 - 無効, 1 - 有効
 *    :状態異常、戦闘不能、睡眠になっているキャラは、そのステートの
 *    :モーションが表示されます。
 * 
 * 
 *-----------------------------------------------------------------------------
 * カスタムパラメータの設定 [ custom(x) ]
 *-----------------------------------------------------------------------------
 * プラグインパラメータ<Actor Status Text*>にて、'custom(x)'を入力した場合
 * <Custom Param x>で設定したパラメータを表示することができます。
 * カスタムパラメータは、最大で20種類設定できます。
 * 
 * <Custom x Display Name>
 *    :パラメータの表示名を設定します。
 *    :表示名には制御文字が使用できます。
 * 
 * <Custom x References>
 *    :パラメータの値の参照先をeval値で設定します。
 * 
 * [eval の値について]
 * eval部は、ダメージ計算式のように、計算式を入力することで、固定値以外の値を
 * 使用することができます。以下のコードを使用できます。
 *  a.param - 使用者のパラメータを参照します。(a.hit で使用者の命中率)
 *  v[x]    - 変数ID x の値を参照します。
 *  s[x]    - スイッチID x の値を参照します。
 * 
 * 命中率のような百分率の値の場合、'a.hit'のように記述すると少数で表示します。
 * そのため、'a.hit * 100'や、'Math.parcent(a.hit)'などと記述して
 * 整数に変換するようにします。
 * 
 * 
 *-----------------------------------------------------------------------------
 * カスタムゲージの設定 [ gauge(x) ]
 *-----------------------------------------------------------------------------
 * プラグインパラメータ<Actor Status Text*>にて、'gauge(x)'を入力した場合
 * <Gauge Param x>で設定したゲージを表示することができます。
 * カスタムゲージは、最大で10種類設定できます。
 * 
 * <Gauge x Display Name>
 *    :ゲージの表示名を設定します。
 *    :表示名には制御文字が使用できます。
 * 
 * <Gauge x Current>
 *    :ゲージの現在値の参照先をeval値で設定します。
 * 
 * <Gauge x Max>
 *    :ゲージの最大値の参照先をeval値で設定します。
 * 
 * <Gauge x Color1>
 * <Gauge x Color2>
 *    :ゲージの色1と色2を設定します。
 *    :色1と色2の値を変えることで、HPゲージのようにグラデーションになります。
 * 
 * [eval の値について]
 * eval部は、ダメージ計算式のように、計算式を入力することで、固定値以外の値を
 * 使用することができます。以下のコードを使用できます。
 *  a.param - 使用者のパラメータを参照します。(a.hit で使用者の命中率)
 *  v[x]    - 変数ID x の値を参照します。
 *  s[x]    - スイッチID x の値を参照します。
 * 
 * 命中率のような百分率の値の場合、'a.hit'のように記述すると少数で表示します。
 * そのため、'a.hit * 100'や、'Math.parcent(a.hit)'などと記述して
 * 整数に変換するようにします。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 指定した画像を表示する [ image ]
 *-----------------------------------------------------------------------------
 * プラグインパラメータ<Actor Status Text*>にて、'image'を入力した場合
 * 以下のタグをアクターのメモ欄に追記することで、指定した画像を表示する
 * ことができます。
 * 
 * <CSS 画像>
 * code
 * </CSS 画像>
 * 
 * [code に使用できる項目]
 * Bgi Name: ImageName
 *    :表示させたい画像名を入力します。(*1)
 * 
 * 以下のタグで、画像を四角に切り取って表示することができます。
 * Bgi offset X: n
 *    :画像ファイルを四角に切り取る時の左上のX座標を入力します。
 * 
 * Bgi offset Y: n
 *    :画像ファイルを四角に切り取る時の左上のY座標を入力します。
 * 
 * Bgi width: n
 *    :画像ファイルを四角に切り取る時の幅を入力します。
 * 
 * Bgi height: n
 *    :画像ファイルを四角に切り取る時の高さを入力します。
* 
 * (*1)画像は、プロジェクトフォルダ内の/img/picture/に保存してください。
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
 * v1.2.5 - 2017/04/15 : 機能追加
 *    1. ステートアイコンの表示位置を微調整
 *    2. 行の高さに合わせてステートアイコンサイズを自動調整する機能を追加。
 * 
 * v1.2.4 - 2017/04/12 : 顔画像の縦横のサイズを合わせるように修正
 * 
 * v1.2.3 - 2017/04/11 : ヘルプ修正
 * 
 * v1.2.2 - 2017/04/11 : 機能追加
 *    1. 指定した画像を表示する機能を追加。
 *    2. 複数列を跨いで表示させる機能を追加。
 *    3. ステートを縦に並べて表示させる機能を追加。
 * 
 * v1.2.1 - 2017/04/01 : 機能削除、機能追加
 *    1. ステータスのparam(x)に対してMV標準の制御文字を使用できる機能を削除。
 *    2. カスタムパラメータを20個まで設定できるように変更。
 *    3. 詳細ステータス画面の表示エリア間のラインの線色、太さ、透明度を
 *       変更する機能を追加。
 *    4. 簡易ステータス画面の表示内容を変更する機能をON/OFFする
 *       プラグインパラメータを追加。
 * 
 * v1.2.0 - 2017/03/20 : 仕様変更
 *    1. ステートアイコンを並べて表示した時に表示エリア内に収まらない場合、
 *       アイコンを重ねて表示するように変更。
 *    2. ステータスのprofile、param(x)、custom(x)、gauge(x)、text(x)の表示に、
 *       MV標準の制御文字を使用できるように変更。
 * 
 * v1.1.1 - 2017/03/18 : 機能追加
 *    1. 詳細ステータスの表示内容を変更する機能をON/OFFする
 *       プラグインパラメータを追加。
 *    2. FTKR_SEP_ShowSkillStatus.jsと組み合わせている場合、プロフィール文に
 *       制御文字を使用できるように変更。
 *    3. ヘルプ内容を修正。
 * 
 * v1.1.0 - 2017/03/17 : 仕様変更、機能追加、不具合修正
 *    1. Text間のスペースを設定するプラグインパラメータの仕様を変更。
 *    2. 装備と好きな文字列を表示させるパラメータを追加。
 *    3. 詳細ステータスの表示内容を変更する機能を追加。
 *    4. カスタムパラメータとカスタムゲージを10個まで設定できるように変更。
 *    5. ニックネームが表示されない不具合を修正。
 * 
 * v1.0.3 - 2017/03/16 : 機能追加
 *    1. 表示名や値の参照先を自由に設定できるカスタムゲージの表示機能を追加。
 * 
 * v1.0.2 - 2017/03/16 : 機能追加
 *    1. <Actor Status Text>で、1行に複数のステータスを表示する機能を追加。
 * 
 * v1.0.1 - 2017/03/10 : 機能追加
 *    1. 攻撃力や防御力等のパラメータを表示できる機能を追加。
 *    2. 表示名や値の参照先を自由に設定できるカスタムパラメータの
 *       表示機能を追加。
 * 
 * v1.0.0 - 2017/03/09 : 初版作成
 * 
 *-----------------------------------------------------------------------------
 */
//=============================================================================

//=============================================================================
// プラグイン パラメータ
//=============================================================================
FTKR.CSS.parameters = PluginManager.parameters('FTKR_CustomSimpleActorStatus');

FTKR.CSS.enabledSS = Number(FTKR.CSS.parameters['Enabled Simple Status'] || 0);
FTKR.CSS.enabledDS = Number(FTKR.CSS.parameters['Enabled Detailed Status'] || 0);

//簡易ステータスオブジェクト
FTKR.CSS.simpleStatus = {
    text1:String(FTKR.CSS.parameters['Actor Status Text1'] || ''),
    text2:String(FTKR.CSS.parameters['Actor Status Text2'] || ''),
    text3:String(FTKR.CSS.parameters['Actor Status Text3'] || ''),
    space:String(FTKR.CSS.parameters['Actor Status Space'] || ''),
    spaceIn:Number(FTKR.CSS.parameters['Actor Status Space In Text'] || 0),
    widthRate:String(FTKR.CSS.parameters['Actor Status Width Rate'] || ''),
    faceLine:Number(FTKR.CSS.parameters['Display Face Scale'] || 0),
};

//詳細ステータスオブジェクト
FTKR.CSS.detailedStatus = {
    lineNum:String(FTKR.CSS.parameters['DS Lines Number'] || ''),
    horz:{
      thick:Number(FTKR.CSS.parameters['DS Horz Line Thick'] || 0),
      color:Number(FTKR.CSS.parameters['DS Horz Line Color'] || 0),
      opacity:Number(FTKR.CSS.parameters['DS Horz Line Opacity'] || 0),
    },
    line:[
      String(FTKR.CSS.parameters['DS Line0 Status'] || ''),
      String(FTKR.CSS.parameters['DS Line1 Status'] || ''),
      String(FTKR.CSS.parameters['DS Line2 Status'] || ''),
      String(FTKR.CSS.parameters['DS Line3 Status'] || ''),
    ],
    space:[
      String(FTKR.CSS.parameters['DS Space0'] || ''),
      String(FTKR.CSS.parameters['DS Space1'] || ''),
      String(FTKR.CSS.parameters['DS Space2'] || ''),
      String(FTKR.CSS.parameters['DS Space3'] || ''),
    ],
    spaceIn:[
      Number(FTKR.CSS.parameters['DS Space In Text0'] || 0),
      Number(FTKR.CSS.parameters['DS Space In Text1'] || 0),
      Number(FTKR.CSS.parameters['DS Space In Text2'] || 0),
      Number(FTKR.CSS.parameters['DS Space In Text3'] || 0),
    ],
    widthRate:[
      String(FTKR.CSS.parameters['DS Width Rate0'] || ''),
      String(FTKR.CSS.parameters['DS Width Rate1'] || ''),
      String(FTKR.CSS.parameters['DS Width Rate2'] || ''),
      String(FTKR.CSS.parameters['DS Width Rate3'] || ''),
    ],
    faceLine:Number(FTKR.CSS.parameters['Display DS Face Scale'] || 0),
};

//オリジナルステータス設定オブジェクト
FTKR.CSS.cssStatus = {
    chara:{
        width:Number(FTKR.CSS.parameters['Chara Image Width'] || 0),
        height:Number(FTKR.CSS.parameters['Chara Image Height'] || 0),
    },
    svChara:{
        width:Number(FTKR.CSS.parameters['Sv Image Width'] || 0),
        height:Number(FTKR.CSS.parameters['Sv Image Height'] || 0),
        motion:String(FTKR.CSS.parameters['Sv Image Motion'] || ''),
        loop:Number(FTKR.CSS.parameters['Sv Motion Loop'] || 0),
        state:Number(FTKR.CSS.parameters['Enabled State Motion'] || 0),
    },
    customs:[
        {name:String(FTKR.CSS.parameters['Custom 0 Display Name'] || ''),
          formula:String(FTKR.CSS.parameters['Custom 0 References'] || ''),},
        {name:String(FTKR.CSS.parameters['Custom 1 Display Name'] || ''),
          formula:String(FTKR.CSS.parameters['Custom 1 References'] || ''),},
        {name:String(FTKR.CSS.parameters['Custom 2 Display Name'] || ''),
          formula:String(FTKR.CSS.parameters['Custom 2 References'] || ''),},
        {name:String(FTKR.CSS.parameters['Custom 3 Display Name'] || ''),
          formula:String(FTKR.CSS.parameters['Custom 3 References'] || ''),},
        {name:String(FTKR.CSS.parameters['Custom 4 Display Name'] || ''),
          formula:String(FTKR.CSS.parameters['Custom 4 References'] || ''),},
        {name:String(FTKR.CSS.parameters['Custom 5 Display Name'] || ''),
          formula:String(FTKR.CSS.parameters['Custom 5 References'] || ''),},
        {name:String(FTKR.CSS.parameters['Custom 6 Display Name'] || ''),
          formula:String(FTKR.CSS.parameters['Custom 6 References'] || ''),},
        {name:String(FTKR.CSS.parameters['Custom 7 Display Name'] || ''),
          formula:String(FTKR.CSS.parameters['Custom 7 References'] || ''),},
        {name:String(FTKR.CSS.parameters['Custom 8 Display Name'] || ''),
          formula:String(FTKR.CSS.parameters['Custom 8 References'] || ''),},
        {name:String(FTKR.CSS.parameters['Custom 9 Display Name'] || ''),
          formula:String(FTKR.CSS.parameters['Custom 9 References'] || ''),},
        {name:String(FTKR.CSS.parameters['Custom 10 Display Name'] || ''),
          formula:String(FTKR.CSS.parameters['Custom 10 References'] || ''),},
        {name:String(FTKR.CSS.parameters['Custom 11 Display Name'] || ''),
          formula:String(FTKR.CSS.parameters['Custom 11 References'] || ''),},
        {name:String(FTKR.CSS.parameters['Custom 12 Display Name'] || ''),
          formula:String(FTKR.CSS.parameters['Custom 12 References'] || ''),},
        {name:String(FTKR.CSS.parameters['Custom 13 Display Name'] || ''),
          formula:String(FTKR.CSS.parameters['Custom 13 References'] || ''),},
        {name:String(FTKR.CSS.parameters['Custom 14 Display Name'] || ''),
          formula:String(FTKR.CSS.parameters['Custom 14 References'] || ''),},
        {name:String(FTKR.CSS.parameters['Custom 15 Display Name'] || ''),
          formula:String(FTKR.CSS.parameters['Custom 15 References'] || ''),},
        {name:String(FTKR.CSS.parameters['Custom 16 Display Name'] || ''),
          formula:String(FTKR.CSS.parameters['Custom 16 References'] || ''),},
        {name:String(FTKR.CSS.parameters['Custom 17 Display Name'] || ''),
          formula:String(FTKR.CSS.parameters['Custom 17 References'] || ''),},
        {name:String(FTKR.CSS.parameters['Custom 18 Display Name'] || ''),
          formula:String(FTKR.CSS.parameters['Custom 18 References'] || ''),},
        {name:String(FTKR.CSS.parameters['Custom 19 Display Name'] || ''),
          formula:String(FTKR.CSS.parameters['Custom 19 References'] || ''),},
    ],
    gauges:[
        {name:String(FTKR.CSS.parameters['Gauge 0 Display Name'] || ''),
          current:String(FTKR.CSS.parameters['Gauge 0 Current'] || ''),
          max:String(FTKR.CSS.parameters['Gauge 0 Max'] || ''),
          color1:Number(FTKR.CSS.parameters['Gauge 0 Color1'] || 0),
          color2:Number(FTKR.CSS.parameters['Gauge 0 Color2'] || 0),},
        {name:String(FTKR.CSS.parameters['Gauge 1 Display Name'] || ''),
          current:String(FTKR.CSS.parameters['Gauge 1 Current'] || ''),
          max:String(FTKR.CSS.parameters['Gauge 1 Max'] || ''),
          color1:Number(FTKR.CSS.parameters['Gauge 1 Color1'] || 0),
          color2:Number(FTKR.CSS.parameters['Gauge 1 Color2'] || 0),},
        {name:String(FTKR.CSS.parameters['Gauge 2 Display Name'] || ''),
          current:String(FTKR.CSS.parameters['Gauge 2 Current'] || ''),
          max:String(FTKR.CSS.parameters['Gauge 2 Max'] || ''),
          color1:Number(FTKR.CSS.parameters['Gauge 2 Color1'] || 0),
          color2:Number(FTKR.CSS.parameters['Gauge 2 Color2'] || 0),},
        {name:String(FTKR.CSS.parameters['Gauge 3 Display Name'] || ''),
          current:String(FTKR.CSS.parameters['Gauge 3 Current'] || ''),
          max:String(FTKR.CSS.parameters['Gauge 3 Max'] || ''),
          color1:Number(FTKR.CSS.parameters['Gauge 3 Color1'] || 0),
          color2:Number(FTKR.CSS.parameters['Gauge 3 Color2'] || 0),},
        {name:String(FTKR.CSS.parameters['Gauge 4 Display Name'] || ''),
          current:String(FTKR.CSS.parameters['Gauge 4 Current'] || ''),
          max:String(FTKR.CSS.parameters['Gauge 4 Max'] || ''),
          color1:Number(FTKR.CSS.parameters['Gauge 4 Color1'] || 0),
          color2:Number(FTKR.CSS.parameters['Gauge 4 Color2'] || 0),},
        {name:String(FTKR.CSS.parameters['Gauge 5 Display Name'] || ''),
          current:String(FTKR.CSS.parameters['Gauge 5 Current'] || ''),
          max:String(FTKR.CSS.parameters['Gauge 5 Max'] || ''),
          color1:Number(FTKR.CSS.parameters['Gauge 5 Color1'] || 0),
          color2:Number(FTKR.CSS.parameters['Gauge 5 Color2'] || 0),},
        {name:String(FTKR.CSS.parameters['Gauge 6 Display Name'] || ''),
          current:String(FTKR.CSS.parameters['Gauge 6 Current'] || ''),
          max:String(FTKR.CSS.parameters['Gauge 6 Max'] || ''),
          color1:Number(FTKR.CSS.parameters['Gauge 6 Color1'] || 0),
          color2:Number(FTKR.CSS.parameters['Gauge 6 Color2'] || 0),},
        {name:String(FTKR.CSS.parameters['Gauge 7 Display Name'] || ''),
          current:String(FTKR.CSS.parameters['Gauge 7 Current'] || ''),
          max:String(FTKR.CSS.parameters['Gauge 7 Max'] || ''),
          color1:Number(FTKR.CSS.parameters['Gauge 7 Color1'] || 0),
          color2:Number(FTKR.CSS.parameters['Gauge 7 Color2'] || 0),},
        {name:String(FTKR.CSS.parameters['Gauge 8 Display Name'] || ''),
          current:String(FTKR.CSS.parameters['Gauge 8 Current'] || ''),
          max:String(FTKR.CSS.parameters['Gauge 8 Max'] || ''),
          color1:Number(FTKR.CSS.parameters['Gauge 8 Color1'] || 0),
          color2:Number(FTKR.CSS.parameters['Gauge 8 Color2'] || 0),},
        {name:String(FTKR.CSS.parameters['Gauge 9 Display Name'] || ''),
          current:String(FTKR.CSS.parameters['Gauge 9 Current'] || ''),
          max:String(FTKR.CSS.parameters['Gauge 9 Max'] || ''),
          color1:Number(FTKR.CSS.parameters['Gauge 9 Color1'] || 0),
          color2:Number(FTKR.CSS.parameters['Gauge 9 Color2'] || 0),},
    ],
};

//SV戦闘キャラ用の影画像の高さ
Window_Base.SV_SHADOW_HEIGHT = 48;

//=============================================================================
// 自作処理
//=============================================================================

// 配列の要素の合計
Math.sam = function(arr) {
    return arr.reduce( function(prev, current, i, arr) {
        return prev + current;
    });
};

Math._getDec = function(value) {
  var list = (value + '').split('.');
  return list[1] !== undefined && list[1].length > 0 ? list[1].length : 0;
};

// 少数で表現された割合をパーセント表示の整数に変換する (例:0.5 を 50 に変換)
Math.percent = function(dec) {
  var decnum = Math._getDec(dec);
  var int = +(dec + '').replace('.', '');
  var diffdec = 2 - decnum;
  return diffdec ? int * Math.pow(10, diffdec) : int;
}

Number.prototype._getDec = function() {
    var list = (this + '').split('.');
    return list[1] !== undefined && list[1].length > 0 ? list[1].length : 0;
};

// 少数で表現された数値をパーセント表示の数値に変換する (例:0.5 を 50 に変換)
Number.prototype.percent = function(dec) {
    dec = dec || 0;
    var decnum = this._getDec();
    var int = +(this + '').replace('.', '');
    var diffdec = 2 + dec - decnum;
    return Math.floor(int * Math.pow(10, diffdec)) / Math.pow(10, dec);
}

//配列の要素を、すべて数値に変換する。
Array.prototype.num = function() {
  return this.map(function(elm) {
      return Number(elm);
  });
}

//=============================================================================
// DataManager
//=============================================================================

FTKR.CSS.DatabaseLoaded = false;
FTKR.CSS.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!FTKR.CSS.DataManager_isDatabaseLoaded.call(this)) return false;
    if (!FTKR.CSS.DatabaseLoaded) {
        this.cssActorImageNotetags($dataActors);
        FTKR.CSS.DatabaseLoaded = true;
    }
    return true;
};

DataManager.cssActorImageNotetags = function(group) {
    var note1a = /<CSS 画像>/i;
    var note1b = /<\/CSS 画像>/i;

    for (var n = 1; n < group.length; n++) {
        var obj = group[n];
        var notedata = obj.note.split(/[\r\n]+/);

        var setMode = 'none';
        obj.cssData = '';
        obj.cssbgi = {
          name:'',
          offsetX:0,
          offsetY:0,
          width:0,
          height:0,
        };
        for (var i = 0; i < notedata.length; i++) {
            var line = notedata[i];
            if (note1a.test(line)) {
                var text = '';
                setMode = 'data';
            } else if (note1b.test(line)) {
                setMode = 'none';
                obj.cssData = text;
            } else if (setMode === 'data') {
                text += line + ';';
            }
        }
        this.setCssBgiData(obj);
        obj.cssData = '';
    }
};

DataManager.setCssBgiData = function(obj) {
    var stsdata = obj.cssData;
    if (stsdata) {
        var case1 = /(?:BGI NAME):[ ]*(.+)/i;
        var case2 = /(?:BGI OFFSET X):[ ]*(\d+)/i;
        var case3 = /(?:BGI OFFSET Y):[ ]*(\d+)/i;
        var case4 = /(?:BGI WIDTH):[ ]*(\d+)/i;
        var case5 = /(?:BGI HEIGHT):[ ]*(\d+)/i;

        var datas = stsdata.split(';');
        for (var i = 0; i < datas.length; i++) {
            var data = datas[i];
            if(data.match(case1)) {
                obj.cssbgi.name = String(RegExp.$1);
            } else if(data.match(case2)) {
                obj.cssbgi.offsetX = Number(RegExp.$1);
            } else if(data.match(case3)) {
                obj.cssbgi.offsetY = Number(RegExp.$1);
            } else if(data.match(case4)) {
                obj.cssbgi.width = Number(RegExp.$1);
            } else if(data.match(case5)) {
                obj.cssbgi.height = Number(RegExp.$1);
            }
        }
    }
};

//=============================================================================
// Game_Actor
//=============================================================================

FTKR.CSS.Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
    FTKR.CSS.Game_Actor_setup.call(this, actorId);
    ImageManager.loadPicture(this.actor().cssbgi.name);
};

Game_Actor.prototype.getStateMotion = function() {
    var index = this.stateMotionIndex();
    switch (index) {
        case 1: return 'abnormal';
        case 2: return 'sleep';
        case 3: return 'dead';
    }
    return '';
};

//=============================================================================
// Window_Base
//=============================================================================

FTKR.CSS.Window_Base_initialize = Window_Base.prototype.initialize;
Window_Base.prototype.initialize = function(x, y, width, height) {
    FTKR.CSS.Window_Base_initialize.call(this, x, y, width, height);
    this.sprite = [];
};

/*-------------------------------------------------------------
アクターの詳細ステータスを表示する関数
drawCssDetailedStatus(actor, x, y, width, dss)
actor :アクターオブジェクト
x     :x座標
y     :y座標
width :表示エリアの幅
dss   :詳細ステータスオブジェクト
-------------------------------------------------------------*/
Window_Base.prototype.drawCssDetailedStatus = function(actor, x, y, width, dss) {
    if (!dss) dss = FTKR.CSS.detailedStatus;
    var lineHeight = this.lineHeight();
    var lineNums = dss.lineNum.split(',').num();
    var ays = []; var ahs = [];
    for (var t = 0; t < 4; t++) {
        var text = dss.line[t].split(';');
        var lss = {
            text1:text[0] || '',
            text2:text[1] || '',
            text3:text[2] || '',
            space:dss.space[t],
            spaceIn:dss.spaceIn[t],
            widthRate:dss.widthRate[t],
            faceLine:dss.faceLine,
        };
        ahs[t] = lineHeight * lineNums[t];
        ays[t] = t > 0 ? ays[t-1] + ahs[t-1]: y;
        this.drawCssActorStatus(0, actor, x, ays[t], width, ahs[t], lss);
        ahs[t] += this.drawCssHorzLine(ays[t] + ahs[t]) * lineHeight;
    }
};

/*-------------------------------------------------------------
アクターの簡易ステータスを表示する関数
drawCssActorStatus(index, actor, x, y, width, height, lss)
index :アクターの表示番号
actor :アクターオブジェクト
x     :x座標
y     :y座標
width :表示エリアの幅
height:表示エリアの高さ
lss   :簡易ステータスオブジェクト
-------------------------------------------------------------*/
Window_Base.prototype.drawCssActorStatus = function(index, actor, x, y, width, height, lss) {
    if (!lss) lss = FTKR.CSS.simpleStatus;
    var w = width;
    var h = height;
    var wrs = lss.widthRate.split(',').num();
    var spc = lss.space.split(',').num();
    var aws = [];
    var axs = [];
    var status = [lss.text1.split(','), lss.text2.split(','), lss.text3.split(',')];
    for (var i = 0; i < 3; i++) {
        aws[i] = (w - Math.sam(spc)) * wrs[i] / Math.sam(wrs);
        axs[i] = i > 0 ? axs[i-1] + aws[i-1] + spc[i]: x + spc[0];
        this.drawCssActorStatusText(index, actor, axs[i], y, aws[i], status[i], lss);
    }
};

Window_Base.prototype.drawCssActorStatusText = function(index, actor, x, y, width, statusnames, lss) {
    var dy = this.lineHeight();
    var line = 0;
    statusnames.forEach( function(status) {
        line += this.drawCssActorStatusBases(index, actor, x, y + dy * line, width, status, lss);
    },this);
};

Window_Base.prototype.drawCssActorStatusBases = function(index, actor, x, y, width, status, lss) {
    if (status.match(/\{(.+)\}/i)) {
        status = RegExp.$1;
        width = this.width - this.padding*2 - x;
    }
    var statuses = status.match(/\[(.+)\]/i) ? RegExp.$1.split('/') : [status];
    var line = 0;
    var len = statuses.length;
    if (len > 1) width = (width - lss.spaceIn * (len - 1))/ len;
    statuses.forEach( function(element, i) {
        var dx = (width + lss.spaceIn) * i;
        line = Math.max(this.drawCssActorStatusBase(index, actor, x + dx, y, width, element, lss), line);
    },this);
    return line;
};

Window_Base.prototype.drawCssActorStatusBase = function(index, actor, x, y, width, status, lss) {
    var css = FTKR.CSS.cssStatus;
    if (status.match(/(?:param\()(.+)\)/i)) {
        return this.drawCssActorParam(actor, x, y, width, Number(RegExp.$1));
    } else if (status.match(/(?:custom\()(.+)\)/i)) {
        var customId = Number(RegExp.$1);
        if (customId >= 0) {
            return this.drawCssActorCustom(actor, x, y, width, css.customs[customId]);
        }
    } else if (status.match(/(?:gauge\()(.+)\)/i)) {
        var gaugeId = Number(RegExp.$1);
        if (gaugeId >= 0) {
            return this.drawCssActorGauge(actor, x, y, width, css.gauges[gaugeId]);
        }
    } else if (status.match(/(?:equip\()(.+)\)/i)) {
        var equipId = String(RegExp.$1);
        if (equipId >= 0) return this.drawCssActorEquip(actor, x, y, width, equipId);
    } else if (status.match(/(?:text\()(.+)\)/i)) {
        var text = String(RegExp.$1);
        if (text) return this.drawCssText(actor, x, y, width, text);
    } else if (status.match(/(?:state2\()(.+)\)/i)) {
        var line = Number(RegExp.$1);
        if (line) return this.drawCssActorIcons(actor, x, y, width, line);
    } else {
        switch (true) {
            case (/(?:face)/i).test(status):
                return this.drawCssActorFace(actor, x, y, width, lss);
            case (/(?:chara)/i).test(status):
                return this.drawCssActorChara(actor, x, y, width, css.chara);
            case (/(?:sv)/i).test(status):
                return this.drawCssActorSvChara(index, actor, x, y, width, css.svChara);
            case (/(?:nickname)/i).test(status):
                return this.drawCssActorNickname(actor, x, y, width);
            case (/(?:name)/i).test(status):
                return this.drawCssActorName(actor, x, y, width);
            case (/(?:level)/i).test(status):
                return this.drawCssActorLevel(actor, x, y, width);
            case (/(?:hp)/i).test(status):
                return this.drawCssActorHp(actor, x, y, width);
            case (/(?:mp)/i).test(status):
                return this.drawCssActorMp(actor, x, y, width);
            case (/(?:tp)/i).test(status):
                return this.drawCssActorTp(actor, x, y, width);
            case (/(?:class)/i).test(status):
                return this.drawCssActorClass(actor, x, y, width);
            case (/(?:state)/i).test(status):
                return this.drawCssActorIcons(actor, x, y, width);
            case (/(?:profile)/i).test(status):
                return this.drawCssProfile(actor, x, y, width);
            case (/(?:image)/i).test(status):
                return this.drawCssActorImage(actor, x, y, width);
        }
    }
    return 1;
};

//表示エリア間のラインの表示関数
Window_Status.prototype.drawCssHorzLine = function(y, horz) {
    horz = horz || FTKR.CSS.detailedStatus.horz;
    if (horz.color === -1) return 0;
    var lineY = y + this.lineHeight() / 2 - 1;
    this.contents.paintOpacity = horz.opacity;
    this.contents.fillRect(0, lineY, this.contentsWidth(), horz.thick, this.textColor(horz.color));
    this.contents.paintOpacity = 255;
    return 1;
};

//アクターの顔画像の表示関数
Window_Base.prototype.drawCssActorFace = function(actor, x, y, width, lss) {
    var dy = this.lineHeight();
    var line = lss.faceLine || Math.ceil(Window_Base._faceHeight / dy);
    this.changePaintOpacity(actor.isBattleMember());
    this.drawCssFace(actor.faceName(), actor.faceIndex(), x, y, width, dy * lss.faceLine);
    this.changePaintOpacity(true);
    return line;
};

Window_Base.prototype.drawCssFace = function(faceName, faceIndex, dx, dy, width, height) {
    var len = Math.min(width, height);
    var dh = len || Window_Base._faceHeight;
    var dw = len || Window_Base._faceWidth;
    dx = dx + (width - dw) / 2;
    var bitmap = ImageManager.loadFace(faceName);
    var sw = Window_Base._faceWidth;
    var sh = Window_Base._faceHeight;
    var sx = faceIndex % 4 * sw;
    var sy = Math.floor(faceIndex / 4) * sh;
    this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy, dw, dh);
};

//アクターの歩行キャラの表示関数
Window_Base.prototype.drawCssActorChara = function(actor, x, y, width, chara) {
    var dy = this.lineHeight();
    var line = Math.ceil(chara.height / dy);
    this.changePaintOpacity(actor.isBattleMember());
    this.drawCssChara(actor.characterName(), actor.characterIndex(), x, y, width, dy * line, chara);
    this.changePaintOpacity(true);
    return line;
};

Window_Base.prototype.drawCssChara = function(faceName, index, dx, dy, width, height, chara) {
    var dh = chara.height;
    var dw = dh || width || chara.width;
    dx = dx + (width - dw) / 2;
    dy = dy + (height - dh) / 2;
    var bitmap = ImageManager.loadCharacter(faceName);
    var sw = chara.width;
    var sh = chara.height;
    var sx = (index * 3 + 1) % 12 * sw;
    var sy = Math.floor((index * 3 + 1) / 12) * sh;
    this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy, dw, dh);
};

//アクターのSV戦闘キャラの表示関数
Window_Base.prototype.drawCssActorSvChara = function(index, actor, x, y, width, svChara) {
    var dy = this.lineHeight();
    var line = Math.ceil(svChara.height / dy);
    this.changePaintOpacity(actor.isBattleMember());
    this.drawCssSvChara(index, actor, x, y, width, dy * line, svChara);
    this.changePaintOpacity(true);
    return line;
};

Window_Base.prototype.drawCssSvChara = function(index, actor, dx, dy, width, height, svChara) {
    if (this.sprite[index]) this.removeChild(this.sprite[index]);
    this.sprite[index] = new Sprite_Actor(actor);
    this.sprite[index].setHome(dx + width / 2, dy + height + Window_Base.SV_SHADOW_HEIGHT / 4);
    this.sprite[index].startMove(0,0,0);
    var stateMotion = actor.getStateMotion();
    var motion = svChara.state && stateMotion ? stateMotion : svChara.motion;
    this.sprite[index].startMotion(motion);
    this.sprite[index]._motion.loop = svChara.loop;
    this.addChild(this.sprite[index]);
};

//アクターの名前の表示関数
Window_Base.prototype.drawCssActorName = function(actor, x, y, width) {
    this.changeTextColor(this.hpColor(actor));
    this.drawText(actor.name(), x, y, width);
    return 1;
};

//アクターのクラス名の表示関数
Window_Base.prototype.drawCssActorClass = function(actor, x, y, width) {
    this.resetTextColor();
    this.drawText(actor.currentClass().name, x, y, width);
    return 1;
};

//アクターの二つ名の表示関数
Window_Base.prototype.drawCssActorNickname = function(actor, x, y, width) {
    this.resetTextColor();
    this.drawText(actor.nickname(), x, y, width);
    return 1;
};

//アクターのレベルの表示関数
Window_Base.prototype.drawCssActorLevel = function(actor, x, y, width) {
    var value = actor.level;
    var tw = this.textWidth(String(value));
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.levelA, x, y, width - tw - 4);
    this.resetTextColor();
    this.drawText(value, x + width - tw, y, tw, 'right');
    return 1;
};

//アクターのステートアイコンの表示関数
Window_Base.prototype.drawCssActorIcons = function(actor, x, y, width, line) {
    var icons = actor.allIcons().slice();
    var num = icons.length;
    var iw = Window_Base._iconWidth;
    var scale = Math.min(Math.max(this.lineHeight() - 4, 0) / iw, 1);
    iw = iw * scale;
    var len = line ? (line - 1) * this.lineHeight() : width - iw - 4;
    var diff = num > 1 ? len / (num - 1) : 0;
    var offset = diff < iw ? diff : iw;
    for (var i = 0; i < num; i++) {
        if(line) {
            this.drawCssIcon(icons[i], x + 2, y + 2 + offset * i, scale);
        } else {
            this.drawCssIcon(icons[i], x + 2 + offset * i, y + 2, scale);
        }
    }
    return line ? line : 1;
};

//アイコンの表示スケールを指定できる表示関数
Window_Base.prototype.drawCssIcon = function(iconIndex, x, y, scale, auto) {
    scale = scale || 1;
    var bitmap = ImageManager.loadSystem('IconSet');
    var pw = Window_Base._iconWidth;
    var ph = Window_Base._iconHeight;
    if (auto) scale = Math.min(Math.max(this.lineHeight() - 4, 0) / pw, 1);
    var sx = iconIndex % 16 * pw;
    var sy = Math.floor(iconIndex / 16) * ph;
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y, pw * scale, ph * scale);
};

//アクターのHPの表示関数
Window_Base.prototype.drawCssActorHp = function(actor, x, y, width) {
    var color1 = this.hpGaugeColor1();
    var color2 = this.hpGaugeColor2();
    this.drawGauge(x, y, width, actor.hpRate(), color1, color2);
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.hpA, x, y, 44);
    this.drawCurrentAndMax(actor.hp, actor.mhp, x, y, width,
                           this.hpColor(actor), this.normalColor());
    return 1;
};

//アクターのMPの表示関数
Window_Base.prototype.drawCssActorMp = function(actor, x, y, width) {
    var color1 = this.mpGaugeColor1();
    var color2 = this.mpGaugeColor2();
    this.drawGauge(x, y, width, actor.mpRate(), color1, color2);
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.mpA, x, y, 44);
    this.drawCurrentAndMax(actor.mp, actor.mmp, x, y, width,
                           this.mpColor(actor), this.normalColor());
    return 1;
};

//アクターのTPの表示関数
Window_Base.prototype.drawCssActorTp = function(actor, x, y, width) {
    var color1 = this.tpGaugeColor1();
    var color2 = this.tpGaugeColor2();
    this.drawGauge(x, y, width, actor.tpRate(), color1, color2);
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.tpA, x, y, 44);
    this.changeTextColor(this.tpColor(actor));
    this.drawText(actor.tp, x + width - 64, y, 64, 'right');
    return 1;
};

//パラメータの表示関数
Window_Base.prototype.drawCssActorParam = function(actor, x, y, width, paramId) {
    if (paramId < 0 && paramId > 7) return 0;
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.param(paramId), x, y, width);
    this.resetTextColor();
    this.drawText(actor.param(paramId), x, y, width, 'right');
    return 1;
};

//カスタムパラメータの表示関数
Window_Base.prototype.drawCssActorCustom = function(actor, x, y, width, custom) {
    console.log(custom);
    var name = custom.name || '';
    var formula = custom.formula || '';
    var value = actor.evalCssCustomFormula(formula);
    this.changeTextColor(this.systemColor());
    var tx = this.drawTextEx(name, x, y);
    this.resetTextColor();
    this.drawText(value, x + tx, y, width - tx, 'right');
    return 1;
};

//カスタムゲージの表示関数
Window_Base.prototype.drawCssActorGauge = function(actor, x, y, width, gauge) {
    if (!gauge.name || !gauge.current || !gauge.max) return 0;
    var color1 = this.textColor(gauge.color1);
    var color2 = this.textColor(gauge.color2);
    var current = actor.evalCssCustomFormula(gauge.current);
    var max = actor.evalCssCustomFormula(gauge.max);
    var rate = current / max;
    this.drawGauge(x, y, width, rate, color1, color2);
    this.changeTextColor(this.systemColor());
    var tx = this.drawTextEx(gauge.name, x, y, width);
    this.drawCurrentAndMax(current, max, x + tx, y, width - tx,
                           this.normalColor(), this.normalColor());
    return 1;
};

Game_Actor.prototype.evalCssCustomFormula = function(formula) {
    if (!formula) return '';
    try {
        var a = this;
        var s = $gameSwitches._data;
        var v = $gameVariables._data;
        var value = eval(formula);
        if (isNaN(value)) value = 0;
        return value;
    } catch (e) {
        console.log(e);
        return 0;
    }
};

//装備の表示関数
Window_Base.prototype.drawCssActorEquip = function(actor, x, y, width, equipId) {
    var equip = actor.equips()[equipId];
    if (equip) {
        this.drawCssIcon(equip.iconIndex, x, y, 1, true);
        var iw = Window_Base._iconWidth + 4;
        this.resetTextColor();
        this.drawText(equip.name, x + iw, y, width - iw);
    }
    return 1;
};

//プロフィールの表示関数
Window_Base.prototype.drawCssProfile = function(actor, x, y, width) {
    var texts = actor.profile().split('\n');
    var dy = this.lineHeight();
    texts.forEach( function(text, i) {
        this.drawTextEx(text, x, y + dy * i);
    },this);
    return texts.length;
};

//テキストの表示関数
Window_Base.prototype.drawCssText = function(actor, x, y, width, text) {
    this.changeTextColor(this.systemColor());
    this.drawTextEx(text, x, y);
    this.resetTextColor();
    return 1;
};

//指定画像の表示関数
Window_Base.prototype.drawCssActorImage = function(actor, x, y, width) {
    console.log(actor.actor());
    var dy = this.lineHeight();
    var line = Math.ceil(actor.actor().cssbgi.height / dy) || 1;
    this.changePaintOpacity(actor.isBattleMember());
    this.drawCssImage(actor, x, y, width);
    this.changePaintOpacity(true);
    return line;
};

Window_Base.prototype.drawCssImage = function(actor, dx, dy, width) {
    var bgi = actor.actor().cssbgi;
    var dh = bgi.height || this.lineHeight();
    var dw = bgi.width.clamp(0, width) || width;
    dx = dx + (width - dw) / 2;
    var bitmap = ImageManager.loadPicture(bgi.name);
    var sw = bgi.width || dh;
    var sh = bgi.height || dw;
    var sx = bgi.offsetX || 0;
    var sy = bgi.offsetY || 0;
    this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy, dw, dh);
};

//=============================================================================
// Window_MenuStatus
//=============================================================================

FTKR.CSS.Window_MenuStatus_drawItemImage = Window_MenuStatus.prototype.drawItemImage;
Window_MenuStatus.prototype.drawItemImage = function(index) {
    if (!FTKR.CSS.enabledSS) FTKR.CSS.Window_MenuStatus_drawItemImage.call(this, index);
};

FTKR.CSS.Window_MenuStatus_drawItemStatus = Window_MenuStatus.prototype.drawItemStatus;
Window_MenuStatus.prototype.drawItemStatus = function(index) {
    if (FTKR.CSS.enabledSS) {
        var actor = $gameParty.members()[index];
        var rect = this.itemRect(index);
        this.drawCssActorStatus(index, actor, rect.x, rect.y, rect.width, rect.height);
    } else {
        FTKR.CSS.Window_MenuStatus_drawItemStatus.call(this, index);
    }
};

//=============================================================================
// Window_SkillStatus
//=============================================================================

FTKR.CSS.Window_SkillStatus_refresh = Window_SkillStatus.prototype.refresh;
Window_SkillStatus.prototype.refresh = function() {
    if (FTKR.CSS.enabledSS) {
        this.contents.clear();
        if (this._actor) {
            var w = this.width - this.padding * 2;
            var h = this.height - this.padding * 2;
            this.drawCssActorStatus(0, this._actor, 0, 0, w, h);
        }
    } else {
        FTKR.CSS.Window_SkillStatus_refresh.call(this);
    }
};

//=============================================================================
// Window_Status
//=============================================================================

FTKR.CSS.Window_Status_refresh = Window_Status.prototype.refresh;
Window_Status.prototype.refresh = function() {
    if (FTKR.CSS.enabledDS) {
        this.contents.clear();
        if (this._actor) {
            var w = this.width - this.padding * 2;
            this.drawCssDetailedStatus(this._actor, 0, 0, w);
        }
    } else {
        FTKR.CSS.Window_Status_refresh.call(this);
    }
};

