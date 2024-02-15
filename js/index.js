// select the add button
const addBtn= document.querySelector("#addBtn");
//button ko choddh k baaki area
const main= document.querySelector("#main");

//add event listener to add-button
addBtn.addEventListener("click",function(){
    addNote()
})

//save notes Function
const saveNotes=()=>{
    //select all every thing that is in the text area, by choosing the class, you get an array in return
    const notes=document.querySelectorAll(".note textarea");
    console.log(notes);
    //copied the same array to our array by for each loop with traversing variable note
    const data=[];
    notes.forEach(
        (note)=>{
            data.push(note.value);
        }
    )
   
    if(data.length===0){
        localStorage.removeItem("notes");
    }
    else{
        localStorage.setItem("notes",JSON.stringify(data));
    }
    //console.log(data);
     // A common use of JSON is to exchange data to/from a web server.
    // When sending data to a web server, the data has to be a string.
    // Convert a JavaScript object into a string with JSON.stringify().
    
}

//initially the text has to be empty
const addNote=(text="")=>{
    //create div
    const note=document.createElement("div");
    // add the note class to it
    note.classList.add("note");
    //insert the template of the actual note and specify the text variable there
    note.innerHTML=`
    <div class="tool">
    <i class="save fa-regular fa-bookmark"></i>
    <i class="trash fa-solid fa-trash-can"></i>
</div>
<textarea >${text}</textarea>
    `;
   
    // add eventlistener to delete button
    note.querySelector(".trash").addEventListener("click",function(){
        note.remove();
        saveNotes();
    })
    //add eventlistener to save button 
    note.querySelector(".save").addEventListener("click",function(){
        saveNotes();
    })

    //automatic save functionality
    note.querySelector("textarea").addEventListener(
        "focusout",function(){
            saveNotes();
        }
    )
    
    //add the newly created note to the main div
    main.appendChild(note);
    //save all the notes
    saveNotes();

}


// self calling function-automatically runs when the page loads
(
    function(){
        const lsNotes= JSON.parse(localStorage.getItem("notes"));
        // console.log(lsNotes);
        if(lsNotes===null){
                addNote();
        }
        else{
            lsNotes.forEach(
                (lsNotes)=>{
                    addNote(lsNotes)
                }
            )
        }
    }
)()

