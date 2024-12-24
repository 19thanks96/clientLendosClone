export const addBackgroundGlass = (blur = 0) => {
    let fullPageDiv = document.createElement('div');
    fullPageDiv.id = 'backgroundGlass'
    fullPageDiv.style.position = 'fixed';
    fullPageDiv.style.top = '0';
    fullPageDiv.style.left = '0';
    fullPageDiv.style.width = '100%';
    fullPageDiv.style.height = '100%';
    fullPageDiv.style.borderRadius = '32px';
    fullPageDiv.style.background = blur === 0 ? '' : 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.40) 1.76%, rgba(0, 0, 0, 0.70) 6.5%);';
    fullPageDiv.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
    fullPageDiv.style.backdropFilter = `blur(${blur}px)`
    fullPageDiv.style.zIndex = '15'
    document.body.prepend(fullPageDiv);
}

export const removeBackgroundGlass = () => {
    const item = document.getElementById('backgroundGlass');
    if (item) {
        item.remove();
    }
}

export const checkElementPosition = (element: HTMLElement, position: string) => {
    const computedStyle = window.getComputedStyle(element);
    const positionType = computedStyle.position;
    return positionType === position
}


export const selectItemsOnPage = (ids: string[]) => {
    ids.forEach((e) => {
        const item = document.getElementById(e);
        if (item) {
            if (!checkElementPosition(item, 'absolute')) {
                item.style.position = 'relative';
            }
            item.style.zIndex = '999'
        }
    })
}

export const deselectItemsOnPage = (ids: string[]) => {
    ids.forEach((e) => {
        const item = document.getElementById(e);
        if (item) {
            if (checkElementPosition(item, 'relative')) {
                item.style.position = 'relative';
            }
            item.style.zIndex = '0'
        }
    })
}

