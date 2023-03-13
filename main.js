let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let create = document.getElementById('create');
let count = document.getElementById('count');
let category = document.getElementById('category');

let mood ="create";
let tmp;
//get total
function gettotal(){
    if(price.value != ''){
        let result = +price.value + +taxes.value + +ads.value - +discount.value;
        total.innerHTML = result;
        total.style.background = "#040";
    }
    else{
        total.innerHTML = "";
        total.style.background = "#a00d02";
    }
}

//localStorage.clear();

let dataPro;
if(localStorage.Product != null){
    dataPro = JSON.parse(localStorage.Product);
}
else{
    dataPro =[];
}

//create product
create.onclick = function(){
    
    let newPro = {
        title : title.value,
        price : price.value,
        taxes : taxes.value,
        ads : ads.value,
        discount : discount.value,
        total : total.innerHTML,
        count : count.value,
        category : category.value
    }

    if(title.value != '' && price.value!='' && category.value!='' && count.value<100){
        if(mood === "create"){
            if(newPro.count > 1){
                for(let i=0 ; i<newPro.count;i++){
                    dataPro.push(newPro);
                }
            }
            else{
                dataPro.push(newPro);
            }
        }
        else{
            dataPro[tmp] = newPro;
            mood = 'create';
            create.innerHTML = 'Create';
            count.style.display = 'block';
            Swal.fire({
                title :'Your file has been Updated !',
                icon :'success',
                color:'#fff',
                background : '#222',
                showConfirmButton: false,
                timer: 2000
            })
        }
        clearData();
    }
    else{
        Swal.fire({
            title :'Please fill in all the required fields and check if Count value is < 100 ',
            icon :'question',
            color:'#fff',
            background : '#222'
        })
    }
    // save localStorage
    localStorage.setItem("Product",JSON.stringify(dataPro));
    // console.log(dataPro);
   // alert("Informations was added successfully !!")



    showData();
}

function clearData(){
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    count.value = "";
    category.value = "";
    total.innerHTML = "";
}

showData();

function showData(){
    gettotal();

    let table = '';
    for(let i=0 ;i<dataPro.length ;i++){
        table += `
        <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick=updateData(${i})>update</button></td>
        <td><button onclick=deletedata(${i})>delete</button></td>
    </tr>
            `;
    }
    document.getElementById('tbody').innerHTML = table;
    if(dataPro.length > 0){
        document.getElementById('deleteAll').innerHTML = `
                <td><button onclick=deleteAll()>Delete All (${dataPro.length})</button></td>`;
    }
    else{
        document.getElementById('deleteAll').innerHTML = '';
    }
}

function deletedata(index){

    dataPro.splice(index,1);
    localStorage.Product = JSON.stringify(dataPro);
    showData();
}

function deleteAll(){
    if(confirm("Are you sure you want to delete all this information ?")){
        localStorage.clear();
        dataPro.splice(0);
        showData();
        Swal.fire({
            title :'Your file has been Deleted !',
            icon :'success',
            color:'#fff',
            background : '#222',
            showConfirmButton: false,
            timer: 2000
          })
    }
    gettotal();

}

//update
function updateData(index){
    title.value = dataPro[index].title;
    price.value = dataPro[index].price;
    taxes.value = dataPro[index].taxes;
    ads.value = dataPro[index].ads;
    discount.value = dataPro[index].discount;
    category.value = dataPro[index].category;
    gettotal();
    count.style.display = 'none';
    create.innerHTML = 'Update'
    mood = 'update';
    tmp=index;
    scroll({
        top : 0,
        behavior : 'smooth'
    });
}


//Search Data
let searchMood = 'title';
function getSearchMood(id){
    let search = document.getElementById('search');

    if(id=='searchBT'){
        searchMood = 'Title';
    }
    else{
        searchMood = 'Category';
    }
    search.focus();
    search.placeholder = 'Search By '+searchMood;
    search.value = '';
    showData();

}

function searchData(value){
    let table ='';
    for(let i=0 ; i<dataPro.length ;i++){
        if(searchMood=='Title'){
            if(dataPro[i].title.includes(value.toLowerCase())){
                table +=`
                <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick=updateData(${i})>update</button></td>
                <td><button onclick=deletedata(${i})>delete</button></td>
            </tr>
                `;
            }
        }
        else{
            if(dataPro[i].category.includes(value.toLowerCase())){
                table +=`
                <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick=updateData(${i})>update</button></td>
                <td><button onclick=deletedata(${i})>delete</button></td>
            </tr>
                `;
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}


//console.log(title,price,taxes,ads,discount,total)