import './src/styles/style.scss';
import EventHandler from './src/classes/eventHandler';
import Error from './src/classes/error';
import InputEmail from './src/classes/inputEmail';

class EmailList {
    constructor(list, error, input) {
        this.emails = ['anton@lodoss.team'];
        this.list = list;
        this.error = error;
        this.inputField = input;
    }

    createEmailItem(email) {
        let item = document.createElement('div');
        let textTag = this.createTextTag(email);
        let imgTag = this.createImageTag();
        imgTag.addEventListener('click', event => eventHandler.trigger('deleteEmail', this, event));
        item.classList.add('email-item');
        item.append(textTag);
        item.append(imgTag);
        return item;        
    }

    createTextTag(email) {
        let textItem = document.createElement('p');
        textItem.innerHTML = email;
        textItem.classList.add('email-item__text');
        return textItem;    
    }

    createImageTag() {
        let imgItem = document.createElement('img');
        imgItem.classList.add('img-cross');
        imgItem.setAttribute('alt', 'cross');
        imgItem.setAttribute('src', './src/img/cross.png');
        return imgItem;    
    }

    renderErrorMsg() {
        this.error.showError();
        this.inputField.setRedText();
    }

    removeErrorMsg() {
        this.error.deleteError();
        this.inputField.setBlackText();
    }

    addNewEmail(email) {
        this.emails.push(email);
        eventHandler.trigger('newEmailAdded', this);
    }

    removeEmail(event) {
        let emailText = event.target.previousElementSibling.innerHTML;
        this.emails = this.emails.filter(email => email !== emailText);
        eventHandler.trigger('removedEmailItem', this);
    }

    checkEnteredEmail(event) {
        if (event.keyCode === 13) {
            let email = event.target.value;
            const regExp = /(^[a-z0-9\.\-]+@[a-z0-9\.\-]+\.[a-z\.]{2,20}$)/i;
            if (regExp.test(email)) {
                eventHandler.trigger('correctEmailEntered', this, email);
                event.target.value = null;
            } else {
                eventHandler.trigger('incorrectEmailEntered', this);
            }
        }
    }

    renderEmails() {
        this.list.innerHTML = null;
        for (let i = 0; i < this.emails.length; i++) {
            let item = this.createEmailItem(this.emails[i]);
            this.list.append(item);
        }    
    }
}

let error = document.querySelector('.error');
let input = document.querySelector('.input-email');
let list = document.querySelector('.list');

let eventHandler = new EventHandler();
let errorMsg = new Error(error);
let inputField = new InputEmail(input);
let emailList = new EmailList(list, errorMsg, inputField);
 
eventHandler.on('newEmailEntered', emailList.checkEnteredEmail);
eventHandler.on('enteringNewEmail', emailList.removeErrorMsg);
eventHandler.on('incorrectEmailEntered', emailList.renderErrorMsg);
eventHandler.on('correctEmailEntered', emailList.addNewEmail)
eventHandler.on('newEmailAdded', emailList.renderEmails);
eventHandler.on('removedEmailItem', emailList.renderEmails);
eventHandler.on('deleteEmail', emailList.removeEmail)

inputField.item.addEventListener('keyup', event => eventHandler.trigger('newEmailEntered', emailList, event));
inputField.item.addEventListener('input', event => eventHandler.trigger('enteringNewEmail', emailList, event));
emailList.renderEmails();
