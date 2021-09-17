showNotes();//anytime the notes will be visible 

//if user adds a note,add it to the local stroage
let addBtn=document.getElementById('addBtn');
addBtn.addEventListener("click",function(e){

    let addTxt=document.getElementById('addTxt');
    let notes=localStorage.getItem('notes');

    if(notes==null)
    notesObj=[];    //of nothing present in localstroage
    else
    notesObj=JSON.parse(notes); //if notes present,parse those to the array then push the new note

    notesObj.push(addTxt.value); //push the new note to array
    localStorage.setItem("notes",JSON.stringify(notesObj)); //add the array to local stroage by converting the array to string
    addTxt.value="";//after added,text area should be blank
    console.log(notesObj);

    showNotes(); //show the notelist
})




//function to show elements from local stroage
function showNotes()
{

    let notes=localStorage.getItem('notes'); //fetch local stroage

    if(notes==null)
    notesObj=[]; //no notes are the there so declare a empty array of lenght 0
    else
    notesObj=JSON.parse(notes);//main goal to fetch the array and show its each content further

    //fetch each element of the array and each elements are embeded into each html boxes
    //so here how many notes will b there,that no of boxex will be created follwing syntx by foreach
    let html="";
    notesObj.forEach(function(element,index){
        //now it is the time to populate
     html+=
        `
        <div class="noteCard my-2 mx-2 card" style="width: 15rem;">
        <div class="card-body">
            <h5 class="card-title">Note ${index+1}</h5>
            <p class="card-text">${element}</p>
            <button  id="" onclick="deleteNote(${index})" class="btn btn-primary">Delete note</button>
        </div>
        </div>
          
        `
        //element=content(note)
        //pert element's index shd be passed for easier deletion 
    });

    let nodesElem=document.getElementById('notes');//in html file these is a div of id notes in that div all notes will be save by given html
    if(notesObj.length==0)  //if no notes are there in local stroage
    nodesElem.innerHTML=`<h5 style="color: red;">Your notes are empty...!!</h4>`;
    // else
    nodesElem.innerHTML=html;   //all notes with given html will be inside the big div
}





//function to delete a note
function  deleteNote(index)
{
    let notes=localStorage.getItem('notes');    //check local stroage

    if(notes==null)
    notesObj=[];
    else
    notesObj=JSON.parse(notes)  //again fetch the array to update

    notesObj.splice(index,1);   //perticular index item deleted
    localStorage.setItem("notes",JSON.stringify(notesObj)); //add updated array to localstroage

    showNotes();    //to show the updated notes list
}






//adding search functionality
let search=document.getElementById("searchTxt");

search.addEventListener("input",function(){
    let inputVal=search.value;//goal to compare input val with each note's content
    // console.log(inputVal);
    let notecard=document.getElementsByClassName("noteCard"); //this return html collection(all  cards present)
    // console.log(notecard);
    //from a whole html collection we ll find our our required element i.e(p[0]) in each
    Array.from(notecard).forEach(function(element){ //to iterate a html collection foreach loop
        let note=element.getElementsByTagName("p")[0].innerText; //if not innertext it returns element with innertext it converts to string so that we can compare next
        if(note.includes(inputVal))
        element.style.display="block";
        else
        element.style.display="none";        
    })
})