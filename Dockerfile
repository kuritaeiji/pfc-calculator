FROM node:14

ENV LANG=C.UTF-8 \
    TZ=ASIA/TOKYO \
    HOST=0.0.0.0

WORKDIR /app

# ここまで書いたらコンテナを起動して、
# globalにcreate-nuxt-appパッケージを追加し、
# yarn create nuxt-app --overwrite-dir . コマンドでnuxtを導入


# ここからはherokuのデプロイ設定
COPY ./package.json /app
RUN yarn install

COPY . /app
RUN yarn build

# ローカル側のpackage.jsonをherokuのコンテナ内にコピーし、
# yarn installコマンドでnode_moduleをインストールし、
# ローカル側のコードを全てherokuのコンテナにコピーし、
# yarn buildでhtmlやjsファイルなどをビルドする
