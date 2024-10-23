const game = {
    player: {
        balance: 100,
        name: "Diether"
    },
    secret: 0,
    reset: function() {
        this.secret = Math.floor(Math.random() * 201);
    }, 
    checkBalance: function(bet) {
        if (this.player.balance <= 0) {
            this.displayMessage("You don't have enough funds. Please Recharge.");
            return false;
        } else if (this.player.balance < bet) {
            this.displayMessage("Not enough balance.");
            return false;
        } else {
            return true;
        }
    },
    placeBet: function(bet) {
        let canBet = this.checkBalance(bet);
        if (canBet) {
            if (bet <= 0) {
                this.displayMessage("Bet not Allowed.");
                return false;
            } else {
                this.player.balance -= bet;
                document.getElementById('balanceAmount').innerText = `$${this.player.balance}`;
                this.displayMessage("Your bet has been placed. Remaining Balance: " + this.player.balance);
                return true;
            }
        } 
    },
    play: function(bet, guess) {
        const allow = this.placeBet(bet);
        this.reset();
        let diff = Math.abs(this.secret - guess);
        if (allow) {
            if (guess === this.secret) {
                this.player.balance += bet * 200;
                this.displayMessage("Jackpot!!! You win " + bet * 200);
            } else if (diff <= 5) {
                this.player.balance += bet * 20;
                this.displayMessage("Huge Win!!! You win " + bet * 20);
            } else if (diff <= 10) {
                this.player.balance += bet * 10;
                this.displayMessage("Winner!!! You win " + bet * 10);
            } else {
                this.displayMessage("You LOSE!!");
            }
            document.getElementById('balanceAmount').innerText = `$${this.player.balance}`;
            document.getElementById('secretNumberDisplay').innerText = `The secret number was: ${this.secret}`;
        } 
    },
    recharge: function(amount) {
        this.player.balance += amount;
        this.displayMessage("Recharge successful! New balance: " + this.player.balance);
        document.getElementById('balanceAmount').innerText = `$${this.player.balance}`;
    },
    displayMessage: function(message) {
        document.getElementById('resultMessage').innerText = message;
    }
};


document.getElementById('submitButton').onclick = function() {
    const bet = parseInt(document.getElementById('betAmount').value);
    const guess = parseInt(document.getElementById('guess').value);
    game.play(bet, guess);
};

document.getElementById('rechargeButton').onclick = function() {
    game.recharge(50); 
};
