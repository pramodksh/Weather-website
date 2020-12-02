console.log('This is flag')


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageone = document.querySelector('#message-one');
const messagetwo = document.querySelector('#message-two');

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
        fetch(`/api?address=${search.value}`).then((res)=>{
            res.json().then((data)=>{
                if(data.error){
                    console.log('Enter Correct Address')
                    messageone.textContent= 'Invalid location'
                    messagetwo.textContent='';
                }
                else{
                    console.log(data)
                    // console.log('\n');
                    console.log(data.location)
                    messagetwo.textContent=`Location : ${data.location}  Temperature : ${data.weather}  Address : ${data.address}`;
                    // messagetwo.textContent='Location : '+ data.location 'Temperature : ' + data.weather +  'Address :'+ data.address;
                }
            })
        })
    console.log(search.value)
})
