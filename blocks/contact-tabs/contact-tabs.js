function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function decorate(block) {
    const spreadsheet = getParam(block, 'spreadsheet');
    console.log(spreadsheet);
    const sheets = getParam(block, 'sheets').split(',');
    console.log(sheets);

    // Tab links
    const tab = document.createElement('div');
    tab.className = 'tab';
    let  i = 0;
    while (i < sheets.length) {
      let sheet = sheets[i];
      const tablink = document.createElement('a');
      tablink.className = 'tablinks';
      tablink.setAttribute("land", sheet.trim())
      tablink.onclick = function() {
        console.log('button -> ' + this.getAttribute("land"));
        openCountry(event, this.getAttribute("land"));
      };
      
      if (sheet == 'head') {
        tablink.innerText = 'Head Offices';
        tablink.className += ' active'
      } else {
        tablink.innerText = capitalizeFirstLetter(sheet);
      } 

      tab.append(tablink);
      i++;
    }
    contact.append(tab)

    // Tab content

    
    i = 0;
    sheets.forEach((sheet) => {
      const tabContent = document.createElement('div');
      tabContent.className = 'tabcontent';
      tabContent.setAttribute("id", sheet.trim())
      tabContent.style.display = "none";

      console.log(spreadsheet + '.json?sheet=' + sheet.trim());
      
      const response = fetch(spreadsheet + '.json?sheet=' + sheet.trim())
        .then((response) => response.json())
        .then((json) => { 


          json.data.forEach((office) => {
            
            const location = document.createElement('div');
            location.className = 'location';

     
            const name = document.createElement('h4');
            name.innerText = office["Office"];
            location.append(name);

            const adress = document.createElement('div');
            adress.className = 'adress';
            adress.innerText = office["Adress"];
            location.append(adress);

            const email = document.createElement('a');
            email.className = 'email';
            email.setAttribute('href', 'mailto:'+ office["E-Mail"]);
            email.innerText = office["E-Mail"];
            location.append(email);

            const phone = document.createElement('a');
            phone.className = 'phone';
            phone.setAttribute('href', 'tel:'+ office["Phone"]);
            phone.innerText = office["Phone"];
            location.append(phone);
            
            location.className = 'location';
            tabContent.append(location);
            
          });
          
        });
      
      contact.append(tabContent);
    });

    block.textContent = '';
    block.append(contact);

    //console.log(document.getElementById("head"));
    document.getElementById("head").style.display = "block";
}

function getSheet(block) {
  try {
    var value = null;
    const row = [...block.children][0];
    const name = row.children[0].innerHTML;
    if (name.trim().toLowerCase().startsWith('sheet')) {
      value = row.children[1].innerHTML;
    }
    return value;
  } catch (error) {
    console.error(error);
  }
}

function getParam(block, paramName) {
  try {
    let value = null;
    let i = 0;
    while (i < block.children.length) {
      let name = block.children[i].children[0].innerHTML;
      if (name.trim().toLowerCase().startsWith(paramName)) {
        value = block.children[i].children[1].innerHTML;
        break;
      }
      i++;
    }
    return value;
  } catch (error) {
    console.error(error);
  }
}

function openCountry(evt, countryName) {

  // Get all elements with class="tabcontent" and hide them
  Array.from(document.getElementsByClassName("tabcontent")).forEach((tabcontent) => {
    tabcontent.style.display = "none";
  });

  // Get all elements with class="tablinks" and remove the class "active"
  Array.from(document.getElementsByClassName("tablinks")). forEach((tablink) => {
    tablink.className = tablink.className.replace(" active", "");
  });  

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(countryName).style.display = "block";
  evt.currentTarget.className += " active"
}