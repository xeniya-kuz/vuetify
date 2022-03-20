import Vue from 'vue'

export default {
  install (Vue) {
    // проверка, не был ли он уже установлен
    if (this.installed) {
      // иначе выдает ошибку Unnecessary return statement  no-useless-return
      return true
    }
  }
}

// this.installed = true - выдает ошибку

Vue.prototype.$modal = {
  // создаем новый экземпляр Vue
  // который будет выступать в роли паттерна EventBus
  EventBus: new Vue(),

  show (name, settings) {
    // сообщаем, что наступило событие shown
    // вместе с событием передаем параметры из аргументов функции
    this.EventBus.$emit('shown', { name, ...settings })
  },

  hide () {
    // сообщаем, что наступило событие hide
    this.EventBus.$emit('hide')
  }
}
