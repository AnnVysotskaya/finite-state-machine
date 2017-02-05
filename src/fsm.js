class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.config = config;
        this.fsmHistory = [];
        this.currState = this.config.initial;
        this.historyCount = 0;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.currState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (state in this.config.states) {
            this.fsmHistory.push(this.currState);
            this.historyCount++;
            this.currState = state;
        }
        else throw new Error("Invalid state");
        return this;
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (event in this.config.states[this.currState].transitions) {
            this.fsmHistory.push(this.currState);
            this.historyCount++;
            this.currState = this.config.states[this.currState].transitions[event];

        }
        else {
            throw new Error("Invalid event");
        }
        return this;
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.currState = this.config.initial;
        this.historyCount = 1;
        this.fsmHistory = [];
        //   this.fsmHistory.push(this.currState);
        return this;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        var states = [];
        if (event) {
            for (var elem in this.config.states) {
                if (event in this.config.states[elem].transitions) {
                    states.push(elem);
                }
            }
        }
        else {
            for (var elem in this.config.states) {
                states.push(elem);
            }
        }
        return states;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.historyCount > 0) {
            this.fsmHistory.push(this.currState);
            this.historyCount++;
            console.log("!!!!!!!" + this.fsmHistory);
            this.currState = this.fsmHistory[this.historyCount - 2];
            this.historyCount--;
            return true;
        }
        else return false;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.historyCount < this.fsmHistory.length) {

            this.currState = this.fsmHistory[this.historyCount + 1];
            this.historyCount++;
            return true;
        }
        else return false;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.fsmHistory.length = 0;
        this.historyCount = 0;
        return this;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
