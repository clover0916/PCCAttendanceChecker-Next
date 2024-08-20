//now テーブルの作成に使用

const Keyv = require('keyv');

const keyv = new Keyv("sqlite://attend.sqlite", { table: 'now' });

//keyv.clear()

for (let i=1; i<38; i++) {
  let num = i.toString();

  console.log(num);

  const data = {
    online: false,
    date: `20xx/xx/xx xx:xx:${num}`,
    name: ""
  };

  (async () => {
    await keyv.set(num, data);
    const temp = await keyv.get(num);
    console.log(temp);
  })();
}