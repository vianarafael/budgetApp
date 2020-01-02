// Data Controller
const budgetController = (function() {
    const data = {
        allInc: [],
        allExp: [],
        total: {
            inc: 0,
            exp: 0
        },
        budget: 0
    }

    let ID = 0
  return {
      storeInput: function(obj) {
        // create a unique ID for the objects
        obj.id = ID
        ID++
        // put the objects on their proper array
        if (obj.type === 'inc') {
            data.allInc.push(obj)
        } else if (obj.type === 'exp') {
            data.allExp.push(obj)
        }

      },

      removeItem: function(type, ID) {
          let item, index
          type = type[0].toUpperCase() + type.slice(1)


             data['all' + type].map(i => {
               if(i.id === ID) {
                   item = data['all' + type][data['all' + type].indexOf(i)] 
               }
            })
   
        index = data['all' + type].indexOf(item)
        data['all' + type].splice(index, 1)
      },

      sumUpInc: function() {
        let result = 0
        data.allInc.forEach(transaction => result += transaction.value)
        data.total.inc = result
      },

      sumUpExp: function() {
          let result = 0
          data.allExp.forEach(transaction => result += transaction.value)
          data.total.exp = result
      },

      calcBudget: function() {
        data.budget = data.total.inc - data.total.exp
      },

      outputBudget: function() {
        return {
            'budget': data.budget,
            'inc': data.total.inc,
            'exp': data.total.exp
        }
      },

      testing: function() {
          return data
      }
  }
})()

// UI Controller
const UIController = (function() {

    return {
        getInput: function() {
            
            let type = document.querySelector('.add__type').value
            let description = document.querySelector('.add__description').value
            let value = parseFloat(document.querySelector('.add__value').value)

            // Empty the input section 
            document.querySelector('.add__description').value = ''
            document.querySelector('.add__value').value = ''



            return {
                type,
                description,
                value,
                }

            },

            updateBudget: function(totalBudget, totalInc, totalExp) {
                document.querySelector('.budget__value').textContent = totalBudget
                document.querySelector('.budget__income').textContent = totalInc
                document.querySelector('.budget__expenses').textContent = totalExp


        },
        addListItem(obj, type) {

            // Create HTML string with placeholder text
              let html = '<div class="container" id="%id%"><div class="container__description">%description%</div><div class="container__value">%value%</div><button class="remove__btn">remove</button></div>'

            // Replace the placeholder text with data
              let newHtml = html.replace('%description%', obj.description)     
              newHtml = newHtml.replace('%value%', obj.value)
              newHtml = newHtml.replace('%id%', obj.id)

            // Insert HTML to the DOM
            if (type === 'inc') {
                document.querySelector('.income__list').insertAdjacentHTML('beforeend', newHtml)   
            } else if (type === 'exp') {
                document.querySelector('.expenses__list').insertAdjacentHTML('beforeend', newHtml)  
            }


        },
        deleteListItem: function(selectorID) {
            let element = document.getElementById(selectorID)
            element.parentNode.removeChild(element)
        }
    }

})()

// Global App Controller
const controller = (function(budgetCtrl, UICtrl) {
    const setupEventListener = function() {
        // When the add button is clicked ..
        document.querySelector('.add__btn').addEventListener('click', ctrlAddItem)

        // .. or when the enter key is pressed
        document.addEventListener('keypress', function(e) {
            // older browsers use which instead of keyCode
            if (e.keyCode === 13 || e.which === 13) {
                ctrlAddItem()
            }
        })

        document.querySelector('.transaction__container').addEventListener('click', ctrlDeleteItem)
    }

    function updateBudgetAndUI() {

            // 1. calculate the budget
            budgetCtrl.sumUpInc()
            budgetCtrl.sumUpExp()
            budgetCtrl.calcBudget()

            // 2. display the result of the calculation
            budgetObj = budgetCtrl.outputBudget()
            UICtrl.updateBudget(budgetObj.budget, budgetObj.inc, budgetObj.exp)

    }

    const ctrlAddItem = function() {
        let newInput, budgetObj
        // 1. Get the input data
        newInput = UICtrl.getInput()

        if (!isNaN(newInput.value) && newInput.description.length > 0 && newInput.value > 0) {

            // 2. add the item to the budget controller
            budgetCtrl.storeInput(newInput)
        
            // 3. add the item to the UI
            UICtrl.addListItem(newInput, newInput.type)

            updateBudgetAndUI()

        }
    }

    const ctrlDeleteItem = function(e) {
        let itemID, type
        // 1. Get the item to be deleted
        itemID = e.target.parentNode.id


        if(itemID) {
            if (e.target.parentNode.parentNode.classList.contains('income__list')){
                type = 'inc'
            }
            if (e.target.parentNode.parentNode.classList.contains('expenses__list')){
                type = 'exp'
            }

            itemID = parseInt(itemID)
        // 2. Notify the budget controller and do the necessary calculations
            budgetCtrl.removeItem(type, itemID)

            updateBudgetAndUI()

        // 3. Remove element from UI
        UICtrl.deleteListItem(itemID)

        }


    }


    return {
        init: function() {
            UICtrl.updateBudget(0,0,0)
            setupEventListener()
            
        }
    }




})(budgetController, UIController) // if the names of budget and UI controllers are changed that will not interfere with the controller

controller.init()