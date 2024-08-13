$(document).ready(function(){
    getItemsData();
    count();
    function getItemsData (){
        let getItemsString = localStorage.getItem('shops');
        if(getItemsString) {
            getItemsArray = JSON.parse(getItemsString);
            console.log(getItemsArray);

        let data = '';
        let j = 1;
        let total = 0;
        $.each(getItemsArray, function(i,v) {
            data += `<tr>
                        <td>${j++}</td>
                        <td>${v.name}</td>
                        <td><button>-</button>${v.qty}<button>+</button></td>
                        <td>${v.price}</td>
                        <td>${v.price * v.qty}</td>
                    </tr>`

            total += v.qty * v.price;
        })
        data += `<tr>
                <td colspan="4">Total</td>
                <td>${total}</td>
                </tr>`;

        $('#tbody').html(data);     
        }
    }

    function count(){
        let itemString = localStorage.getItem('shops');
        if(itemString) {
            let itemArray = JSON.parse(itemString);
            if(itemArray != 0) {
                let count = itemArray.length;
                $('#count_item').text(count);
            }
        }
    }

    $('.addToCart').click(function(){
        // alert("jello");
        let id = $(this).data('id');
        let name = $(this).data('name');
        let price = $(this).data('price');
        // console.log(id, name, price);

        let items = {
            id : id,
            name : name,
            price : price,
            qty: 1
        }

        let itemsString = localStorage.getItem('shops');
        let itemsArray;
        if(itemsString == null) {
            itemsArray = [];
        }else {
            itemsArray = JSON.parse(itemsString);
        };

        let status = false;
        $.each(itemsArray, function(i,v){
            if(v.id == id) {
                v.qty++;
                status = true;
            }
        })

        if(status == false) {
            itemsArray.push(items);
        }

        let itemsData = JSON.stringify(itemsArray);
        localStorage.setItem('shops', itemsData);
        
        count();
    })
})