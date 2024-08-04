# Table of Contents

- [Technical task](#Technical-task)
- [Solution](#Solution)

ТЗ и ниже комментарии по решению задачи

# Technical task

[Peanut.Trade](http://Peanut.Trade) SE task

Розробити API сервіс який буде мати два ендпоінти.

Перший ендпоінт буде визначати на якій біржі буде найвигідніше обміняти крипто валюти - estimate.<br>
Другий буде повертати ціни вказаної криптовалюти на всіх біржах - getRates.

Сервіс має підтримувати наступні крипто біржі: Binance ([https://www.binance.com](https://www.binance.com/)) та KuCoin ([https://www.kucoin.com](https://www.kucoin.com/)) та такі криптовалюти: ETH, BTC та USDT.
Це дві централізовані біржі, працювати потрібно з API цих бірж.<br>
KuCoin API: https://docs.kucoin.com/#general<br>
Binance API: https://binance-docs.github.io/apidocs/spot/en/#change-log

Ціни можна визначати по останьому трейду на вибраній парі.

Estimate ендпоінт має приймати три параметри: inputAmount, inputCurrency, outputCurrency та повертати exchangeName (Binance or KuCoin) та outputAmount.<br>
Можна обрати будь-який формат запиту та відповіді.

Приклад роботи ендпоінта.<br>
Дано:<br>
вартість BTC на binance 11000 USDT.<br>
вартість BTC на kucoin 10000 USDT.<br>

На запит inputAmount: 0.5, inputCurrency: “BTC”, outputCurrency: “USDT” сервіс має відповідати exchangeName: binance, outputAmount: 5 500.<br>
На запит inputAmount: 20000, inputCurrency: “USDT”, outputCurrency: “BTC” сервіс має відповідати exchangeName: kucoin, outputAmount: 2.

GetRates ендпоінт буде приймати два параметри baseCurrency та quoteCurrency. І повинен повертати ціну за 1 baseCurrency в quoteCurrency для всіх бірж.

Приклад роботи ендпоінта.<br>
Дано:<br>
вартість BTC на binance 10 ETH.<br>
вартість BTC на kucoin 8 ETH.<br>

На запит baseCurrency: BTC, quoteCurrency: ETH сервіс має відповідати { [ { exchangeName: binance, rate: 10 }, { exchangeName: kucoin, rate: 8 }]} ( тобто ціна одного BTC на binance дорівнює 10 ETH, на kucoin 8 ETH )<br>
На запит baseCurrency: ETH, quoteCurrency: BTC сервіс має відповідати { [ { exchangeName: binance, rate: 0.1 }, { exchangeName: kucoin, rate: 0.125 }]}( тобто ціна одного ETH на binance дорівнює 0.1 BTC, на kucoin 0.125 BTC )

Передбачити в архітектурі сервісу швидке додавання нових бірж та криптовалют.

## Solution

### Процесс установки зависимостей проекта и старта
```bash
npm install
nest build
NODE_ENV=local node ./dist/main.js
```

К проекту прикручен swagger, так что после старта выполнить запросы к API можно будет по адресу
```bash
http://localhost:3000/api/#/
```

### Немного описания реализации:
1. Все доступные валюты реализованы перечислением ECurrency
2. Добавление новой биржи достаточно просто:
    - добавить новый сервис, который реализует интерфейс ExchangeApi
    - зарегистрировать новый сервис в ExchangeDynamicModule

Иногда для пар, таких как BTCETH значение с биржи получить нельзя, то будет рассчитанa обратная пара (ETHBTC) и результат будет возвращен как 1/значение.

Так же при написании сервиса нужно учитывать специфичное указание параметра пар в запросах - с дефисом между ними или без. Подозреваю, что в других сервисах это может варьироваться.