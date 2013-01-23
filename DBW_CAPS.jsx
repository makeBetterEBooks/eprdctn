//version 1.0 1/15/2013 DBW example file

//copyright 2013 Naomi Kennedy
//This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or(at your option) any later version.
//This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

//remember when running this from ExtendScript that you need to change the Dropdown menu at the top to "Adobe InDesign CS6". This script should work with earlier versions of InDesign, but is not fully tested earlier than 5.5

findReplaceUpperCase ();
resetFindPreferences ();
alert ("All caps are now real caps.");

function resetFindPreferences() {
    app.findTextPreferences = null;
    app.changeTextPreferences = null;
}

function findReplaceUpperCase(){
    resetFindPreferences ();
    app.findTextPreferences.capitalization = Capitalization.ALL_CAPS;
    app.findChangeTextOptions.wholeWord = false;
    //saves the results of the find directly to a variable that you can use
    var myResult = app.activeDocument.findText() ;
    //Always iterate over the search results backwards using i-- in InDesign
    //it has to do with the way InDesign keeps track of changes to a story and can lead to bugs if you do it the other way round
    for ( i = myResult.length-1; i >= 0 ; i-- ){
        myResult[i].changecase( ChangecaseMode.uppercase );
    }
}
