const fs = require('fs');
fs.writeFile('hola.txt', 'Hola mundo', (err) => {
    if (err) {
        console.log(err);
    } else {
        fs.readFile('hola.txt', 'utf-8', (err, contenido) => {
            if (err) {
                console.log(err);
            } else {
                console.log(contenido);
                fs.appendFile('hola.txt', 'Hola mundo', (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        fs.readFile('hola.txt', 'utf-8', (err, contenido) => {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(contenido);
                                fs.unlink('hola.txt', (err) => {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        console.log('Archivo borrado');
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    }
})