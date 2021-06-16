document.addEventListener('DOMContentLoaded', () => {
    let tableElem = document.getElementById("table");
    if(tableElem){
        if(Data && Array.isArray(Data)){
            Data.forEach((dataObj) => {
                let isEditable = false;
                if(window.sessionStorage && window.sessionStorage.getItem(dataObj['inputId']) === "true"){
                    isEditable = true;
                }else{
                    window.sessionStorage.setItem(dataObj['inputId'], false);
                }
                let tableRowElem = document.createElement("tr");
                //Creating checkbox element
                let checkBoxWrapper = document.createElement('td');
                if(checkBoxWrapper){
                    let checkBox = document.createElement('input');
                    if(checkBox){
                        checkBox.setAttribute('type', 'checkbox');
                        checkBox.setAttribute('data-siblingId', dataObj['inputId']);
                        if(isEditable){
                            checkBox.setAttribute('checked', true);
                        }
                    }
                    checkBoxWrapper.appendChild(checkBox);
                }
                tableRowElem.appendChild(checkBoxWrapper);
    
                //Creating name element
                let nameWrapper = document.createElement('td');
                if(nameWrapper){
                    nameWrapper.innerHTML = dataObj['name'];
                }
                tableRowElem.appendChild(nameWrapper);

                //Creating address element
                let addressWrapper = document.createElement('td');
                if(addressWrapper){
                    let addressInput = document.createElement('input');
                    if(addressInput){
                        addressInput.setAttribute('type', 'text');
                        addressInput.setAttribute('id', dataObj['inputId']);
                        addressInput.addEventListener('input', onTextEnter);
                        if(!isEditable){
                            addressInput.setAttribute('readonly', true);
                        }
                        let textValue = window.sessionStorage.getItem(`${dataObj['inputId']}-text`);
                        if(textValue){
                            addressInput.setAttribute('value', textValue);
                        }
                    }
                    addressWrapper.appendChild(addressInput);
                }
                tableRowElem.appendChild(addressWrapper);

                //Appending table row element into table element
                tableElem.appendChild(tableRowElem);
            });
        }
    }
})

function onTextEnter(event){
    let elem = event.target;
    if(elem){
        let elemId = elem['id'];
        if(elemId){
            let textValIndetifier = `${elemId}-text`;
            window.sessionStorage.setItem(textValIndetifier, elem.value);
        }
    }
}

function rowClickHandler(event){
    let srcElem = event.target;
    if(srcElem){
        let srcElemSiblingId = srcElem.dataset['siblingid'];
        if(srcElemSiblingId){
            let siblingElem = document.getElementById(srcElemSiblingId);
            if(siblingElem){
                if(srcElem.checked){
                    //Setting the value of 'srcElemSiblingId' to false, as input with this ID is now editable
                    window.sessionStorage.setItem(srcElemSiblingId, true);
                    siblingElem.readOnly = false;
                }else{
                    //Setting the value of 'srcElemSiblingId' to false, as input with this ID is now not editable
                    window.sessionStorage.setItem(srcElemSiblingId, false);
                    siblingElem.readOnly = true;
                }
            }
        }
    }
}