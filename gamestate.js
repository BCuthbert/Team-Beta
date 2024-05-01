

export function GameState(p) {
    return {
        states: { 0: 'menu', 1: 'level1', 2: 'tryagain' },
        currentState: 0, // currentState- 0 is menu, 1 is level1, etc.


        getState() {
            return this.states[this.currentState];
        },

        changeState(state) {
            if (state === 'tryagain'){
                console.log("Reloading Game");
                setTimeout(() => {
                    window.location.reload();
                    }, 2000);
            } else {
            this.currentState = this.states[this.currentState];
            }
        },

    };
}

