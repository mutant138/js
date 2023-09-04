function saveToLocalStorage(event){
    event.preventDefault();
    const Expense = event.target.userexpense.value;
    const Amount = event.target.useramount.value;
    const Month = event.target.month.value;

    const obj = {
        Expense,
        Amount,
        Month
    };

    axios.post("https://crudcrud.com/api/61a31c28c6b04097a5341c0f6dd4613f/expenses", obj).then((response)=>{
        show(response.data)
        console.log(response)
    })
    .catch((err)=>{
        console.log(err)
    })

    //localStorage.setItem(obj.Expense, JSON.stringify(obj));
    //show(obj);

}
window.addEventListener("DOMContentLoaded", ()=>{
    axios.get("https://crudcrud.com/api/61a31c28c6b04097a5341c0f6dd4613f/expenses").then((response)=>{
        console.log(response);
        for(var i=0;i<response.data.length;i++){
            show(response.data[i])
        }
    })
    .catch((err)=>{
        console.log(err)
    })
})

function show(obj){
    const parentElm = document.getElementById("List");
    const childElm = document.createElement("li");
    childElm.textContent = "For " + obj.Expense + " Rs " + obj.Amount + " on " + obj.Month;

    const deleteButton = document.createElement("input");
    deleteButton.type = "button";
    deleteButton.value = "Delete";
    deleteButton.onclick = () => {
        localStorage.removeItem(obj.Expense);
        parentElm.removeChild(childElm);
    };

    const editButton = document.createElement("input");
    editButton.type = "button";
    editButton.value = "Edit";
    editButton.onclick = () => {
        document.getElementById("userexpenseInputTag").value = obj.Expense;
        document.getElementById("useramountInputTag").value = obj.Amount;
        document.getElementById("monthInputTag").value = obj.Month;
        localStorage.removeItem(obj.Expense);
        parentElm.removeChild(childElm);
    };

    childElm.appendChild(deleteButton);
    childElm.appendChild(editButton);
    parentElm.appendChild(childElm);
}