// import store from '../store'
// import { setIndexedDB } from "../reducers/GlobalReducers";
// import { setUserPicture } from "../reducers/ProfileReducers";
// import { sndAudioStream, reqInitSendBlobChange, sndEosStream, sndEndStream } from '../reducers/NewMeetingReducers';

// import defaultPicture from '../img/admin.png';


export var db;

// IndexedDB
var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB;
// var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.OIDBTransaction || window.msIDBTransaction;
var dbVersion = 1.0;

// Create/open database
var request = indexedDB.open("MyPokemonList", dbVersion);

var lastIndex = null;

request.onsuccess = function (event) {
    console.log("Success creating/accessing IndexedDB database");

    db = request.result;

    db.onerror = function (event) {
        console.log("Error creating/accessing IndexedDB database");
    };
    
}

request.onerror = function (event) {
    console.log("Error creating/accessing IndexedDB database");
};

// For future use. Currently only in latest Firefox versions
request.onupgradeneeded = function (event) {
    // console.log("Upgrading IndexedDb");
    var dataBase = event.target.result;

    var store = dataBase.createObjectStore("pokemons", { 
                    keyPath: 'pokemonNickname'//, 
                    // autoIncrement: true 
                });
    store.createIndex('pokemonId', 'pokemonId', { unique: false });
    store.createIndex("pokemonName", "pokemonName", { unique: false });

};

export var createObjectStore = function (dataBase, objStoreName) {
    // Create an objectStore
    // console.log("Creating objectStore")
    dataBase.createObjectStore(objStoreName);
};

export var getMyPokemonList = function(offset, limit){
    return new Promise((resolve, reject) => {
        var objectStore = db.transaction("pokemons").objectStore("pokemons");
        var pokemons = [];

        var iterate = 0;

        var request = objectStore.openCursor();

        request.onsuccess = function(event) {
            var cursor = event.target.result;
            if (cursor) {
                if ( iterate >= offset && pokemons.length < limit ) {
                    pokemons.push(cursor.value);
                }
                // if ( pokemons.length === limit ) {
                //     return pokemons;
                // }
                iterate+=1;
                cursor.continue();
            } else {
                console.log("Got all pokemons: " + pokemons);
                resolve(
                    {
                        count: iterate,
                        pokemons: pokemons
                    }
                );
            }
        }

        request.onerror = function(event) {
            reject("error")
        }
    })


    // IDBKeyRange.bound(0, N, false, true);
}

export var addPokemon = function(obj){    
    return new Promise((resolve, reject) => {
        var request = db.transaction(["pokemons"], "readwrite")
                    .objectStore("pokemons")
                    .add(obj);

        // transaction.objectStore(objStoreName).put(obj, key);

        request.onsuccess = function(event) {
            resolve("success");
        };

        request.onerror = function(event) {
            reject("error");
        };
    })

};

export var releasePokemon = function(pokemonId){
    return new Promise((resolve, reject) => {
        var request = db.transaction(["pokemons"], "readwrite")
                    .objectStore("pokemons")
                    .delete(pokemonId);

        request.onsuccess = function(event) {
            resolve("success");
        };

        request.onerror = function(event) {
            reject("error");
        };
    })
}