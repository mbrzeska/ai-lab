const msg: string = "Hello!";
alert(msg);

interface StyleDictionary {
    [styleName: string]: string;
}

const styles: StyleDictionary = {
    style1: 'styles/style1.css',
    style2: 'styles/style2.css',
};

let currentStyle: string = 'style2'; // Domyślny styl

const style1Button = document.getElementById('style1Button') as HTMLButtonElement;
const style2Button = document.getElementById('style2Button') as HTMLButtonElement;
const head = document.head || document.getElementsByTagName('head')[0];

loadStylesheet(styles[currentStyle]);


style1Button.addEventListener('click', () => {
    changeStyle('style1');
});

style2Button.addEventListener('click', () => {
    changeStyle('style2');
});

function loadStylesheet(url: string) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;

    const existingStyles = document.querySelectorAll('link[rel="stylesheet"]');
    existingStyles.forEach((style) => {
        head.removeChild(style);
    });

    head.appendChild(link);

    currentStyle = Object.keys(styles).find(key => styles[key] === url) || '';
}


function changeStyle(styleName: string) {
    if (styles.hasOwnProperty(styleName)) {
        loadStylesheet(styles[styleName]);
    }
}
