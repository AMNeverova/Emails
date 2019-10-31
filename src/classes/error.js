class Error {
    constructor(item) {
        this.item = item;
    }
    showError() {
        this.item.classList.add('show');
    }
    deleteError() {
        this.item.classList.remove('show');
    }
}

export default Error;