class Good {
    constructor(id, name, description, sizes, price, available) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.sizes = sizes;
        this.price = price;
        this.available = available;
    }
    // Param should be boolean type
    setAvailable (param) {
        this.available = param;
    }

    setAvailableTrue () {
        this.available = true;
    }

    setAvailableFalse () {
        this.available = false;
    }
}


class GoodsList {
    #goods;
    constructor(filter, sortPrice, sortDir, check) {
        this.filter = filter;
        this.sortPrice = sortPrice;
        this.sortDir = sortDir;
        this.check = check;
    }

    uploadList (list) {
        this.#goods = list;
    }

    get list () {
        let regList = [];
        const filterFunc = (good, list) => {
            if (this.filter.test(good.name) === true) {
                list.push(good)
            }

        }
        if (this.check === true) {
            for (let i = 0; i <= this.#goods.length - 1; i++) {
            filterFunc(this.#goods[i], regList)
            }
            if (this.sortPrice === true) {
                if (this.sortDir === true) {
                    regList.sort(
                        (a, b) => a.price > b.price ? 1 : -1
                    )
                }
                if (this.sortDir === false) {
                    regList.sort(
                        (a, b) => a.price < b.price ? 1 : -1
                    )
                }
            }
            this.#goods = regList;
            return this.#goods
        }
        return this.#goods
    }

    add (data) {
        this.#goods.push(data)
    }

    remove(id) {
        for (let i = 0; i <= this.#goods.length - 1; i++) {
            if (this.#goods[i].id === id) {
                const index = this.#goods.indexOf(this.#goods[i])
                if (index > -1) {
                    this.#goods.splice(index, 1)
                }
            }
        }
    }
}


class BasketGood extends Good {
    #list;

    constructor(good, amount) {
        super(good);
        this.good = good;
        this.amount = amount;
        this.#list = []
    }

    upload(item, goodAmount) {
        this.amount = goodAmount;
        let newItem = {data: item, amount: this.amount}
        this.#list.push(newItem)
        // this.#list = timeList;
        return this.#list
    }

    get list () {
        return this.#list;
    }
}


class Basket {
    constructor(goods) {
        this.goods = goods;
    }

    get list () {
        return this.goods;
    }

    get totalAmount() {
        if (this.goods.length > 0) {
            let totalAmount = 0;
            this.goods.forEach ((good) => {
                totalAmount += good.amount;
            } )
            return totalAmount
        } else {
            return 0;
        }
    }


    get totalSum() {
        if (this.goods.length > 0) {
            let totalSum = 0;
            this.goods.forEach((good) => {
                totalSum += good.data.price*good.amount
            })
            return totalSum
        } else {
            return 0;
        }
    }

    add (good, amount) {
        this.goods.forEach( (item) => {
            if (item.data.id === good.data.id) {
                item.amount += amount
            }
        })
        let flag = false
        this.goods.forEach( (item) => {
            if (item.data.id === good.data.id) {
                flag = true
            }
        })
        if (flag === false) {
            console.log(good)
            let newItem = {good, amount: amount}
            this.goods.push(newItem)
        }
        return this.goods
    }

    remove(good, amount) {
        this.goods.forEach((item) => {
            if (item.data.id === good.data.id) {
                if (item.amount - amount <= 0) {
                    let index = this.goods.indexOf(item)
                    this.goods.splice(index, 1)
                }
                if (item.amount - amount > 0) {
                    item.amount = item.amount - amount
                }
            }
        })
        return this.goods
    }

    clear () {
        this.goods = {}
        return this.goods
    }

    removeUnavailable () {
        this.goods = this.goods.filter (good => good.data.available === true)
        return this.goods
    }
}



const test1 = new Good(1, 'apple', 'test1_1', '10*10*10', 5000, true)
const test2 = new Good(2, 'banana', 'test2_1', '20*20*20', 10000, false)
const test3 = new Good(3, 'banana', 'test2_1', '20*20*20', 7000, true)
const test4 = new Good(4, 'banana', 'test2_1', '20*20*20', 11000, false)

let goodsList = [test1, test2, test3, test4]

let goodsListRes = new GoodsList(/a/i,true, true, true)
goodsListRes.uploadList(goodsList)
console.log(goodsListRes.list)

good = {
    id: 5,
    name: 'watermelon',
    description: 'forAddTest',
    sizes: '2*2*2',
    price: 5555,
    available: false,
}
goodsListRes.add(good)

test2.setAvailableTrue()
console.log(goodsListRes.list)

goodsListRes.remove(1)
goodsListRes.remove(2)
console.log(goodsListRes.list)


basketGood = new BasketGood();
basketGood.upload(goodsListRes.list[1], 2)
basketGood.upload(goodsListRes.list[0], 3)
console.log(basketGood.list)


basket = new Basket(basketGood.list)
console.log(basket.list)
console.log(basket.totalAmount)
console.log(basket.totalSum)


console.log(basket.add(basket.list[0], 2))
console.log(basket.totalAmount)
console.log(basket.totalSum)


console.log('|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||')
console.log(basket.list)
console.log(basket.totalAmount)
console.log(basket.totalSum)


console.log('|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||')
console.log(basket.remove(basket.list[0], 5))
console.log(basket.totalAmount)
console.log(basket.totalSum)


console.log('|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||')
console.log(basket.removeUnavailable())
console.log(basket.totalAmount)
console.log(basket.totalSum)

// Рабочий код, просто дважды корзина будет уже пуста после removeUnavailable
// console.log('|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||')
// console.log(basket.list)
// basket.clear()
// console.log(basket.list)
// console.log(basket.totalAmount)
// console.log(basket.totalSum)