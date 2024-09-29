
const books={
  bookList:[
            {g:'<img class="bookImage" src="https://assets.codepen.io/12887886/human+nature.png" alt="The Law of Human Nature" />',count:5, message:"", name:"The Law of Human Nature"},
            {g:'<img class="bookImage" src="https://assets.codepen.io/12887886/atomic+habit.png" alt="The Atomic Habits" />', count:8, message:"", name:"The Atomic Habits"},
            {g:`<img class="bookImage" src="https://assets.codepen.io/12887886/12+rule.png" alt="The 12 Rule of Life" />`, count:13, message:"", name:"The 12 Rule of Life"},
            {g:'<img class="bookImage" src="https://assets.codepen.io/12887886/mastery.png" alt="The Maistrie" />',count:20, message:"", name:"The Maistrie"},
            {g:'<img class="bookImage" src="https://assets.codepen.io/12887886/emotional+entelligence.png" alt="Emotional Intelligence" />',count:20, message:"", name:"Emotional Intelligence"},
            {g:'<img class="bookImage" src="https://assets.codepen.io/12887886/can-t+hurt+me.png" alt="Can\'t Hurt Me" />',count:15, message:"", name:"Can\'t Hurt Me"},
            {g:'<img class="bookImage" src="20231113_091853.jpg" alt="Written By the Pen of Life" width="", height=""/>', count:30, message:"", name:"Written By the Pen of Life"}
          ],
  displayList(){
     return this.bookList.map((item, index)=>`<div class="description"><h3 class="tittle">${item.name}</h3><h4 class="price">0.00$</h4><h4 class="addDes">it is for free the dreem of every poor child who want so badlly to study!!!:(</h4></div><div class="styleItem">${item.g} ${item.count}<button onclick="copyItem(${index})" class="cartt" >Add to cart</button><p>${item.message}</p></div>`).join('')
  }
};
if(window.location.pathname==='/book-store.html'){
  document.getElementById("bookBuy").innerHTML= books.displayList();
}

// putting books from the "bookList[]" to the "cartItem[]" and disply them in the shopping-cart.
const cartItem =[];
function copyItem(index){
  if(books.bookList[index].count>0){
    books.bookList[index].count--;
    cartItem.push(books.bookList[index].g)
  }
  else if(books.bookList[index].count===0){
    books.bookList[index].message="the stock is empty, the book will be available soon!"
  } 
     document.getElementById("inCart").innerHTML= cartItem.map((item, index)=>`<div>${item}<button onclick="putBack(${index})">delete</button></div>`)
     document.getElementById("bookBuy").innerHTML= books.displayList()
};

// delete one book form the shopping-cart and putting back to the list of books.
function putBack(index){
  let a = books.bookList.find(ob=> ob['g']=== cartItem[index])
  let z = books.bookList.indexOf(a)
  books.bookList[z].count++
  books.bookList[z].message=""
  document.getElementById("bookBuy").innerHTML= books.displayList()
  delete cartItem[index]
  document.getElementById("inCart").innerHTML= cartItem.map((item, index)=>`<div>${item}<button onclick="putBack(${index})">delete</button></div>`)
};


// display book in the payment and order page.
function storeArrRe(){
  const orderArray = [...cartItem];
   console.log(orderArray);
   localStorage.setItem('orderArray', JSON.stringify(orderArray))|| [];
   window.location.href='/order-page.html';
};
if(window.location.pathname==='/book-store.html'){
  document.getElementById('remFun').addEventListener('click', storeArrRe)
}
function displayBoOrpage(){
  const DorderArray = JSON.parse(localStorage.getItem('orderArray')) || [];
  console.log(DorderArray)
  document.getElementById('SendOrder').innerHTML= DorderArray.join('');
}
if(window.location.pathname==='/order-page.html'){
  displayBoOrpage()
}

// romove the book from the list if there is no more of such books in the stok.
function removeBLItem(){
  for(let t=0; t<books.bookList.length; t++){
    if(books.bookList[t].count===0){
        books.bookList.splice(t, 1)
        document.getElementById("bookBuy").innerHTML= books.displayList()
     }
  }
};
if(window.location.pathname==='/book-store.html'){
  document.getElementById("remFun").addEventListener('click', removeBLItem);
}

//clear all shopping-cart to start freesh.
function removeCItem(){
cartItem.length=0;
document.getElementById("inCart").innerHTML=cartItem.join('');
};
if(window.location.pathname==='/book-store.html'){
  document.getElementById("remFun").addEventListener('click', removeCItem);
}

// rerange the the book list to print the book theuser lookin for.
function searchBookL(){
  let c = document.getElementById('searchBaBo').value;
  if(c !==''){
    let b = books.bookList.find(ob=> ob['name']===c);
    let d= books.bookList.indexOf(b);
    let e = books.bookList.splice(d, 1)[0];
    books.bookList.unshift(e);
    document.getElementById('whatYoLoFor').innerHTML= books.displayList();
    console.log(books.bookList[d].g);
  }
};

if(window.location.pathname==='/book-store.html'){
  document.getElementById('searchBooks').addEventListener('click', searchBookL)
}