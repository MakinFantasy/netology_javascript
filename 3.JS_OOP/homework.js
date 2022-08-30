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
        if (this.check === true) {
            regList = this.#goods.filter( good => this.filter.test(good.name))
            regList = regList.filter( good => good.available === true)
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
            return regList
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
    constructor(good, amount, id, name, description, sizes, price, available) {
        super(id, name, description, sizes, price, available);
        this.id = good.id;
        this.name = good.name;
        this.description = good.description;
        this.sizes = good.sizes;
        this.price = good.price;
        this.available = good.available;
        this.amount = amount;
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
                totalSum += good.price*good.amount
            })
            return totalSum
        } else {
            return 0;
        }
    }

    add (good, amount) {
        this.goods.forEach( (item) => {
            if (item.id === good.id) {
                item.amount += amount
            }
        })
        let flag = false
        this.goods.forEach( (item) => {
            if (item.id === good.id) {
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
            if (item.id === good.id) {
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
        this.goods = this.goods.filter (good => good.available === true)
        return this.goods
    }
}



const test1 = new Good(1, 'apple', 'test1_1', '10*10*10', 5000, true)
const test2 = new Good(2, 'banana', 'test2_1', '20*20*20', 10000, false)
const test3 = new Good(3, 'elemelon', 'test2_1', '20*20*20', 7000, true)
const test4 = new Good(4, 'qiwi', 'test2_1', '20*20*20', 11000, false)
const test5 = new Good(5, 'something', 'just because', '1*2*3', 1, true)
const test6 = new Good(6, 'nothing', 'try to find', '0*0*0', 666, true)
const test7 = new Good(7, 'everything', 'all u need', '1*1*1', 10000, true)
const test8 = new Good(8, 'thing', 'u need that', '2*2*2', 20000, true)
const test9 = new Good(9, 'test1', 'testOne', '3*3*3', 30000, true)
const test10 = new Good(10, 'test2', 'testTwo', '4*4*4', 40000, true)
let goodsList = [test1, test2, test3, test4, test5, test6, test7, test8, test9, test10]

let goodsListRes = new GoodsList(/thing/gi,true, true, false)
goodsListRes.uploadList(goodsList)
console.log(goodsListRes.list)

good = {
    id: 11,
    name: 'watermelon',
    description: 'forAddTest',
    sizes: '2*2*2',
    price: 5555,
    available: false,
}
goodsListRes.add(good)
console.log(goodsListRes.list)

test2.setAvailableTrue()
console.log(goodsListRes.list)

goodsListRes.remove(1)
goodsListRes.remove(2)
console.log(goodsListRes.list)



const product1 = new BasketGood(goodsListRes.list[0], 100);
const product2 = new BasketGood(goodsListRes.list[1], 200);
const product3 = new BasketGood(goodsListRes.list[2], 300);
const product4 = new BasketGood(goodsListRes.list[3], 400);
const product5 = new BasketGood(goodsListRes.list[4], 500);
const product6 = new BasketGood(goodsListRes.list[5], 600);
const product7 = new BasketGood(goodsListRes.list[6], 700);
const product8 = new BasketGood(goodsListRes.list[7], 800);
const product9 = new BasketGood(goodsListRes.list[8], 900);
productList = [product1, product2, product3, product4, product5, product6, product7, product8, product9]

console.log('|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||')
basket = new Basket(productList)
console.log(basket.list)
console.log(basket.totalAmount)
console.log(basket.totalSum)

console.log(basket.add(basket.list[0], 2))
console.log(basket.totalAmount)
console.log(basket.totalSum)


console.log('HEREHEREHEREHEREHEREHEREHEREHEREHEREHEREHEREHEREHEREHEREHEREHEREHEREHERE')
console.log(basket.remove(basket.list[0], 105))
console.log(basket.totalAmount)
console.log(basket.totalSum)


console.log('|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||')
console.log(basket.removeUnavailable())
console.log(basket.totalAmount)
console.log(basket.totalSum)

// Рабочий код, просто дважды корзина будет уже пуста после removeUnavailable
console.log('|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||')
console.log(basket.list)
basket.clear()
console.log(basket.list)
console.log(basket.totalAmount)
console.log(basket.totalSum)