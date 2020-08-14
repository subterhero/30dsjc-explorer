var testRandomNote = function(){
    var note = getNewRandomNote({strings: ["6"], accidentals_included: true});
    var nextNote = null;
    var i = 0;
    while (i < 100 && (!nextNote || !note || note.note.english != nextNote.note.english)){
        if (nextNote){
            note = jQuery.extend(true, {}, nextNote);
        }
        nextNote = getNewRandomNote({ strings: ["6"], accidentals_included: true }, note);
        i++;
    }
    console.log("result:");
    console.log(i);
    console.log(note);
    console.log(nextNote);
}
console.log("test");
testRandomNote();
console.log("end-test");