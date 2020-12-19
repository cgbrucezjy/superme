const Nightmare = require('nightmare')
const nightmare = Nightmare({ 
    show: true,
    typeInterval: 10,
    // switches: {
    //     'proxy-server': '98.188.47.132:4145',
    //     'ignore-certificate-errors': true
    // }
})
const ItemInfo = {
    size: "84926",
    // style: 1,
    url: "https://www.supremenewyork.com/shop/tops-sweaters/hl2fb4jrs/tmyfrq8gu"
}
const billingInfo = {
    name: "jingyin zhang",
    email: "cgbrucezjy2@gmail.com",
    tel: "678-665-8825",
    address: "320 johns landing ct",
    zip: "30022",
    unit: "",
    city: "johns creek",
    state: "GA",
    cardNumber: "1234567812345678",
    expirationMonth: 10,
    expirationYear: 2023,
    cvv:"123"
}

async function start(){
    gotoSite().then(()=>{
        if (ItemInfo.size) {
            return selectSize();
        } else {
            return addToCart();
        }
    })
}

function gotoSite() {
    return nightmare
    .useragent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36')
    .goto(ItemInfo.url)
}
function selectSize () {
    return nightmare
    .select("select[aria-labelledby='size-select']",ItemInfo.size)
    .wait(100)
    .then(()=>{
        if (ItemInfo.style) {
            return selectStyle();
        } else {
            return addToCart();
        }
    })
}
function selectStyle () {
    return nightmare.click(`ul li:nth-child(${ItemInfo.style}) button`).then(()=>{
        return addToCart()
    })
}
function addToCart(){
  return nightmare
    .click('input[value="add to cart"]')
    .wait(100)
    .wait('#cart a.checkout')
    .click('#cart a.checkout')
    .insert('input[first_and_last]',billingInfo.name)
    .insert('input[type="email"]',billingInfo.email)
    .type('input[name="order[tel]"]',billingInfo.tel)
    .insert('input[name="order[billing_address]"]',billingInfo.address)
    .insert('input[name="order[billing_address_2]"]',billingInfo.unit)
    .insert('input[name="order[billing_zip]"]',billingInfo.zip)
    .insert('input[name="order[billing_city]"]',billingInfo.city)
    .insert('input#orcer',billingInfo.cvv)
    .insert('input#rnsnckrn',billingInfo.cardNumber)
    .select("#credit_card_month",billingInfo.expirationMonth)
    .select("#credit_card_year",billingInfo.expirationYear)
    .select("#order_billing_state",billingInfo.state)
    .click('input[name="order[terms]"]')
    .then(console.log)
    .catch(error => {
      console.error('Search failed:', error)
    })
}
start();
