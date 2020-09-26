var watchExampleVM = new Vue({
    el: '#watch-example',
    data: {
        question: '',
        answer: 'Aguardando sua pergunta...'
    },
    watch: {
        question: function() {
            this.answer = 'Esperando você parar de escrever...',
            this.debouncedGetAnswer()
        }
    },
    created: function() {
        this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
    },
    methods: {
        getAnswer: function(){
            if(this.question.indexOf('?') === -1) {
                this.answer = 'Perguntas geralmente tem uma interrogação!'
                return
            }
            this.answer = 'Pensando...'
            var vm = this
            axios.get('https://yesno.wtf/api')
                .then(function(response) {
                    vm.answer = response.data.answer === 'yes' ? 'Sim' : response.data.answer === 'no' ? 'Não' : 'Talvez!'
                })
                .catch(function(error) {
                    vm.answer = 'Error! Não foi possível executar a API - ' + error
                })
        }
    }
})
