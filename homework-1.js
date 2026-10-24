const readline = require('node:readline/promises')

/** 
 * 1. Билетная касса
Для пункта 1 запросите категорию билета и бюджет в рублях.

ticketPrice(category) через switch возвращает цену билета: для категории 1 — 300, для 2 — 500, для 3 — 900. Для другой категории возвращает 0.
maxTickets(budget, price) циклом while считает, сколько билетов по цене price можно купить на бюджет budget. Не используйте деление и округление.
printTicketResult(category, budget) вызывает первые две функции. Для неизвестной категории печатает только неизвестная категория. В остальных случаях печатает чек.
Ваш выбор: 1
Категория билета: 2
Бюджет: 2300
Категория 2, билет 500 руб., бюджет 2300 руб.: можно купить 4 шт.
*/ 
function ticketPrice(category) {
  switch (category) {
    case 1:
      return 300
    case 2:
      return 500
    case 3:
      return 900
    default:
      return 0
  }
}

function maxTickets(budget, price) {
  if (budget < 0) {
    throw new Error('бюджет не может быть отрицательным')
  }
  let count = 0
  let rest = budget
  while (rest >= price && price > 0) {
    rest -= price
    count += 1
  }
  return count
}

function printTicketResult(category, budget) {
  const price = ticketPrice(category)
  if (price === 0) {
    console.log('неизвестная категория')
    return
  }
  try {
    const count = maxTickets(budget, price)
    console.log(
      `Категория ${category}, билет ${price} руб., бюджет ${budget} руб.: можно купить ${count} шт.`
    )
  } catch (error) {
    console.log('ошибка:', error.message)
  }
}

/**
 * 2. Доставка заказа
Для пункта 2 запросите расстояние до клиента в километрах и сумму заказа в рублях.

deliveryPrice(distance, total) возвращает стоимость доставки. Если сумма заказа не меньше 3000, доставка бесплатна. Иначе до 3 километров включительно доставка тоже бесплатна; от 4 до 10 километров включительно — 200 рублей; дальше — 200 рублей и ещё 25 рублей за каждый километр после десятого.
printDelivery(distance, total) вызывает первую функцию и печатает одну строку по шаблону: Расстояние 12 км, заказ 2500 руб.: доставка 250 руб.
Ваш выбор: 2
Расстояние: 12
Сумма заказа: 2500
Расстояние 12 км, заказ 2500 руб.: доставка 250 руб. */

function deliveryPrice(distance, total) {
  if (distance < 0) {
    throw new Error('расстояние не может быть отрицательным')
  }
  if (total < 0) {
    throw new Error('сумма заказа не может быть отрицательной')
  }
  if (total >= 3000) return 0
  if (distance <= 3) return 0
  if (distance <= 10) return 200
  return 200 + 25 * (distance - 10)
}

function printDelivery(distance, total) {
  try {
    const cost = deliveryPrice(distance, total)
    console.log(
      `Расстояние ${distance} км, заказ ${total} руб.: доставка ${cost} руб.`
    )
  } catch (error) {
    console.log('ошибка:', error.message)
  }
}

/** 
 * 3. Лестница
Для пункта 3 запросите высоту лестницы.

Создайте функцию printSteps(height). Она циклом for печатает номера ступеней от 1 до height.

Ступень 4 не строят: пропустите её через continue.
После ступени 10 строительство останавливается: напечатайте Дальше лестница не построена и выйдите из цикла через break.
После цикла напечатайте количество построенных ступеней: Всего построено: N.
Ваш выбор: 3
Высота лестницы: 12
Ступень 1
Ступень 2
Ступень 3
Ступень 5
Ступень 6
Ступень 7
Ступень 8
Ступень 9
Ступень 10
Дальше лестница не построена
Всего построено: 9
*/
function printSteps(height) {
  try {
    if (height < 0) {
      throw new Error('высота не может быть отрицательной')
    }
    let built = 0
    for (let i = 1; i <= height; i++) {
      if (i === 4) continue
      console.log(`Ступень ${i}`)
      built += 1
      if (i === 10) {
        console.log('Дальше лестница не построена')
        break
      }
    }
    console.log(`Всего построено: ${built}`)
  } catch (error) {
    console.log('ошибка:', error.message)
  }
}

/**
 * Как запускается программа
node homework-1.js
После запуска программа печатает меню:

Выберите задачу:
1 — билетная касса
2 — доставка заказа
3 — лестница
Ваш выбор:
Прочитайте выбор пользователя через readline. В зависимости от выбранного пункта запросите нужные числа. После результата программа заканчивает работу.

Если введён не 1, 2 или 3, напечатайте такой задачи нет и завершите программу.
 */
async function main() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

  console.log('Выберите задачу:')
  console.log('1 — билетная касса')
  console.log('2 — доставка заказа')
  console.log('3 — лестница')

  const choice = Number(await rl.question('Ваш выбор: '))

  switch (choice) {
    case 1: {
      const category = Number(await rl.question('Категория билета: '))
      const budget = Number(await rl.question('Бюджет: '))
      printTicketResult(category, budget)
      break
    }
    case 2: {
      const distance = Number(await rl.question('Расстояние: '))
      const total = Number(await rl.question('Сумма заказа: '))
      printDelivery(distance, total)
      break
    }
    case 3: {
      const height = Number(await rl.question('Высота лестницы: '))
      printSteps(height)
      break
    }
    default:
      console.log('такой задачи нет')
  }
  rl.close()
}

main()