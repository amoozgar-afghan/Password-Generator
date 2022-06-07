let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 !@#$%^&*()_+=-:;\"'<>,./|\\{}[]";
chars = chars.split('');

function generatePasswords(){
    
    let passLength = document.getElementById("passLength").value;
    if(passLength > 32){
        passLength = 32;
    } else if(passLength < 8){
        passLength = 8;
    } else if(passLength === undefined || isNaN(passLength)) {
        passLength = 8;
    }
    
    for(let i = 0; i < 4; i++){
        document.getElementById("pass-"+i).textContent = getPass(passLength);
    }
                    
}

function getPass(passLength = 8){
    let password = "";
    let randomNumber = 0;
    
    for(let i = 0; i < passLength; i++){
        randomNumber = Math.floor(Math.random() * chars.length);
        password += chars[randomNumber];
    }
    
    return password;
}

function copyToClipboard(btnId) {
    let text = document.getElementById(btnId).textContent;
    if (window.clipboardData && window.clipboardData.setData) {
        // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
        return window.clipboardData.setData("Text", text);

    }
    else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in Microsoft Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy");  // Security exception may be thrown by some browsers.
        }
        catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return prompt("Copy to clipboard: Ctrl+C, Enter", text);
        }
        finally {
            document.body.removeChild(textarea);
        }
    }
}