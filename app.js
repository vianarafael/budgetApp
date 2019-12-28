// Data Controller
const budgetController = (function() {


})()

// UI Controller
const UIController = (function() {

})()

// Global App Controller
const controller = (function(budgetCtrl, UICtrl) {

    const ctrlAddItem = function() {
    // 1. Get the input data

    // 2. add the item to the budget controller

    // 3. add the item to the UI

    // 4. calculate the budget

    // 5 display the result of the calculation
    console.log('?')
    }

    // When the add button is clicked ..
    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem)

    // .. or when the enter key is pressed
    document.addEventListener('keypress', function(e) {
        // older browsers use which instead of keyCode
        if (e.keyCode === 13 || e.which === 13) {
            ctrlAddItem
        }
    })




})(budgetController, UIController) // if the names of budget and UI controllers are changed that will not interfere with the controller