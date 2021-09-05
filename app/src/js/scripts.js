document.addEventListener('DOMContentLoaded', function () {


    // Get Kamu form
    const kamusForm = document.getElementById('kamus');
    const wordField = document.getElementById('word');

    kamusForm.addEventListener("submit", function (e) {
        
        e.preventDefault();
        
        lookUpWord(wordField.value)
        
        wordField.value = '';
    })

    const lookUpWord = word => {
        let app = document.getElementById('app');
        let html = '';
        
        fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=57e8ecaf-e18b-4f51-bb13-8340d0c2bb54`)
            .then(response => response.json())
            .then(data => {
                data.forEach((d) => {
                    console.log(d)
                    html += `
                        <div class="row">
                        ${d.fl} 

                        
                        </div>
                    `;
                    
                    d.shortdef.forEach((def) => {
                        html += `
                            <p>${def}</p>
                        `;
                    })
                    
                })
                

                app.innerHTML = html;
            })
    }
});