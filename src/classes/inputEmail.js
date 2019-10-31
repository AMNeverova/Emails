class InputEmail {
    constructor(item) {
        this.item = item;
    }
    setRedText() {
        this.item.classList.add('red-text');
    }
    setBlackText() {
        this.item.classList.remove('red-text');
    }
}

export default InputEmail;