global.DEBOUNCER = CLASS({

    init: (inner, self, milliseconds, func) => {
        //REQUIRED: milliseconds
        //REQUIRED: func

        let timeout;

        let run = self.run = () => {

            if (timeout !== undefined) {
                clearTimeout(timeout);
            }

            timeout = setTimeout(() => {
                func();
            }, milliseconds);
        };
    }
});
