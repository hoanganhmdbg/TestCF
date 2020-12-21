const $template = document.getElementById('quiz-template');

class Quiz extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ 'mode': 'open' });
        this.shadowRoot.appendChild($template.content.cloneNode(true));
        this.$wrong1 = this.shadowRoot.getElementById('wrong1');
        this.$wrong2 = this.shadowRoot.getElementById('wrong2');
        this.$wrong3 = this.shadowRoot.getElementById('wrong3');
        this.$right = this.shadowRoot.getElementById('right');
    }
    static get observedAttributes() {
        return ['question', 'wrong1', 'wrong2', 'wrong3', 'right'];
    }

    connectedCallback() {
        let correct = 0;
        let index = 0;
        let length = 0;
        let data = fetch('https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple')
            .then((result) => {
                return result.json();
            })
            .then((result) => {
                return result.results;
            })
            .then((result) => {
                this.quiz(result, index);
                length = result.length;
            })

        this.$right.addEventListener('click', () => {
            alert('correct answer');
            correct += 1;
            if (index < length - 1) {
                this.nextQuiz(++index);

            }
            this.check(index, length, correct);

        });
        this.$wrong1.addEventListener('click', () => {
            alert('Wrong!!');
            if (index < length - 1) {
                this.nextQuiz(++index);

            }
            this.check(index, length, correct);
        });
        this.$wrong2.addEventListener('click', () => {
            alert('Wrong!!');
            if (index < length - 1) {
                this.nextQuiz(++index);

            }
            this.check(index, length, correct);
        });
        this.$wrong3.addEventListener('click', () => {
            alert('Wrong!!');
            if (index < length - 1) {
                this.nextQuiz(++index);
            }
            this.check(index, length, correct);
        });

    }
    attributeChangedCallback(attrName, oldValue, newValue) {
        switch (attrName) {
            case 'question':
                this.shadowRoot.getElementById('question').innerHTML = newValue;
                break;
            case 'wrong1':
                this.$wrong1.innerHTML = newValue;
                break;
            case 'wrong2':
                this.$wrong2.innerHTML = newValue;
                break;
            case 'wrong3':
                this.$wrong3.innerHTML = newValue;
                break;
            case 'right':
                this.$right.innerHTML = newValue;
                break;
        }
    }
    set question(value) {
        this.setAttribute('question', value);
    }
    set wrong1(value) {
        this.setAttribute('wrong1', value);
    }
    set wrong2(value) {
        this.setAttribute('wrong2', value);
    }
    set wrong3(value) {
        this.setAttribute('wrong3', value);
    }
    set right(value) {
        this.setAttribute('right', value);
    }
    quiz(result, index) {
        this.question = result[index].question;
        this.wrong1 = result[index].incorrect_answers[0];
        this.wrong2 = result[index].incorrect_answers[1];
        this.wrong3 = result[index].incorrect_answers[2];
        this.right = result[index].correct_answer;
    }
    nextQuiz(index) {
        let data = fetch('https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple')
            .then((result) => {
                return result.json();
            })
            .then((result) => {
                return result.results;
            })
            .then((result) => {
                this.quiz(result, index);
            })
    }
    check(index, length, correct) {
        if (index > length - 1) {
            alert(`you got ${correct} correct answers`);
        }
    }
}
window.customElements.define('quiz-template', Quiz);