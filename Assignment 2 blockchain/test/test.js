const Banking = artifacts.require("Banking")

//Multiplying so we use Ether instead of wei
const ether = 10**18
//Contract for testing, creates 3 users
contract("Banking - Balance and deposit", (accounts) => {
    const rip = accounts[1];
    const rap = accounts[2]; 
    const rup = accounts[3]; 

    //Testing that the balance is correctly 0
    it("should have a balance of 0", async () => {
        const instanceOfBanking = await Banking.deployed();

        const balance_rip = await instanceOfBanking.balance({from: rip}); 
        assert.equal(balance_rip, 0, "Incorrect"); 

        const balance_rap = await instanceOfBanking.balance({from: rap}); 
        assert.equal(balance_rap, 0, "Incorrect"); 

        const balance_rup = await instanceOfBanking.balance({from: rup}); 
        assert.equal(balance_rup, 0, "Incorrect"); 
    });
    //testing that it deposits the right amount
     it("should deposit the right amount", async() => {
        const amount = 2*ether
        const instanceOfBanking = await Banking.deployed(); 

        await instanceOfBanking.deposit({from: rip, value: amount});
        const balance_rip = await instanceOfBanking.balance({from: rip});
        assert.equal(balance_rip, 2*ether, "Incorrect"); 

        const balance_rap = await instanceOfBanking.balance({from: rap}); 
        assert.equal(balance_rap, 0, "Incorrect"); 

        const balance_rup = await instanceOfBanking.balance({from: rup});
        assert.notEqual(balance_rup, ether*2, "Incorrect");
    });

//Contract for testing the withdrawl function
contract("Banking - Withdrawal", (accounts) => {

    const rip = accounts[1];
    const amount = 2*ether
    
     it("should withdraw the right amount", async () => {
        const instanceOfBanking = await Banking.deployed(); 

        await instanceOfBanking.deposit({from: rip, value: web3.utils.toBN(amount)});
        await instanceOfBanking.withdraw(web3.utils.toBN(amount), {from: rip})

        const balance_rip = await instanceOfBanking.balance({from: rip});

        assert.equal(balance_rip, 0, "Incorrect"); 

    });
})
})