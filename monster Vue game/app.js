function getRandomValue(min,max){
    return Math.floor( Math.random()*(min,max)+min);
};

const app = Vue.createApp({
data(){
    return{
        playerHealth: 100,
        monsterHealth: 100,
        winner:null,
        currentRound: 0,
        logMessages: []
    }
},computed:{
    monsterBarHealth(){
        if(this.monsterHealth<0){
            return{width: '0%'}
        }
        return{
            width: this.monsterHealth + '%'
        }
    },
    playerBarHealth(){
        if(this.playerHealth<0){
            return{width: '0%'}
        }
        return{
            width: this.playerHealth + '%'
        }
        }, 
        mayUseSpecialAttack(){
            return this.currentRound % 3 !==0;
            
        },
        // mayUseHeal(){
        //     return this.currentRound % 5 !==0;
            
        // },
       
},
watch:{
    playerHealth(value){
        if(value <=0 && this.monsterHealth<=0){
            this.winner = 'draw';
        }else if(value<=0){
            this.winner = 'monster';
        }
    },
    
    monsterHealth(value){
        if(value<=0 && this.playerHealth<=0){
            this.winner = 'draw';
        }else if(value<=0){
            this.winner = 'player';
        }
    }
},
methods:{
    startNewGame(){
        this.playerHealth = 100;
        this.monsterHealth = 100;
        this.winner = null;
        this.currentRound = 0;
    },
    healPlayer(){
        const healValue = getRandomValue(8,20);
            if(this.playerHealth + healValue>100){
               this.playerHealth = 100
            }else{
               this.playerHealth += healValue;
            }
            this.attackPlayer();
            this.addLogMessages('player','heal',healValue);
    },
    attackMonster(){
        this.currentRound++;

        const attackValue = getRandomValue(5,12);
        this.monsterHealth -= attackValue;
        this.attackPlayer();
        this.addLogMessages('player','attack',attackValue);
    },
    attackPlayer(){
        const attackValue = getRandomValue(8,15);
        this.playerHealth -= attackValue;
        this.addLogMessages('monster','attack',attackValue);
    },
    specialAttackMonster(){
        this.currentRound++;

        const attackValue = getRandomValue(10,25);
        this.monsterHealth -= attackValue;
        this.attackPlayer();
        this.addLogMessages('player','attack',attackValue);

    },
    surrender(){
        this.winner = 'monster';
    },
    addLogMessages(who,what,value){
        this.logMessages.unshift({
            actionBy: who,
            actionType:what,
            actionValue:value
        });
    },
}
});

app.mount('#game');