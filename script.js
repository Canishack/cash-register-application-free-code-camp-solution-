let price = 1.87;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];
function calculate(){
  let cash=document.getElementById ("cash").value;
  console.log(cash);
  cash=Number(cash);
  if(cash<price){
    alert("Customer does not have enough money to purchase the item")
  }
  else if(cash==price){
    let noChange=document.getElementById("change-due");
    noChange.innerText="No change due - customer paid with exact cash";
  }
  else {
    let changeReq = cash - price; 
    changeReq = Math.round(changeReq * 100) / 100; 
    let change = document.getElementById("change-due");
    let totalCid = cid.reduce((sum, denom) => sum + denom[1], 0); 
    totalCid = Math.round(totalCid * 100) / 100; 

   
    if (totalCid < changeReq) {
        change.innerText = "Status: INSUFFICIENT_FUNDS";
        return;
    }

    
    if (totalCid === changeReq) {
        let formattedCid = cid
            .filter((denom) => denom[1] > 0) 
            .map((denom) => `${denom[0]}: $${denom[1].toFixed(2)}`)
            .join("\n"); 
        change.innerText = `Status: CLOSED\n${formattedCid}`;
        return;
    }

    
    let ans = [];
    let remainingChange = changeReq;

    for (let i = cid.length - 1; i >= 0; i--) {
        let denom = cid[i][0]; 
        let denomTotal = cid[i][1]; 
        let denomValue;

        switch (denom) {
            case "PENNY":
                denomValue = 0.01;
                break;
            case "NICKEL":
                denomValue = 0.05;
                break;
            case "DIME":
                denomValue = 0.1;
                break;
            case "QUARTER":
                denomValue = 0.25;
                break;
            case "ONE":
                denomValue = 1;
                break;
            case "FIVE":
                denomValue = 5;
                break;
            case "TEN":
                denomValue = 10;
                break;
            case "TWENTY":
                denomValue = 20;
                break;
            case "ONE HUNDRED":
                denomValue = 100;
                break;
        }

       
        if (remainingChange >= denomValue) {
            let quantity = Math.min(
                Math.floor(remainingChange / denomValue), 
                Math.floor(denomTotal / denomValue) 
            );

            if (quantity > 0) {
                ans.push(`${denom}: $${(quantity * denomValue).toFixed(2)}`);
                remainingChange -= quantity * denomValue;
                remainingChange = Math.round(remainingChange * 100) / 100; 
            }
        }
    }

   
    if (remainingChange > 0) {
        change.innerText = "Status: INSUFFICIENT_FUNDS";
        return;
    }

  
    change.innerText = "Status: OPEN\n" + ans.join("\n");
}



}
