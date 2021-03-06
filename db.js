//DEPENDENCIES
const pg = require('pg');
const pgp = require('pg-promise')();

//ENVIRONMENTAL VARIABLES
const cn = {
  host: 'localhost',
  port: 5432,
  database: 'flashcards',
  user: 'postgres',
  password: ''
};
const db = pgp(cn);



//SHOW++++++++++++++++++++++++++++++++
function showOneDeck(deck_id) {
  return db.oneOrNone(`SELECT * FROM Decks where deck_id= $1`, [deck_id])
}

// showOneDeck(2)
//   .then((data) => {console.log(data);})
//   .catch((error) => {console.log(error);});


function showOneCard(card_id) {
  return db.oneOrNone(`SELECT * FROM Cards where card_id= $1`, [card_id])
}

// showOneCard(9)
//   .then((data) => {console.log(data);})
//   .catch((error) => {console.log(error);});


function showAllDecks() {
  return db.any(`SELECT * FROM Decks`)
}

// showAllDecks()
//   .then((data) => {console.log(data);})
//   .catch((error) => {console.log(error);});


function showAllCards(deck_id) {
  return db.any(`SELECT * FROM Cards WHERE deck_id=$1`, [deck_id])
}

// showAllCards(1)
//   .then((data) => {console.log(data);})
//   .catch((error) => {console.log(error);});

function showAllResults() {
    return db.any(`SELECT * FROM Tests`)
  }
  
  // showAllResults()
  //   .then((data) => {console.log(data);})
  //   .catch((error) => {console.log(error);});



//ADD+++++++++++++++++++++++++++++++++
function addCard(deck_id, topic, question, answer, imgUrl) {
  return db.one(`INSERT INTO Cards (deck_id, topic, question, answer, imgUrl) VALUES ($1, '$2#', '$3#', '$4#', '$5#') returning card_id`, [deck_id, topic, question, answer, imgUrl])
}

// addCard(34, 'algorithms', 'Implement a Fibonacci Number Calculator', 'see diagram', 'https://cdn-images-1.medium.com/max/800/1*pvfDpHBsI1suLSOYR2cO3g.png')
//   .then((data) => {console.log(data);})
//   .catch((error) => {console.log(error);});



function addDeck(topic) {
  return db.one(`INSERT INTO Decks(topic) VALUES('$1#') returning deck_id`, [topic])
}

// addDeck('biology')
//   .then((data) => {console.log(data);})
//   .catch((error) => {console.log(error);});


//CHECK IF ANSWER IS RIGHT WRONG++++++++++++++++++++++++++++++
function setTest(card_id, isRight) {
  return db.query(`INSERT INTO Tests(card_id, isRight) VALUES($1, $2)`, [card_id, isRight])
}

// setTest(4, false)
//   .then((data) => {console.log(data);})
//   .catch((error) => {console.log(error);});


//DELETE++++++++++++++++++++++++++++++++++++
function deleteTests() {
  return db.result(`DELETE FROM Tests`);
}

// deleteTests()
//   .then((data) => {console.log(data);})
//   .catch((error) => {console.log(error);});



function deleteADeck(deck_id) {
  return db.query('DELETE FROM cards WHERE deck_id=$1', [deck_id])
  .then(() => {
      return db.result(`DELETE FROM decks WHERE deck_id = $1`, [deck_id]);
  })
  
}

// deleteADeck(4)
//   .then((data) => {console.log(data);})
//   .catch((error) => {console.log(error);});


function deleteACard(card_id) {
  return db.result(`DELETE FROM cards WHERE card_id = $1`, [card_id])
}

// deleteACard(3)
//   .then((data) => {console.log(data);})
//   .catch((error) => {console.log(error);});




//UPDATE++++++++++++++++++++++++++++++

function updateCard(card_id, newTitle) {
  return db.result("update todos set title='$1#' where id=$2", [newTitle, id]);
}
// setTitle(6, 'drink some bourbon')
//   .then((data) => { console.log(data); })
//   .catch((error) => { console.log(error); });




//GET ALL THE CARDS FROM A DECK AND HOW MANY ANSWERS THERE ARE+++++++++++++++++++++++++++++++++++
function getCardwithAnswers(deck_id){
  return db.query(`
  SELECT COUNT(tests.isright) as answerCount,
    cards.*
    
FROM 
    Cards
    
LEFT JOIN
    Tests ON tests.card_id=cards.card_id

WHERE
    cards.deck_id=$1
    
GROUP BY 
	cards.card_id

ORDER BY
	cards.card_id`,[deck_id]
  )
}



module.exports = {
  showOneDeck,
  showOneCard,
  showAllDecks,
  showAllCards,
  addDeck,
  addCard,
  setTest,
  deleteTests,
  deleteADeck,
  deleteACard,
  updateCard,
  showAllResults,
  getCardwithAnswers,

};
