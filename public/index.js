'use strict';

//list of bats
//useful for ALL 5 steps
//could be an array of objects that you fetched from api or database
const bars = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'freemousse-bar',
  'pricePerHour': 50,
  'pricePerPerson': 20
}, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'solera',
  'pricePerHour': 100,
  'pricePerPerson': 40
}, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'la-poudriere',
  'pricePerHour': 250,
  'pricePerPerson': 80
}];

//list of current booking events
//useful for ALL steps
//the time is hour
//The `price` is updated from step 1 and 2
//The `commission` is updated from step 3
//The `options` is useful from step 4

const events = [{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'booker': 'esilv-bde',
  'barId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'time': 4,
  'persons': 8,
  'options': {
    'deductibleReduction': false
  },

  'price': 0 ,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}, {
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'booker': 'societe-generale',
  'barId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'time': 8,
  'persons': 30,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'booker': 'otacos',
  'barId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'time': 5,
  'persons': 80,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}];

//list of actors for payment
//useful from step 5
const actors = [{
  'eventId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'eventId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'eventId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}];


function getBar(id)
{
  return bars.find(bar => bar.id === id);
}

function getEvent(id)
{
  return events.find(evt => evt.id === id);
}

function priceUpdate(){
  for( const evt of events ) {
    if(evt.persons<11){
     for( const bar of bars)  {
       if(bar.id === evt.barId) {
         evt.price = evt.time * bar.pricePerHour + evt.persons * bar.pricePerPerson;
       }
     }
   }
   else{
     if(evt.persons < 21) {
       for( const bar of bars)  {
         if(bar.id === evt.barId) {
           evt.price = evt.time * bar.pricePerHour + evt.persons * bar.pricePerPerson* 0.9;
         }
       }
     }
     else {
       if(evt.persons < 61) {
         for( const bar of bars)  {
           if(bar.id === evt.barId) {
             evt.price = evt.time * bar.pricePerHour + evt.persons * bar.pricePerPerson* 0.7;
           }
         }
       }
       else{
         for( const bar of bars)  {
           if(bar.id === evt.barId) {
             evt.price = evt.time * bar.pricePerHour + evt.persons * bar.pricePerPerson* 0.5;
           }
         }
       }
     }
   }
  }
};

function CommissionPrice(){
   for(const evt of events){
    let com = evt.price * 0.3;
    let ins = com * 0.5;
    let trea = evt.persons;
    let privcom = com - ins - trea;
    evt.commission.insurance = ins;
    evt.commission.treasury = trea;
    evt.commission.privateaser = privcom ;
  }
};

function deductible()
{
  for(const evt of events){
    if(evt.options.deductibleReduction === true)
    {
      evt.price += evt.persons;
      evt.commission.privateaser += evt.persons;
    }
  }
};

function Payment()
{
  for(const act of actors){
    let evt = getEvent(act.eventId);
    for(const pay of act.payment){
      if(pay.who === 'booker'){
        pay.amount = evt.price;
      }
      if(pay.who === 'insurance'){
        pay.amount = evt.commission.insurance;
      }
      if(pay.who === 'treasury'){
        pay.amount = evt.commission.treasury;
      }
      if(pay.who === 'privateaser'){
        pay.amount = evt.commission.privateaser;
      }
    }
  }
};

priceUpdate();
CommissionPrice();
deductible();
Payment();

console.log(bars);
console.log(events);
console.log(actors);
