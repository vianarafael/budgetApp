// Data Controller
const budgetController = (function() {
    const data = {
        allInc: [],
        allExp: []
    }

  return {
      storeInput: function(type, description, value) {
        console.log(type, description, value)
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
            return {
                type,
                description,
                value
            }
        }
    }

})()

// Global App Controller
const controller = (function(budgetCtrl, UICtrl) {

    const ctrlAddItem = function() {
        let newInput

    // 1. Get the input data
      newInput = UICtrl.getInput()

    // 2. add the item to the budget controller
    budgetCtrl.storeInput(newInput.type, newInput.description, newInput.value)
      
    // 3. add the item to the UI

    // 4. calculate the budget

    // 5 display the result of the calculation
 
    }

    // When the add button is clicked ..
    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem)

    // .. or when the enter key is pressed
    document.addEventListener('keypress', function(e) {
        // older browsers use which instead of keyCode
        if (e.keyCode === 13 || e.which === 13) {
            ctrlAddItem()
        }
    })




})(budgetController, UIController) // if the names of budget and UI controllers are changed that will not interfere with the controller