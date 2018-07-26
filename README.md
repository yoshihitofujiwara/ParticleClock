# README


Web開発環境のベースとなる Web Starter Kit。
gulpベースに、シンプルなタスクの開発環境になっています。


## gulpタスク

1. BrowserSyncによるブラウザ同期
1. Sassのコンパイル
1. ESのコンパイル
1. コマンドにリリースモードオプション追加で、JS,CSSファイルの圧縮化


## gulpコマンド

#### デベロップモード
デベロップモードは、ファイル圧縮化しません。
```
$ gulp
```

#### 公開ビルド
公開ビルド時は、ファイル圧縮化します。
```
$ gulp -pro
```

