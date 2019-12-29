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
              let html = '<div class="container" id="%id%"><div>%description%</div><div>%value%</div></div>'

            // Replace the placeholder text with data
              let newHtml = html.replace('%description%', obj.description)     
              newHtml = newHtml.replace('%value%', obj.value)
              newHtml = newHtml.replace('%id%', obj.id)

            // Insert HTML to the DOM
            if (type === 'inc') {
                document.querySelector('.income__list').insertAdjacentHTML('beforeend', newHtml)   
            } else if (type === 'exp') {
                document.querySelector('.expenses').insertAdjacentHTML('beforeend', newHtml)  
            }


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

            // 4. calculate the budget
            budgetCtrl.sumUpInc()
            budgetCtrl.sumUpExp()
            budgetCtrl.calcBudget()

            // 5 display the result of the calculation
            budgetObj = budgetCtrl.outputBudget()
            UICtrl.updateBudget(budgetObj.budget, budgetObj.inc, budgetObj.exp)
            


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