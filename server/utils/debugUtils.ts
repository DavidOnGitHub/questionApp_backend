export function log(message, obj?) {
    let output = '';
    
    if (typeof message === undefined) {
        output = 'undefined';
    } else {
        if (typeof message === 'object') {
            obj = message;
            message = '';
        }
        if (obj !== undefined) {
            output = `${message} ${JSON.stringify(obj, null, '  ')}`;
        } else{
            output = `${message}`
        }
    }
    
    console.log(output);
}