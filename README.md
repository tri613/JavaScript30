# JavaScript30
30 Day Vanilla JS Challenge

## Logs
記錄是為了逼自己天天寫。（？

- Day1 -- 我有寫但放在別台電腦沒commit哈哈
- Day2 -- 2016/12/13 complete!
- Day3 -- 2016/12/15
	用 css variable 這招倒是完全沒想到 (跟它壓根兒不熟)，相比之下我整個大輸XD。
	偷偷筆記起來。不過就是瀏覽器支援度還很差，近期可能還無法在production環境中使用吧……
- Day4 -- 2016/12/21
	不小心偷懶好久(爆)
	這篇剛好可以趁機回憶一下前陣子看的[教學影片](https://www.youtube.com/playlist?list=PL0zVEGEvSaeEd9hlmCXrk5yUyqUag-n84)！(講師超有趣XD)
- Day5 -- 2016/12/26
	寫是寫完了不過要來好好認真看一下flex才行QQ
- Day6 -- 2017/01/03
	年末總是在忙著慶祝嘛！(爆)
	- fetch
	- regular expression
- Day7 + 8 -- 2017/01/04
- Day9 + 10 -- 2017/01/05
	- `console.time(name)` + `console.timeEnd(name)`
	- `console.group(name)` + `console.groupEnd(name)`
	-  Holding down the `Shift`key could be captured by `MouseEvents` and `KeyboardEvents` with `event.shiftKey` (true for "is holding down shift key")
- Day11 + 12 -- 2017/01/06
- Day13 -- PASS (欸)
- Day14 -- 2017/01/20
	- 這章好重要，前陣子也有認真看了一下JS裡面`by value`跟`by reference`的問題，另外開一個區塊寫XD
- Day15 -- 2017/01/28 （新年寫code...廠廠)
	- `JSON.parse(null)`是ＯＫ的，但`JSON.parse(undefined)`就會跳error。
- Day16 -- 2017/01/28
	- 如果在捕捉滑鼠移動位置事件時，假如被掛上listener的元素裡面還有子元素的話，
		記得要另外加上子元素和父元素的相對位置。
		```javascript
			let x = e.target.offsetX;
			let y = e.target.offsetY;
			if (this !== e.target) {
				x = x + e.target.offsetLeft;
				y = y + e.target.offsetTop;
			}
		```
		延伸：[圖解offsetLeft、offsetTop、offsetWidth和offsetHeight](http://emn178.pixnet.net/blog/post/95297028-%E5%9C%96%E8%A7%A3offsetleft%E3%80%81offsettop%E3%80%81offsetwidth%E5%92%8Coffsetheight)


## Notes
### Day14 - JavaScript References VS Copying

> 記得在stackoverflow上面也有人提出其實JS沒有分所謂的`by value`和`by reference`，
> 而是以變數的值是否`immutable`的差別來區分，
> 不過我覺得這樣子的分法對我來說比較好理解。

1. By Value (Copying)

  一般來說只要是 strings, numbers 和 booleans，都可以說是 `by value`。

	```javascript
	let a = "string";
	let b = a;
	console.log(a, b); // "string", "string"
	b = "another string";
	console.log(a, b); // "string", "another string"
	```

2. By Reference

  如果是 `array` 或者 `object`，則會以 `by reference` 的方式傳遞。

	```javascript
	let person1 = {
		name: "Trina",
		age: 100,
		gender: "female"
	};
	let person2 = person1;

	console.log(person1, person2);
	//Object {name: "Trina", age: 100, gender: "female"}, Object {name: "Trina", age: 100, gender: "female"}

	person2.name = "Sherry";
	console.log(person2.name); //"Sherry"
	console.log(person1.name); //"Sherry" --> person1 has been changed too!
	```

	Array 也是一樣的道理：

	```javascript
	let players = ["Trina", "Sherry", "Pisuke", "Kuma"];
	let team = players;
	console.log(players, team);
	// ["Trina", "Sherry", "Pisuke", "Kuma"],
	// ["Trina", "Sherry", "Pisuke", "Kuma"]

	team[3] = "Usagi";
	console.log(players);
	// ["Trina", "Sherry", "Pisuke", "Usagi"] --> players has been changed too!
	```
	要解決這個問題，就必須把`Object`或`Array`直接Copy一份才行。

	- Copying an array

		```javascript
		//以下幾種方式皆可行
		const teamCopy1 = players.slice();
		const teamCopy2 = [].concat(players);
		const teamCopy3 = [...players]; //es6
		const teamCopy4 = Array.from(players);
		```
	- Copying an object

		```javascript
		const personCopy = Object.assign({}, person, {
			newProperty: "some additional property for personCopy"
		});
		```
		要注意的是以上的方法是 `Shallow copy`，如果 Object 本身是`二維`以上的話，使用上面的方式還是會有 `By reference`的情況發生。

		```javascript
		let me = {
			name: "Trina",
			age: 24,
			social: {
				twitter: "@tri613",
				github: "tri613"
			}
		};

		let me2 = Object.assign({}, me);
		me2.social.twitter = "@nomoney";

		console.log(me.social);
		//{twitter: "@nomoney", github: "tri613"} --> Changed!
		```
		這種情況需要靠`Deep clone`來解決，最簡單 (但效率表現沒那麼好) 的方式 是直接使用JSON格式encode再decode的方式解決。

		```javascript
		const meCopy = JSON.parse(JSON.stringify(me));
		```
		其他的方式可以參考stackoverflow上面的[這篇](http://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript)。
