(function(win, doc){
    'using strict';
    
    var form = doc.querySelector('form');
    form.onsubmit = function(e){
        e.preventDefault();
        
        var name = form.querySelector('[name="name"]').value.trim();
        var email = form.querySelector('[name="email"]').value.trim();
        if ('fetch' in win) {
            var apiUrl = location.protocol + '//' + location.hostname + ':3010/api';

            fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: name,
                    email: email
                })
            })
            .then(res => res.json())
            .then(data => {
                alert('A new member is created successfully.');
                console.info(data);
            })
            .catch(err => {
                alert('An error occured while processing your request.');
                console.error(err.message);
            });
        } else {
            
        }
    };
    
})(window, document);